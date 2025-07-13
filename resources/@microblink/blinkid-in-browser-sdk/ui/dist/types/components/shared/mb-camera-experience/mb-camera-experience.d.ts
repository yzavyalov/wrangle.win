/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { EventEmitter } from "../../../stencil-public-runtime";
import { CameraEntry, CameraExperience, CameraExperienceState, CameraExperienceStateDurations } from "../../../utils/data-structures";
import { TranslationService } from "../../../utils/translation.service";
import { MbHelpCallbacks } from "../mb-help/mb-help.model";
export declare class MbCameraExperience {
  cameraCursorBarcodeClassName: string;
  cameraCursorIdentityCardClassName: string;
  scanningLineBarcodeClassName: string;
  cameraMessageIdentityCardContent: any;
  cameraMessageIdentityCardClassName: string;
  private cameraMessageIdentityCard;
  private cameraMessageBarcode;
  private cameraToolbar;
  private cardIdentityElement;
  private helpScreens;
  private cameraStateChangeId;
  private cameraStateInProgress;
  private flipCameraStateInProgress;
  private barcodeScanningInProgress;
  /**
   * Choose desired camera experience.
   *
   * Each experience type must be implemented in this component.
   */
  type: CameraExperience;
  /**
   * Configure camera experience state timeout durations
   */
  cameraExperienceStateDurations: CameraExperienceStateDurations;
  /**
   * Unless specifically granted by your license key, you are not allowed to
   * modify or remove the Microblink logo displayed on the bottom of the camera
   * overlay.
   */
  showOverlay: boolean;
  /**
   * Instance of TranslationService passed from root component.
   */
  translationService: TranslationService;
  /**
   * Api state passed from root component.
   */
  apiState: string;
  /**
   * Camera horizontal state passed from root component.
   *
   * Horizontal camera image can be mirrored
   */
  cameraFlipped: boolean;
  /**
   * Show scanning line on camera
   */
  showScanningLine: boolean;
  /**
   * Show camera feedback message on camera for Barcode scanning
   */
  showCameraFeedbackBarcodeMessage: boolean;
  clearIsCameraActive: boolean;
  apiStateHandler(apiState: string, _oldValue: string): void;
  /**
   * Dictates if Help Screens usage is allowed (turned on).
   */
  allowHelpScreens: boolean;
  /**
   * See description in public component.
   */
  allowHelpScreensFab: boolean;
  /**
   * See description in public component.
   */
  allowHelpScreensOnboarding: boolean;
  /**
   * See description in public component.
   */
  allowHelpScreensOnboardingPerpetuity: boolean;
  /**
   * See description in public component.
   */
  helpScreensTooltipPauseTimeout: number;
  /**
   * Emitted when user clicks on 'X' button.
   */
  close: EventEmitter<void>;
  /**
   * Emitted when camera stream becomes active.
   */
  setIsCameraActive: EventEmitter<boolean>;
  /**
   * Emitted when user selects a different camera device.
   */
  changeCameraDevice: EventEmitter<CameraEntry>;
  /**
   * Host element as variable for manipulation
   */
  hostEl: HTMLElement;
  /**
   * Change active camera.
   */
  setActiveCamera(cameraId: string): Promise<void>;
  /**
   * Populate list of camera devices.
   */
  populateCameraDevices(): Promise<void>;
  /**
   * Emitted when user clicks on Flip button.
   */
  flipCameraAction: EventEmitter<void>;
  /**
   * Method is exposed outside which allow us to control Camera Flip state from parent component.
   */
  setCameraFlipState(isFlipped: boolean): Promise<void>;
  /**
   * Initializes Help Screens.
   */
  initializeHelpScreens(callbacks: MbHelpCallbacks): Promise<void>;
  /**
   * Opens Help Screens in the Onboarding mode.
   */
  openHelpScreensOnboarding(): Promise<void>;
  /**
   * Terminates Help Screens.
   */
  terminateHelpScreens(): Promise<void>;
  /**
   * Set camera state which includes animation and message.
   */
  setState(state: CameraExperienceState, isBackSide?: boolean, force?: boolean): Promise<void>;
  private getCameraExperienceStateDuration;
  private getStateDurationFromUserInput;
  /**
   * Set camera state to initial method.
   */
  resetState(): Promise<void>;
  private flipCamera;
  private handleStop;
  private setMessage;
  private getStateMessage;
  private handleChangeCameraDevice;
  componentDidLoad(): void;
  render(): any;
}
