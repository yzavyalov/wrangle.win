/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import * as BlinkIDSDK from "@microblink/blinkid-in-browser-sdk";
import { AvailableRecognizers, CameraExperience, EventReady, ImageRecognitionType, RecognitionStatus, SDKError, } from "./data-structures";
import * as ErrorTypes from "./error-structures";
import { globalState } from "./state-lifter";
/**
 * Get the additional processing information from the BlinkIdResult.
 * @param result
 * @returns
 */
export function getAdditionalProcessingInfo(result) {
  if ("scanningFirstSideDone" in result) {
    return !result.scanningFirstSideDone
      ? result.frontAdditionalProcessingInfo
      : result.backAdditionalProcessingInfo;
  }
  else {
    return result.additionalProcessingInfo;
  }
}
export function getImageAnalysisResult(result) {
  if ("scanningFirstSideDone" in result) {
    return !result.scanningFirstSideDone
      ? result.frontImageAnalysisResult
      : result.backImageAnalysisResult;
  }
  else {
    return result.imageAnalysisResult;
  }
}
export const isFirstSideDone = (result) => {
  return "scanningFirstSideDone" in result && result.scanningFirstSideDone;
};
export async function getCameraDevices() {
  const devices = await BlinkIDSDK.getCameraDevices();
  const allDevices = devices.frontCameras.concat(devices.backCameras);
  const finalEntries = allDevices.map((el) => {
    return {
      prettyName: el.label,
      details: el,
    };
  });
  return finalEntries;
}
export class SdkService {
  constructor() {
    this.cancelInitiatedFromOutside = false;
    this.showOverlay = false;
    this.lastKnownCardRotation = BlinkIDSDK.CardRotation.None;
    this.lastDetectionStatus = BlinkIDSDK.DetectionStatus.Failed;
    this.eventEmitter$ = document.createElement("a");
  }
  delete() {
    this.sdk?.delete();
  }
  initialize(licenseKey, sdkSettings) {
    const loadSettings = new BlinkIDSDK.WasmSDKLoadSettings(licenseKey);
    loadSettings.allowHelloMessage = sdkSettings.allowHelloMessage;
    loadSettings.engineLocation = sdkSettings.engineLocation;
    loadSettings.workerLocation = sdkSettings.workerLocation;
    loadSettings.blinkIdVariant = sdkSettings.blinkIdVariant;
    if (sdkSettings.wasmType) {
      loadSettings.wasmType = sdkSettings.wasmType;
    }
    return new Promise((resolve) => {
      BlinkIDSDK.loadWasmModule(loadSettings)
        .then((sdk) => {
        this.sdk = sdk;
        this.showOverlay = sdk.showOverlay;
        resolve(new EventReady(this.sdk));
      })
        .catch((error) => {
        resolve(new SDKError(ErrorTypes.componentErrors.sdkLoadFailed, error));
      });
    });
  }
  checkRecognizers(recognizers) {
    if (!recognizers || !recognizers.length) {
      return {
        status: false,
        message: "There are no provided recognizers!",
      };
    }
    for (const recognizer of recognizers) {
      if (!this.isRecognizerAvailable(recognizer)) {
        return {
          status: false,
          message: `Recognizer "${recognizer}" doesn't exist!`,
        };
      }
      if (recognizer === "BlinkIdMultiSideRecognizer" &&
        recognizers.length > 1) {
        return {
          status: false,
          message: 'Recognizer "BlinkIdMultiSideRecognizer" cannot be used in combination with other recognizers!',
        };
      }
    }
    return {
      status: true,
    };
  }
  getDesiredCameraExperience(_recognizers = [], _recognizerOptions = {}) {
    if (_recognizers.indexOf("BlinkIdMultiSideRecognizer") > -1) {
      return CameraExperience.CardMultiSide;
    }
    if (_recognizers.indexOf("BlinkIdSingleSideRecognizer") > -1) {
      return CameraExperience.CardSingleSide;
    }
    return CameraExperience.Barcode;
  }
  async scanFromCamera(configuration, eventCallback) {
    eventCallback({ status: RecognitionStatus.Preparing });
    this.cancelInitiatedFromOutside = false;
    // Prepare terminate mechanism before recognizer and runner instances are created
    this.eventEmitter$.addEventListener("terminate", async () => {
      this.videoRecognizer?.cancelRecognition?.();
      window.setTimeout(() => this.videoRecognizer?.releaseVideoFeed?.(), 1);
      if (recognizerRunner) {
        try {
          await recognizerRunner.delete();
        }
        catch (error) {
          // Psst, this error should not happen.
        }
      }
      for (const recognizer of recognizers) {
        if (!recognizer) {
          continue;
        }
        if (recognizer.recognizer?.objectHandle > -1) {
          recognizer.recognizer.delete?.();
        }
      }
    });
    // Prepare recognizers and runner
    const recognizers = await this.createRecognizers(configuration.recognizers, configuration.recognizerOptions, eventCallback);
    const recognizerRunner = await this.createRecognizerRunner(recognizers);
    if (configuration.pingProxyUrl) {
      await recognizerRunner.setPingProxyUrl(configuration.pingProxyUrl);
    }
    try {
      this.videoRecognizer =
        await BlinkIDSDK.VideoRecognizer.createVideoRecognizerFromCameraStream(configuration.cameraFeed, recognizerRunner, configuration.cameraId);
      eventCallback({ status: RecognitionStatus.Ready });
      await this.videoRecognizer.setVideoRecognitionMode(BlinkIDSDK.VideoRecognitionMode.Recognition);
      const activeRecognizer = recognizers[0]
        .recognizer;
      const recognizerSettings = await activeRecognizer.currentSettings();
      // We do per-frame operations here
      this.videoRecognizer.setOnFrameProcessed((result) => {
        window.setTimeout(() => {
          // detection status callback is triggered before the video frame callback
          // reset it after each frame is done processing
          this.lastDetectionStatus = BlinkIDSDK.DetectionStatus.Failed;
        }, 0);
        const isMultiside = "scanningFirstSideDone" in result;
        const isFrontSuccessFrame = result.processingStatus ===
          BlinkIDSDK.ProcessingStatus.AwaitingOtherSide;
        //We start scanning the second side only after not the success frame
        const isOnSecondSide = isMultiside && result.scanningFirstSideDone && !isFrontSuccessFrame;
        const additionalProcessingInfo = getAdditionalProcessingInfo(result);
        const imageAnalysisResult = getImageAnalysisResult(result);
        const isPassport = result.classInfo.documentType === BlinkIDSDK.DocumentType.PASSPORT;
        // horrible hack to get the passport status to the global state
        globalState.isPassport = isPassport;
        const notDetected = this.lastDetectionStatus === BlinkIDSDK.DetectionStatus.Failed;
        if (imageAnalysisResult.cardRotation) {
          // save last known rotation in case we lose the document
          this.lastKnownCardRotation = imageAnalysisResult.cardRotation;
        }
        // framing
        switch (this.lastDetectionStatus) {
          case BlinkIDSDK.DetectionStatus.CameraTooFar:
            eventCallback({
              status: RecognitionStatus.DetectionStatusCameraTooHigh,
            });
            break;
          case BlinkIDSDK.DetectionStatus.FallbackSuccess:
            eventCallback({
              status: RecognitionStatus.DetectionStatusFallbackSuccess,
            });
            break;
          case BlinkIDSDK.DetectionStatus.DocumentPartiallyVisible:
            eventCallback({ status: RecognitionStatus.DetectionStatusPartial });
            break;
          case BlinkIDSDK.DetectionStatus.CameraAngleTooSteep:
            eventCallback({
              status: RecognitionStatus.DetectionStatusCameraAtAngle,
            });
            break;
          case BlinkIDSDK.DetectionStatus.CameraTooClose:
            eventCallback({
              status: RecognitionStatus.DetectionStatusCameraTooNear,
            });
            break;
          case BlinkIDSDK.DetectionStatus.DocumentTooCloseToCameraEdge:
            eventCallback({
              status: RecognitionStatus.DetectionStatusDocumentTooCloseToEdge,
            });
            break;
        }
        // handle no detection
        if (notDetected) {
          if (!isPassport) {
            eventCallback({
              // this status doesn't seem to do anything
              // the logic is probably handled as a "default" state somewhere else
              status: RecognitionStatus.DetectionStatusFail,
            });
          }
          else {
            // Get the user to scan the passport
            // again, refer to the page relative to the last one scanned
            if (isOnSecondSide) {
              switch (this.lastKnownCardRotation) {
                case BlinkIDSDK.CardRotation.None: {
                  eventCallback({
                    status: RecognitionStatus.MovePassportUpError,
                  });
                  break;
                }
                case BlinkIDSDK.CardRotation.Clockwise90: {
                  eventCallback({
                    status: RecognitionStatus.MovePassportRightError,
                  });
                  break;
                }
                case BlinkIDSDK.CardRotation.CounterClockwise90: {
                  eventCallback({
                    status: RecognitionStatus.MovePassportLeftError,
                  });
                  break;
                }
                case BlinkIDSDK.CardRotation.UpsideDown: {
                  eventCallback({
                    status: RecognitionStatus.MovePassportDownError,
                  });
                  break;
                }
              }
            }
          }
          return;
        }
        // handle glare
        if (imageAnalysisResult.glareDetected &&
          recognizerSettings.enableGlareFilter) {
          eventCallback({
            status: RecognitionStatus.GlareDetected,
          });
          return;
        }
        // handle blur
        if (imageAnalysisResult.blurDetected &&
          recognizerSettings.enableBlurFilter) {
          eventCallback({
            status: RecognitionStatus.BlurDetected,
          });
          return;
        }
        // handle face occlusion
        if (additionalProcessingInfo.imageExtractionFailures.includes(BlinkIDSDK.ImageExtractionType.Face)) {
          eventCallback({
            status: RecognitionStatus.FacePhotoCovered,
          });
          return;
        }
        // first side done - show flip/move. This status triggers only once
        if (isFrontSuccessFrame) {
          if (!isPassport) {
            eventCallback({ status: RecognitionStatus.OnFirstSideResult });
          }
          else {
            // Passport only branch
            switch (this.lastKnownCardRotation) {
              case BlinkIDSDK.CardRotation.None: {
                eventCallback({
                  status: RecognitionStatus.MovePassportUp,
                });
                break;
              }
              case BlinkIDSDK.CardRotation.Clockwise90: {
                eventCallback({
                  status: RecognitionStatus.MovePassportRight,
                });
                break;
              }
              case BlinkIDSDK.CardRotation.CounterClockwise90: {
                eventCallback({
                  status: RecognitionStatus.MovePassportLeft,
                });
                break;
              }
              case BlinkIDSDK.CardRotation.UpsideDown: {
                eventCallback({
                  status: RecognitionStatus.MovePassportDown,
                });
                break;
              }
            }
          }
          return;
        }
        // scanning wrong side
        if (result.processingStatus ===
          BlinkIDSDK.ProcessingStatus.ScanningWrongSide) {
          if (isPassport) {
            // Passport only branch
            switch (this.lastKnownCardRotation) {
              case BlinkIDSDK.CardRotation.None: {
                eventCallback({
                  status: RecognitionStatus.MovePassportUpError,
                });
                break;
              }
              case BlinkIDSDK.CardRotation.Clockwise90: {
                eventCallback({
                  status: RecognitionStatus.MovePassportRightError,
                });
                break;
              }
              case BlinkIDSDK.CardRotation.CounterClockwise90: {
                eventCallback({
                  status: RecognitionStatus.MovePassportLeftError,
                });
                break;
              }
              case BlinkIDSDK.CardRotation.UpsideDown: {
                eventCallback({
                  status: RecognitionStatus.MovePassportDownError,
                });
                break;
              }
            }
          }
          else {
            // some other document, maybe unclassified?
            eventCallback({
              status: RecognitionStatus.WrongSide,
            });
          }
          return;
        }
        // fallback - success?
        eventCallback({ status: RecognitionStatus.DetectionStatusSuccess });
      });
      //////////////////////////////////////////////////
      // Start recognition
      await this.videoRecognizer
        .startRecognition(async (recognitionState) => {
        this.videoRecognizer.pauseRecognition();
        eventCallback({ status: RecognitionStatus.Processing });
        if (recognitionState !== BlinkIDSDK.RecognizerResultState.Empty) {
          for (const recognizer of recognizers) {
            const results = await recognizer.recognizer.getResult();
            this.recognizerName = recognizer.recognizer.recognizerName;
            if (!results ||
              results.state === BlinkIDSDK.RecognizerResultState.Empty) {
              eventCallback({
                status: RecognitionStatus.EmptyResultState,
                data: {
                  initiatedByUser: this.cancelInitiatedFromOutside,
                  recognizerName: this.recognizerName,
                },
              });
            }
            else {
              const recognitionResults = {
                recognizer: results,
                recognizerName: this.recognizerName,
              };
              if (configuration.recognizerOptions?.returnSignedJSON) {
                recognitionResults.resultSignedJSON =
                  await recognizer.recognizer.toSignedJSON();
              }
              const scanData = {
                result: recognitionResults,
                initiatedByUser: this.cancelInitiatedFromOutside,
              };
              eventCallback({
                status: RecognitionStatus.ScanSuccessful,
                data: scanData,
              });
              break;
            }
          }
        }
        else {
          eventCallback({
            status: RecognitionStatus.EmptyResultState,
            data: {
              initiatedByUser: this.cancelInitiatedFromOutside,
              recognizerName: "",
            },
          });
        }
        window.setTimeout(() => void this.cancelRecognition(), 400);
      }, configuration.recognitionTimeout)
        .then(() => {
        /* Scanning... */
      })
        .catch((error) => {
        throw error;
      });
    }
    catch (error) {
      if (!error.code) {
        eventCallback({ status: RecognitionStatus.UnknownError });
      }
      else {
        switch (error.code) {
          case BlinkIDSDK.ErrorCodes.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED:
            eventCallback({
              status: RecognitionStatus.NoSupportForMediaDevices,
            });
            break;
          case BlinkIDSDK.ErrorCodes.VIDEO_RECOGNIZER_CAMERA_MISSING:
            eventCallback({ status: RecognitionStatus.CameraNotFound });
            break;
          case BlinkIDSDK.ErrorCodes.VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED:
            eventCallback({ status: RecognitionStatus.CameraNotAllowed });
            break;
          case BlinkIDSDK.ErrorCodes.VIDEO_RECOGNIZER_CAMERA_IN_USE:
            eventCallback({ status: RecognitionStatus.CameraInUse });
            break;
          default:
            eventCallback({ status: RecognitionStatus.UnableToAccessCamera });
            break;
        }
      }
      console.warn("Error in VideoRecognizer", error.code, error.message);
      void this.cancelRecognition();
    }
  }
  async flipCamera() {
    await this.videoRecognizer.flipCamera();
  }
  isCameraFlipped() {
    if (!this.videoRecognizer) {
      return false;
    }
    return this.videoRecognizer.isCameraFlipped();
  }
  isScanFromImageAvailable(_recognizers = [], _recognizerOptions = {}) {
    return true;
  }
  getScanFromImageType(_recognizers = [], _recognizerOptions = {}) {
    if (_recognizers.indexOf("BlinkIdMultiSideRecognizer") > -1) {
      return ImageRecognitionType.MultiSide;
    }
    return ImageRecognitionType.SingleSide;
  }
  async scanFromImage(configuration, eventCallback) {
    eventCallback({ status: RecognitionStatus.Preparing });
    const recognizers = await this.createRecognizers(configuration.recognizers, configuration.recognizerOptions, eventCallback);
    const recognizerRunner = await this.createRecognizerRunner(recognizers);
    if (configuration.pingProxyUrl) {
      await recognizerRunner.setPingProxyUrl(configuration.pingProxyUrl);
    }
    const handleTerminate = async () => {
      this.eventEmitter$.removeEventListener("terminate", handleTerminate);
      if (recognizerRunner) {
        try {
          await recognizerRunner.delete();
        }
        catch (error) {
          // Psst, this error should not happen.
        }
      }
      for (const recognizer of recognizers) {
        if (!recognizer) {
          continue;
        }
        if (recognizer.recognizer?.objectHandle > -1) {
          recognizer.recognizer.delete?.();
        }
      }
      this.eventEmitter$.dispatchEvent(new Event("terminate:done"));
    };
    this.eventEmitter$.addEventListener("terminate", handleTerminate);
    // Get image file
    if (!configuration.file ||
      !RegExp(/^image\//).exec(configuration.file.type)) {
      eventCallback({ status: RecognitionStatus.NoImageFileFound });
      window.setTimeout(() => void this.cancelRecognition(), 500);
      return;
    }
    const file = configuration.file;
    const imageElement = new Image();
    imageElement.src = URL.createObjectURL(file);
    await imageElement.decode();
    const imageFrame = BlinkIDSDK.captureFrame(imageElement);
    // Get results
    eventCallback({ status: RecognitionStatus.Processing });
    const processResult = await recognizerRunner.processImage(imageFrame);
    if (processResult !== BlinkIDSDK.RecognizerResultState.Empty) {
      for (const recognizer of recognizers) {
        const results = await recognizer.recognizer.getResult();
        if (!results ||
          results.state === BlinkIDSDK.RecognizerResultState.Empty) {
          eventCallback({
            status: RecognitionStatus.EmptyResultState,
            data: {
              initiatedByUser: this.cancelInitiatedFromOutside,
              recognizerName: recognizer.name,
            },
          });
        }
        else {
          const recognitionResults = {
            recognizer: results,
            recognizerName: recognizer.name,
          };
          if (configuration.recognizerOptions?.returnSignedJSON) {
            recognitionResults.resultSignedJSON =
              await recognizer.recognizer.toSignedJSON();
          }
          eventCallback({
            status: RecognitionStatus.ScanSuccessful,
            data: recognitionResults,
          });
          break;
        }
      }
    }
    else {
      // If necessary, scan the image once again with different settings
      if (configuration.thoroughScan &&
        configuration.recognizers.indexOf("BlinkIdSingleSideRecognizer") > -1) {
        const c = configuration;
        c.thoroughScan = false;
        c.recognizerOptions = c.recognizerOptions || {};
        for (const r of c.recognizers) {
          c.recognizerOptions[r] = c.recognizerOptions[r] || {};
          c.recognizerOptions[r].scanCroppedDocumentImage =
            !!c.recognizerOptions[r].scanCroppedDocumentImage;
          c.recognizerOptions[r].scanCroppedDocumentImage =
            !c.recognizerOptions[r].scanCroppedDocumentImage;
        }
        const eventHandler = (recognitionEvent) => eventCallback(recognitionEvent);
        const handleTerminateDone = () => {
          this.eventEmitter$.removeEventListener("terminate:done", handleTerminateDone);
          this.scanFromImage(configuration, eventHandler);
        };
        this.eventEmitter$.addEventListener("terminate:done", handleTerminateDone);
        window.setTimeout(() => void this.cancelRecognition(), 500);
        return;
      }
      eventCallback({
        status: RecognitionStatus.EmptyResultState,
        data: {
          initiatedByUser: this.cancelInitiatedFromOutside,
          recognizerName: "",
        },
      });
    }
    window.setTimeout(() => void this.cancelRecognition(), 500);
  }
  async scanFromImageMultiSide(configuration, eventCallback) {
    eventCallback({ status: RecognitionStatus.Preparing });
    const recognizers = await this.createRecognizers(configuration.recognizers, configuration.recognizerOptions, eventCallback);
    const recognizerRunner = await this.createRecognizerRunner(recognizers);
    if (configuration.pingProxyUrl) {
      await recognizerRunner.setPingProxyUrl(configuration.pingProxyUrl);
    }
    const handleTerminate = async () => {
      this.eventEmitter$.removeEventListener("terminate", handleTerminate);
      if (recognizerRunner) {
        try {
          await recognizerRunner.delete();
        }
        catch (error) {
          // Psst, this error should not happen.
        }
      }
      for (const recognizer of recognizers) {
        if (!recognizer) {
          continue;
        }
        if (recognizer.recognizer?.objectHandle > -1) {
          recognizer.recognizer.delete?.();
        }
      }
      this.eventEmitter$.dispatchEvent(new Event("terminate:done"));
    };
    this.eventEmitter$.addEventListener("terminate", handleTerminate);
    if (!configuration.firstFile) {
      eventCallback({ status: RecognitionStatus.NoFirstImageFileFound });
      window.setTimeout(() => void this.cancelRecognition(), 500);
      return;
    }
    if (!configuration.secondFile) {
      eventCallback({ status: RecognitionStatus.NoSecondImageFileFound });
      window.setTimeout(() => void this.cancelRecognition(), 500);
      return;
    }
    // Get results
    eventCallback({ status: RecognitionStatus.Processing });
    const imageElement = new Image();
    imageElement.src = URL.createObjectURL(configuration.firstFile);
    await imageElement.decode();
    const firstFrame = BlinkIDSDK.captureFrame(imageElement);
    const firstProcessResult = await recognizerRunner.processImage(firstFrame);
    if (firstProcessResult !== BlinkIDSDK.RecognizerResultState.Empty) {
      const imageElement = new Image();
      imageElement.src = URL.createObjectURL(configuration.secondFile);
      await imageElement.decode();
      const secondFrame = BlinkIDSDK.captureFrame(imageElement);
      const secondProcessResult = await recognizerRunner.processImage(secondFrame);
      if (secondProcessResult !== BlinkIDSDK.RecognizerResultState.Empty) {
        for (const recognizer of recognizers) {
          const results = await recognizer.recognizer.getResult();
          if (!results ||
            results.state === BlinkIDSDK.RecognizerResultState.Empty) {
            eventCallback({
              status: RecognitionStatus.EmptyResultState,
              data: {
                initiatedByUser: this.cancelInitiatedFromOutside,
                recognizerName: recognizer.name,
              },
            });
          }
          else {
            const recognitionResults = {
              recognizer: results,
              recognizerName: recognizer.name,
            };
            if (configuration.recognizerOptions?.returnSignedJSON) {
              recognitionResults.resultSignedJSON =
                await recognizer.recognizer.toSignedJSON();
            }
            eventCallback({
              status: RecognitionStatus.ScanSuccessful,
              data: recognitionResults,
            });
            break;
          }
        }
      }
      else {
        eventCallback({
          status: RecognitionStatus.EmptyResultState,
          data: {
            initiatedByUser: this.cancelInitiatedFromOutside,
            recognizerName: "",
          },
        });
      }
    }
    else {
      // If necessary, scan the image once again with different settings
      if (configuration.thoroughScan &&
        configuration.recognizers.indexOf("BlinkIdMultiSideRecognizer") > -1) {
        const c = configuration;
        c.thoroughScan = false;
        c.recognizerOptions = c.recognizerOptions || {};
        for (const r of c.recognizers) {
          c.recognizerOptions[r] = c.recognizerOptions[r] || {};
          c.recognizerOptions[r].scanCroppedDocumentImage =
            !!c.recognizerOptions[r].scanCroppedDocumentImage;
          c.recognizerOptions[r].scanCroppedDocumentImage =
            !c.recognizerOptions[r].scanCroppedDocumentImage;
        }
        const eventHandler = (recognitionEvent) => eventCallback(recognitionEvent);
        const handleTerminateDone = () => {
          this.eventEmitter$.removeEventListener("terminate:done", handleTerminateDone);
          this.scanFromImageMultiSide(configuration, eventHandler);
        };
        this.eventEmitter$.addEventListener("terminate:done", handleTerminateDone);
        window.setTimeout(() => void this.cancelRecognition(), 500);
        return;
      }
      eventCallback({
        status: RecognitionStatus.EmptyResultState,
        data: {
          initiatedByUser: this.cancelInitiatedFromOutside,
          recognizerName: "",
        },
      });
    }
    window.setTimeout(() => void this.cancelRecognition(), 500);
  }
  async stopRecognition() {
    void (await this.cancelRecognition(true));
  }
  async resumeRecognition() {
    this.videoRecognizer.resumeRecognition(true);
  }
  changeCameraDevice(camera) {
    return new Promise((resolve) => {
      this.videoRecognizer
        .changeCameraDevice(camera)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }
  getProductIntegrationInfo() {
    return this.sdk.getProductIntegrationInfo();
  }
  //////////////////////////////////////////////////////////////////////////////
  //
  // PRIVATE METHODS
  isRecognizerAvailable(recognizer) {
    return !!AvailableRecognizers[recognizer];
  }
  async createRecognizers(recognizers, recognizerOptions, eventCallback) {
    const pureRecognizers = [];
    for (const recognizer of recognizers) {
      const instance = await BlinkIDSDK[AvailableRecognizers[recognizer]](this.sdk);
      pureRecognizers.push(instance);
    }
    if (recognizerOptions && Object.keys(recognizerOptions).length > 0) {
      for (const recognizer of pureRecognizers) {
        const settings = await recognizer.currentSettings();
        if (!recognizerOptions[recognizer.recognizerName] ||
          Object.keys(recognizerOptions[recognizer.recognizerName]).length < 1) {
          continue;
        }
        for (const [key, value] of Object.entries(recognizerOptions[recognizer.recognizerName])) {
          if (key in settings) {
            settings[key] = value;
          }
        }
        settings.barcodeScanningStartedCallback = () => {
          eventCallback({ status: RecognitionStatus.BarcodeScanningStarted });
        };
        settings.classifierCallback = (supported) => {
          eventCallback({
            status: RecognitionStatus.DocumentClassified,
            data: supported,
          });
        };
        await recognizer.updateSettings(settings);
      }
    }
    const recognizerInstances = [];
    for (let i = 0; i < pureRecognizers.length; ++i) {
      const recognizer = pureRecognizers[i];
      const instance = { name: recognizers[i], recognizer };
      recognizerInstances.push(instance);
    }
    return recognizerInstances;
  }
  async createRecognizerRunner(recognizers) {
    const metadataCallbacks = {
      onQuadDetection: (quad) => {
        this.lastDetectionStatus = quad.detectionStatus;
      },
    };
    const recognizerRunner = await BlinkIDSDK.createRecognizerRunner(this.sdk, recognizers.map((el) => el.recognizer), false, metadataCallbacks);
    return recognizerRunner;
  }
  async cancelRecognition(initiatedFromOutside = false) {
    this.cancelInitiatedFromOutside = initiatedFromOutside;
    this.eventEmitter$.dispatchEvent(new Event("terminate"));
  }
}
