/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import * as BlinkIDSDK from "@microblink/blinkid-in-browser-sdk";
import { CameraEntry, CameraExperience, EventReady, VideoRecognitionConfiguration, ImageRecognitionConfiguration, MultiSideImageRecognitionConfiguration, ImageRecognitionType, RecognitionEvent, SdkSettings, SDKError } from "./data-structures";
export interface CheckConclusion {
  status: boolean;
  message?: string;
}
/**
 * Get the additional processing information from the BlinkIdResult.
 * @param result
 * @returns
 */
export declare function getAdditionalProcessingInfo(result: BlinkIDSDK.BlinkIDResult): BlinkIDSDK.AdditionalProcessingInfo;
export declare function getImageAnalysisResult(result: BlinkIDSDK.BlinkIDResult): BlinkIDSDK.ImageAnalysisResult;
export declare const isFirstSideDone: (result: BlinkIDSDK.BlinkIDResult) => boolean;
export declare function getCameraDevices(): Promise<Array<CameraEntry>>;
export declare class SdkService {
  private sdk;
  private eventEmitter$;
  private cancelInitiatedFromOutside;
  private recognizerName;
  videoRecognizer: BlinkIDSDK.VideoRecognizer;
  showOverlay: boolean;
  private lastKnownCardRotation;
  private lastDetectionStatus;
  constructor();
  delete(): void;
  initialize(licenseKey: string, sdkSettings: SdkSettings): Promise<EventReady | SDKError>;
  checkRecognizers(recognizers: Array<string>): CheckConclusion;
  getDesiredCameraExperience(_recognizers?: Array<string>, _recognizerOptions?: any): CameraExperience;
  scanFromCamera(configuration: VideoRecognitionConfiguration, eventCallback: (ev: RecognitionEvent) => void): Promise<void>;
  flipCamera(): Promise<void>;
  isCameraFlipped(): boolean;
  isScanFromImageAvailable(_recognizers?: Array<string>, _recognizerOptions?: any): boolean;
  getScanFromImageType(_recognizers?: Array<string>, _recognizerOptions?: any): ImageRecognitionType;
  scanFromImage(configuration: ImageRecognitionConfiguration, eventCallback: (ev: RecognitionEvent) => void): Promise<void>;
  scanFromImageMultiSide(configuration: MultiSideImageRecognitionConfiguration, eventCallback: (ev: RecognitionEvent) => void): Promise<void>;
  stopRecognition(): Promise<void>;
  resumeRecognition(): Promise<void>;
  changeCameraDevice(camera: BlinkIDSDK.SelectedCamera): Promise<boolean>;
  getProductIntegrationInfo(): Promise<BlinkIDSDK.ProductIntegrationInfo>;
  private isRecognizerAvailable;
  private createRecognizers;
  private createRecognizerRunner;
  private cancelRecognition;
}
