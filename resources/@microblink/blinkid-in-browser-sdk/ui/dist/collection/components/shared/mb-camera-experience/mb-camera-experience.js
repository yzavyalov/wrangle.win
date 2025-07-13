/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Host, h, } from "@stencil/core";
import { CameraExperience, CameraExperienceState, CameraExperienceStateDuration, } from "../../../utils/data-structures";
import { classNames, getWebComponentParts, setWebComponentParts, } from "../../../utils/generic.helpers";
import * as Utils from "./mb-camera-experience.utils";
import { globalState } from "../../../utils/state-lifter";
export class MbCameraExperience {
  constructor() {
    this.cameraStateChangeId = 0;
    this.cameraStateInProgress = false;
    this.flipCameraStateInProgress = false;
    this.barcodeScanningInProgress = false;
    this.cameraCursorBarcodeClassName = "rectangle";
    this.cameraCursorIdentityCardClassName = "reticle";
    this.scanningLineBarcodeClassName = undefined;
    this.cameraMessageIdentityCardContent = undefined;
    this.cameraMessageIdentityCardClassName = "message";
    this.type = undefined;
    this.cameraExperienceStateDurations = null;
    this.showOverlay = true;
    this.translationService = undefined;
    this.apiState = undefined;
    this.cameraFlipped = false;
    this.showScanningLine = false;
    this.showCameraFeedbackBarcodeMessage = false;
    this.clearIsCameraActive = false;
    this.allowHelpScreens = false;
    this.allowHelpScreensFab = false;
    this.allowHelpScreensOnboarding = false;
    this.allowHelpScreensOnboardingPerpetuity = false;
    this.helpScreensTooltipPauseTimeout = 15000;
  }
  apiStateHandler(apiState, _oldValue) {
    if (apiState === "" &&
      (this.type === CameraExperience.CardSingleSide ||
        this.type === CameraExperience.CardMultiSide))
      this.cardIdentityElement.classList.add("visible");
    else
      this.cardIdentityElement.classList.remove("visible");
  }
  /**
   * Change active camera.
   */
  async setActiveCamera(cameraId) {
    this.cameraToolbar.setActiveCamera(cameraId);
  }
  /**
   * Populate list of camera devices.
   */
  async populateCameraDevices() {
    await this.cameraToolbar.populateCameraDevices();
  }
  /**
   * Method is exposed outside which allow us to control Camera Flip state from parent component.
   */
  async setCameraFlipState(isFlipped) {
    this.cameraFlipped = isFlipped;
  }
  /**
   * Initializes Help Screens.
   */
  async initializeHelpScreens(callbacks) {
    this.helpScreens.initialize(callbacks);
  }
  /**
   * Opens Help Screens in the Onboarding mode.
   */
  async openHelpScreensOnboarding() {
    this.helpScreens.openOnboarding();
  }
  /**
   * Terminates Help Screens.
   */
  async terminateHelpScreens() {
    this.helpScreens.terminate();
  }
  /**
   * Set camera state which includes animation and message.
   */
  setState(state, isBackSide = false, force = false) {
    return new Promise((resolve) => {
      if (!force &&
        (!state || this.cameraStateInProgress || this.flipCameraStateInProgress)) {
        resolve();
        return;
      }
      if (state === CameraExperienceState.BarcodeScanning) {
        this.barcodeScanningInProgress = true;
      }
      this.cameraStateInProgress = true;
      let cameraStateChangeId = this.cameraStateChangeId + 1;
      this.cameraStateChangeId = cameraStateChangeId;
      if (state === CameraExperienceState.Flip) {
        this.flipCameraStateInProgress = true;
      }
      const stateClass = Utils.getStateClass(state);
      switch (this.type) {
        case CameraExperience.CardSingleSide:
        case CameraExperience.CardMultiSide:
          this.cameraCursorIdentityCardClassName = `reticle ${stateClass}`;
          break;
        case CameraExperience.Barcode:
          stateClass === "is-detection" && this.showScanningLine
            ? (this.scanningLineBarcodeClassName = "is-active")
            : (this.scanningLineBarcodeClassName = "");
          this.cameraCursorBarcodeClassName = `rectangle ${stateClass}`;
          break;
      }
      this.setMessage(state, isBackSide, this.type);
      window.setTimeout(() => {
        if (this.flipCameraStateInProgress &&
          state === CameraExperienceState.Flip) {
          this.flipCameraStateInProgress = false;
        }
        if (this.cameraStateChangeId === cameraStateChangeId) {
          this.cameraStateInProgress = false;
        }
        resolve();
      }, this.getCameraExperienceStateDuration(state));
    });
  }
  getCameraExperienceStateDuration(state) {
    return this.cameraExperienceStateDurations
      ? this.getStateDurationFromUserInput(state)
      : CameraExperienceStateDuration.get(state);
  }
  getStateDurationFromUserInput(state) {
    const cameraExperienceStateDurationMap = new Map(Object.entries(this.cameraExperienceStateDurations));
    const stateAdjusted = state[0].toLocaleLowerCase() + state.slice(1);
    const duration = cameraExperienceStateDurationMap.get(stateAdjusted);
    return duration || CameraExperienceStateDuration.get(state);
  }
  /**
   * Set camera state to initial method.
   */
  resetState() {
    return new Promise((resolve) => {
      // Reset flags
      this.cameraStateChangeId = 0;
      this.cameraStateInProgress = false;
      this.flipCameraStateInProgress = false;
      this.barcodeScanningInProgress = false;
      // Reset DOM
      while (this.cameraMessageIdentityCard.firstChild) {
        this.cameraMessageIdentityCard.removeChild(this.cameraMessageIdentityCard.firstChild);
      }
      while (this.cameraMessageBarcode.firstChild) {
        this.cameraMessageBarcode.removeChild(this.cameraMessageBarcode.firstChild);
      }
      resolve();
    });
  }
  flipCamera() {
    this.flipCameraAction.emit();
  }
  handleStop() {
    this.close.emit();
  }
  setMessage(state, isBackSide, type) {
    const message = this.getStateMessage(state, isBackSide, type);
    switch (type) {
      case CameraExperience.CardSingleSide:
      case CameraExperience.CardMultiSide:
        while (this.cameraMessageIdentityCard.firstChild) {
          this.cameraMessageIdentityCard.removeChild(this.cameraMessageIdentityCard.firstChild);
        }
        if (message) {
          this.cameraMessageIdentityCard.appendChild(message);
        }
        this.cameraMessageIdentityCardClassName =
          message && message !== null ? "message is-active" : "message";
        break;
      case CameraExperience.Barcode:
        while (this.cameraMessageBarcode.firstChild) {
          this.cameraMessageBarcode.removeChild(this.cameraMessageBarcode.firstChild);
        }
        if (this.showCameraFeedbackBarcodeMessage) {
          if (message) {
            this.cameraMessageBarcode.appendChild(message);
          }
          this.cameraMessageBarcode.setAttribute("class", message && message !== null ? "message is-active" : "message");
        }
        break;
      default:
      // Do nothing
    }
  }
  getStateMessage(state, isBackSide = false, type) {
    const getStateMessageAsHTML = (message) => {
      if (message) {
        const messageArray = typeof message === "string" ? [message] : message;
        const children = [];
        while (messageArray.length) {
          const sentence = messageArray.shift();
          children.push(document.createTextNode(sentence));
          if (messageArray.length) {
            children.push(document.createElement("br"));
          }
        }
        const spanElement = document.createElement("span");
        while (children.length) {
          spanElement.appendChild(children.shift());
        }
        return spanElement;
      }
    };
    switch (state) {
      case CameraExperienceState.Default:
        // Do not take this into consideration if passport is detected
        if (globalState.isPassport) {
          break;
        }
        if (type === CameraExperience.Barcode &&
          this.showCameraFeedbackBarcodeMessage) {
          return getStateMessageAsHTML(this.translationService.i("camera-feedback-barcode-message"));
        }
        const key = isBackSide
          ? "camera-feedback-scan-back"
          : "camera-feedback-scan-front";
        if (this.barcodeScanningInProgress) {
          return getStateMessageAsHTML(this.translationService.i("camera-feedback-barcode"));
        }
        return getStateMessageAsHTML(this.translationService.i(key));
      case CameraExperienceState.MoveFarther:
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-move-farther"));
      case CameraExperienceState.MoveCloser:
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-move-closer"));
      case CameraExperienceState.AdjustAngle:
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-adjust-angle"));
      case CameraExperienceState.GlareDetected:
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-glare"));
      case CameraExperienceState.BlurDetected: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-blur"));
      }
      case CameraExperienceState.WrongSide: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-wrong-side"));
      }
      case CameraExperienceState.MovePassportUp: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-move-top-page"));
      }
      case CameraExperienceState.MovePassportRight: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-move-right-page"));
      }
      case CameraExperienceState.MovePassportDown: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-move-bottom-page"));
      }
      case CameraExperienceState.MovePassportLeft: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-move-left-page"));
      }
      case CameraExperienceState.ScanPassportUp: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-scan-top-page"));
      }
      case CameraExperienceState.ScanPassportDown: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-scan-bottom-page"));
      }
      case CameraExperienceState.ScanPassportRight: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-scan-right-page"));
      }
      case CameraExperienceState.ScanPassportLeft: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-scan-left-page"));
      }
      case CameraExperienceState.MovePassportUpError: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-move-top-page"));
      }
      case CameraExperienceState.MovePassportDownError: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-move-bottom-page"));
      }
      case CameraExperienceState.MovePassportRightError: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-move-right-page"));
      }
      case CameraExperienceState.MovePassportLeftError: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-move-left-page"));
      }
      case CameraExperienceState.FacePhotoCovered: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-face-photo-covered"));
      }
      case CameraExperienceState.Flip:
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-flip"));
      case CameraExperienceState.BarcodeScanning:
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-barcode"));
      case CameraExperienceState.Classification:
      case CameraExperienceState.Detection:
        return type === CameraExperience.Barcode
          ? getStateMessageAsHTML(this.translationService.i("camera-feedback-barcode-message"))
          : null;
      case CameraExperienceState.Done:
      case CameraExperienceState.DoneAll:
      default:
        return null;
    }
  }
  handleChangeCameraDevice(camera) {
    this.changeCameraDevice.emit(camera);
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
    const parts = getWebComponentParts(this.hostEl.shadowRoot);
    this.hostEl.setAttribute("exportparts", parts.join(", "));
  }
  render() {
    return (h(Host, { class: classNames({ "no-overlay": !this.showOverlay }) }, h("div", { id: "barcode", class: classNames({
        visible: this.type === CameraExperience.Barcode,
      }) }, h("div", { class: "rectangle-container" }, h("div", { class: this.cameraCursorBarcodeClassName }, h("div", { class: "rectangle__cursor" }, h("div", { class: "rectangle__el" }), h("div", { class: "rectangle__el" }), h("div", { class: "rectangle__el" }), h("div", { class: "rectangle__el" }), h("div", { class: `scanning-line ${this.scanningLineBarcodeClassName}` }))), h("p", { class: "message", ref: (el) => (this.cameraMessageBarcode = el) }))), h("div", { id: "card-identity", ref: (el) => (this.cardIdentityElement = el), class: classNames({
        visible: this.type === CameraExperience.CardSingleSide ||
          this.type === CameraExperience.CardMultiSide,
      }) }, h("div", { class: "reticle-container" }, h("div", { class: this.cameraCursorIdentityCardClassName }, h("div", { class: "reticle__cursor" }, h("div", { class: "reticle__el" }), h("div", { class: "reticle__el" }), h("div", { class: "reticle__el" }), h("div", { class: "reticle__el" })), h("img", { class: "reticle__done", src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjk3MiAzMy40NkMyMC43MDk1IDMzLjQ2MDUgMjAuNDQ5NCAzMy40MDkyIDIwLjIwNjggMzMuMzA5QzE5Ljk2NDEgMzMuMjA4OCAxOS43NDM2IDMzLjA2MTYgMTkuNTU4IDMyLjg3NkwxMS4wNzQgMjQuMzlDMTAuODgyOSAyNC4yMDU2IDEwLjczMDMgMjMuOTg1MSAxMC42MjU0IDIzLjc0MTFDMTAuNTIwNCAyMy40OTcyIDEwLjQ2NSAyMy4yMzQ4IDEwLjQ2MjUgMjIuOTY5MkMxMC40NiAyMi43MDM3IDEwLjUxMDQgMjIuNDQwMyAxMC42MTA4IDIyLjE5NDRDMTAuNzExMiAyMS45NDg2IDEwLjg1OTYgMjEuNzI1MiAxMS4wNDcyIDIxLjUzNzNDMTEuMjM0OSAyMS4zNDkzIDExLjQ1ODEgMjEuMjAwNyAxMS43MDM4IDIxLjA5OTlDMTEuOTQ5NSAyMC45OTkyIDEyLjIxMjggMjAuOTQ4NCAxMi40Nzg0IDIwLjk1MDVDMTIuNzQzOSAyMC45NTI2IDEzLjAwNjQgMjEuMDA3NiAxMy4yNTA1IDIxLjExMjNDMTMuNDk0NiAyMS4yMTY5IDEzLjcxNTQgMjEuMzY5MSAxMy45IDIxLjU2TDIwLjk3IDI4LjYzTDMzLjcgMTUuOTA0QzM0LjA3NSAxNS41Mjg3IDM0LjU4MzggMTUuMzE3OCAzNS4xMTQzIDE1LjMxNzZDMzUuNjQ0OCAxNS4zMTc0IDM2LjE1MzcgMTUuNTI4IDM2LjUyOSAxNS45MDNDMzYuOTA0MyAxNi4yNzggMzcuMTE1MiAxNi43ODY4IDM3LjExNTQgMTcuMzE3M0MzNy4xMTU2IDE3Ljg0NzggMzYuOTA1IDE4LjM1NjcgMzYuNTMgMTguNzMyTDIyLjM4NiAzMi44NzZDMjIuMjAwNCAzMy4wNjE2IDIxLjk3OTkgMzMuMjA4OCAyMS43MzcyIDMzLjMwOUMyMS40OTQ2IDMzLjQwOTIgMjEuMjM0NSAzMy40NjA1IDIwLjk3MiAzMy40NloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=" })), h("p", { class: this.cameraMessageIdentityCardClassName, ref: (el) => (this.cameraMessageIdentityCard = el) }))), h("div", { class: "gradient-overlay bottom" }), h("mb-camera-toolbar", { "clear-is-camera-active": this.clearIsCameraActive, "show-close": this.apiState !== "error", "camera-flipped": this.cameraFlipped, onCloseEvent: () => this.handleStop(), onFlipEvent: () => this.flipCamera(), onChangeCameraDevice: (ev) => this.handleChangeCameraDevice(ev.detail), ref: (el) => (this.cameraToolbar = el) }), h("mb-help", { allow: this.allowHelpScreens, allowFab: this.allowHelpScreensFab, allowOnboarding: this.allowHelpScreensOnboarding, allowOnboardingPerpetuity: this.allowHelpScreensOnboardingPerpetuity, tooltipPauseTimeout: this.helpScreensTooltipPauseTimeout, translationService: this.translationService, ref: (el) => {
        this.helpScreens = el;
      } })));
  }
  static get is() { return "mb-camera-experience"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["mb-camera-experience.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["mb-camera-experience.css"]
    };
  }
  static get properties() {
    return {
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CameraExperience",
          "resolved": "CameraExperience.Barcode | CameraExperience.CardMultiSide | CameraExperience.CardSingleSide | CameraExperience.Passport | CameraExperience.PaymentCard",
          "references": {
            "CameraExperience": {
              "location": "import",
              "path": "../../../utils/data-structures"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Choose desired camera experience.\n\nEach experience type must be implemented in this component."
        },
        "attribute": "type",
        "reflect": false
      },
      "cameraExperienceStateDurations": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "CameraExperienceStateDurations",
          "resolved": "CameraExperienceStateDurations",
          "references": {
            "CameraExperienceStateDurations": {
              "location": "import",
              "path": "../../../utils/data-structures"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Configure camera experience state timeout durations"
        },
        "defaultValue": "null"
      },
      "showOverlay": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Unless specifically granted by your license key, you are not allowed to\nmodify or remove the Microblink logo displayed on the bottom of the camera\noverlay."
        },
        "attribute": "show-overlay",
        "reflect": false,
        "defaultValue": "true"
      },
      "translationService": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TranslationService",
          "resolved": "TranslationService",
          "references": {
            "TranslationService": {
              "location": "import",
              "path": "../../../utils/translation.service"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Instance of TranslationService passed from root component."
        }
      },
      "apiState": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Api state passed from root component."
        },
        "attribute": "api-state",
        "reflect": false
      },
      "cameraFlipped": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Camera horizontal state passed from root component.\n\nHorizontal camera image can be mirrored"
        },
        "attribute": "camera-flipped",
        "reflect": false,
        "defaultValue": "false"
      },
      "showScanningLine": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Show scanning line on camera"
        },
        "attribute": "show-scanning-line",
        "reflect": false,
        "defaultValue": "false"
      },
      "showCameraFeedbackBarcodeMessage": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Show camera feedback message on camera for Barcode scanning"
        },
        "attribute": "show-camera-feedback-barcode-message",
        "reflect": false,
        "defaultValue": "false"
      },
      "clearIsCameraActive": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "clear-is-camera-active",
        "reflect": false,
        "defaultValue": "false"
      },
      "allowHelpScreens": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Dictates if Help Screens usage is allowed (turned on)."
        },
        "attribute": "allow-help-screens",
        "reflect": false,
        "defaultValue": "false"
      },
      "allowHelpScreensFab": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "See description in public component."
        },
        "attribute": "allow-help-screens-fab",
        "reflect": false,
        "defaultValue": "false"
      },
      "allowHelpScreensOnboarding": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "See description in public component."
        },
        "attribute": "allow-help-screens-onboarding",
        "reflect": false,
        "defaultValue": "false"
      },
      "allowHelpScreensOnboardingPerpetuity": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "See description in public component."
        },
        "attribute": "allow-help-screens-onboarding-perpetuity",
        "reflect": false,
        "defaultValue": "false"
      },
      "helpScreensTooltipPauseTimeout": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "See description in public component."
        },
        "attribute": "help-screens-tooltip-pause-timeout",
        "reflect": false,
        "defaultValue": "15000"
      }
    };
  }
  static get states() {
    return {
      "cameraCursorBarcodeClassName": {},
      "cameraCursorIdentityCardClassName": {},
      "scanningLineBarcodeClassName": {},
      "cameraMessageIdentityCardContent": {},
      "cameraMessageIdentityCardClassName": {}
    };
  }
  static get events() {
    return [{
        "method": "close",
        "name": "close",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when user clicks on 'X' button."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "setIsCameraActive",
        "name": "setIsCameraActive",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when camera stream becomes active."
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }, {
        "method": "changeCameraDevice",
        "name": "changeCameraDevice",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when user selects a different camera device."
        },
        "complexType": {
          "original": "CameraEntry",
          "resolved": "CameraEntry",
          "references": {
            "CameraEntry": {
              "location": "import",
              "path": "../../../utils/data-structures"
            }
          }
        }
      }, {
        "method": "flipCameraAction",
        "name": "flipCameraAction",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when user clicks on Flip button."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "setActiveCamera": {
        "complexType": {
          "signature": "(cameraId: string) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Change active camera.",
          "tags": []
        }
      },
      "populateCameraDevices": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Populate list of camera devices.",
          "tags": []
        }
      },
      "setCameraFlipState": {
        "complexType": {
          "signature": "(isFlipped: boolean) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method is exposed outside which allow us to control Camera Flip state from parent component.",
          "tags": []
        }
      },
      "initializeHelpScreens": {
        "complexType": {
          "signature": "(callbacks: MbHelpCallbacks) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "MbHelpCallbacks": {
              "location": "import",
              "path": "../mb-help/mb-help.model"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Initializes Help Screens.",
          "tags": []
        }
      },
      "openHelpScreensOnboarding": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Opens Help Screens in the Onboarding mode.",
          "tags": []
        }
      },
      "terminateHelpScreens": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Terminates Help Screens.",
          "tags": []
        }
      },
      "setState": {
        "complexType": {
          "signature": "(state: CameraExperienceState, isBackSide?: boolean, force?: boolean) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "CameraExperienceState": {
              "location": "import",
              "path": "../../../utils/data-structures"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Set camera state which includes animation and message.",
          "tags": []
        }
      },
      "resetState": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Set camera state to initial method.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "hostEl"; }
  static get watchers() {
    return [{
        "propName": "apiState",
        "methodName": "apiStateHandler"
      }];
  }
}
