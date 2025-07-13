/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { EventEmitter } from "../stencil-public-runtime";
import * as BlinkIDSDK from "@microblink/blinkid-in-browser-sdk";
export { ProductIntegrationInfo, SDKError, } from "@microblink/blinkid-in-browser-sdk";
export interface MicroblinkUI {
  allowHelloMessage: boolean;
  engineLocation: string;
  workerLocation: string;
  licenseKey: string;
  wasmType: string;
  rawRecognizers: string;
  recognizers: Array<string>;
  recognizerOptions: {
    [key: string]: any;
  };
  recognitionTimeout?: number;
  recognitionPauseTimeout?: number;
  blinkIdVariant?: BlinkIDSDK.BlinkIDVariant;
  thoroughScanFromImage: boolean;
  enableDrag: boolean;
  hideFeedback: boolean;
  hideLoadingAndErrorUi: boolean;
  scanFromCamera: boolean;
  scanFromImage: boolean;
  translations: {
    [key: string]: string;
  };
  rawTranslations: string;
  galleryOverlayType: "FULLSCREEN" | "INLINE";
  galleryDropType: "FULLSCREEN" | "INLINE";
  showActionLabels: boolean;
  showModalWindows: boolean;
  showScanningLine?: boolean;
  showCameraFeedbackBarcodeMessage?: boolean;
  iconCameraDefault: string;
  iconCameraActive: string;
  iconGalleryDefault: string;
  iconGalleryActive: string;
  iconInvalidFormat: string;
  iconSpinnerScreenLoading: string;
  iconSpinnerFromGalleryExperience: string;
  iconGalleryScanningCompleted: string;
  fatalError: EventEmitter<BlinkIDSDK.SDKError>;
  ready: EventEmitter<EventReady>;
  scanError: EventEmitter<EventScanError>;
  scanSuccess: EventEmitter<EventScanSuccess>;
  cameraScanStarted: EventEmitter<null>;
  imageScanStarted: EventEmitter<null>;
  setUiState: (state: "ERROR" | "LOADING" | "NONE" | "SUCCESS") => Promise<any>;
  setUiMessage: (state: "FEEDBACK_ERROR" | "FEEDBACK_INFO" | "FEEDBACK_OK", message: string) => Promise<any>;
  getProductIntegrationInfo: () => Promise<BlinkIDSDK.ProductIntegrationInfo>;
}
export interface SdkSettings {
  allowHelloMessage: boolean;
  engineLocation: string;
  workerLocation: string;
  wasmType?: BlinkIDSDK.WasmType;
  blinkIdVariant?: BlinkIDSDK.BlinkIDVariant;
}
/**
 * Events
 */
export declare class EventReady {
  sdk: BlinkIDSDK.WasmSDK;
  constructor(sdk: BlinkIDSDK.WasmSDK);
}
export declare class EventScanError {
  code: Code;
  fatal: boolean;
  message: string;
  recognizerName: string;
  details?: any;
  constructor(code: Code, fatal: boolean, message: string, recognizerName: string, details?: any);
}
export declare class EventScanSuccess {
  recognizer: BlinkIDSDK.RecognizerResult;
  recognizerName: string;
  constructor(recognizer: BlinkIDSDK.RecognizerResult, recognizerName: string);
}
export interface RecognitionResults {
  recognizer: BlinkIDSDK.RecognizerResult;
}
/**
 * Error codes
 */
export declare enum Code {
  EmptyResult = "EMPTY_RESULT",
  InvalidRecognizerOptions = "INVALID_RECOGNIZER_OPTIONS",
  NoImageFileFound = "NO_IMAGE_FILE_FOUND",
  NoFirstImageFileFound = "NO_FIRST_IMAGE_FILE_FOUND",
  NoSecondImageFileFound = "NO_SECOND_IMAGE_FILE_FOUND",
  GenericScanError = "GENERIC_SCAN_ERROR",
  CameraNotAllowed = "CAMERA_NOT_ALLOWED",
  CameraInUse = "CAMERA_IN_USE",
  CameraGenericError = "CAMERA_GENERIC_ERROR"
}
/**
 * Scan structures
 */
export declare const AvailableRecognizers: {
  [key: string]: string;
};
interface BaseRecognitionConfiguration {
  recognizers: Array<string>;
  recognizerOptions?: any;
  pingProxyUrl: string | null;
}
export interface VideoRecognitionConfiguration extends BaseRecognitionConfiguration {
  recognitionTimeout?: number;
  successFrame: boolean;
  cameraFeed: HTMLVideoElement;
  cameraId: string | null;
}
export interface ImageRecognitionConfiguration extends BaseRecognitionConfiguration {
  thoroughScan?: boolean;
  file: File;
}
export interface MultiSideImageRecognitionConfiguration extends BaseRecognitionConfiguration {
  thoroughScan?: boolean;
  firstFile: File;
  secondFile: File;
}
export declare enum ImageRecognitionType {
  SingleSide = "SingleSide",
  MultiSide = "MultiSide"
}
export declare enum MultiSideImageType {
  First = "First",
  Second = "Second"
}
export interface RecognizerInstance {
  name: string;
  recognizer: BlinkIDSDK.Recognizer & {
    objectHandle: number;
  };
}
export declare enum RecognitionStatus {
  NoImageFileFound = "NoImageFileFound",
  NoFirstImageFileFound = "NoFirstImageFileFound",
  NoSecondImageFileFound = "NoSecondImageFileFound",
  Preparing = "Preparing",
  Ready = "Ready",
  Processing = "Processing",
  DetectionFailed = "DetectionFailed",
  WrongSide = "WrongSide",
  FacePhotoCovered = "FacePhotoCovered",
  EmptyResultState = "EmptyResultState",
  OnFirstSideResult = "OnFirstSideResult",
  ScanSuccessful = "ScanSuccessful",
  DocumentClassified = "DocumentClassified",
  DetectionStatusChange = "DetectionStatusChange",
  NoSupportForMediaDevices = "NoSupportForMediaDevices",
  CameraNotFound = "CameraNotFound",
  CameraNotAllowed = "CameraNotAllowed",
  UnableToAccessCamera = "UnableToAccessCamera",
  CameraInUse = "CameraInUse",
  CameraGenericError = "CameraGenericError",
  BlurDetected = "BlurDetected",
  GlareDetected = "GlareDetected",
  MovePassportLeft = "MovePassportLeft",
  MovePassportRight = "MovePassportRight",
  MovePassportUp = "MovePassportUp",
  MovePassportDown = "MovePassportDown",
  MovePassportDownError = "MovePassportDownError",
  MovePassportUpError = "MovePassportUpError",
  MovePassportRightError = "MovePassportRightError",
  MovePassportLeftError = "MovePassportLeftError",
  ScanPassportLeft = "ScanPassportLeft",
  ScanPassportRight = "ScanPassportRight",
  ScanPassportUp = "ScanPassportUp",
  ScanPassportDown = "ScanPassportDown",
  UnknownError = "UnknownError",
  BarcodeScanningStarted = "BarcodeScanningStarted",
  DetectionStatusFail = "Fail",
  DetectionStatusSuccess = "Success",
  DetectionStatusCameraTooHigh = "CameraTooHigh",
  DetectionStatusFallbackSuccess = "FallbackSuccess",
  DetectionStatusPartial = "Partial",
  DetectionStatusCameraAtAngle = "CameraAtAngle",
  DetectionStatusCameraTooNear = "CameraTooNear",
  DetectionStatusDocumentTooCloseToEdge = "DocumentTooCloseToEdge"
}
export interface RecognitionEvent {
  status: RecognitionStatus;
  data?: any;
}
export interface RecognitionResults {
  recognizer: BlinkIDSDK.RecognizerResult;
  recognizerName: string;
  resultSignedJSON?: BlinkIDSDK.SignedPayload;
}
export declare enum CameraExperience {
  Barcode = "BARCODE",
  CardMultiSide = "CARD_MULTI_SIDE",
  CardSingleSide = "CARD_SINGLE_SIDE",
  PaymentCard = "PAYMENT_CARD",
  Passport = "PASSPORT"
}
export declare enum CameraExperienceState {
  BarcodeScanning = "BarcodeScanning",
  AdjustAngle = "AdjustAngle",
  Classification = "Classification",
  Default = "Default",
  Detection = "Detection",
  Done = "Done",
  DoneAll = "DoneAll",
  Flip = "Flip",
  WrongSide = "WrongSide",
  MoveCloser = "MoveCloser",
  MoveFarther = "MoveFarther",
  BlurDetected = "BlurDetected",
  GlareDetected = "GlareDetected",
  FacePhotoCovered = "FacePhotoCovered",
  MovePassportLeft = "MovePassportLeft",
  MovePassportRight = "MovePassportRight",
  MovePassportUp = "MovePassportUp",
  MovePassportDown = "MovePassportDown",
  ScanPassportLeft = "ScanPassportLeft",
  ScanPassportRight = "ScanPassportRight",
  ScanPassportUp = "ScanPassportUp",
  ScanPassportDown = "ScanPassportDown",
  MovePassportDownError = "MovePassportDownError",
  MovePassportUpError = "MovePassportUpError",
  MovePassportRightError = "MovePassportRightError",
  MovePassportLeftError = "MovePassportLeftError"
}
export type CameraExperienceStateKey = keyof typeof CameraExperienceState;
export type CameraExperienceStateKeyLowercase = Uncapitalize<CameraExperienceStateKey>;
export interface CameraExperienceStateDurations {
  barcodeScanning: number;
  adjustAngle: number;
  default: number;
  done: number;
  doneAll: number;
  flip: number;
  wrongSide: number;
  moveCloser: number;
  moveFarther: number;
}
export declare const CameraExperienceStateDuration: Map<CameraExperienceState, number>;
/**
 * User feedback structures
 */
export declare enum FeedbackCode {
  CameraDisabled = "CAMERA_DISABLED",
  CameraGenericError = "CAMERA_GENERIC_ERROR",
  CameraInUse = "CAMERA_IN_USE",
  CameraNotAllowed = "CAMERA_NOT_ALLOWED",
  GenericScanError = "GENERIC_SCAN_ERROR",
  ScanStarted = "SCAN_STARTED",
  ScanUnsuccessful = "SCAN_UNSUCCESSFUL",
  ScanSuccessful = "SCAN_SUCCESSFUL"
}
export interface FeedbackMessage {
  code?: FeedbackCode;
  state: "FEEDBACK_ERROR" | "FEEDBACK_INFO" | "FEEDBACK_OK";
  message: string;
}
/**
 * Camera selection
 */
export interface CameraEntry {
  prettyName: string;
  details: BlinkIDSDK.SelectedCamera | null;
}
