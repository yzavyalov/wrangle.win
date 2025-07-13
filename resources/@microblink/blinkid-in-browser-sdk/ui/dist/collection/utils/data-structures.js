/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
export { SDKError, } from "@microblink/blinkid-in-browser-sdk";
/**
 * Events
 */
export class EventReady {
  constructor(sdk) {
    this.sdk = sdk;
  }
}
export class EventScanError {
  constructor(code, fatal, message, recognizerName, details) {
    this.code = code;
    this.fatal = fatal;
    this.message = message;
    this.recognizerName = recognizerName;
    if (details) {
      this.details = details;
    }
  }
}
export class EventScanSuccess {
  constructor(recognizer, recognizerName) {
    this.recognizer = recognizer;
    this.recognizerName = recognizerName;
  }
}
/**
 * Error codes
 */
export var Code;
(function (Code) {
  Code["EmptyResult"] = "EMPTY_RESULT";
  Code["InvalidRecognizerOptions"] = "INVALID_RECOGNIZER_OPTIONS";
  Code["NoImageFileFound"] = "NO_IMAGE_FILE_FOUND";
  Code["NoFirstImageFileFound"] = "NO_FIRST_IMAGE_FILE_FOUND";
  Code["NoSecondImageFileFound"] = "NO_SECOND_IMAGE_FILE_FOUND";
  Code["GenericScanError"] = "GENERIC_SCAN_ERROR";
  Code["CameraNotAllowed"] = "CAMERA_NOT_ALLOWED";
  Code["CameraInUse"] = "CAMERA_IN_USE";
  Code["CameraGenericError"] = "CAMERA_GENERIC_ERROR";
})(Code || (Code = {}));
/**
 * Scan structures
 */
export const AvailableRecognizers = {
  IdBarcodeRecognizer: "createIdBarcodeRecognizer",
  BlinkIdSingleSideRecognizer: "createBlinkIdSingleSideRecognizer",
  BlinkIdMultiSideRecognizer: "createBlinkIdMultiSideRecognizer",
};
export var ImageRecognitionType;
(function (ImageRecognitionType) {
  ImageRecognitionType["SingleSide"] = "SingleSide";
  ImageRecognitionType["MultiSide"] = "MultiSide";
})(ImageRecognitionType || (ImageRecognitionType = {}));
export var MultiSideImageType;
(function (MultiSideImageType) {
  MultiSideImageType["First"] = "First";
  MultiSideImageType["Second"] = "Second";
})(MultiSideImageType || (MultiSideImageType = {}));
export var RecognitionStatus;
(function (RecognitionStatus) {
  RecognitionStatus["NoImageFileFound"] = "NoImageFileFound";
  RecognitionStatus["NoFirstImageFileFound"] = "NoFirstImageFileFound";
  RecognitionStatus["NoSecondImageFileFound"] = "NoSecondImageFileFound";
  RecognitionStatus["Preparing"] = "Preparing";
  RecognitionStatus["Ready"] = "Ready";
  RecognitionStatus["Processing"] = "Processing";
  RecognitionStatus["DetectionFailed"] = "DetectionFailed";
  RecognitionStatus["WrongSide"] = "WrongSide";
  RecognitionStatus["FacePhotoCovered"] = "FacePhotoCovered";
  RecognitionStatus["EmptyResultState"] = "EmptyResultState";
  RecognitionStatus["OnFirstSideResult"] = "OnFirstSideResult";
  RecognitionStatus["ScanSuccessful"] = "ScanSuccessful";
  RecognitionStatus["DocumentClassified"] = "DocumentClassified";
  // Camera states
  RecognitionStatus["DetectionStatusChange"] = "DetectionStatusChange";
  RecognitionStatus["NoSupportForMediaDevices"] = "NoSupportForMediaDevices";
  RecognitionStatus["CameraNotFound"] = "CameraNotFound";
  RecognitionStatus["CameraNotAllowed"] = "CameraNotAllowed";
  RecognitionStatus["UnableToAccessCamera"] = "UnableToAccessCamera";
  RecognitionStatus["CameraInUse"] = "CameraInUse";
  RecognitionStatus["CameraGenericError"] = "CameraGenericError";
  // Blur and glare
  RecognitionStatus["BlurDetected"] = "BlurDetected";
  RecognitionStatus["GlareDetected"] = "GlareDetected";
  // Passport states
  RecognitionStatus["MovePassportLeft"] = "MovePassportLeft";
  RecognitionStatus["MovePassportRight"] = "MovePassportRight";
  RecognitionStatus["MovePassportUp"] = "MovePassportUp";
  RecognitionStatus["MovePassportDown"] = "MovePassportDown";
  RecognitionStatus["MovePassportDownError"] = "MovePassportDownError";
  RecognitionStatus["MovePassportUpError"] = "MovePassportUpError";
  RecognitionStatus["MovePassportRightError"] = "MovePassportRightError";
  RecognitionStatus["MovePassportLeftError"] = "MovePassportLeftError";
  RecognitionStatus["ScanPassportLeft"] = "ScanPassportLeft";
  RecognitionStatus["ScanPassportRight"] = "ScanPassportRight";
  RecognitionStatus["ScanPassportUp"] = "ScanPassportUp";
  RecognitionStatus["ScanPassportDown"] = "ScanPassportDown";
  // Errors
  RecognitionStatus["UnknownError"] = "UnknownError";
  RecognitionStatus["BarcodeScanningStarted"] = "BarcodeScanningStarted";
  // BlinkIDSDK.DetectionStatus
  RecognitionStatus["DetectionStatusFail"] = "Fail";
  RecognitionStatus["DetectionStatusSuccess"] = "Success";
  RecognitionStatus["DetectionStatusCameraTooHigh"] = "CameraTooHigh";
  RecognitionStatus["DetectionStatusFallbackSuccess"] = "FallbackSuccess";
  RecognitionStatus["DetectionStatusPartial"] = "Partial";
  RecognitionStatus["DetectionStatusCameraAtAngle"] = "CameraAtAngle";
  RecognitionStatus["DetectionStatusCameraTooNear"] = "CameraTooNear";
  RecognitionStatus["DetectionStatusDocumentTooCloseToEdge"] = "DocumentTooCloseToEdge";
})(RecognitionStatus || (RecognitionStatus = {}));
export var CameraExperience;
(function (CameraExperience) {
  CameraExperience["Barcode"] = "BARCODE";
  CameraExperience["CardMultiSide"] = "CARD_MULTI_SIDE";
  CameraExperience["CardSingleSide"] = "CARD_SINGLE_SIDE";
  CameraExperience["PaymentCard"] = "PAYMENT_CARD";
  CameraExperience["Passport"] = "PASSPORT";
})(CameraExperience || (CameraExperience = {}));
export var CameraExperienceState;
(function (CameraExperienceState) {
  CameraExperienceState["BarcodeScanning"] = "BarcodeScanning";
  CameraExperienceState["AdjustAngle"] = "AdjustAngle";
  CameraExperienceState["Classification"] = "Classification";
  CameraExperienceState["Default"] = "Default";
  CameraExperienceState["Detection"] = "Detection";
  CameraExperienceState["Done"] = "Done";
  CameraExperienceState["DoneAll"] = "DoneAll";
  CameraExperienceState["Flip"] = "Flip";
  CameraExperienceState["WrongSide"] = "WrongSide";
  CameraExperienceState["MoveCloser"] = "MoveCloser";
  CameraExperienceState["MoveFarther"] = "MoveFarther";
  CameraExperienceState["BlurDetected"] = "BlurDetected";
  CameraExperienceState["GlareDetected"] = "GlareDetected";
  CameraExperienceState["FacePhotoCovered"] = "FacePhotoCovered";
  // passport states
  CameraExperienceState["MovePassportLeft"] = "MovePassportLeft";
  CameraExperienceState["MovePassportRight"] = "MovePassportRight";
  CameraExperienceState["MovePassportUp"] = "MovePassportUp";
  CameraExperienceState["MovePassportDown"] = "MovePassportDown";
  CameraExperienceState["ScanPassportLeft"] = "ScanPassportLeft";
  CameraExperienceState["ScanPassportRight"] = "ScanPassportRight";
  CameraExperienceState["ScanPassportUp"] = "ScanPassportUp";
  CameraExperienceState["ScanPassportDown"] = "ScanPassportDown";
  CameraExperienceState["MovePassportDownError"] = "MovePassportDownError";
  CameraExperienceState["MovePassportUpError"] = "MovePassportUpError";
  CameraExperienceState["MovePassportRightError"] = "MovePassportRightError";
  CameraExperienceState["MovePassportLeftError"] = "MovePassportLeftError";
})(CameraExperienceState || (CameraExperienceState = {}));
export const CameraExperienceStateDuration = new Map([
  [CameraExperienceState.BarcodeScanning, 3500],
  [CameraExperienceState.AdjustAngle, 2500],
  [CameraExperienceState.Default, 500],
  [CameraExperienceState.Done, 1000],
  [CameraExperienceState.DoneAll, 400],
  [CameraExperienceState.Flip, 3500],
  [CameraExperienceState.WrongSide, 1500],
  [CameraExperienceState.MoveCloser, 2500],
  [CameraExperienceState.MoveFarther, 2500],
  [CameraExperienceState.BlurDetected, 2500],
  [CameraExperienceState.GlareDetected, 2500],
  [CameraExperienceState.FacePhotoCovered, 2500],
  [CameraExperienceState.MovePassportLeft, 2500],
  [CameraExperienceState.MovePassportRight, 2500],
  [CameraExperienceState.MovePassportUp, 2500],
  [CameraExperienceState.MovePassportDown, 2500],
  [CameraExperienceState.ScanPassportLeft, 1500],
  [CameraExperienceState.ScanPassportRight, 1500],
  [CameraExperienceState.ScanPassportUp, 1500],
  [CameraExperienceState.ScanPassportDown, 1500],
  [CameraExperienceState.MovePassportDownError, 2500],
  [CameraExperienceState.MovePassportUpError, 2500],
  [CameraExperienceState.MovePassportRightError, 2500],
  [CameraExperienceState.MovePassportLeftError, 2500],
]);
/**
 * User feedback structures
 */
export var FeedbackCode;
(function (FeedbackCode) {
  FeedbackCode["CameraDisabled"] = "CAMERA_DISABLED";
  FeedbackCode["CameraGenericError"] = "CAMERA_GENERIC_ERROR";
  FeedbackCode["CameraInUse"] = "CAMERA_IN_USE";
  FeedbackCode["CameraNotAllowed"] = "CAMERA_NOT_ALLOWED";
  FeedbackCode["GenericScanError"] = "GENERIC_SCAN_ERROR";
  FeedbackCode["ScanStarted"] = "SCAN_STARTED";
  FeedbackCode["ScanUnsuccessful"] = "SCAN_UNSUCCESSFUL";
  FeedbackCode["ScanSuccessful"] = "SCAN_SUCCESSFUL";
})(FeedbackCode || (FeedbackCode = {}));
