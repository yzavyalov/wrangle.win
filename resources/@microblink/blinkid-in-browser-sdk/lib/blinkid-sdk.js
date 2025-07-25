/*! ****************************************************************************
Copyright (c) Microblink. All rights reserved.

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
***************************************************************************** */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
let nextMessageID = 0;
function getNextMessageID() {
    const msgId = nextMessageID;
    nextMessageID = nextMessageID + 1;
    return msgId;
}
class BaseRequestMessage {
    constructor(action) {
        this.action = action;
        this.messageID = getNextMessageID();
    }
}
class InitMessage extends BaseRequestMessage {
    constructor(wasmLoadSettings, userId) {
        super(InitMessage.action);
        this.wasmModuleName = wasmLoadSettings.wasmModuleName;
        this.licenseKey = wasmLoadSettings.licenseKey;
        this.userId = userId;
        this.registerLoadCallback = wasmLoadSettings.loadProgressCallback !== null;
        this.allowHelloMessage = wasmLoadSettings.allowHelloMessage;
        this.engineLocation = wasmLoadSettings.engineLocation;
        this.wasmType = wasmLoadSettings.wasmType;
        this.initialMemory = wasmLoadSettings.initialMemory;
        this.blinkIDVariant = wasmLoadSettings.blinkIdVariant;
        this.numberOfWorkers = wasmLoadSettings.numberOfWorkers;
    }
}
InitMessage.action = "init";
var ParameterType;
(function (ParameterType) {
    ParameterType[ParameterType["Any"] = 0] = "Any";
    ParameterType[ParameterType["Recognizer"] = 1] = "Recognizer";
    ParameterType[ParameterType["RecognizerSettings"] = 2] = "RecognizerSettings";
    ParameterType[ParameterType["Callback"] = 3] = "Callback";
})(ParameterType || (ParameterType = {}));
class CreateNewRecognizer extends BaseRequestMessage {
    constructor(className, params) {
        super(CreateNewRecognizer.action);
        this.className = className;
        this.params = params;
    }
}
CreateNewRecognizer.action = "createNewNativeObject";
class CreateRecognizerRunner extends BaseRequestMessage {
    constructor(recognizerHandles, allowMultipleResults, registeredMetadataCallbacks) {
        super(CreateRecognizerRunner.action);
        this.recognizerHandles = recognizerHandles;
        this.allowMultipleResults = allowMultipleResults;
        this.registeredMetadataCallbacks = registeredMetadataCallbacks;
    }
}
CreateRecognizerRunner.action = "createRecognizerRunner";
class ReconfigureRecognizerRunner extends BaseRequestMessage {
    constructor(recognizerHandles, allowMultipleResults) {
        super(ReconfigureRecognizerRunner.action);
        this.recognizerHandles = recognizerHandles;
        this.allowMultipleResults = allowMultipleResults;
    }
}
ReconfigureRecognizerRunner.action = "reconfigureRecognizerRunner";
class DeleteRecognizerRunner extends BaseRequestMessage {
    constructor() {
        super(DeleteRecognizerRunner.action);
    }
}
DeleteRecognizerRunner.action = "deleteRecognizerRunner";
class InvokeObjectMethod extends BaseRequestMessage {
    constructor(objectHandle, methodName, params) {
        super(InvokeObjectMethod.action);
        this.objectHandle = objectHandle;
        this.methodName = methodName;
        this.params = params;
    }
}
InvokeObjectMethod.action = "invokeObject";
class ProcessImage extends BaseRequestMessage {
    constructor(image) {
        super(ProcessImage.action);
        this.frame = image;
    }
    getTransferrables() {
        return [this.frame.imageData.data.buffer];
    }
}
ProcessImage.action = "processImage";
class ResetRecognizers extends BaseRequestMessage {
    constructor(hardReset) {
        super(ResetRecognizers.action);
        this.hardReset = hardReset;
    }
}
ResetRecognizers.action = "resetRecognizers";
class RegisteredMetadataCallbacks {
    constructor() {
        this.onDebugText = false;
        this.onDetectionFailed = false;
        this.onQuadDetection = false;
        this.onPointsDetection = false;
        this.onFirstSideResult = false;
    }
}
class RegisterMetadataCallbacks extends BaseRequestMessage {
    constructor(registeredMetadataCallbacks) {
        super(RegisterMetadataCallbacks.action);
        this.registeredMetadataCallbacks = registeredMetadataCallbacks;
    }
}
RegisterMetadataCallbacks.action = "registerMetadataCallbacks";
class SetDetectionOnly extends BaseRequestMessage {
    constructor(detectionOnlyMode) {
        super(SetDetectionOnly.action);
        this.detectionOnlyMode = detectionOnlyMode;
    }
}
SetDetectionOnly.action = "setDetectionOnly";
class SetCameraPreviewMirrored extends BaseRequestMessage {
    constructor(cameraPreviewMirrored) {
        super(SetCameraPreviewMirrored.action);
        this.cameraPreviewMirrored = cameraPreviewMirrored;
    }
}
SetCameraPreviewMirrored.action = "setCameraPreviewMirrored";
class GetProductIntegrationInfo extends BaseRequestMessage {
    constructor(userId) {
        super(GetProductIntegrationInfo.action);
        this.userId = userId;
    }
}
GetProductIntegrationInfo.action = "getProductIntegrationInfo";
class SetPingProxyUrl extends BaseRequestMessage {
    constructor(pingProxyUrl) {
        super(SetPingProxyUrl.action);
        this.pingProxyUrl = pingProxyUrl;
    }
}
SetPingProxyUrl.action = "setPingProxyUrl";
class SetPingData extends BaseRequestMessage {
    constructor(data) {
        super(SetPingData.action);
        this.data = data;
    }
}
SetPingData.action = "setPingData";
// ===================================== /
// Metadata callback messages
// ===================================== /
var MetadataCallback;
(function (MetadataCallback) {
    MetadataCallback[MetadataCallback["onDebugText"] = 0] = "onDebugText";
    MetadataCallback[MetadataCallback["onDetectionFailed"] = 1] = "onDetectionFailed";
    MetadataCallback[MetadataCallback["onQuadDetection"] = 2] = "onQuadDetection";
    MetadataCallback[MetadataCallback["onPointsDetection"] = 3] = "onPointsDetection";
    MetadataCallback[MetadataCallback["onFirstSideResult"] = 4] = "onFirstSideResult";
    MetadataCallback[MetadataCallback["recognizerCallback"] = 5] = "recognizerCallback";
})(MetadataCallback || (MetadataCallback = {}));
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (WasmType) {
    /**
     * The WASM that will be loaded will be most compatible with all browsers that
     * support the WASM, but will lack features that could be used to improve performance.
     */
    WasmType["Basic"] = "BASIC";
    /**
     * The WASM that will be loaded will be built with advanced WASM features, such as
     * bulk memory, SIMD, non-trapping floating point and sign extension. Such WASM can only
     * be executed in browsers that support those features. Attempting to run this
     * WASM in a non-compatible browser will crash your app.
     */
    WasmType["Advanced"] = "ADVANCED";
    /**
     * The WASM that will be loaded will be build with advanced WASM features, just
     * like above. Additionally, it will be also built with support for multi-threaded
     * processing. This feature requires a browser with support for both advanced WASM
     * features and `SharedArrayBuffer`
     */
    WasmType["AdvancedWithThreads"] = "ADVANCED_WITH_THREADS";
})(exports.WasmType || (exports.WasmType = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
const defaultWasmModuleName = "BlinkIDWasmSDK";

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/* eslint-disable @typescript-eslint/no-explicit-any,
                  @typescript-eslint/no-unsafe-assignment */
class SDKError extends Error {
    constructor(error, details) {
        super();
        if (!error.code || !error.message) {
            throw new Error("Instance of SDKError is required to have code and message.");
        }
        this.message = error.message;
        this.code = error.code;
        if (error instanceof SerializableSDKError && error.details && "message" in error.details) {
            const errorObj = new Error(error.details.message);
            if ("stack" in error.details) {
                errorObj.stack = error.details.stack;
            }
            this.details = errorObj;
        }
        else {
            this.details = details;
        }
    }
}
class SerializableSDKError {
    constructor(error, details) {
        if (!error.code || !error.message) {
            throw new Error("Instance of SDKError is required to have code and message.");
        }
        this.message = error.message;
        this.code = error.code;
        if (details instanceof Error) {
            this.details = new CustomError(details);
        }
        else {
            this.details = details;
        }
    }
}
class CustomError {
    constructor(error) {
        this.message = error.message;
        this.name = error.name;
        this.stack = error.stack;
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Checks if provided string is valid secure URL without subpaths.
 * @param url URL to check.
 * @returns Boolean indicating if provided URL is valid.
 */
function isValidURL(url) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^https:\/\/[^\/]+(?::\d+)?\/?$/;
    return regex.test(url);
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (ErrorCodes) {
    ErrorCodes["WORKER_WASM_LOAD_FAILURE"] = "WORKER_WASM_LOAD_FAILURE";
    ErrorCodes["WORKER_WASM_INIT_MISSING"] = "WORKER_WASM_INIT_MISSING";
    ErrorCodes["WORKER_FUNCTION_INVOKE_FAILURE"] = "WORKER_FUNCTION_INVOKE_FAILURE";
    ErrorCodes["WORKER_RECOGNIZER_CREATION_FAILURE"] = "WORKER_RECOGNIZER_CREATION_FAILURE";
    ErrorCodes["WORKER_RUNNER_EXISTS"] = "WORKER_RUNNER_EXISTS";
    ErrorCodes["WORKER_RUNNER_CREATION_FAILURE"] = "WORKER_RUNNER_CREATION_FAILURE";
    ErrorCodes["WORKER_RUNNER_MISSING"] = "WORKER_RUNNER_MISSING";
    ErrorCodes["WORKER_RUNNER_RECONFIGURE_FAILURE"] = "WORKER_RUNNER_RECONFIGURE_FAILURE";
    ErrorCodes["WORKER_RUNNER_DELETED"] = "WORKER_RUNNER_DELETED";
    ErrorCodes["WORKER_RUNNER_DELETE_FAILURE"] = "WORKER_RUNNER_DELETE_FAILURE";
    ErrorCodes["WORKER_OBJECT_INVOKE_FAILURE"] = "WORKER_OBJECT_INVOKE_FAILURE";
    ErrorCodes["WORKER_IMAGE_PROCESS_FAILURE"] = "WORKER_IMAGE_PROCESS_FAILURE";
    ErrorCodes["WORKER_HANDLE_UNDEFINED"] = "WORKER_HANDLE_UNDEFINED";
    ErrorCodes["WORKER_MESSAGE_ACTION_UNKNOWN"] = "WORKER_MESSAGE_ACTION_UNKNOWN";
    ErrorCodes["WORKER_LICENSE_UNLOCK_ERROR"] = "WORKER_LICENSE_UNLOCK_ERROR";
    ErrorCodes["WORKER_INTEGRATION_INFO_FAILURE"] = "WORKER_INTEGRATION_INFO_FAILURE";
    ErrorCodes["LOCAL_SDK_RUNNER_MISSING"] = "LOCAL_SDK_RUNNER_MISSING";
    ErrorCodes["LOCAL_SDK_RUNNER_EMPTY"] = "LOCAL_SDK_RUNNER_EMPTY";
    ErrorCodes["LICENSE_UNLOCK_ERROR"] = "LICENSE_UNLOCK_ERROR";
    ErrorCodes["FRAME_CAPTURE_SVG_UNSUPPORTED"] = "FRAME_CAPTURE_SVG_UNSUPPORTED";
    ErrorCodes["FRAME_CAPTURE_CANVAS_MISSING"] = "FRAME_CAPTURE_CANVAS_MISSING";
    ErrorCodes["SDK_WASM_SETTINGS_MISSING"] = "SDK_WASM_SETTINGS_MISSING";
    ErrorCodes["SDK_LICENSE_KEY_MISSING"] = "SDK_LICENSE_KEY_MISSING";
    ErrorCodes["SDK_WASM_MODULE_NAME_MISSING"] = "SDK_WASM_MODULE_NAME_MISSING";
    ErrorCodes["SDK_ENGINE_LOCATION_INVALID"] = "SDK_ENGINE_LOCATION_INVALID";
    ErrorCodes["SDK_WORKER_LOCATION_INVALID"] = "SDK_WORKER_LOCATION_INVALID";
    ErrorCodes["SDK_MISSING"] = "SDK_MISSING";
    ErrorCodes["SDK_RECOGNIZERS_MISSING"] = "SDK_RECOGNIZERS_MISSING";
    ErrorCodes["VIDEO_RECOGNIZER_ELEMENT_MISSING"] = "VIDEO_RECOGNIZER_ELEMENT_MISSING";
    ErrorCodes["VIDEO_RECOGNIZER_CAMERA_MISSING"] = "VIDEO_RECOGNIZER_CAMERA_MISSING";
    ErrorCodes["VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED"] = "VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED";
    ErrorCodes["VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE"] = "VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE";
    ErrorCodes["VIDEO_RECOGNIZER_CAMERA_IN_USE"] = "VIDEO_RECOGNIZER_CAMERA_IN_USE";
    ErrorCodes["VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED"] = "VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED";
    ErrorCodes["VIDEO_RECOGNIZER_FEED_RELEASED"] = "VIDEO_RECOGNIZER_FEED_RELEASED";
    ErrorCodes["VIDEO_RECOGNIZER_FEED_NOT_PAUSED"] = "VIDEO_RECOGNIZER_FEED_NOT_PAUSED";
    ErrorCodes["VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED"] = "VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED";
    ErrorCodes["VIDEO_RECOGNIZER_FEED_PAUSED"] = "VIDEO_RECOGNIZER_FEED_PAUSED";
    ErrorCodes["VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE"] = "VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE";
    ErrorCodes["VIDEO_RECOGNIZER_FEED_MISSING"] = "VIDEO_RECOGNIZER_FEED_MISSING";
    ErrorCodes["INVALID_PING_PROXY_URL"] = "INVALID_PROXY_URL";
    ErrorCodes["PING_PROXY_PERMISSION_NOT_GRANTED"] = "PING_PROXY_PERMISSION_NOT_GRANTED";
    ErrorCodes["PING_DATA_KEYS_AMOUNT_EXCEEDED"] = "PING_DATA_KEYS_AMOUNT_EXCEEDED";
    ErrorCodes["PING_DATA_KEY_LENGTH_EXCEEDED"] = "PING_DATA_KEY_LENGTH_EXCEEDED";
    ErrorCodes["PING_DATA_VALUE_LENGTH_EXCEEDED"] = "PING_DATA_VALUE_LENGTH_EXCEEDED";
})(exports.ErrorCodes || (exports.ErrorCodes = {}));
(function (ErrorMessages) {
    ErrorMessages["WORKER_HANDLE_UNDEFINED"] = "Cannot find object with handle: undefined";
    ErrorMessages["WORKER_WASM_LOAD_FAILURE"] = "Failed to load WASM in web worker!";
    ErrorMessages["WORKER_WASM_INIT_MISSING"] = "WASM module is not initialized!";
    ErrorMessages["WORKER_FUNCTION_INVOKE_FAILURE"] = "Failed to invoke function!";
    ErrorMessages["WORKER_RECOGNIZER_CREATION_FAILURE"] = "Failed to create new recognizer!";
    ErrorMessages["WORKER_RUNNER_EXISTS"] = "Recognizer runner is already created! Multiple instances are not allowed!";
    ErrorMessages["WORKER_RUNNER_CREATION_FAILURE"] = "Failed to create new recognizer runner!";
    ErrorMessages["WORKER_RUNNER_MISSING"] = "Recognizer runner is not created! There is nothing to reconfigure!";
    ErrorMessages["WORKER_RUNNER_RECONFIGURE_FAILURE"] = "Failed to reconfigure recognizer runner!";
    ErrorMessages["WORKER_RUNNER_DELETED"] = "Recognizer runner is already deleted!";
    ErrorMessages["WORKER_RUNNER_DELETE_FAILURE"] = "Failed to delete recognizer runner!";
    ErrorMessages["WORKER_OBJECT_INVOKE_FAILURE"] = "Failed to invoke object!";
    ErrorMessages["WORKER_IMAGE_PROCESS_FAILURE"] = "Recognizer runner is not initialized! Cannot process image!";
    ErrorMessages["WORKER_INTEGRATION_INFO_FAILURE"] = "Failed to get product integration info!";
    ErrorMessages["LOCAL_SDK_RUNNER_MISSING"] = "Property nativeRecognizerRunner is not available!";
    ErrorMessages["LOCAL_SDK_RUNNER_EMPTY"] = "Native RecognizerRunner cannot be empty!";
    ErrorMessages["LICENSE_TOKEN_STATE_INCORRECT"] = "Internal error (Incorrect token state)";
    ErrorMessages["LICENSE_PAYLOAD_VERIFICATION_FAILED"] = "Failed to verify server permission's digital signature!";
    ErrorMessages["LICENSE_PAYLOAD_CORRUPTED"] = "Server permission payload is corrupted!";
    ErrorMessages["LICENSE_PERMISSION_EXPIRED"] = "Internal error (server permission expired)";
    ErrorMessages["LICENSE_REMOTE_LOCKED"] = "Provided license key has been remotely locked. Please contact support for more information!";
    ErrorMessages["FRAME_CAPTURE_SVG_UNSUPPORTED"] = "Recognition of SVG elements not supported!";
    ErrorMessages["FRAME_CAPTURE_CANVAS_MISSING"] = "Could not get canvas 2d context!";
    ErrorMessages["SDK_WASM_SETTINGS_MISSING"] = "Missing WASM load settings!";
    ErrorMessages["SDK_LICENSE_KEY_MISSING"] = "Missing license key!";
    ErrorMessages["SDK_WASM_MODULE_NAME_MISSING"] = "Missing WASM module name!";
    ErrorMessages["SDK_ENGINE_LOCATION_INVALID"] = "Setting property 'engineLocation' must be a string!";
    ErrorMessages["SDK_WORKER_LOCATION_INVALID"] = "Setting property 'workerLocation' must be a string!";
    ErrorMessages["SDK_MISSING"] = "SDK is not provided!";
    ErrorMessages["SDK_RECOGNIZERS_MISSING"] = "To create RecognizerRunner at least 1 recognizer is required.";
    ErrorMessages["VIDEO_RECOGNIZER_ELEMENT_MISSING"] = "Video element, i.e. camera feed is not provided!";
    ErrorMessages["VIDEO_RECOGNIZER_CAMERA_MISSING"] = "Camera not found!";
    ErrorMessages["VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED"] = "Camera not allowed!";
    ErrorMessages["VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE"] = "Camera not available!";
    ErrorMessages["VIDEO_RECOGNIZER_CAMERA_IN_USE"] = "Camera in use!";
    ErrorMessages["VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED"] = "Media devices not supported by browser.";
    ErrorMessages["VIDEO_RECOGNIZER_FEED_RELEASED"] = "The associated video feed has been released!";
    ErrorMessages["VIDEO_RECOGNIZER_FEED_NOT_PAUSED"] = "The associated video feed is not paused. Use resumeRecognition instead!";
    ErrorMessages["VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED"] = "The play() request was interrupted or prevented by browser security rules!";
    ErrorMessages["VIDEO_RECOGNIZER_FEED_PAUSED"] = "Cannot resume recognition while video feed is paused! Use recognize or startRecognition";
    ErrorMessages["VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE"] = "Could not reset recognizers!";
    ErrorMessages["VIDEO_RECOGNIZER_FEED_MISSING"] = "Missing video feed!";
    ErrorMessages["INVALID_PING_PROXY_URL"] = "Provided ping proxy URL is not a valid secure URL in format 'https://{host}:{port?}'.";
    ErrorMessages["PING_PROXY_PERMISSION_NOT_GRANTED"] = "Allow ping proxy permission not found in license.";
    ErrorMessages["PING_DATA_KEYS_AMOUNT_EXCEEDED"] = "Maximum number of ping data keys exceeded.";
    ErrorMessages["PING_DATA_KEY_LENGTH_EXCEEDED"] = "Ping data key is too long.";
    ErrorMessages["PING_DATA_VALUE_LENGTH_EXCEEDED"] = "Ping data value is too long.";
})(exports.ErrorMessages || (exports.ErrorMessages = {}));
const videoRecognizerErrors = {
    feedMissing: {
        message: exports.ErrorMessages.VIDEO_RECOGNIZER_FEED_MISSING,
        code: exports.ErrorCodes.VIDEO_RECOGNIZER_FEED_MISSING,
    },
    recognizersResetFailure: {
        message: exports.ErrorMessages.VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE,
        code: exports.ErrorCodes.VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE,
    },
    feedPaused: {
        message: exports.ErrorMessages.VIDEO_RECOGNIZER_FEED_PAUSED,
        code: exports.ErrorCodes.VIDEO_RECOGNIZER_FEED_PAUSED,
    },
    playRequestInterrupted: {
        message: exports.ErrorMessages.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED,
        code: exports.ErrorCodes.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED,
    },
    videoFeedNotPaused: {
        message: exports.ErrorMessages.VIDEO_RECOGNIZER_FEED_NOT_PAUSED,
        code: exports.ErrorCodes.VIDEO_RECOGNIZER_FEED_NOT_PAUSED,
    },
    videoFeedReleased: {
        message: exports.ErrorMessages.VIDEO_RECOGNIZER_FEED_RELEASED,
        code: exports.ErrorCodes.VIDEO_RECOGNIZER_FEED_RELEASED,
    },
    mediaDevicesUnsupported: {
        code: exports.ErrorCodes.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED,
        message: exports.ErrorMessages.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED,
    },
    cameraMissing: {
        code: exports.ErrorCodes.VIDEO_RECOGNIZER_CAMERA_MISSING,
        message: exports.ErrorMessages.VIDEO_RECOGNIZER_CAMERA_MISSING,
    },
    cameraNotAllowed: {
        code: exports.ErrorCodes.VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED,
        message: exports.ErrorMessages.VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED,
    },
    elementMissing: {
        message: exports.ErrorMessages.VIDEO_RECOGNIZER_ELEMENT_MISSING,
        code: exports.ErrorCodes.VIDEO_RECOGNIZER_ELEMENT_MISSING,
    },
};
const sdkErrors = {
    wasmSettingsMissing: {
        message: exports.ErrorMessages.SDK_WASM_SETTINGS_MISSING,
        code: exports.ErrorCodes.SDK_WASM_SETTINGS_MISSING,
    },
    licenseKeyMissing: {
        message: exports.ErrorMessages.SDK_LICENSE_KEY_MISSING,
        code: exports.ErrorCodes.SDK_LICENSE_KEY_MISSING,
    },
    wasmModuleNameMissing: {
        message: exports.ErrorMessages.SDK_WASM_MODULE_NAME_MISSING,
        code: exports.ErrorCodes.SDK_WASM_MODULE_NAME_MISSING,
    },
    engineLocationInvalid: {
        message: exports.ErrorMessages.SDK_ENGINE_LOCATION_INVALID,
        code: exports.ErrorCodes.SDK_ENGINE_LOCATION_INVALID,
    },
    workerLocationInvalid: {
        message: exports.ErrorMessages.SDK_WORKER_LOCATION_INVALID,
        code: exports.ErrorCodes.SDK_WORKER_LOCATION_INVALID,
    },
    missing: {
        message: exports.ErrorMessages.SDK_MISSING,
        code: exports.ErrorCodes.SDK_MISSING,
    },
    recognizersMissing: {
        message: exports.ErrorMessages.SDK_RECOGNIZERS_MISSING,
        code: exports.ErrorCodes.SDK_RECOGNIZERS_MISSING,
    },
};
const frameCaptureErrors = {
    svgUnsupported: {
        message: exports.ErrorMessages.FRAME_CAPTURE_SVG_UNSUPPORTED,
        code: exports.ErrorCodes.FRAME_CAPTURE_SVG_UNSUPPORTED,
    },
    canvasMissing: {
        message: exports.ErrorMessages.FRAME_CAPTURE_CANVAS_MISSING,
        code: exports.ErrorCodes.FRAME_CAPTURE_CANVAS_MISSING,
    },
};
const licenseErrors = {
    licenseTokenStateIncorrect: {
        code: exports.ErrorCodes.LICENSE_UNLOCK_ERROR,
        message: exports.ErrorMessages.LICENSE_TOKEN_STATE_INCORRECT,
    },
    licensePayloadVerificationFailed: {
        code: exports.ErrorCodes.LICENSE_UNLOCK_ERROR,
        message: exports.ErrorMessages.LICENSE_PAYLOAD_VERIFICATION_FAILED,
    },
    licensePayloadCorrupted: {
        code: exports.ErrorCodes.LICENSE_UNLOCK_ERROR,
        message: exports.ErrorMessages.LICENSE_PAYLOAD_CORRUPTED,
    },
    licensePermissionExpired: {
        code: exports.ErrorCodes.LICENSE_UNLOCK_ERROR,
        message: exports.ErrorMessages.LICENSE_PERMISSION_EXPIRED,
    },
    licenseRemoteLocked: {
        code: exports.ErrorCodes.LICENSE_UNLOCK_ERROR,
        message: exports.ErrorMessages.LICENSE_REMOTE_LOCKED,
    },
    licenseNetworkError: {
        code: exports.ErrorCodes.LICENSE_UNLOCK_ERROR,
    },
    licenseInvalid: {
        code: exports.ErrorCodes.LICENSE_UNLOCK_ERROR,
    },
};
const localSdkErrors = {
    runnerMissing: {
        message: exports.ErrorMessages.LOCAL_SDK_RUNNER_MISSING,
        code: exports.ErrorCodes.LOCAL_SDK_RUNNER_MISSING,
    },
    runnerEmpty: {
        message: exports.ErrorMessages.LOCAL_SDK_RUNNER_EMPTY,
        code: exports.ErrorCodes.LOCAL_SDK_RUNNER_EMPTY,
    },
};
const workerErrors = {
    imageProcessFailure: {
        message: exports.ErrorMessages.WORKER_IMAGE_PROCESS_FAILURE,
        code: exports.ErrorCodes.WORKER_IMAGE_PROCESS_FAILURE,
    },
    objectInvokeFailure: {
        message: exports.ErrorMessages.WORKER_OBJECT_INVOKE_FAILURE,
        code: exports.ErrorCodes.WORKER_OBJECT_INVOKE_FAILURE,
    },
    runnerDeleteFailure: {
        message: exports.ErrorMessages.WORKER_RUNNER_DELETE_FAILURE,
        code: exports.ErrorCodes.WORKER_RUNNER_DELETE_FAILURE,
    },
    runnerDeleted: {
        message: exports.ErrorMessages.WORKER_RUNNER_DELETED,
        code: exports.ErrorCodes.WORKER_RUNNER_DELETED,
    },
    runnerReconfigureFailure: {
        message: exports.ErrorMessages.WORKER_RUNNER_RECONFIGURE_FAILURE,
        code: exports.ErrorCodes.WORKER_RUNNER_RECONFIGURE_FAILURE,
    },
    runnerMissing: {
        message: exports.ErrorMessages.WORKER_RUNNER_MISSING,
        code: exports.ErrorCodes.WORKER_RUNNER_MISSING,
    },
    runnerCreationFailure: {
        message: exports.ErrorMessages.WORKER_RUNNER_CREATION_FAILURE,
        code: exports.ErrorCodes.WORKER_RUNNER_CREATION_FAILURE,
    },
    runnerExists: {
        message: exports.ErrorMessages.WORKER_RUNNER_EXISTS,
        code: exports.ErrorCodes.WORKER_RUNNER_EXISTS,
    },
    recognizerCreationFailure: {
        message: exports.ErrorMessages.WORKER_RECOGNIZER_CREATION_FAILURE,
        code: exports.ErrorCodes.WORKER_RECOGNIZER_CREATION_FAILURE,
    },
    functionInvokeFailure: {
        message: exports.ErrorMessages.WORKER_FUNCTION_INVOKE_FAILURE,
        code: exports.ErrorCodes.WORKER_FUNCTION_INVOKE_FAILURE,
    },
    wasmInitMissing: {
        message: exports.ErrorMessages.WORKER_WASM_INIT_MISSING,
        code: exports.ErrorCodes.WORKER_WASM_INIT_MISSING,
    },
    wasmLoadFailure: {
        message: exports.ErrorMessages.WORKER_WASM_LOAD_FAILURE,
        code: exports.ErrorCodes.WORKER_WASM_LOAD_FAILURE,
    },
    handleUndefined: {
        message: exports.ErrorMessages.WORKER_HANDLE_UNDEFINED,
        code: exports.ErrorCodes.WORKER_HANDLE_UNDEFINED,
    },
    integrationInfoFailure: {
        message: exports.ErrorMessages.WORKER_INTEGRATION_INFO_FAILURE,
        code: exports.ErrorCodes.WORKER_INTEGRATION_INFO_FAILURE,
    },
};
const pingErrors = {
    invalidProxyUrl: {
        message: exports.ErrorMessages.INVALID_PING_PROXY_URL,
        code: exports.ErrorCodes.INVALID_PING_PROXY_URL,
    },
    permissionNotGranted: {
        message: exports.ErrorMessages.PING_PROXY_PERMISSION_NOT_GRANTED,
        code: exports.ErrorCodes.PING_PROXY_PERMISSION_NOT_GRANTED,
    },
    dataKeysAmountExceeded: {
        message: exports.ErrorMessages.PING_DATA_KEYS_AMOUNT_EXCEEDED,
        code: exports.ErrorCodes.PING_DATA_KEYS_AMOUNT_EXCEEDED,
    },
    dataKeyLengthExceeded: {
        message: exports.ErrorMessages.PING_DATA_KEY_LENGTH_EXCEEDED,
        code: exports.ErrorCodes.PING_DATA_KEY_LENGTH_EXCEEDED,
    },
    dataValueLengthExceeded: {
        message: exports.ErrorMessages.PING_DATA_VALUE_LENGTH_EXCEEDED,
        code: exports.ErrorCodes.PING_DATA_VALUE_LENGTH_EXCEEDED,
    }
};

/* eslint-disable @typescript-eslint/no-unsafe-argument */
function defaultEventHandler(resolve, reject) {
    return (msg) => {
        const resultMsg = msg;
        if (resultMsg.success) {
            resolve();
        }
        else {
            if (typeof resultMsg.error === "string" || resultMsg.error === null) {
                reject(resultMsg.error);
            }
            else {
                reject(new SDKError(resultMsg.error));
            }
        }
    };
}
function defaultResultEventHandler(successResolver, reject) {
    return (msg) => {
        const resultMsg = msg;
        if (resultMsg.success) {
            successResolver(msg);
        }
        else {
            if (typeof resultMsg.error === "string" || resultMsg.error === null) {
                reject(resultMsg.error);
            }
            else {
                reject(new SDKError(resultMsg.error));
            }
        }
    };
}
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
function wrapParameters(params) {
    // convert params
    const wrappedPrameters = [];
    for (let param of params) {
        let paramType = ParameterType.Any;
        if (param instanceof RemoteRecognizer) {
            paramType = ParameterType.Recognizer;
            param = param.getRemoteObjectHandle();
        }
        wrappedPrameters.push({
            parameter: param,
            type: paramType
        });
    }
    return wrappedPrameters;
}
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
class RemoteRecognizer {
    /* eslint-enable lines-between-class-members */
    constructor(wasmWorker, recognizerName, remoteObjHandle) {
        this.wasmSDKWorker = wasmWorker;
        this.objectHandle = remoteObjHandle;
        this.recognizerName = recognizerName;
        this.callbacks = new Map();
    }
    /* eslint-enable @typescript-eslint/ban-types */
    getRemoteObjectHandle() {
        return this.objectHandle;
    }
    currentSettings() {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            const msg = new InvokeObjectMethod(this.objectHandle, "currentSettings", []);
            const handler = defaultResultEventHandler((msg) => {
                resolve(msg.result);
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    toSignedJSON() {
        {
            return new Promise((resolve, reject) => {
                if (this.objectHandle < 0) {
                    reject("Invalid object handle: " + this.objectHandle.toString());
                    return;
                }
                const msg = new InvokeObjectMethod(this.objectHandle, "toSignedJSON", []);
                const handler = defaultResultEventHandler((msg) => {
                    resolve(msg.result);
                }, reject);
                this.wasmSDKWorker.postMessage(msg, handler);
            });
        }
    }
    clearAllCallbacks() {
        this.callbacks.clear();
        this.wasmSDKWorker.unregisterRecognizerCallbacks(this.objectHandle);
    }
    /* eslint-disable @typescript-eslint/no-explicit-any,
                      @typescript-eslint/no-unsafe-assignment,
                      @typescript-eslint/no-unsafe-member-access,
                      @typescript-eslint/no-unsafe-return
    */
    // convert each function member into wrapped parameter, containing address where callback needs to be delivered
    removeFunctions(settings) {
        // clear any existing callbacks
        this.clearAllCallbacks();
        const keys = Object.keys(settings);
        let needsRegistering = false;
        for (const key of keys) {
            const data = settings[key];
            if (typeof data === "function") {
                this.callbacks.set(key, data);
                const wrappedFunction = {
                    parameter: {
                        recognizerHandle: this.objectHandle,
                        callbackName: key
                    }, // in order to know to which instance callback needs to be delivered
                    type: ParameterType.Callback
                };
                settings[key] = wrappedFunction;
                needsRegistering = true;
            }
        }
        if (needsRegistering) {
            this.wasmSDKWorker.registerRecognizerCallbacks(this.objectHandle, this);
        }
        return settings;
    }
    /* eslint-enable @typescript-eslint/no-explicit-any,
                     @typescript-eslint/no-unsafe-assignment,
                     @typescript-eslint/no-unsafe-member-access,
                     @typescript-eslint/no-unsafe-return
    */
    updateSettings(newSettings) {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            /* eslint-disable @typescript-eslint/no-unsafe-assignment */
            const msg = new InvokeObjectMethod(this.objectHandle, "updateSettings", [
                {
                    parameter: this.removeFunctions(newSettings),
                    type: ParameterType.RecognizerSettings
                }
            ]);
            /* eslint-enable @typescript-eslint/no-unsafe-assignment */
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    invokeCallback(callbackName, args) {
        const callback = this.callbacks.get(callbackName);
        if (callback !== undefined) {
            callback(...args);
        }
        else {
            console.warn("Cannot find callback", callbackName);
        }
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */
    getResult() {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            const msg = new InvokeObjectMethod(this.objectHandle, "getResult", []);
            const handler = defaultResultEventHandler((msg) => {
                resolve(msg.result);
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    delete() {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            this.clearAllCallbacks();
            const msg = new InvokeObjectMethod(this.objectHandle, "delete", []);
            const handler = defaultEventHandler(() => {
                this.objectHandle = -1;
                resolve();
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
}
function createRegisteredCallbacks(metadataCallbacks) {
    const msg = new RegisteredMetadataCallbacks();
    // https://stackoverflow.com/a/20093686/213057
    msg.onDebugText = !!metadataCallbacks.onDebugText;
    msg.onDetectionFailed = !!metadataCallbacks.onDetectionFailed;
    msg.onPointsDetection = !!metadataCallbacks.onPointsDetection;
    msg.onQuadDetection = !!metadataCallbacks.onQuadDetection;
    msg.onFirstSideResult = !!metadataCallbacks.onFirstSideResult;
    return msg;
}
class RemoteRecognizerRunner {
    constructor(wasmWorker, recognizers) {
        this.deleted = false;
        this.wasmSDKWorker = wasmWorker;
        this.recognizers = recognizers;
    }
    processImage(image) {
        return new Promise((resolve, reject) => {
            if (this.deleted) {
                reject("Recognizer runner is deleted. It cannot be used anymore!");
                return;
            }
            const msg = new ProcessImage(image);
            const handler = defaultResultEventHandler((response) => {
                const state = response.recognitionState;
                resolve(state);
            }, reject);
            this.wasmSDKWorker.postTransferrableMessage(msg, handler);
        });
    }
    reconfigureRecognizers(recognizers, allowMultipleResults) {
        return new Promise((resolve, reject) => {
            if (this.deleted) {
                reject("Recognizer runner is deleted. It cannot be used anymore!");
                return;
            }
            const recognizerHandles = getRecognizerHandles(recognizers);
            const msg = new ReconfigureRecognizerRunner(recognizerHandles, allowMultipleResults);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
            this.recognizers = recognizers;
        });
    }
    setMetadataCallbacks(metadataCallbacks) {
        return new Promise((resolve, reject) => {
            const msg = new RegisterMetadataCallbacks(createRegisteredCallbacks(metadataCallbacks));
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessageAndRegisterCallbacks(msg, metadataCallbacks, handler);
        });
    }
    resetRecognizers(hardReset) {
        return new Promise((resolve, reject) => {
            const msg = new ResetRecognizers(hardReset);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setDetectionOnlyMode(detectionOnly) {
        return new Promise((resolve, reject) => {
            const msg = new SetDetectionOnly(detectionOnly);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setPingProxyUrl(url) {
        if (!isValidURL(url)) {
            throw new SDKError(pingErrors.invalidProxyUrl);
        }
        return new Promise((resolve, reject) => {
            const msg = new SetPingProxyUrl(url);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setPingData(data) {
        return new Promise((resolve, reject) => {
            const msg = new SetPingData(data);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setCameraPreviewMirrored(mirrored) {
        return new Promise((resolve, reject) => {
            const msg = new SetCameraPreviewMirrored(mirrored);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    delete() {
        if (this.deleted) {
            return Promise.reject("Recognizer runner is already deleted.");
        }
        return new Promise((resolve, reject) => {
            const msg = new DeleteRecognizerRunner();
            const handler = defaultEventHandler(() => {
                this.deleted = true;
                resolve();
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
}
function getRecognizerHandles(remoteRecognizers) {
    const recognizerHandles = [];
    for (const remoteRecognizer of remoteRecognizers) {
        recognizerHandles.push(remoteRecognizer.getRemoteObjectHandle());
    }
    return recognizerHandles;
}
class WasmModuleWorkerProxy {
    constructor(wasmSDKWorker) {
        this.wasmSDKWorker = wasmSDKWorker;
    }
    createRecognizerRunner(recognizers, allowMultipleResults = false, metadataCallbacks = {}) {
        return new Promise((resolve, reject) => {
            const recognizerHandles = getRecognizerHandles(recognizers);
            const msg = new CreateRecognizerRunner(recognizerHandles, allowMultipleResults, createRegisteredCallbacks(metadataCallbacks));
            const handler = defaultEventHandler(() => {
                resolve(new RemoteRecognizerRunner(this.wasmSDKWorker, recognizers));
            }, reject);
            this.wasmSDKWorker.postMessageAndRegisterCallbacks(msg, metadataCallbacks, handler);
        });
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    newRecognizer(className, ...constructorArgs) {
        return new Promise((resolve, reject) => {
            const msg = new CreateNewRecognizer(className, wrapParameters(constructorArgs));
            const handler = defaultResultEventHandler((msg) => {
                const remoteRecognizer = new RemoteRecognizer(this.wasmSDKWorker, className, msg.objectHandle);
                resolve(remoteRecognizer);
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
}
class WasmSDKWorker {
    /* eslint-enable lines-between-class-members */
    constructor(worker, loadProgressCallback, userId, rejectHandler) {
        this.eventHandlers = {};
        this.metadataCallbacks = {};
        this.loadedWasmType = exports.WasmType.Basic; // will be updated after WASM gets loaded
        this.mbWasmWorker = worker;
        this.mbWasmWorker.onmessage = (event) => { this.handleWorkerEvent(event); };
        this.mbWasmWorker.onerror = () => {
            rejectHandler("Problem during initialization of worker file!");
            return;
        };
        this.mbWasmModule = new WasmModuleWorkerProxy(this);
        this.loadCallback = loadProgressCallback;
        this.recognizersWithCallbacks = new Map();
        this.userId = userId;
        this.showOverlay = false;
    }
    postMessage(message, eventHandler) {
        this.eventHandlers[message.messageID] = eventHandler;
        this.mbWasmWorker.postMessage(message);
    }
    postTransferrableMessage(message, eventHandler) {
        this.eventHandlers[message.messageID] = eventHandler;
        this.mbWasmWorker.postMessage(message, message.getTransferrables());
    }
    postMessageAndRegisterCallbacks(message, metadataCallbacks, eventHandler) {
        this.eventHandlers[message.messageID] = eventHandler;
        this.metadataCallbacks = metadataCallbacks;
        this.mbWasmWorker.postMessage(message);
    }
    registerRecognizerCallbacks(remoteRecognizerHandle, recognizer) {
        this.recognizersWithCallbacks.set(remoteRecognizerHandle, recognizer);
    }
    unregisterRecognizerCallbacks(remoteRecognizerHandle) {
        this.recognizersWithCallbacks.delete(remoteRecognizerHandle);
    }
    /**
     * Clean up the active instance of the SDK.
     *
     * It's not possible to use the SDK after this method is called.
     */
    delete() {
        this.mbWasmWorker.terminate();
    }
    getProductIntegrationInfo() {
        return new Promise((resolve, reject) => {
            const msg = new GetProductIntegrationInfo(this.userId);
            const handler = defaultResultEventHandler((msg) => {
                resolve(msg.result);
            }, reject);
            this.postMessage(msg, handler);
        });
    }
    handleWorkerEvent(event) {
        if ("isCallbackMessage" in event.data) {
            const msg = event.data;
            switch (msg.callbackType) {
                case MetadataCallback.onDebugText:
                    if (typeof this.metadataCallbacks.onDebugText === "function") {
                        this.metadataCallbacks.onDebugText(msg.callbackParameters[0]);
                    }
                    break;
                case MetadataCallback.onDetectionFailed:
                    if (typeof this.metadataCallbacks.onDetectionFailed === "function") {
                        this.metadataCallbacks.onDetectionFailed();
                    }
                    break;
                case MetadataCallback.onPointsDetection:
                    if (typeof this.metadataCallbacks.onPointsDetection === "function") {
                        this.metadataCallbacks.onPointsDetection(msg.callbackParameters[0]);
                    }
                    break;
                case MetadataCallback.onQuadDetection:
                    if (typeof this.metadataCallbacks.onQuadDetection === "function") {
                        this.metadataCallbacks.onQuadDetection(msg.callbackParameters[0]);
                    }
                    break;
                case MetadataCallback.onFirstSideResult:
                    if (typeof this.metadataCallbacks.onFirstSideResult === "function") {
                        this.metadataCallbacks.onFirstSideResult();
                    }
                    break;
                case MetadataCallback.recognizerCallback:
                    {
                        // first parameter is address, other parameters are callback parameters
                        const address = msg.callbackParameters.shift();
                        const recognizer = this.recognizersWithCallbacks.get(address.recognizerHandle);
                        if (recognizer !== undefined) {
                            recognizer.invokeCallback(address.callbackName, msg.callbackParameters);
                        }
                        else {
                            console.warn("Cannot find recognizer to deliver callback message. Maybe it's destroyed?", address);
                        }
                        break;
                    }
                default:
                    throw new Error(`Unknown callback type: ${MetadataCallback[msg.callbackType]}`);
            }
        }
        else if ("isLoadProgressMessage" in event.data) {
            const msg = event.data;
            if (typeof this.loadCallback === "function") {
                this.loadCallback(msg.progress);
            }
        }
        else {
            const msg = event.data;
            const eventHandler = this.eventHandlers[msg.messageID];
            delete this.eventHandlers[msg.messageID];
            eventHandler(msg);
        }
    }
    static async createWasmWorker(worker, wasmLoadSettings, userId) {
        return new Promise((resolve, reject) => {
            const wasmWorker = new WasmSDKWorker(worker, wasmLoadSettings.loadProgressCallback, userId, reject);
            const initMessage = new InitMessage(wasmLoadSettings, userId);
            const initEventHandler = defaultResultEventHandler((msg) => {
                const successMsg = msg;
                wasmWorker.showOverlay = successMsg.showOverlay;
                wasmWorker.loadedWasmType = successMsg.wasmType;
                resolve(wasmWorker);
            }, 
            /* eslint-disable @typescript-eslint/no-explicit-any */
            (error) => {
                if (wasmWorker && typeof wasmWorker.delete === "function") {
                    wasmWorker.delete();
                }
                reject(error);
            }
            /* eslint-enable @typescript-eslint/no-explicit-any */
            );
            wasmWorker.postMessage(initMessage, initEventHandler);
        });
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (PreferredCameraType) {
    /** Prefer back facing camera */
    PreferredCameraType[PreferredCameraType["BackFacingCamera"] = 0] = "BackFacingCamera";
    /** Prefer front facing camera */
    PreferredCameraType[PreferredCameraType["FrontFacingCamera"] = 1] = "FrontFacingCamera";
})(exports.PreferredCameraType || (exports.PreferredCameraType = {}));
// inspired by https://unpkg.com/browse/scandit-sdk@4.6.1/src/lib/cameraAccess.ts
const backCameraKeywords = [
    "rear",
    "back",
    "rück",
    "arrière",
    "trasera",
    "trás",
    "traseira",
    "posteriore",
    "posterior",
    "后面",
    "後面",
    "背面",
    "后置", // alternative
    "後置", // alternative
    "背置", // alternative
    "задней",
    "الخلفية",
    "후",
    "arka",
    "achterzijde",
    "หลัง",
    "baksidan",
    "bagside",
    "sau",
    "bak",
    "tylny",
    "takakamera",
    "belakang",
    "אחורית",
    "πίσω",
    "spate",
    "hátsó",
    "zadní",
    "darrere",
    "zadná",
    "задня",
    "stražnja",
    "belakang",
    "बैक"
];
const backDualWideCameraLocalizations = [
    "Cameră dublă cu obiectiv superangular spate",
    "מצלמה כפולה רחבה אחורית",
    "Артқы қос кең бұрышты камера",
    "Câmara grande angular dupla traseira",
    "Πίσω διπλή ευρεία κάμερα",
    "後置雙廣角鏡頭相機",
    "Задна двойна широкоъгълна камера",
    "Càmera dual posterior amb gran angular",
    "Zadná duálna širokouhlá kamera",
    "كاميرا خلفية مزدوجة عريضة",
    "Задняя двойная широкоугольная камера",
    "Задня здвоєна ширококутна камера",
    "Cámara amplia posterior doble",
    "Dwikamera Lebar Belakang",
    "Tylny dwuobiektywowy aparat szerokokątny",
    "Dubbel vidvinkelkamera på baksidan",
    "Back Dual Wide Camera",
    "Hátsó, kettős, széles látószögű kamera",
    "후면 듀얼 와이드 카메라",
    "Double caméra grand angle arrière",
    "Fotocamera doppia con grandangolo (posteriore)",
    "Double appareil photo grand angle arrière",
    "Zadní duální širokoúhlý fotoaparát",
    "Çift Geniş Kamera Arka Yüzü",
    "Laajakulmainen kaksoistakakamera",
    "Rückseitige Dual-Weitwinkelkamera",
    "बैक ड्युअल वाइड कैमरा",
    "后置双广角镜头",
    "Câmera Dupla Grande-Angular Traseira",
    "後置雙廣角相機",
    "กล้องคู่ด้านหลังมุมกว้าง",
    "Kamera Lebar Belakang Ganda",
    "Dobbelt vidvinkelkamera bak",
    "Camera kép rộng mặt sau",
    "Cámara trasera dual con gran angular",
    "背面デュアル広角カメラ",
    "Stražnja dvostruka široka kamera"
];
const backCameraLocalizations = [
    "후면 카메라",
    "後置相機",
    "Задна камера",
    "後置鏡頭",
    "Camera mặt sau",
    "Hátoldali kamera",
    "Cámara trasera",
    "Back Camera",
    "Kamera på baksidan",
    "Πίσω κάμερα",
    "Bagsidekamera",
    "Zadná kamera",
    "Fotocamera (posteriore)",
    "Câmara traseira",
    "מצלמה אחורית",
    "Takakamera",
    "Rückkamera",
    "Caméra arrière",
    "Zadní fotoaparát",
    "Артқы камера",
    "Tylny aparat",
    "बैक कैमरा",
    "Hátsó kamera",
    "Camera aan achterzijde",
    "Kamera Belakang",
    "Câmera Traseira",
    "Stražnja kamera",
    "الكاميرا الخلفية",
    "Càmera posterior",
    "Fotocamera posteriore",
    "Càmera del darrere",
    "กล้องด้านหลัง",
    "Cameră spate",
    "Kamera, bagside",
    "背面カメラ",
    "Задня камера",
    "Arka Kamera",
    "后置相机",
    "Камера на задней панели",
    "后置镜头",
    "Kamera bak",
    "Задняя камера",
    "Aparat tylny",
    "Kamera på baksiden",
    "Câmera de Trás"
];
const isAndroidDevice = () => {
    const u = navigator.userAgent;
    return !!u.match(/Android/i);
};
const isIOSDevice = () => {
    const u = navigator.userAgent;
    return !!u.match(/iPhone/i);
};
const isMobileDevice = () => {
    return isAndroidDevice() || isIOSDevice();
};
function isBackCameraLabel(label) {
    const lowercaseLabel = label.toLowerCase();
    return backCameraKeywords.some(keyword => lowercaseLabel.includes(keyword));
}
class SelectedCamera {
    constructor(mdi, facing, label) {
        this.deviceId = mdi.deviceId;
        this.facing = facing;
        this.groupId = mdi.groupId;
        // apply custom label
        if (label) {
            this.label = label;
        }
        else {
            this.label = mdi.label;
        }
    }
}
async function getCameraDevices() {
    const frontCameras = [];
    const backCameras = [];
    let devices = await navigator.mediaDevices.enumerateDevices();
    // if permission is not given, label of video devices will be empty string
    if (devices.filter(device => device.kind === "videoinput").every(device => device.label === "")) {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: "environment" }
            },
            audio: false
        });
        // enumerate devices again - now the label field should be non-empty, as we have a stream active
        // (even if we didn't get persistent permission for camera)
        devices = await navigator.mediaDevices.enumerateDevices();
        // close the stream, as we don't need it anymore
        stream.getTracks().forEach(track => track.stop());
    }
    const cameras = devices.filter(device => device.kind === "videoinput");
    let backCameraIterator = 0;
    let frontCameraIterator = 0;
    for (const camera of cameras) {
        // phone back camera
        if (isBackCameraLabel(camera.label)) {
            backCameraIterator++;
            let backLabel = undefined;
            // we apply a custom label on Android devices
            if (isAndroidDevice()) {
                backLabel = `Back camera ${backCameraIterator}`;
            }
            backCameras.push(new SelectedCamera(camera, exports.PreferredCameraType.BackFacingCamera, backLabel));
        }
        else 
        // front camera or non-phone camera
        {
            frontCameraIterator++;
            let frontLabel = undefined;
            if (isAndroidDevice()) {
                // we apply a custom label on Android devices
                frontLabel = `Front camera ${frontCameraIterator}`;
            }
            frontCameras.push(new SelectedCamera(camera, exports.PreferredCameraType.FrontFacingCamera, frontLabel));
        }
    }
    return {
        frontCameras,
        backCameras
    };
}
async function selectCamera(cameraId, preferredCameraType) {
    const { frontCameras, backCameras } = await getCameraDevices();
    if (!frontCameras.length && !backCameras.length) {
        return null;
    }
    // Picks camera based on the provided device id, if user provided device id up front
    if (cameraId) {
        let cameraDevice;
        cameraDevice = frontCameras.find(device => device.deviceId === cameraId);
        if (!cameraDevice) {
            cameraDevice = backCameras.find(device => device.deviceId === cameraId);
        }
        return cameraDevice || null;
    }
    let cameraDevice = null;
    if (isIOSDevice() && preferredCameraType === exports.PreferredCameraType.BackFacingCamera) {
        // If device is an iOS and preferred camera is back facing
        // pick camera which matches the localized 'Back Dual Wide Camera'
        let selectedCamera = backCameras.find(camera => backDualWideCameraLocalizations.includes(camera.label));
        if (!selectedCamera) {
            selectedCamera = backCameras.find(camera => backCameraLocalizations.includes(camera.label));
        }
        if (selectedCamera) {
            cameraDevice = selectedCamera;
        }
    }
    else if (isAndroidDevice() && preferredCameraType === exports.PreferredCameraType.BackFacingCamera) {
        let bestCameraDevice = {
            deviceId: "",
            score: -1,
        };
        const calculateScore = (hasTorch, hasSingleShot) => {
            let score = 0;
            if (hasTorch)
                score++;
            if (hasSingleShot)
                score++;
            return score;
        };
        for (const backFacingCamera of backCameras) {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: backFacingCamera.deviceId,
                    width: 1920,
                    height: 1080,
                },
            });
            if ("getCapabilities" in mediaStream.getVideoTracks()[0]) {
                const capabilities = mediaStream.getVideoTracks()[0].getCapabilities();
                // @ts-expect-error Property will exist on object
                const hasTorch = Boolean(capabilities.torch);
                // @ts-expect-error Property will exist on object
                const hasSingleShot = capabilities.focusMode?.includes("single-shot");
                const cameraScore = calculateScore(hasTorch, hasSingleShot);
                if (cameraScore > bestCameraDevice.score) {
                    bestCameraDevice = {
                        deviceId: backFacingCamera.deviceId,
                        score: cameraScore,
                    };
                }
            }
            closeStreamTracks(mediaStream);
        }
        cameraDevice = backCameras.find(camera => camera.deviceId === bestCameraDevice.deviceId) || null;
    }
    if (cameraDevice === null) {
        // Case where camera device is still not found, so we revert back to "old" logic
        // Decide from which array the camera will be selected
        let cameraPool = (backCameras.length > 0 ? backCameras : frontCameras);
        // If there is at least one back facing camera and user prefers back facing camera, use that as a selection pool
        if (preferredCameraType === exports.PreferredCameraType.BackFacingCamera && backCameras.length > 0) {
            cameraPool = backCameras;
        }
        // If there is at least one front facing camera and is preferred by user, use that as a selection pool
        if (preferredCameraType === exports.PreferredCameraType.FrontFacingCamera && frontCameras.length > 0) {
            cameraPool = frontCameras;
        }
        // Sort camera pool by label
        cameraPool = cameraPool.sort((camera1, camera2) => camera1.label.localeCompare(camera2.label));
        // Check if cameras are labeled with resolution information, take the higher-resolution one in that case
        // Otherwise pick the last camera (Samsung wide on most Android devices)
        let selectedCameraIndex = cameraPool.length - 1;
        // Gets camera resolutions from the device name, if exists
        const cameraResolutions = cameraPool.map(camera => {
            const regExp = RegExp(/\b([0-9]+)MP?\b/, "i");
            const match = regExp.exec(camera.label);
            if (match !== null) {
                return parseInt(match[1], 10);
            }
            else {
                return NaN;
            }
        });
        // Picks camera  based on highest resolution in the name
        if (!cameraResolutions.some(cameraResolution => isNaN(cameraResolution))) {
            selectedCameraIndex = cameraResolutions.lastIndexOf(Math.max(...cameraResolutions));
        }
        return cameraPool[selectedCameraIndex];
    }
    return cameraDevice;
}
const closeStreamTracks = (stream) => {
    const tracks = stream.getTracks();
    for (const track of tracks) {
        track.stop();
    }
};
/**
 * Bind camera device to video feed (HTMLVideoElement).
 *
 * This function will return `true` in case that video feed of camera device has been flipped,
 * and `false` otherwise.
 *
 * @param camera                Camera device which should be binded with the video element.
 * @param videoFeed             HTMLVideoElement to which camera device should be binded.
 * @param preferredCameraType   Enum representing whether to use front facing or back facing camera.
 */
async function bindCameraToVideoFeed(camera, videoFeed, preferredCameraType = exports.PreferredCameraType.BackFacingCamera) {
    const constraints = {
        audio: false,
        video: {
            width: {
                min: 640,
                ideal: 1920,
                max: 1920,
            },
            height: {
                min: 480,
                ideal: 1080,
                max: 1080
            }
        }
    };
    if (camera.deviceId === "") {
        const isPreferredBackFacing = preferredCameraType === exports.PreferredCameraType.BackFacingCamera;
        constraints.video.facingMode =
            {
                ideal: isPreferredBackFacing ? "environment" : "user"
            };
    }
    else {
        constraints.video.deviceId =
            {
                exact: camera.deviceId
            };
    }
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoFeed.controls = false;
    videoFeed.srcObject = stream;
    let cameraFlipped = false;
    if (camera.facing === exports.PreferredCameraType.FrontFacingCamera) {
        cameraFlipped = true;
    }
    return cameraFlipped;
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (ImageOrientation) {
    /**
     * Image contents are rotated 90 degrees left.
     * This usually happens on mobile devices when capturing image while
     * device is held in "portrait" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    ImageOrientation[ImageOrientation["RotatedLeft90"] = 0] = "RotatedLeft90";
    /**
     * Image contents are not rotated in any manner.
     * This is the default for images captured using HTML canvas, as
     * used in FrameCapture class.
     * This orientation also usually happens on mobile devices when capturing
     * image while device is held in "landscape" orientation, while device
     * camera sensor is mounted horizontally (i.e. also in same orientation).
     */
    ImageOrientation[ImageOrientation["NoRotation"] = 1] = "NoRotation";
    /**
     * Image contents are rotated 90 degrees right.
     * This usually happens on mobile devices when capturing image while
     * device is held in "reverse-portrait" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    ImageOrientation[ImageOrientation["RotatedRight90"] = 2] = "RotatedRight90";
    /**
     * Image contents are rotated 180 degrees, i.e. image contents are "upside down".
     * This usually happens on mobile devices when capturing image while
     * device is held in "reverse-landscape" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    ImageOrientation[ImageOrientation["Rotated180"] = 3] = "Rotated180";
})(exports.ImageOrientation || (exports.ImageOrientation = {}));
(function (RecognizerResultState) {
    /** Nothing has been recognized. */
    RecognizerResultState[RecognizerResultState["Empty"] = 0] = "Empty";
    /** Something has been recognized, but some mandatory data is still missing. */
    RecognizerResultState[RecognizerResultState["Uncertain"] = 1] = "Uncertain";
    /** All required data has been recognized. */
    RecognizerResultState[RecognizerResultState["Valid"] = 2] = "Valid";
    /** Single stage of a multi-stage recognition is finished. */
    RecognizerResultState[RecognizerResultState["StageValid"] = 3] = "StageValid";
})(exports.RecognizerResultState || (exports.RecognizerResultState = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Checks if browser is supported by the SDK. The minimum requirements for the browser is
 * the support for WebAssembly. If your browser does not support executing WebAssembly,
 * this function will return `false`.
 */
function isBrowserSupported() {
    // based on https://stackoverflow.com/a/47880734
    try {
        if (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function") {
            const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
            if (module instanceof WebAssembly.Module)
                return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
        }
    }
    catch (ignored) {
        return false;
    }
    return false;
}
/**
 * Check if current browser is in-app / embedded.
 * Detects Instagram, Facebook, LinkedIn, Twitter, WeChat, Whatsapp, and Tiktok.
 * @returns Boolean whether the browser is in-app or not
 */
function isInAppBrowser() {
    const inAppRegex = /(instagram|fbav|linkedinapp|twitter|micromessenger|whatsapp|tiktok)[/\s]?([\w.]*)/i;
    const userAgent = navigator.userAgent || navigator.vendor;
    return !!inAppRegex.exec(userAgent);
}
/**
 * Check if browser supports ES6, which is prerequisite for this SDK to execute.
 *
 * IMPORTANT: it's not possible to run this function from MicroblinkSDK if browser doesn't support
 * ES6 since this file won't be able to load.
 *
 * This function is here as a placeholder so it can be copied to standalone JS file or directly into 'index.html'.
 */
// export function isES6Supported(): boolean
// {
//     if ( typeof Symbol === "undefined" )
//     {
//         return false;
//     }
//     try
//     {
//         eval( "class Foo {}" );
//         eval( "var bar = (x) => x+1" );
//     }
//     catch ( e )
//     {
//         return false;
//     }
//     return true;
// }

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (DocumentSide) {
    DocumentSide[DocumentSide["Front"] = 0] = "Front";
    DocumentSide[DocumentSide["Back"] = 1] = "Back";
})(exports.DocumentSide || (exports.DocumentSide = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
// ============================================ /
// Frame capture and camera management support. /
// ============================================ /
let canvas;
let ctx;
/**
 * Represents a captured frame from HTMLVideoElement.
 */
class CapturedFrame {
    constructor(imageData, orientation, videoFrame) {
        // workaround for memory leak: https://github.com/ivancuric/memory-leak-repro
        const fakeImageData = {
            data: imageData.data,
            width: imageData.width,
            height: imageData.height,
            colorSpace: imageData.colorSpace,
        };
        this.imageData = fakeImageData;
        this.orientation = orientation;
        this.videoFrame = videoFrame;
    }
}
/**
 * Captures a frame from any CanvasImageSource, such as HTMLVideoElement or HTMLImageElement.
 * @param imageSource image source from which frame should be captured
 * @returns instance of CapturedFrame
 */
function captureFrame(imageSource) {
    let imageWidth;
    let imageHeight;
    let videoFrame = false;
    if (imageSource instanceof HTMLVideoElement) {
        imageWidth = imageSource.videoWidth;
        imageHeight = imageSource.videoHeight;
        videoFrame = true;
    }
    else if (imageSource instanceof HTMLImageElement) {
        imageWidth = imageSource.naturalWidth;
        imageHeight = imageSource.naturalHeight;
    }
    else if (imageSource instanceof SVGImageElement) {
        throw new SDKError(frameCaptureErrors.svgUnsupported);
    }
    else if (imageSource instanceof VideoFrame) {
        // eslint is being stupid here, it's a VideoFrame object
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        imageWidth = imageSource.displayWidth;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        imageHeight = imageSource.displayHeight;
    }
    else {
        imageWidth = imageSource.width;
        imageHeight = imageSource.height;
    }
    canvas = canvas || document.createElement("canvas");
    if (canvas.width !== imageWidth && canvas.height !== imageHeight) {
        canvas.width = imageWidth;
        canvas.height = imageHeight;
    }
    ctx = ctx || canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
        throw new SDKError(frameCaptureErrors.canvasMissing);
    }
    ctx.drawImage(imageSource, 0, 0, canvas.width, canvas.height);
    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return new CapturedFrame(pixelData, 
    // TODO: https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
    // or https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation
    exports.ImageOrientation.NoRotation, videoFrame);
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (LicenseTokenState) {
    LicenseTokenState[LicenseTokenState["Invalid"] = 0] = "Invalid";
    LicenseTokenState[LicenseTokenState["RequiresServerPermission"] = 1] = "RequiresServerPermission";
    LicenseTokenState[LicenseTokenState["Valid"] = 2] = "Valid";
})(exports.LicenseTokenState || (exports.LicenseTokenState = {}));
(function (LicenseErrorType) {
    LicenseErrorType["LicenseTokenStateInvalid"] = "LICENSE_TOKEN_STATE_INVALID";
    LicenseErrorType["NetworkError"] = "NETWORK_ERROR";
    LicenseErrorType["RemoteLock"] = "REMOTE_LOCK";
    LicenseErrorType["PermissionExpired"] = "PERMISSION_EXPIRED";
    LicenseErrorType["PayloadCorrupted"] = "PAYLOAD_CORRUPTED";
    LicenseErrorType["PayloadSignatureVerificationFailed"] = "PAYLOAD_SIGNATURE_VERIFICATION_FAILED";
    LicenseErrorType["IncorrectTokenState"] = "INCORRECT_TOKEN_STATE";
})(exports.LicenseErrorType || (exports.LicenseErrorType = {}));
const baltazar = "https://baltazar.microblink.com/api/v2/status/check";
function toBaltazarRequest(unlockResult) {
    return {
        licenseId: unlockResult.licenseId,
        licensee: unlockResult.licensee,
        applicationIds: unlockResult.applicationIds,
        packageName: unlockResult.packageName,
        platform: "Browser",
        sdkName: unlockResult.sdkName,
        sdkVersion: unlockResult.sdkVersion
    };
}
function shouldShowOverlay(isTrial, allowRemoveDemoOverlay, allowRemoveProductionOverlay) {
    if (isTrial && allowRemoveDemoOverlay) {
        return false;
    }
    if (!isTrial && allowRemoveProductionOverlay) {
        return false;
    }
    return true;
}
(function (ServerPermissionSubmitResultStatus) {
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["Ok"] = 0] = "Ok";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["NetworkError"] = 1] = "NetworkError";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["RemoteLock"] = 2] = "RemoteLock";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["PermissionExpired"] = 3] = "PermissionExpired";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["PayloadCorrupted"] = 4] = "PayloadCorrupted";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["PayloadSignatureVerificationFailed"] = 5] = "PayloadSignatureVerificationFailed";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["IncorrectTokenState"] = 6] = "IncorrectTokenState";
})(exports.ServerPermissionSubmitResultStatus || (exports.ServerPermissionSubmitResultStatus = {}));
/* eslint-disable @typescript-eslint/no-explicit-any,
                  @typescript-eslint/explicit-module-boundary-types,
                  @typescript-eslint/no-unsafe-member-access,
                  @typescript-eslint/no-unsafe-call
*/
async function obtainNewServerPermission(unlockResult, wasmModule) {
    // request permission from Baltazar service
    try {
        const response = await fetch(baltazar, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-cache",
            body: JSON.stringify(toBaltazarRequest(unlockResult))
        });
        if (response.ok) {
            const serverPermission = (await response.text()).toString();
            const result = wasmModule.submitServerPermission(serverPermission);
            return result;
        }
        else {
            return {
                status: exports.ServerPermissionSubmitResultStatus.NetworkError,
                lease: 0,
                networkErrorDescription: `Server responded with status ${response.status}`
            };
        }
    }
    catch (error) {
        return {
            status: exports.ServerPermissionSubmitResultStatus.NetworkError,
            lease: 0,
            networkErrorDescription: `Unexpected error: ${JSON.stringify(error)}`
        };
    }
}
async function unlockWasmSDK(licenseKey, allowHelloMessage, userId, wasmModule) {
    const unlockResult = wasmModule.initializeWithLicenseKey(licenseKey, userId, allowHelloMessage);
    switch (unlockResult.unlockResult) {
        case exports.LicenseTokenState.Invalid:
            return {
                error: new SDKError({
                    ...licenseErrors.licenseInvalid,
                    message: unlockResult.licenseError
                }, {
                    type: exports.LicenseErrorType.LicenseTokenStateInvalid,
                }),
            };
        case exports.LicenseTokenState.Valid:
            return {
                error: null,
                showOverlay: shouldShowOverlay(unlockResult.isTrial, unlockResult.allowRemoveDemoOverlay, unlockResult.allowRemoveProductionOverlay)
            };
        case exports.LicenseTokenState.RequiresServerPermission:
            {
                const serverPermission = await obtainNewServerPermission(unlockResult, wasmModule);
                switch (serverPermission.status) {
                    case exports.ServerPermissionSubmitResultStatus.Ok:
                        return {
                            error: null,
                            lease: serverPermission.lease
                        };
                    case exports.ServerPermissionSubmitResultStatus.NetworkError:
                        {
                            let additionalInfo = "";
                            if (serverPermission.networkErrorDescription) {
                                additionalInfo = " " + serverPermission.networkErrorDescription;
                            }
                            return {
                                error: new SDKError({
                                    ...licenseErrors.licenseNetworkError,
                                    message: "There has been a network error while obtaining the server permission!"
                                        + additionalInfo
                                }, {
                                    type: exports.LicenseErrorType.NetworkError,
                                })
                            };
                        }
                    case exports.ServerPermissionSubmitResultStatus.RemoteLock:
                        return {
                            error: new SDKError(licenseErrors.licenseRemoteLocked, {
                                type: exports.LicenseErrorType.RemoteLock,
                            }),
                            lease: serverPermission.lease
                        };
                    case exports.ServerPermissionSubmitResultStatus.PermissionExpired:
                        return {
                            error: new SDKError(licenseErrors.licensePermissionExpired, {
                                type: exports.LicenseErrorType.PermissionExpired
                            }),
                            lease: serverPermission.lease
                        };
                    case exports.ServerPermissionSubmitResultStatus.PayloadCorrupted:
                        return {
                            error: new SDKError(licenseErrors.licensePayloadCorrupted, {
                                type: exports.LicenseErrorType.PayloadCorrupted
                            }),
                            lease: serverPermission.lease
                        };
                    case exports.ServerPermissionSubmitResultStatus.PayloadSignatureVerificationFailed:
                        return {
                            error: new SDKError(licenseErrors.licensePayloadVerificationFailed, {
                                type: exports.LicenseErrorType.PayloadSignatureVerificationFailed
                            }),
                            lease: serverPermission.lease
                        };
                    case exports.ServerPermissionSubmitResultStatus.IncorrectTokenState:
                        return {
                            error: new SDKError(licenseErrors.licenseTokenStateIncorrect, {
                                type: exports.LicenseErrorType.IncorrectTokenState
                            }),
                            lease: serverPermission.lease
                        };
                }
            }
    }
}
/* eslint-enable @typescript-eslint/no-explicit-any,
                 @typescript-eslint/explicit-module-boundary-types,
                 @typescript-eslint/no-unsafe-member-access,
                 @typescript-eslint/no-unsafe-call
*/

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (DetectionStatus) {
    /** Detection has failed. */
    DetectionStatus[DetectionStatus["Failed"] = 0] = "Failed";
    /** Document has been detected. */
    DetectionStatus[DetectionStatus["Success"] = 1] = "Success";
    /** Document has been detected but the camera is too far from the document. */
    DetectionStatus[DetectionStatus["CameraTooFar"] = 2] = "CameraTooFar";
    /** Document has been detected but the camera is too close to the document. */
    DetectionStatus[DetectionStatus["CameraTooClose"] = 3] = "CameraTooClose";
    /** Document has been detected but the camera’s angle is too steep. */
    DetectionStatus[DetectionStatus["CameraAngleTooSteep"] = 4] = "CameraAngleTooSteep";
    /** Document has been detected but the document is too close to the camera edge. */
    DetectionStatus[DetectionStatus["DocumentTooCloseToCameraEdge"] = 5] = "DocumentTooCloseToCameraEdge";
    /** Only part of the document is visible. */
    DetectionStatus[DetectionStatus["DocumentPartiallyVisible"] = 6] = "DocumentPartiallyVisible";
    /** Fallback detection was successful (PhotoPay specific). */
    DetectionStatus[DetectionStatus["FallbackSuccess"] = 7] = "FallbackSuccess";
})(exports.DetectionStatus || (exports.DetectionStatus = {}));

class AbortError extends Error {
  constructor() {
    super('Throttled function aborted');
    this.name = 'AbortError';
  }
}
function pThrottle({
  limit,
  interval,
  strict
}) {
  if (!Number.isFinite(limit)) {
    throw new TypeError('Expected `limit` to be a finite number');
  }
  if (!Number.isFinite(interval)) {
    throw new TypeError('Expected `interval` to be a finite number');
  }
  const queue = new Map();
  let currentTick = 0;
  let activeCount = 0;
  function windowedDelay() {
    const now = Date.now();
    if (now - currentTick > interval) {
      activeCount = 1;
      currentTick = now;
      return 0;
    }
    if (activeCount < limit) {
      activeCount++;
    } else {
      currentTick += interval;
      activeCount = 1;
    }
    return currentTick - now;
  }
  const strictTicks = [];
  function strictDelay() {
    const now = Date.now();
    if (strictTicks.length < limit) {
      strictTicks.push(now);
      return 0;
    }
    const earliestTime = strictTicks.shift() + interval;
    if (now >= earliestTime) {
      strictTicks.push(now);
      return 0;
    }
    strictTicks.push(earliestTime);
    return earliestTime - now;
  }
  const getDelay = strict ? strictDelay : windowedDelay;
  return function_ => {
    const throttled = function (...args) {
      if (!throttled.isEnabled) {
        return (async () => function_.apply(this, args))();
      }
      let timeout;
      return new Promise((resolve, reject) => {
        const execute = () => {
          resolve(function_.apply(this, args));
          queue.delete(timeout);
        };
        timeout = setTimeout(execute, getDelay());
        queue.set(timeout, reject);
      });
    };
    throttled.abort = () => {
      for (const timeout of queue.keys()) {
        clearTimeout(timeout);
        queue.get(timeout)(new AbortError());
      }
      queue.clear();
      strictTicks.splice(0, strictTicks.length);
    };
    throttled.isEnabled = true;
    Object.defineProperty(throttled, 'queueSize', {
      get() {
        return queue.size;
      }
    });
    return throttled;
  };
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
const TARGET_FPS = 15;
const throttle = pThrottle({
    limit: 1,
    interval: Math.round((1 / TARGET_FPS) * 1000),
    strict: true,
});
(function (VideoRecognitionMode) {
    /** Normal recognition */
    VideoRecognitionMode[VideoRecognitionMode["Recognition"] = 0] = "Recognition";
    /** Indefinite scan. Useful for profiling the performance of scan (using `onDebugText` metadata callback) */
    VideoRecognitionMode[VideoRecognitionMode["RecognitionTest"] = 1] = "RecognitionTest";
    /** Only detection. Useful for profiling the performance of detection (using `onDebugText` metadata callback) */
    VideoRecognitionMode[VideoRecognitionMode["DetectionTest"] = 2] = "DetectionTest";
})(exports.VideoRecognitionMode || (exports.VideoRecognitionMode = {}));
/**
 * A wrapper around `RecognizerRunner` that can use it to perform recognition of
 * video feeds - either from live camera or from predefined video file.
 */
class VideoRecognizer {
    /**
     * **Use only if provided factory functions are not well-suited for your use
     * case.**
     *
     * Creates a new `VideoRecognizer` with provided `HTMLVideoElement`.
     *
     * Keep in mind that `HTMLVideoElement` **must have** a video feed which is
     * ready to use.
     *
     * - If you want to take advantage of provided camera management, use
     *   `createVideoRecognizerFromCameraStream`
     * - In case that static video file should be processed, use
     *   `createVideoRecognizerFromVideoPath`
     *
     * @param videoElement HTMLVideoElement with video feed which is going to be
     * processed
     * @param recognizerRunner RecognizerRunner that should be used for video
     * stream recognition
     * @param cameraFlipped Whether the camera is flipped, e.g. if front-facing
     * camera is used
     * @param deviceId
     */
    constructor(videoElement, recognizerRunner, cameraFlipped = false, deviceId = null) {
        this.deviceId = null;
        this.recognitionCancelRequested = false;
        this.recognitionPauseRequested = false;
        this.recognitionTimeoutMs = 20000;
        this.timeoutStartedAt = 0;
        this.currentTimeoutCount = 0;
        this.videoRecognitionMode = exports.VideoRecognitionMode.Recognition;
        this.onScanningDone = null;
        this.onFrameProcessed = null;
        this.cameraFlipped = false;
        this.threadBusy = false;
        this.handleFlippingVideo = async () => {
            this.videoElement.style.transform = `scaleX(${this.cameraFlipped ? -1 : 1})`;
            // needs to be set on the recognizerRunner as well to provide correct quads
            await this.recognizerRunner.setCameraPreviewMirrored(this.cameraFlipped);
        };
        /**
         * Sets the callback that will be invoked when frame is processed
         * @param onFrameProcessed Callback that will be invoked when frame is processed
         */
        this.setOnFrameProcessed = (onFrameProcessed) => {
            this.onFrameProcessed = onFrameProcessed;
        };
        this.flipCamera = async () => {
            this.cameraFlipped = !this.cameraFlipped;
            await this.handleFlippingVideo();
        };
        this.isCameraFlipped = () => {
            return this.cameraFlipped;
        };
        /**
         * Sets the video recognition mode to be used.
         */
        this.setVideoRecognitionMode = async (videoRecognitionMode) => {
            this.videoRecognitionMode = videoRecognitionMode;
            const isDetectionMode = this.videoRecognitionMode === exports.VideoRecognitionMode.DetectionTest;
            await this.recognizerRunner.setDetectionOnlyMode(isDetectionMode);
        };
        /**
         * Starts the recognition of the video stream associated with this
         * `VideoRecognizer`. The stream will be unpaused and recognition loop will
         * start. After recognition completes, an `onScanningDone` callback will be
         * invoked with state of the recognition.
         *
         * NOTE: As soon as the execution of the callback completes, the recognition
         *       loop will continue and recognition state will be retained. To clear
         *       the recognition state, use {@linkcode resetRecognizers} (within your
         *       callback). To pause the recognition loop, use
         *       {@linkcode pauseRecognition} (within your callback) - to resume it
         *       later use {@linkcode resumeRecognition}. To completely stop the
         *       recognition and video feed, while keeping the ability to use this
         *       `VideoRecognizer` later, use {@linkcode pauseVideoFeed}. To
         *       completely stop the recognition and video feed and release all the
         *       resources involved with the video stream, use
         *       {@linkcode releaseVideoFeed}.
         *
         * @param onScanningDone Callback that will be invoked when recognition
         * completes.
         * @param recognitionTimeoutMs Amount of time in ms that the recognizer will
         * stay in the `Uncertain` state before resolving.
         */
        this.startRecognition = async (onScanningDone, recognitionTimeoutMs = 20000) => {
            try {
                await this.videoElement.play();
            }
            catch (error) {
                throw new Error(exports.ErrorMessages.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED);
            }
            // Following 2 lines might not be needed. Just in case left here.
            this.recognitionPauseRequested = false;
            this.recognitionCancelRequested = false;
            this.clearTimeout();
            this.recognitionTimeoutMs = recognitionTimeoutMs;
            this.onScanningDone = onScanningDone;
            await this.throttledQueueFrame();
        };
        /**
         * Resumes the recognition and video playback
         * @param resetRecognizers Indicates whether resetRecognizers should be
         * invoked while resuming the recognition
         */
        this.resumeRecognition = async (resetRecognizers) => {
            if (resetRecognizers) {
                try {
                    await this.resetRecognizers(true);
                }
                catch (error) {
                    throw new SDKError(videoRecognizerErrors.recognizersResetFailure);
                }
            }
            try {
                await this.videoElement.play();
            }
            catch (error) {
                throw new Error(exports.ErrorMessages.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED);
            }
            try {
                this.recognitionPauseRequested = false;
                await this.throttledQueueFrame();
            }
            catch (error) {
                this.recognitionPauseRequested = true;
                console.error(error);
            }
        };
        /**
         * Performs the recognition of the video stream associated with this
         * `VideoRecognizer`. The stream will be unpaused, recognition will be
         * performed and promise will be resolved with recognition status. After the
         * resolution of returned promise, the video stream will be paused, but not
         * released. To release the stream, use function `releaseVideoFeed`.
         *
         * This is a simple version of {@linkcode startRecognition} that should be
         * used for most cases, like when you only need to perform one scan per video
         * session.
         *
         * @param recognitionTimeoutMs Amount of time in ms that the recognizer will
         * stay in the `Uncertain` state before resolving.
         */
        this.recognize = (recognitionTimeoutMs = 20000) => {
            return new Promise((resolve) => {
                const onScanningDone = (recognitionState) => {
                    this.pauseVideoFeed();
                    resolve(recognitionState);
                };
                void this.startRecognition(onScanningDone, recognitionTimeoutMs);
            });
        };
        /**
         * Pauses the video feed. You can resume the feed by calling recognize or
         * `startRecognition`. Note that this pauses both the camera feed and
         * recognition. If you just want to pause recognition, while keeping the
         * camera feed active, call method `pauseRecognition`.
         */
        this.pauseVideoFeed = () => {
            // fix for https://developer.chrome.com/blog/play-request-was-interrupted/
            if (this.videoElement.readyState >
                this.videoElement.HAVE_CURRENT_DATA &&
                !this.videoElement.paused) {
                this.videoElement.pause();
                this.pauseRecognition();
            }
        };
        /**
         * Pauses the recognition. This means that video frames that arrive from given
         * video source will not be recognized. To resume recognition, call
         * {@linkcode resumeRecognition}.
         */
        this.pauseRecognition = () => {
            this.recognitionPauseRequested = true;
        };
        /**
         * Cancels current ongoing recognition. Unlike {@linkcode pauseRecognition} this will reset everything
         */
        this.cancelRecognition = () => {
            this.recognitionCancelRequested = true;
        };
        /**
         * Convenience method for invoking
         * {@linkcode RecognizerRunner.resetRecognizers} on associated
         * `RecognizerRunner`.
         */
        this.resetRecognizers = async (hardReset) => {
            await this.recognizerRunner.resetRecognizers(hardReset);
        };
        /**
         * Convenience method for accessing `RecognizerRunner` associated with this
         * `VideoRecognizer`. Sometimes it's useful to reconfigure `RecognizerRunner`
         * while handling `onScanningDone` callback and this method makes that much
         * more convenient.
         */
        this.getRecognizerRunner = () => {
            return this.recognizerRunner;
        };
        /**
         * Getter for {@linkcode videoElement}
         */
        this.getVideoElement = () => {
            return this.videoElement;
        };
        /**
         * Change currently used camera device for recognition. To get list of
         * available camera devices use `getCameraDevices` method.
         *
         * Keep in mind that this method will reset recognizers.
         *
         * @param camera Desired camera device which should be used for recognition.
         */
        this.changeCameraDevice = async (camera) => {
            this.pauseRecognition();
            this.releaseVideoFeed();
            await bindCameraToVideoFeed(camera, this.videoElement, exports.PreferredCameraType.BackFacingCamera);
            await this.recognizerRunner.setPingData({ selectedCamera: camera.label });
            await this.resumeRecognition(true);
        };
        /**
         * Shorthand for queuing the next frame for processing. Wrapper around
         * {@linkcode recognitionLoop}. Resolves when the frame is done processing.
         */
        this.queueFrame = () => {
            // promisify `requestVideoFrameCallback` so that we know when it triggers
            return new Promise((resolve) => {
                this.frameCallback(() => {
                    void this.recognitionLoop().then(() => resolve());
                });
            });
        };
        this.throttledQueueFrame = throttle(this.queueFrame);
        /**
         * The main loop. Takes camera frames from {@linkcode videoElement} and
         * processes them on the `recognizerRunner`.
         */
        this.recognitionLoop = async () => {
            if (this.threadBusy) {
                return;
            }
            // exit without side-effects when paused
            if (this.recognitionPauseRequested) {
                return;
            }
            // if cancelled exit and reset `VideoRecognizer` state
            if (this.recognitionCancelRequested) {
                this.clearTimeout();
                await this.resetRecognizers(true);
                this.onScanningDone = null;
                this.recognitionCancelRequested = false;
                return;
            }
            /*
            Start processing.
    
            At this point we draw the canvas frames, extract the ImageData` and send it
            to the `RecognizerRunner`. The main thread and the worker thread should be
            treated as blocked.
            */
            const cameraFrame = captureFrame(this.videoElement);
            // queue everything below in a macrotask
            await new Promise((f) => setTimeout(f, 0));
            this.threadBusy = true;
            const processResult = await this.recognizerRunner.processImage(cameraFrame);
            // assumption: only one recognizer is used
            const currentFrameResult = await this.recognizerRunner.recognizers[0].getResult();
            this.threadBusy = false;
            // Trigger onFrameProcessed callback
            if (typeof this.onFrameProcessed === "function") {
                this.onFrameProcessed(currentFrameResult, cameraFrame.imageData);
            }
            // End processing
            // Test mode resets recognizers on every tick and never times out
            if (this.videoRecognitionMode === exports.VideoRecognitionMode.DetectionTest ||
                this.videoRecognitionMode === exports.VideoRecognitionMode.RecognitionTest) {
                await this.recognizerRunner.resetRecognizers(true);
                this.clearTimeout();
                void this.throttledQueueFrame();
                return;
            }
            // regular flow
            switch (processResult) {
                // `Valid` stops loop and calls `onScanningDone`
                case exports.RecognizerResultState.Valid: {
                    this.clearTimeout();
                    if (typeof this.onScanningDone === "function") {
                        this.onScanningDone(processResult);
                    }
                    return;
                }
                // `Uncertain` resolves after a timeout, loops otherwise
                case exports.RecognizerResultState.Uncertain: {
                    // increment timeout
                    const now = performance.now();
                    if (this.timeoutStartedAt === 0) {
                        this.timeoutStartedAt = now;
                    }
                    this.currentTimeoutCount = now - this.timeoutStartedAt;
                    // if under timeout continue looping
                    if (this.currentTimeoutCount < this.recognitionTimeoutMs) {
                        void this.throttledQueueFrame();
                        return;
                    }
                    // otherwise stop as `Uncertain`
                    this.clearTimeout();
                    if (typeof this.onScanningDone === "function") {
                        this.onScanningDone(processResult);
                    }
                    return;
                }
                // `StageValid` and `Empty` loop forever
                case exports.RecognizerResultState.StageValid:
                case exports.RecognizerResultState.Empty: {
                    this.clearTimeout();
                    void this.throttledQueueFrame();
                    return;
                }
            }
        };
        /**
         * Clear timeout on every loop which didn't result in `RecognizerResultState.Uncertain`
         */
        this.clearTimeout = () => {
            this.currentTimeoutCount = 0;
            this.timeoutStartedAt = 0;
        };
        /**
         * Stops all media stream tracks associated with {@linkcode videoElement}.
         */
        this.releaseVideoFeed = () => {
            if (this.videoElement &&
                this.videoElement.srcObject !== null &&
                this.videoElement.srcObject instanceof MediaStream) {
                this.videoElement.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
                this.videoElement.srcObject = null;
            }
        };
        this.videoElement = videoElement;
        this.recognizerRunner = recognizerRunner;
        this.cameraFlipped = cameraFlipped;
        this.deviceId = deviceId;
        if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
            this.frameCallback =
                this.videoElement.requestVideoFrameCallback.bind(this.videoElement);
        }
        else {
            this.frameCallback = window.requestAnimationFrame.bind(window);
        }
        void this.handleFlippingVideo();
        // Prepare the `video` element so that it can autoplay on iOS
        // https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/
        // https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#autoplay_availability
        this.videoElement.setAttribute("playsinline", "");
        this.videoElement.setAttribute("mute", "");
    }
    /**
     * Creates a new VideoRecognizer by opening a camera stream and attaching it
     * to given `HTMLVideoElement`. If camera cannot be accessed, the returned
     * promise will be rejected.
     *
     * @param cameraFeed `HTMLVideoElement` to which camera stream should be
     * attached
     * @param recognizerRunner `RecognizerRunner` that should be used for video
     * stream recognition
     * @param cameraId User can provide specific camera ID to be selected and used
     * @param preferredCameraType Whether back facing or front facing camera is
     *        preferred. Obeyed only if there is a choice (i.e. if device has only
     *        front-facing camera, the opened camera will be a front-facing
     *        camera, regardless of preference)
     */
    static async createVideoRecognizerFromCameraStream(cameraFeed, recognizerRunner, cameraId = null, preferredCameraType = exports.PreferredCameraType.BackFacingCamera) {
        if (!cameraFeed || !(cameraFeed instanceof HTMLVideoElement)) {
            throw new SDKError(videoRecognizerErrors.elementMissing);
        }
        if (!navigator.mediaDevices.getUserMedia) {
            throw new SDKError(videoRecognizerErrors.mediaDevicesUnsupported);
        }
        const selectedCamera = await selectCamera(cameraId, preferredCameraType);
        if (!selectedCamera) {
            throw new SDKError(videoRecognizerErrors.cameraMissing);
        }
        const cameraFlipped = await bindCameraToVideoFeed(selectedCamera, cameraFeed, preferredCameraType);
        await recognizerRunner.setPingData({ selectedCamera: selectedCamera.label });
        return new VideoRecognizer(cameraFeed, recognizerRunner, cameraFlipped, selectedCamera.deviceId);
    }
    /**
     * Creates a new `VideoRecognizer` by attaching the given URL to video to
     * given `HTMLVideoElement` and using it to display video frames while
     * processing them.
     *
     * @param videoPath URL of the video file that should be recognized.
     * @param videoElement `HTMLVideoElement` to which video file will be attached
     * @param recognizerRunner `RecognizerRunner` that should be used for video
     * stream recognition.
     */
    static createVideoRecognizerFromVideoPath(videoPath, videoElement, recognizerRunner) {
        const videoRecognizer = new VideoRecognizer(videoElement, recognizerRunner);
        videoElement.src = videoPath;
        videoElement.currentTime = 0;
        videoElement.onended = () => {
            videoRecognizer.cancelRecognition();
        };
        return videoRecognizer;
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Settings object for function loadWasmModule.
 */
class WasmSDKLoadSettings {
    /**
     * @param licenseKey License key for unlocking the WebAssembly module.
     */
    constructor(licenseKey) {
        /**
         * Write a hello message to the browser console when license check is successfully performed.
         *
         * Hello message will contain the name and version of the SDK, which are required information for all support
         * tickets.
         *
         * The default value is true.
         */
        this.allowHelloMessage = true;
        /**
         * Absolute location of WASM and related JS/data files. Useful when resource files should be loaded over CDN, or
         * when web frameworks/libraries are used which store resources in specific locations, e.g. inside "assets" folder.
         *
         * Important: if the engine is hosted on another origin, CORS must be enabled between two hosts. That is, server
         * where engine is hosted must have 'Access-Control-Allow-Origin' header for the location of the web app.
         *
         * Important: SDK and WASM resources must be from the same version of a package.
         *
         * Default value is empty string, i.e. "". In case of empty string, value of "window.location.origin" property is
         * going to be used.
         */
        this.engineLocation = "";
        /**
         * The absolute location of the Web Worker script file that loads the WebAssembly module.
         *
         * Important: the worker script must be served via HTTPS and must be of the same origin as the initiator.
         * See https://github.com/w3c/ServiceWorker/issues/940 (same applies for Web Workers).
         *
         * Important: SDK, worker script and WebAssembly resources must be from the same version of the package.
         *
         * The default value is an empty string, i.e. "", and in that case, the worker script is loaded from the default
         * location in resources folder.
         */
        this.workerLocation = "";
        /**
         * Type of the WASM that will be loaded. By default, if not set, the SDK will automatically determine the best WASM
         * to load.
         */
        this.wasmType = null;
        /**
         * Defines the number of workers that will be used for multi-threaded processing of the images. If not set, the
         * number of worker used will match the number of detected CPU cores on a device.
         *
         * If the browser does not support multi-threaded processing or it was deliberately disabled using the `wasmType`
         * property, then this property will be ignored.
         */
        this.numberOfWorkers = null;
        /**
         * Optional callback function that will report the SDK loading progress.
         *
         * This can be useful for displaying progress bar to users with slow connections.
         *
         * The default value is null.
         */
        this.loadProgressCallback = null;
        /**
         * Name of the file containing the WebAssembly module.
         *
         * Change this only if you have renamed the original WASM and its support JS file for your purposes.
         */
        this.wasmModuleName = defaultWasmModuleName;
        if (!licenseKey) {
            throw new SDKError(sdkErrors.licenseKeyMissing);
        }
        this.licenseKey = licenseKey;
    }
}

const bulkMemory = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 3, 1, 0, 1, 10, 14, 1, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11])),
  mutableGlobals = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 2, 8, 1, 1, 97, 1, 98, 3, 127, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 5, 1, 1, 97, 3, 1])),
  referenceTypes = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 7, 1, 5, 0, 208, 112, 26, 11])),
  saturatedFloatToInt = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 12, 1, 10, 0, 67, 0, 0, 0, 0, 252, 0, 26, 11])),
  signExtensions = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 192, 26, 11])),
  simd = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11])),
  threads = () => (async e => {
    try {
      return "undefined" != typeof MessageChannel && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(e);
    } catch (e) {
      return !1;
    }
  })(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function isSafari() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes("safari") && !userAgent.includes("chrome");
}
function isIOSUserAgent() {
    const pattern = /iOS|iPhone|iPad|iPod/i; // 'i' flag for case-insensitive matching
    return pattern.test(navigator.userAgent);
}
/* eslint-disable max-len */
/**
 * Safari 16 shipped with WASM threads support, but it didn't ship with nested
 * workers support, so an extra check is needed
 * https://github.com/GoogleChromeLabs/squoosh/pull/1325/files#diff-904900db64cd3f48b0e765dbbdc6a218a7ea74a199671bde82a8944a904db86f
 */
/* eslint-enable max-len */
async function checkThreadsSupport() {
    const supportsWasmThreads = await threads();
    if (!supportsWasmThreads)
        return false;
    if (!("importScripts" in self)) {
        throw Error("Not implemented");
    }
    // Safari has issues with shared memory
    // https://github.com/emscripten-core/emscripten/issues/19374
    if (isSafari()) {
        return false;
    }
    return "Worker" in self;
}
async function detectWasmFeatures() {
    const basicSet = [
        mutableGlobals(),
        referenceTypes(),
        bulkMemory(),
        saturatedFloatToInt(),
        signExtensions(),
    ];
    const supportsBasic = (await Promise.all(basicSet)).every(Boolean);
    if (!supportsBasic) {
        throw new Error("Browser doesn't meet minimum requirements!");
    }
    const supportsAdvanced = await simd();
    if (!supportsAdvanced) {
        return exports.WasmType.Basic;
    }
    const supportsAdvancedThreads = await checkThreadsSupport();
    if (!supportsAdvancedThreads) {
        return exports.WasmType.Advanced;
    }
    return exports.WasmType.AdvancedWithThreads;
}
async function detectWasmType() {
    // determine if all features required for advanced WASM are available
    // currently, advanced wasm requires SIMD
    const haveSIMD = await simd();
    const threadsSupported = await checkThreadsSupport();
    if (haveSIMD) {
        if (threadsSupported) {
            return exports.WasmType.AdvancedWithThreads;
        }
        else {
            return exports.WasmType.Advanced;
        }
    }
    else {
        return exports.WasmType.Basic;
    }
}
function wasmFolder(blinkIDResource) {
    let typeDir = "";
    if (blinkIDResource.wasmType === exports.WasmType.AdvancedWithThreads) {
        typeDir = "advanced-threads";
    }
    else if (blinkIDResource.wasmType === exports.WasmType.Advanced) {
        typeDir = "advanced";
    }
    else {
        typeDir = "basic";
    }
    return `${blinkIDResource.blinkIDVariant}/${typeDir}`;
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
// taken from https://stackoverflow.com/a/2117523/213057
/* eslint-disable */
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
}
/* eslint-enable */
function getUserID() {
    try {
        let userId = localStorage.getItem("mb-user-id");
        if (userId === null) {
            userId = uuidv4();
            localStorage.setItem("mb-user-id", userId);
        }
        return userId;
    }
    catch (error) {
        // local storage is disabled, generate new user ID every time
        return uuidv4();
    }
}
/**
 * Asynchronously loads and compiles the WebAssembly module.
 * @param loadSettings Object defining the settings for loading the WebAssembly module.
 * @returns Promise that resolves if WebAssembly module was successfully loaded and rejects if not.
 */
/* eslint-disable @typescript-eslint/no-explicit-any,
                  @typescript-eslint/no-unsafe-assignment,
                  @typescript-eslint/no-unsafe-member-access,
                  @typescript-eslint/no-unsafe-call */
async function loadWasmModule(loadSettings) {
    return new Promise((resolve, reject) => {
        if (!loadSettings || typeof loadSettings !== "object") {
            reject(new SDKError(sdkErrors.wasmSettingsMissing));
            return;
        }
        if (typeof loadSettings.licenseKey !== "string") {
            reject(new SDKError(sdkErrors.licenseKeyMissing));
            return;
        }
        if (!loadSettings.wasmModuleName) {
            reject(new SDKError(sdkErrors.wasmModuleNameMissing));
            return;
        }
        if (typeof loadSettings.engineLocation !== "string") {
            reject(new SDKError(sdkErrors.engineLocationInvalid));
            return;
        }
        if (typeof loadSettings.workerLocation !== "string") {
            reject(new SDKError(sdkErrors.workerLocationInvalid));
            return;
        }
        // obtain user ID from local storage
        const userId = getUserID();
        try {
            const workerPath = `/resources/${loadSettings.wasmModuleName}.worker.min.js`;
            const defaultWorkerLocation = window.location.origin + workerPath;
            const workerLocation = loadSettings.workerLocation || defaultWorkerLocation;
            if (loadSettings.allowHelloMessage) {
                console.log("Worker location is:", workerLocation);
            }
            const worker = new Worker(workerLocation);
            WasmSDKWorker.createWasmWorker(worker, loadSettings, userId).then((wasmSDK) => {
                resolve(wasmSDK);
            }, reject);
        }
        catch (initError) {
            reject(initError);
        }
    });
}
/* eslint-enable @typescript-eslint/no-explicit-any,
                 @typescript-eslint/no-unsafe-assignment,
                 @typescript-eslint/no-unsafe-member-access,
                 @typescript-eslint/no-unsafe-call */
/**
 * Function for creating a new RecognizerRunner.
 * Note that it is currently not possible to have multiple instances of RecognizerRunner per instance of WasmSDK.
 * Attempt to create new instance of RecognizerRunner prior deleting the previous one will fail.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 * @param recognizers Array of recognizers that will be used by RecognizerRunner.
 * @param allowMultipleResults Whether or not it is allowed to return multiple results from single recognition session.
 *        See README.md for more information.
 * @param metadataCallbacks
 */
async function createRecognizerRunner(wasmSDK, recognizers, allowMultipleResults = false, metadataCallbacks = {}) {
    if (typeof wasmSDK !== "object") {
        throw new SDKError(sdkErrors.missing);
    }
    if (typeof recognizers !== "object" || recognizers.length < 1) {
        throw new SDKError(sdkErrors.recognizersMissing);
    }
    return wasmSDK.mbWasmModule.createRecognizerRunner(recognizers, allowMultipleResults, metadataCallbacks);
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (BarcodeFormat) {
    /** Indicates that no barcode has been detected. */
    BarcodeFormat[BarcodeFormat["NONE"] = 0] = "NONE";
    /** Indicates that QR code has been detected. */
    BarcodeFormat[BarcodeFormat["QR_CODE"] = 1] = "QR_CODE";
    /** Indicates that Data Matrix 2D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["DATA_MATRIX"] = 2] = "DATA_MATRIX";
    /** Indicates that UPC E 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["UPC_E"] = 3] = "UPC_E";
    /** Indicates that UPC A 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["UPC_A"] = 4] = "UPC_A";
    /** Indicates that EAN 8 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["EAN_8"] = 5] = "EAN_8";
    /** Indicates that EAN 13 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["EAN_13"] = 6] = "EAN_13";
    /** Indicates that Code 128 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["CODE_128"] = 7] = "CODE_128";
    /** Indicates that Code 39 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["CODE_39"] = 8] = "CODE_39";
    /** Indicates that ITF 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["ITF"] = 9] = "ITF";
    /** Indicates that Aztec 2D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["AZTEC_BARCODE"] = 10] = "AZTEC_BARCODE";
    /** Indicates that PDF417 2D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["PDF417_BARCODE"] = 11] = "PDF417_BARCODE";
})(exports.BarcodeFormat || (exports.BarcodeFormat = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (AnonymizationMode) {
    /**
     * Anonymization will not be performed.
     */
    AnonymizationMode[AnonymizationMode["None"] = 0] = "None";
    /**
     * FullDocumentImage is anonymized with black boxes
     * covering sensitive data.
     */
    AnonymizationMode[AnonymizationMode["ImageOnly"] = 1] = "ImageOnly";
    /**
     * Result fields containing sensitive data are removed from result.
     */
    AnonymizationMode[AnonymizationMode["ResultFieldsOnly"] = 2] = "ResultFieldsOnly";
    /**
     * This mode is combination of ImageOnly and ResultFieldsOnly modes.
     */
    AnonymizationMode[AnonymizationMode["FullResult"] = 3] = "FullResult";
})(exports.AnonymizationMode || (exports.AnonymizationMode = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 *
 * RecognitionModeFilter is used to enable/disable recognition of specific document groups.
 * Setting is taken into account only if the right for that document is purchased.
 */
class RecognitionModeFilter {
    constructor() {
        /** Enable scanning of MRZ IDs. Setting is taken into account only if the mrz_id right is purchased. */
        this.enableMrzId = true;
        /** Enable scanning of Passport MRZ. Setting is taken into account only if the passport right is purchased. */
        this.enableMrzPassport = true;
        /** Enable scanning of visa MRZ. Setting is taken into account only if the visa right is purchased. */
        this.enableMrzVisa = true;
        /** Enable scanning of Photo ID. Setting is taken into account only if the photo_id right is purchased. */
        this.enablePhotoId = true;
        /**
         * Enable scanning of barcode IDs. Setting is taken into account only if the barcode right to
         * scan that barcode is purchased.
         */
        this.enableBarcodeId = true;
        /**
         * Enable full document recognition. Setting is taken into account only if the document right to
         * scan that document is purchased.
         */
        this.enableFullDocumentRecognition = true;
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (StrictnessLevel) {
    StrictnessLevel[StrictnessLevel["Strict"] = 0] = "Strict";
    StrictnessLevel[StrictnessLevel["Normal"] = 1] = "Normal";
    StrictnessLevel[StrictnessLevel["Relaxed"] = 2] = "Relaxed";
})(exports.StrictnessLevel || (exports.StrictnessLevel = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Extension factors relative to corresponding dimension of the full image. For example,
 * {@code upFactor} and {@code downFactor} define extensions relative to image height, e.g.
 * when {@code upFactor} is 0.5, upper image boundary will be extended for half of image's full
 * height.
 *
 *                      ._______________________________________.
 *                      |                   ↑                   |
 *                      |                upFactor               |
 *   .________.         |              .________.               |
 *   |        |   -->   |  ⃖ leftFactor |        | rightFactor  ⃗ |
 *   |________|         |              |________|               |
 *                      |                   ↓                   |
 *                      |               downFactor              |
 *                      |_______________________________________|
 *
 */
class ExtensionFactors {
    /**
     * Constructor which accepts image extension factors which must be in range [-1.0f, 1.0f].
     * @param upFactor image extension factor relative to full image height in UP direction
     * @param downFactor image extension factor relative to full image height in DOWN direction
     * @param leftFactor image extension factor relative to full image width in LEFT direction
     * @param rightFactor image extension factor relative to full image width in RIGHT direction
     */
    constructor(upFactor = 0.0, downFactor = 0.0, leftFactor = 0.0, rightFactor = 0.0) {
        /**
         * Currently used image extension factor relative to full image height in UP direction.
         */
        this.upFactor = 0.0;
        /**
         * Currently used image extension factor relative to full image height in DOWN direction.
         */
        this.downFactor = 0.0;
        /**
         * Currently used image extension factor relative to full image height in LEFT direction.
         */
        this.leftFactor = 0.0;
        /**
         * Currently used image extension factor relative to full image height in RIGHT direction.
         */
        this.rightFactor = 0.0;
        this.checkExtensionFactor(upFactor);
        this.checkExtensionFactor(downFactor);
        this.checkExtensionFactor(leftFactor);
        this.checkExtensionFactor(rightFactor);
        this.upFactor = upFactor;
        this.downFactor = downFactor;
        this.leftFactor = leftFactor;
        this.rightFactor = rightFactor;
    }
    checkExtensionFactor(factor) {
        if (factor > 1.0 || factor < -1.0) {
            throw new Error("Extension factor must be in range [-1.0, 1.0]");
        }
    }
}
function validateDpi(dpi) {
    if (dpi < 100 || dpi > 400) {
        throw new Error("DPI must be from interval [100, 400]");
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (AlphabetType) {
    AlphabetType[AlphabetType["Latin"] = 0] = "Latin";
    AlphabetType[AlphabetType["Arabic"] = 1] = "Arabic";
    AlphabetType[AlphabetType["Cyrillic"] = 2] = "Cyrillic";
    AlphabetType[AlphabetType["Greek"] = 3] = "Greek";
    AlphabetType[AlphabetType["Count"] = 4] = "Count";
})(exports.AlphabetType || (exports.AlphabetType = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (BarcodeElementKey) {
    // ==============================================================/
    // ============== 1. DETERMINING BARCODE VERSION ================/
    // ==============================================================/
    /**
     Mandatory on all driver's licenses. All barcodes which are using 3-track magnetic
     stripe encoding used in the interest of smoothing a transition from legacy documents
     shall be designated as "Magnetic". All barcodes which are using compact encoding
     compliant with ISO/IEC 18013-2 shall be designated as "Compact". All barcodes (majority)
     compliant with Mandatory PDF417 Bar Code of the American Association of Motor Vehicle
     Administrators (AAMVA) Card Design Standard from AAMVA DL/ID-2000 standard to DL/ID-2013
     shall be designated as "AAMVA".
     */
    BarcodeElementKey[BarcodeElementKey["DocumentType"] = 0] = "DocumentType";
    /**
     Mandatory on all driver's licenses.

     AAMVA Version Number: This is a decimal value between 0 and 99 that
     specifies the version level of the PDF417 bar code format. Version "0" and "00"
     is reserved for bar codes printed to the specification of the American Association
     of Motor Vehicle Administrators (AAMVA) prior to the adoption of the AAMVA DL/ID-2000
     standard.

     - All barcodes compliant with AAMVA DL/ID-2000 standard shall be designated Version "01."
     - All barcodes compliant with AAMVA Card Design Specification version 1.0, dated 09-2003
       shall be designated Version "02."
     - All barcodes compliant with AAMVA Card Design Specification version 2.0, dated 03-2005
       shall be designated Version "03."
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 07-2009
       shall be designated Version "04."
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 07-2010
       shall be designated Version "05."
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 07-2011
       shall be designated Version "06".
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 06-2012
       shall be designated Version "07".
     - All barcodes compliant with this current AAMVA standard shall be designated "08".

     Should a need arise requiring major revision to the format, this field provides the
     means to accommodate additional revision.

     If the document type is not "AAMVA", this field defines the version number of the
     given document type's standard.
     */
    BarcodeElementKey[BarcodeElementKey["StandardVersionNumber"] = 1] = "StandardVersionNumber";
    // ==============================================================/
    // ==========          2. PERSONAL DATA KEYS          ===========/
    // ==============================================================/
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     Family name of the cardholder. (Family name is sometimes also called "last name" or "surname.")
     Collect full name for record, print as many characters as possible on portrait side of DL/ID.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerFamilyName"] = 2] = "CustomerFamilyName";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     First name of the cardholder.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerFirstName"] = 3] = "CustomerFirstName";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     Full name of the individual holding the Driver's License or ID.

     The Name field contains up to four portions, separated with the "," delimiter:
     Last Name (required)
     , (required)
     First Name (required)
     , (required if other name portions follow, otherwise optional)
     Middle Name(s) (optional)
     , (required if other name portions follow, otherwise optional)
     Suffix (optional)
     , (optional)

     If the individual has more than one middle name they are separated with space.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerFullName"] = 4] = "CustomerFullName";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     Date on which the cardholder was born. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DateOfBirth"] = 5] = "DateOfBirth";
    /**
     Mandatory on all AAMVA, Magnetic barcodes.
     Optional on Compact barcodes.

     Gender of the cardholder. 1 = male, 2 = female.
     */
    BarcodeElementKey[BarcodeElementKey["Sex"] = 6] = "Sex";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 barcodes.
     Optional on AAMVA 01, Magnetic and Compact barcodes.

     Color of cardholder's eyes. (ANSI D-20 codes)

     Code   Description
     BLK    Black
     BLU    Blue
     BRO    Brown
     GRY    Gray
     GRN    Green
     HAZ    Hazel
     MAR    Maroon
     PNK    Pink
     DIC    Dichromatic
     UNK    Unknown
     */
    BarcodeElementKey[BarcodeElementKey["EyeColor"] = 7] = "EyeColor";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use kFullAddress.

     Street portion of the cardholder address.
     The place where the registered driver of a vehicle (individual or corporation)
     may be contacted such as a house number, street address, etc.
     */
    BarcodeElementKey[BarcodeElementKey["AddressStreet"] = 8] = "AddressStreet";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use kFullAddress.

     City portion of the cardholder address.
     */
    BarcodeElementKey[BarcodeElementKey["AddressCity"] = 9] = "AddressCity";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use kFullAddress.

     State portion of the cardholder address.
     */
    BarcodeElementKey[BarcodeElementKey["AddressJurisdictionCode"] = 10] = "AddressJurisdictionCode";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use FullAddress.

     Postal code portion of the cardholder address in the U.S. and Canada. If the
     trailing portion of the postal code in the U.S. is not known, zeros can be used
     to fill the trailing set of numbers up to nine (9) digits.
     */
    BarcodeElementKey[BarcodeElementKey["AddressPostalCode"] = 11] = "AddressPostalCode";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.
     Optional on Compact barcodes.

     Full address of the individual holding the Driver's License or ID.

     The full address field contains up to four portions, separated with the "," delimiter:
     Street Address (required)
     , (required if other address portions follow, otherwise optional)
     City (optional)
     , (required if other address portions follow, otherwise optional)
     Jurisdiction Code (optional)
     , (required if other address portions follow, otherwise optional)
     ZIP - Postal Code (optional)

     */
    BarcodeElementKey[BarcodeElementKey["FullAddress"] = 12] = "FullAddress";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.
     Optional on AAMVA 01 and Magnetic barcodes.

     Height of cardholder, either in Inches or in Centimeters.

     Inches (in): number of inches followed by " in"
     example: 6'1'' = "73 in"

     Centimeters (cm): number of centimeters followed by " cm"
     example: 181 centimeters = "181 cm"
     */
    BarcodeElementKey[BarcodeElementKey["Height"] = 13] = "Height";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.
     Optional on AAMVA 01 and Magnetic barcodes.

     Height of cardholder in Inches.
     Example: 5'9'' = "69".
     */
    BarcodeElementKey[BarcodeElementKey["HeightIn"] = 14] = "HeightIn";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 Compact barcodes.
     Optional on AAMVA 01 and Magnetic barcodes.

     Height of cardholder in Centimeters.
     Example: 180 Centimeters = "180".
     */
    BarcodeElementKey[BarcodeElementKey["HeightCm"] = 15] = "HeightCm";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.
     Optional on AAMVA 01, 02, 03, Magnetic and Compcat barcodes.

     Middle name(s) of the cardholder. In the case of multiple middle names they
     shall be separated by space " ".
     */
    BarcodeElementKey[BarcodeElementKey["CustomerMiddleName"] = 16] = "CustomerMiddleName";
    /**
     Optional on all AAMVA, Magnetic and Compact barcodes.

     Bald, black, blonde, brown, gray, red/auburn, sandy, white, unknown. If the issuing
     jurisdiction wishes to abbreviate colors, the three-character codes provided in ANSI D20 must be
     used.

     Code   Description
     BAL    Bald
     BLK    Black
     BLN    Blond
     BRO    Brown
     GRY    Grey
     RED    Red/Auburn
     SDY    Sandy
     WHI    White
     UNK    Unknown
     */
    BarcodeElementKey[BarcodeElementKey["HairColor"] = 17] = "HairColor";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Name Suffix (If jurisdiction participates in systems requiring name suffix (PDPS, CDLIS, etc.),
     the suffix must be collected and displayed on the DL/ID and in the MRT).
     - JR (Junior)
     - SR (Senior)
     - 1ST or I (First)
     - 2ND or II (Second)
     - 3RD or III (Third)
     - 4TH or IV (Fourth)
     - 5TH or V (Fifth)
     - 6TH or VI (Sixth)
     - 7TH or VII (Seventh)
     - 8TH or VIII (Eighth)
     - 9TH or IX (Ninth)
     */
    BarcodeElementKey[BarcodeElementKey["NameSuffix"] = 18] = "NameSuffix";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other name by which the cardholder is known. ALTERNATIVE NAME(S) of the individual
     holding the Driver License or ID.

     The Name field contains up to four portions, separated with the "," delimiter:
     AKA Last Name (required)
     , (required)
     AKA First Name (required)
     , (required if other name portions follow, otherwise optional)
     AKA Middle Name(s) (optional)
     , (required if other name portions follow, otherwise optional)
     AKA Suffix (optional)
     , (optional)

     If the individual has more than one AKA middle name they are separated with space.
     */
    BarcodeElementKey[BarcodeElementKey["AKAFullName"] = 19] = "AKAFullName";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other family name by which the cardholder is known.
     */
    BarcodeElementKey[BarcodeElementKey["AKAFamilyName"] = 20] = "AKAFamilyName";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other given name by which the cardholder is known
     */
    BarcodeElementKey[BarcodeElementKey["AKAGivenName"] = 21] = "AKAGivenName";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other suffix by which the cardholder is known.

     The Suffix Code Portion, if submitted, can contain only the Suffix Codes shown in the following
     table (e.g., Andrew Johnson, III = JOHNSON@ANDREW@@3RD):

     Suffix     Meaning or Synonym
     JR         Junior
     SR         Senior or Esquire 1ST First
     2ND        Second
     3RD        Third
     4TH        Fourth
     5TH        Fifth
     6TH        Sixth
     7TH        Seventh
     8TH        Eighth
     9TH        Ninth
     */
    BarcodeElementKey[BarcodeElementKey["AKASuffixName"] = 22] = "AKASuffixName";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Indicates the approximate weight range of the cardholder:
     0 = up to 31 kg (up to 70 lbs)
     1 = 32 – 45 kg (71 – 100 lbs)
     2 = 46 - 59 kg (101 – 130 lbs)
     3 = 60 - 70 kg (131 – 160 lbs)
     4 = 71 - 86 kg (161 – 190 lbs)
     5 = 87 - 100 kg (191 – 220 lbs)
     6 = 101 - 113 kg (221 – 250 lbs)
     7 = 114 - 127 kg (251 – 280 lbs)
     8 = 128 – 145 kg (281 – 320 lbs)
     9 = 146+ kg (321+ lbs)
     */
    BarcodeElementKey[BarcodeElementKey["WeightRange"] = 23] = "WeightRange";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Cardholder weight in pounds Example: 185 lb = "185"
     */
    BarcodeElementKey[BarcodeElementKey["WeightPounds"] = 24] = "WeightPounds";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Cardholder weight in kilograms Example: 84 kg = "084"
     */
    BarcodeElementKey[BarcodeElementKey["WeightKilograms"] = 25] = "WeightKilograms";
    /**
     Mandatory on all AAMVA and Compact barcodes.

     The number assigned or calculated by the issuing authority.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerIdNumber"] = 26] = "CustomerIdNumber";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.
     Optional on Compact barcodes.

     A code that indicates whether a field has been truncated (T), has not been
     truncated (N), or – unknown whether truncated (U).
     */
    BarcodeElementKey[BarcodeElementKey["FamilyNameTruncation"] = 27] = "FamilyNameTruncation";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.
     Optional on Compact barcodes.

     A code that indicates whether a field has been truncated (T), has not been
     truncated (N), or – unknown whether truncated (U).
     */
    BarcodeElementKey[BarcodeElementKey["FirstNameTruncation"] = 28] = "FirstNameTruncation";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.

     A code that indicates whether a field has been truncated (T), has not been
     truncated (N), or – unknown whether truncated (U).
     */
    BarcodeElementKey[BarcodeElementKey["MiddleNameTruncation"] = 29] = "MiddleNameTruncation";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Country and municipality and/or state/province.
     */
    BarcodeElementKey[BarcodeElementKey["PlaceOfBirth"] = 30] = "PlaceOfBirth";
    /**
     Optional on all AAMVA barcodes.

     On Compact barcodes, use kFullAddress.

     Second line of street portion of the cardholder address.
     */
    BarcodeElementKey[BarcodeElementKey["AddressStreet2"] = 31] = "AddressStreet2";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Codes for race or ethnicity of the cardholder, as defined in ANSI D20.

     Race:
     Code   Description
     AI     Alaskan or American Indian (Having Origins in Any of The Original Peoples of
            North America, and Maintaining Cultural Identification Through Tribal
            Affiliation of Community Recognition)
     AP     Asian or Pacific Islander (Having Origins in Any of the Original Peoples of
            the Far East, Southeast Asia, or Pacific Islands. This Includes China, India,
            Japan, Korea, the Philippines Islands, and Samoa)
     BK     Black (Having Origins in Any of the Black Racial Groups of Africa)
     W      White (Having Origins in Any of The Original Peoples of Europe, North Africa,
            or the Middle East)

     Ethnicity:
     Code   Description
     H      Hispanic Origin (A Person of Mexican, Puerto Rican, Cuban, Central or South
            American or Other Spanish Culture or Origin, Regardless of Race)
     O      Not of Hispanic Origin (Any Person Other Than Hispanic)
     U      Unknown

     */
    BarcodeElementKey[BarcodeElementKey["RaceEthnicity"] = 32] = "RaceEthnicity";
    /**
     Optional on AAMVA 01 barcodes.

     PREFIX to Driver Name. Freeform as defined by issuing jurisdiction.
     */
    BarcodeElementKey[BarcodeElementKey["NamePrefix"] = 33] = "NamePrefix";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Country in which DL/ID is issued. U.S. = USA, Canada = CAN.
     */
    BarcodeElementKey[BarcodeElementKey["CountryIdentification"] = 34] = "CountryIdentification";
    /**
     Optional on AAMVA version 01.

     Driver Residence Street Address 1.
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceStreetAddress"] = 35] = "ResidenceStreetAddress";
    /**
     Optional on AAMVA version 01.

     Driver Residence Street Address 2.
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceStreetAddress2"] = 36] = "ResidenceStreetAddress2";
    /**
     Optional on AAMVA version 01.

     Driver Residence City
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceCity"] = 37] = "ResidenceCity";
    /**
     Optional on AAMVA version 01.

     Driver Residence Jurisdiction Code.
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceJurisdictionCode"] = 38] = "ResidenceJurisdictionCode";
    /**
     Optional on AAMVA 01 barcodes.

     Driver Residence Postal Code.
     */
    BarcodeElementKey[BarcodeElementKey["ResidencePostalCode"] = 39] = "ResidencePostalCode";
    /**
     Optional on AAMVA 01 barcodes.

     Full residence address of the individual holding the Driver's License or ID.

     The full address field contains up to four portions, separated with the "," delimiter:
     Residence Street Address (required)
     , (required if other address portions follow, otherwise optional)
     Residence City (optional)
     , (required if other address portions follow, otherwise optional)
     Residence Jurisdiction Code (optional)
     , (required if other address portions follow, otherwise optional)
     Residence ZIP - Residence Postal Code (optional)
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceFullAddress"] = 40] = "ResidenceFullAddress";
    /**
     Optional on AAMVA 05, 06, 07, 08 barcodes.

     Date on which the cardholder turns 18 years old. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["Under18"] = 41] = "Under18";
    /**
     Optional on AAMVA 05, 06, 07, 08 barcodes.

     Date on which the cardholder turns 19 years old. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["Under19"] = 42] = "Under19";
    /**
     Optional on AAMVA 05, 06, 07, 08 barcodes.

     Date on which the cardholder turns 21 years old. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["Under21"] = 43] = "Under21";
    /**
     Optional on AAMVA version 01.

     The number assigned to the individual by the Social Security Administration.
     */
    BarcodeElementKey[BarcodeElementKey["SocialSecurityNumber"] = 44] = "SocialSecurityNumber";
    /**
     Optional on AAMVA version 01.

     Driver "AKA" Social Security Number. FORMAT SAME AS DRIVER SOC SEC NUM. ALTERNATIVE NUMBERS(S) used as SS NUM.
     */
    BarcodeElementKey[BarcodeElementKey["AKASocialSecurityNumber"] = 45] = "AKASocialSecurityNumber";
    /**
     Optional on AAMVA 01 barcodes.

     ALTERNATIVE MIDDLE NAME(s) or INITIALS of the individual holding the Driver License or ID.
     Hyphenated names acceptable, spaces between names acceptable, but no other
     use of special symbols.
     */
    BarcodeElementKey[BarcodeElementKey["AKAMiddleName"] = 46] = "AKAMiddleName";
    /**
     Optional on AAMVA 01 barcodes.

     ALTERNATIVE PREFIX to Driver Name. Freeform as defined by issuing jurisdiction.
     */
    BarcodeElementKey[BarcodeElementKey["AKAPrefixName"] = 47] = "AKAPrefixName";
    /**
     Optional on AAMVA 01, 06, 07, 08 barcodes.

     Field that indicates that the cardholder is an organ donor = "1".
     */
    BarcodeElementKey[BarcodeElementKey["OrganDonor"] = 48] = "OrganDonor";
    /**
     Optional on AAMVA 07, 08 barcodes.

     Field that indicates that the cardholder is a veteran = "1"
     */
    BarcodeElementKey[BarcodeElementKey["Veteran"] = 49] = "Veteran";
    /**
     Optional on AAMVA 01. (MMDDCCYY format)

     ALTERNATIVE DATES(S) given as date of birth.
     */
    BarcodeElementKey[BarcodeElementKey["AKADateOfBirth"] = 50] = "AKADateOfBirth";
    // ==============================================================/
    // ==========          3. LICENSE DATA KEYS          ============/
    // ==============================================================/
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     This number uniquely identifies the issuing jurisdiction and can
     be obtained by contacting the ISO Issuing Authority (AAMVA)
     */
    BarcodeElementKey[BarcodeElementKey["IssuerIdentificationNumber"] = 51] = "IssuerIdentificationNumber";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     If the document is non expiring then "Non expiring" is written in this field.

     Date on which the driving and identification privileges granted by the document are
     no longer valid. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DocumentExpirationDate"] = 52] = "DocumentExpirationDate";
    /**
     Mandatory on all AAMVA and Compact barcodes.
     Optional on Magnetic barcodes.

     Jurisdiction Version Number: This is a decimal value between 0 and 99 that
     specifies the jurisdiction version level of the PDF417 barcode format.
     Notwithstanding iterations of this standard, jurisdictions implement incremental
     changes to their barcodes, including new jurisdiction-specific data, compression
     algorithms for digitized images, digital signatures, or new truncation
     conventions used for names and addresses. Each change to the barcode format
     within each AAMVA version (above) must be noted, beginning with Jurisdiction
     Version 00.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionVersionNumber"] = 53] = "JurisdictionVersionNumber";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     Jurisdiction-specific vehicle class / group code, designating the type
     of vehicle the cardholder has privilege to drive.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionVehicleClass"] = 54] = "JurisdictionVehicleClass";
    /**
     Mandatory on all AAMVA barcodes.
     Optional on Magnetic barcodes.

     Jurisdiction-specific codes that represent restrictions to driving
     privileges (such as airbrakes, automatic transmission, daylight only, etc.).
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionRestrictionCodes"] = 55] = "JurisdictionRestrictionCodes";
    /**
     Mandatory on all AAMVA barcodes.
     Optional on Magnetic barcodes.

     Jurisdiction-specific codes that represent additional privileges
     granted to the cardholder beyond the vehicle class (such as transportation of
     passengers, hazardous materials, operation of motorcycles, etc.).
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionEndorsementCodes"] = 56] = "JurisdictionEndorsementCodes";
    /**
     Mandatory on all AAMVA and Compact barcodes.

     Date on which the document was issued. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DocumentIssueDate"] = 57] = "DocumentIssueDate";
    /**
     Mandatory on AAMVA versions 02 and 03.

     Federally established codes for vehicle categories, endorsements, and restrictions
     that are generally applicable to commercial motor vehicles. If the vehicle is not a
     commercial vehicle, "NONE" is to be entered.
     */
    BarcodeElementKey[BarcodeElementKey["FederalCommercialVehicleCodes"] = 58] = "FederalCommercialVehicleCodes";
    /**
     Optional on all AAMVA barcodes.
     Mandatory on Compact barcodes.

     Jurisdictions may define a subfile to contain jurisdiction-specific information.
     These subfiles are designated with the first character of “Z” and the second
     character is the first letter of the jurisdiction's name. For example, "ZC" would
     be the designator for a California or Colorado jurisdiction-defined subfile, "ZQ"
     would be the designator for a Quebec jurisdiction-defined subfile. In the case of
     a jurisdiction-defined subfile that has a first letter that could be more than
     one jurisdiction (e.g. California, Colorado, Connecticut) then other data, like
     the IIN or address, must be examined to determine the jurisdiction.
     */
    BarcodeElementKey[BarcodeElementKey["IssuingJurisdiction"] = 59] = "IssuingJurisdiction";
    /**
     Optional on all AAMVA barcodes.
     Mandatory on Compact barcodes.

     Standard vehicle classification code(s) for cardholder. This data element is a
     placeholder for future efforts to standardize vehicle classifications.
     */
    BarcodeElementKey[BarcodeElementKey["StandardVehicleClassification"] = 60] = "StandardVehicleClassification";
    /**
      Optional on all AAMVA and Magnetic barcodes.

      Name of issuing jurisdiction, for example: Alabama, Alaska ...
      */
    BarcodeElementKey[BarcodeElementKey["IssuingJurisdictionName"] = 61] = "IssuingJurisdictionName";
    /**
     Optional on all AAMVA barcodes.

     Standard endorsement code(s) for cardholder. See codes in D20. This data element is a
     placeholder for future efforts to standardize endorsement codes.

     Code   Description
     H      Hazardous Material - This endorsement is required for the operation of any vehicle
            transporting hazardous materials requiring placarding, as defined by U.S.
            Department of Transportation regulations.
     L      Motorcycles – Including Mopeds/Motorized Bicycles.
     N      Tank - This endorsement is required for the operation of any vehicle transporting,
            as its primary cargo, any liquid or gaseous material within a tank attached to the vehicle.
     O      Other Jurisdiction Specific Endorsement(s) - This code indicates one or more
            additional jurisdiction assigned endorsements.
     P      Passenger - This endorsement is required for the operation of any vehicle used for
            transportation of sixteen or more occupants, including the driver.
     S      School Bus - This endorsement is required for the operation of a school bus. School bus means a
            CMV used to transport pre-primary, primary, or secondary school students from home to school,
            from school to home, or to and from school sponsored events. School bus does not include a
            bus used as common carrier (49 CRF 383.5).
     T      Doubles/Triples - This endorsement is required for the operation of any vehicle that would be
            referred to as a double or triple.
     X      Combined Tank/HAZ-MAT - This endorsement may be issued to any driver who qualifies for
            both the N and H endorsements.
     */
    BarcodeElementKey[BarcodeElementKey["StandardEndorsementCode"] = 62] = "StandardEndorsementCode";
    /**
     Optional on all AAMVA barcodes.

     Standard restriction code(s) for cardholder. See codes in D20. This data element is a placeholder
     for future efforts to standardize restriction codes.

     Code   Description
     B      Corrective Lenses
     C      Mechanical Devices (Special Brakes, Hand Controls, or Other Adaptive Devices)
     D      Prosthetic Aid
     E      Automatic Transmission
     F      Outside Mirror
     G      Limit to Daylight Only
     H      Limit to Employment
     I      Limited Other
     J      Other
     K      CDL Intrastate Only
     L      Vehicles without air brakes
     M      Except Class A bus
     N      Except Class A and Class B bus
     O      Except Tractor-Trailer
     V      Medical Variance Documentation Required
     W      Farm Waiver
     */
    BarcodeElementKey[BarcodeElementKey["StandardRestrictionCode"] = 63] = "StandardRestrictionCode";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Text that explains the jurisdiction-specific code(s) for classifications
     of vehicles cardholder is authorized to drive.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionVehicleClassificationDescription"] = 64] = "JurisdictionVehicleClassificationDescription";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Text that explains the jurisdiction-specific code(s) that indicates additional
     driving privileges granted to the cardholder beyond the vehicle class.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionEndorsmentCodeDescription"] = 65] = "JurisdictionEndorsmentCodeDescription";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Text describing the jurisdiction-specific restriction code(s) that curtail driving privileges.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionRestrictionCodeDescription"] = 66] = "JurisdictionRestrictionCodeDescription";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 barcodes.

     A string of letters and/or numbers that is affixed to the raw materials (card stock,
     laminate, etc.) used in producing driver's licenses and ID cards. (DHS recommended field)
     */
    BarcodeElementKey[BarcodeElementKey["InventoryControlNumber"] = 67] = "InventoryControlNumber";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     DHS required field that indicates date of the most recent version change or
     modification to the visible format of the DL/ID. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["CardRevisionDate"] = 68] = "CardRevisionDate";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Magnetic barcodes.
     Optional and Compact barcodes.

     Number must uniquely identify a particular document issued to that customer
     from others that may have been issued in the past. This number may serve multiple
     purposes of document discrimination, audit information number, and/or inventory control.
     */
    BarcodeElementKey[BarcodeElementKey["DocumentDiscriminator"] = 69] = "DocumentDiscriminator";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     DHS required field that indicates that the cardholder has temporary lawful status = "1".
     */
    BarcodeElementKey[BarcodeElementKey["LimitedDurationDocument"] = 70] = "LimitedDurationDocument";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     A string of letters and/or numbers that identifies when, where, and by whom a driver's
     license/ID card was made. If audit information is not used on the card or the MRT, it
     must be included in the driver record.
     */
    BarcodeElementKey[BarcodeElementKey["AuditInformation"] = 71] = "AuditInformation";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     DHS required field that indicates compliance: "M" = materially compliant,
     "F" = fully compliant, and, "N" = non-compliant.
     */
    BarcodeElementKey[BarcodeElementKey["ComplianceType"] = 72] = "ComplianceType";
    /**
     Optional on AAMVA version 01 barcodes.

     Issue Timestamp. A string used by some jurisdictions to validate the document against their data base.
     */
    BarcodeElementKey[BarcodeElementKey["IssueTimestamp"] = 73] = "IssueTimestamp";
    /**
     Optional on AAMVA version 01 barcodes.

     Driver Permit Expiration Date. MMDDCCYY format. Date permit expires.
     */
    BarcodeElementKey[BarcodeElementKey["PermitExpirationDate"] = 74] = "PermitExpirationDate";
    /**
     Optional on AAMVA version 01 barcodes..

     Type of permit.
     */
    BarcodeElementKey[BarcodeElementKey["PermitIdentifier"] = 75] = "PermitIdentifier";
    /**
     Optional on AAMVA version 01 barcodes..

     Driver Permit Issue Date. MMDDCCYY format. Date permit was issued.
     */
    BarcodeElementKey[BarcodeElementKey["PermitIssueDate"] = 76] = "PermitIssueDate";
    /**
     Optional on AAMVA version 01.

     Number of duplicate cards issued for a license or ID if any.
     */
    BarcodeElementKey[BarcodeElementKey["NumberOfDuplicates"] = 77] = "NumberOfDuplicates";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     Date on which the hazardous material endorsement granted by the document is
     no longer valid. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["HAZMATExpirationDate"] = 78] = "HAZMATExpirationDate";
    /**
     Optional on AAMVA version 01.

     Medical Indicator/Codes.
     STATE SPECIFIC. Freeform, Standard "TBD"
     */
    BarcodeElementKey[BarcodeElementKey["MedicalIndicator"] = 79] = "MedicalIndicator";
    /**
     Optional on AAMVA version 01.

     Non-Resident Indicator. "Y". Used by some jurisdictions to indicate holder of the document is a non-resident.
     */
    BarcodeElementKey[BarcodeElementKey["NonResident"] = 80] = "NonResident";
    /**
     Optional on AAMVA version 01.

     A number or alphanumeric string used by some jurisdictions to identify a "customer" across multiple data bases.
     */
    BarcodeElementKey[BarcodeElementKey["UniqueCustomerId"] = 81] = "UniqueCustomerId";
    /**
     Optional on compact barcodes.

     Document discriminator.
     */
    BarcodeElementKey[BarcodeElementKey["DataDiscriminator"] = 82] = "DataDiscriminator";
    /**
     Optional on Magnetic barcodes.

     Month on which the driving and identification privileges granted by the document are
     no longer valid. (MMYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DocumentExpirationMonth"] = 83] = "DocumentExpirationMonth";
    /**
     Optional on Magnetic barcodes.

     Field that indicates that the driving and identification privileges granted by the
     document are nonexpiring = "1".
     */
    BarcodeElementKey[BarcodeElementKey["DocumentNonexpiring"] = 84] = "DocumentNonexpiring";
    /**
      Optional on Magnetic barcodes.

      Security version beeing used.
    */
    BarcodeElementKey[BarcodeElementKey["SecurityVersion"] = 85] = "SecurityVersion";
    /**
      Number of keys in enum.
    */
    BarcodeElementKey[BarcodeElementKey["Count"] = 86] = "Count";
})(exports.BarcodeElementKey || (exports.BarcodeElementKey = {}));

class ClassFilter {
    constructor() {
        /**
         * If set, specified fields will be anonymized on documents issued by
         * specified country only. Otherwise, issuing country will not be taken into
         * account during anonymization.
         */
        this.country = null;
        /**
         * If set, specified fields will be anonymized on documents issued by
         * specified region only. Otherwise, issuing region will not be taken into
         * account during anonymization.
         */
        this.region = null;
        /**
         * If set, specified fields will be anonymized on documents of specified
         * type only. Otherwise, document type will not be taken into account during
         * anonymization.
         */
        this.type = null;
    }
}

(function (Country) {
    Country[Country["NONE"] = 0] = "NONE";
    Country[Country["ALBANIA"] = 1] = "ALBANIA";
    Country[Country["ALGERIA"] = 2] = "ALGERIA";
    Country[Country["ARGENTINA"] = 3] = "ARGENTINA";
    Country[Country["AUSTRALIA"] = 4] = "AUSTRALIA";
    Country[Country["AUSTRIA"] = 5] = "AUSTRIA";
    Country[Country["AZERBAIJAN"] = 6] = "AZERBAIJAN";
    Country[Country["BAHRAIN"] = 7] = "BAHRAIN";
    Country[Country["BANGLADESH"] = 8] = "BANGLADESH";
    Country[Country["BELGIUM"] = 9] = "BELGIUM";
    Country[Country["BOSNIA_AND_HERZEGOVINA"] = 10] = "BOSNIA_AND_HERZEGOVINA";
    Country[Country["BRUNEI"] = 11] = "BRUNEI";
    Country[Country["BULGARIA"] = 12] = "BULGARIA";
    Country[Country["CAMBODIA"] = 13] = "CAMBODIA";
    Country[Country["CANADA"] = 14] = "CANADA";
    Country[Country["CHILE"] = 15] = "CHILE";
    Country[Country["COLOMBIA"] = 16] = "COLOMBIA";
    Country[Country["COSTA_RICA"] = 17] = "COSTA_RICA";
    Country[Country["CROATIA"] = 18] = "CROATIA";
    Country[Country["CYPRUS"] = 19] = "CYPRUS";
    Country[Country["CZECHIA"] = 20] = "CZECHIA";
    Country[Country["DENMARK"] = 21] = "DENMARK";
    Country[Country["DOMINICAN_REPUBLIC"] = 22] = "DOMINICAN_REPUBLIC";
    Country[Country["EGYPT"] = 23] = "EGYPT";
    Country[Country["ESTONIA"] = 24] = "ESTONIA";
    Country[Country["FINLAND"] = 25] = "FINLAND";
    Country[Country["FRANCE"] = 26] = "FRANCE";
    Country[Country["GEORGIA"] = 27] = "GEORGIA";
    Country[Country["GERMANY"] = 28] = "GERMANY";
    Country[Country["GHANA"] = 29] = "GHANA";
    Country[Country["GREECE"] = 30] = "GREECE";
    Country[Country["GUATEMALA"] = 31] = "GUATEMALA";
    Country[Country["HONG_KONG"] = 32] = "HONG_KONG";
    Country[Country["HUNGARY"] = 33] = "HUNGARY";
    Country[Country["INDIA"] = 34] = "INDIA";
    Country[Country["INDONESIA"] = 35] = "INDONESIA";
    Country[Country["IRELAND"] = 36] = "IRELAND";
    Country[Country["ISRAEL"] = 37] = "ISRAEL";
    Country[Country["ITALY"] = 38] = "ITALY";
    Country[Country["JORDAN"] = 39] = "JORDAN";
    Country[Country["KAZAKHSTAN"] = 40] = "KAZAKHSTAN";
    Country[Country["KENYA"] = 41] = "KENYA";
    Country[Country["KOSOVO"] = 42] = "KOSOVO";
    Country[Country["KUWAIT"] = 43] = "KUWAIT";
    Country[Country["LATVIA"] = 44] = "LATVIA";
    Country[Country["LITHUANIA"] = 45] = "LITHUANIA";
    Country[Country["MALAYSIA"] = 46] = "MALAYSIA";
    Country[Country["MALDIVES"] = 47] = "MALDIVES";
    Country[Country["MALTA"] = 48] = "MALTA";
    Country[Country["MAURITIUS"] = 49] = "MAURITIUS";
    Country[Country["MEXICO"] = 50] = "MEXICO";
    Country[Country["MOROCCO"] = 51] = "MOROCCO";
    Country[Country["NETHERLANDS"] = 52] = "NETHERLANDS";
    Country[Country["NEW_ZEALAND"] = 53] = "NEW_ZEALAND";
    Country[Country["NIGERIA"] = 54] = "NIGERIA";
    Country[Country["PAKISTAN"] = 55] = "PAKISTAN";
    Country[Country["PANAMA"] = 56] = "PANAMA";
    Country[Country["PARAGUAY"] = 57] = "PARAGUAY";
    Country[Country["PHILIPPINES"] = 58] = "PHILIPPINES";
    Country[Country["POLAND"] = 59] = "POLAND";
    Country[Country["PORTUGAL"] = 60] = "PORTUGAL";
    Country[Country["PUERTO_RICO"] = 61] = "PUERTO_RICO";
    Country[Country["QATAR"] = 62] = "QATAR";
    Country[Country["ROMANIA"] = 63] = "ROMANIA";
    Country[Country["RUSSIA"] = 64] = "RUSSIA";
    Country[Country["SAUDI_ARABIA"] = 65] = "SAUDI_ARABIA";
    Country[Country["SERBIA"] = 66] = "SERBIA";
    Country[Country["SINGAPORE"] = 67] = "SINGAPORE";
    Country[Country["SLOVAKIA"] = 68] = "SLOVAKIA";
    Country[Country["SLOVENIA"] = 69] = "SLOVENIA";
    Country[Country["SOUTH_AFRICA"] = 70] = "SOUTH_AFRICA";
    Country[Country["SPAIN"] = 71] = "SPAIN";
    Country[Country["SWEDEN"] = 72] = "SWEDEN";
    Country[Country["SWITZERLAND"] = 73] = "SWITZERLAND";
    Country[Country["TAIWAN"] = 74] = "TAIWAN";
    Country[Country["THAILAND"] = 75] = "THAILAND";
    Country[Country["TUNISIA"] = 76] = "TUNISIA";
    Country[Country["TURKEY"] = 77] = "TURKEY";
    Country[Country["UAE"] = 78] = "UAE";
    Country[Country["UGANDA"] = 79] = "UGANDA";
    Country[Country["UK"] = 80] = "UK";
    Country[Country["UKRAINE"] = 81] = "UKRAINE";
    Country[Country["USA"] = 82] = "USA";
    Country[Country["VIETNAM"] = 83] = "VIETNAM";
    Country[Country["BRAZIL"] = 84] = "BRAZIL";
    Country[Country["NORWAY"] = 85] = "NORWAY";
    Country[Country["OMAN"] = 86] = "OMAN";
    Country[Country["ECUADOR"] = 87] = "ECUADOR";
    Country[Country["EL_SALVADOR"] = 88] = "EL_SALVADOR";
    Country[Country["SRI_LANKA"] = 89] = "SRI_LANKA";
    Country[Country["PERU"] = 90] = "PERU";
    Country[Country["URUGUAY"] = 91] = "URUGUAY";
    Country[Country["BAHAMAS"] = 92] = "BAHAMAS";
    Country[Country["BERMUDA"] = 93] = "BERMUDA";
    Country[Country["BOLIVIA"] = 94] = "BOLIVIA";
    Country[Country["CHINA"] = 95] = "CHINA";
    Country[Country["EUROPEAN_UNION"] = 96] = "EUROPEAN_UNION";
    Country[Country["HAITI"] = 97] = "HAITI";
    Country[Country["HONDURAS"] = 98] = "HONDURAS";
    Country[Country["ICELAND"] = 99] = "ICELAND";
    Country[Country["JAPAN"] = 100] = "JAPAN";
    Country[Country["LUXEMBOURG"] = 101] = "LUXEMBOURG";
    Country[Country["MONTENEGRO"] = 102] = "MONTENEGRO";
    Country[Country["NICARAGUA"] = 103] = "NICARAGUA";
    Country[Country["SOUTH_KOREA"] = 104] = "SOUTH_KOREA";
    Country[Country["VENEZUELA"] = 105] = "VENEZUELA";
    Country[Country["AFGHANISTAN"] = 106] = "AFGHANISTAN";
    Country[Country["ALAND_ISLANDS"] = 107] = "ALAND_ISLANDS";
    Country[Country["AMERICAN_SAMOA"] = 108] = "AMERICAN_SAMOA";
    Country[Country["ANDORRA"] = 109] = "ANDORRA";
    Country[Country["ANGOLA"] = 110] = "ANGOLA";
    Country[Country["ANGUILLA"] = 111] = "ANGUILLA";
    Country[Country["ANTARCTICA"] = 112] = "ANTARCTICA";
    Country[Country["ANTIGUA_AND_BARBUDA"] = 113] = "ANTIGUA_AND_BARBUDA";
    Country[Country["ARMENIA"] = 114] = "ARMENIA";
    Country[Country["ARUBA"] = 115] = "ARUBA";
    Country[Country["BAILIWICK_OF_GUERNSEY"] = 116] = "BAILIWICK_OF_GUERNSEY";
    Country[Country["BAILIWICK_OF_JERSEY"] = 117] = "BAILIWICK_OF_JERSEY";
    Country[Country["BARBADOS"] = 118] = "BARBADOS";
    Country[Country["BELARUS"] = 119] = "BELARUS";
    Country[Country["BELIZE"] = 120] = "BELIZE";
    Country[Country["BENIN"] = 121] = "BENIN";
    Country[Country["BHUTAN"] = 122] = "BHUTAN";
    Country[Country["BONAIRE_SAINT_EUSTATIUS_AND_SABA"] = 123] = "BONAIRE_SAINT_EUSTATIUS_AND_SABA";
    Country[Country["BOTSWANA"] = 124] = "BOTSWANA";
    Country[Country["BOUVET_ISLAND"] = 125] = "BOUVET_ISLAND";
    Country[Country["BRITISH_INDIAN_OCEAN_TERRITORY"] = 126] = "BRITISH_INDIAN_OCEAN_TERRITORY";
    Country[Country["BURKINA_FASO"] = 127] = "BURKINA_FASO";
    Country[Country["BURUNDI"] = 128] = "BURUNDI";
    Country[Country["CAMEROON"] = 129] = "CAMEROON";
    Country[Country["CAPE_VERDE"] = 130] = "CAPE_VERDE";
    Country[Country["CARIBBEAN_NETHERLANDS"] = 131] = "CARIBBEAN_NETHERLANDS";
    Country[Country["CAYMAN_ISLANDS"] = 132] = "CAYMAN_ISLANDS";
    Country[Country["CENTRAL_AFRICAN_REPUBLIC"] = 133] = "CENTRAL_AFRICAN_REPUBLIC";
    Country[Country["CHAD"] = 134] = "CHAD";
    Country[Country["CHRISTMAS_ISLAND"] = 135] = "CHRISTMAS_ISLAND";
    Country[Country["COCOS_ISLANDS"] = 136] = "COCOS_ISLANDS";
    Country[Country["COMOROS"] = 137] = "COMOROS";
    Country[Country["CONGO"] = 138] = "CONGO";
    Country[Country["COOK_ISLANDS"] = 139] = "COOK_ISLANDS";
    Country[Country["CUBA"] = 140] = "CUBA";
    Country[Country["CURACAO"] = 141] = "CURACAO";
    Country[Country["DEMOCRATIC_REPUBLIC_OF_THE_CONGO"] = 142] = "DEMOCRATIC_REPUBLIC_OF_THE_CONGO";
    Country[Country["DJIBOUTI"] = 143] = "DJIBOUTI";
    Country[Country["DOMINICA"] = 144] = "DOMINICA";
    Country[Country["EAST_TIMOR"] = 145] = "EAST_TIMOR";
    Country[Country["EQUATORIAL_GUINEA"] = 146] = "EQUATORIAL_GUINEA";
    Country[Country["ERITREA"] = 147] = "ERITREA";
    Country[Country["ETHIOPIA"] = 148] = "ETHIOPIA";
    Country[Country["FALKLAND_ISLANDS"] = 149] = "FALKLAND_ISLANDS";
    Country[Country["FAROE_ISLANDS"] = 150] = "FAROE_ISLANDS";
    Country[Country["FEDERATED_STATES_OF_MICRONESIA"] = 151] = "FEDERATED_STATES_OF_MICRONESIA";
    Country[Country["FIJI"] = 152] = "FIJI";
    Country[Country["FRENCH_GUIANA"] = 153] = "FRENCH_GUIANA";
    Country[Country["FRENCH_POLYNESIA"] = 154] = "FRENCH_POLYNESIA";
    Country[Country["FRENCH_SOUTHERN_TERRITORIES"] = 155] = "FRENCH_SOUTHERN_TERRITORIES";
    Country[Country["GABON"] = 156] = "GABON";
    Country[Country["GAMBIA"] = 157] = "GAMBIA";
    Country[Country["GIBRALTAR"] = 158] = "GIBRALTAR";
    Country[Country["GREENLAND"] = 159] = "GREENLAND";
    Country[Country["GRENADA"] = 160] = "GRENADA";
    Country[Country["GUADELOUPE"] = 161] = "GUADELOUPE";
    Country[Country["GUAM"] = 162] = "GUAM";
    Country[Country["GUINEA"] = 163] = "GUINEA";
    Country[Country["GUINEA_BISSAU"] = 164] = "GUINEA_BISSAU";
    Country[Country["GUYANA"] = 165] = "GUYANA";
    Country[Country["HEARD_ISLAND_AND_MCDONALD_ISLANDS"] = 166] = "HEARD_ISLAND_AND_MCDONALD_ISLANDS";
    Country[Country["IRAN"] = 167] = "IRAN";
    Country[Country["IRAQ"] = 168] = "IRAQ";
    Country[Country["ISLE_OF_MAN"] = 169] = "ISLE_OF_MAN";
    Country[Country["IVORY_COAST"] = 170] = "IVORY_COAST";
    Country[Country["JAMAICA"] = 171] = "JAMAICA";
    Country[Country["KIRIBATI"] = 172] = "KIRIBATI";
    Country[Country["KYRGYZSTAN"] = 173] = "KYRGYZSTAN";
    Country[Country["LAOS"] = 174] = "LAOS";
    Country[Country["LEBANON"] = 175] = "LEBANON";
    Country[Country["LESOTHO"] = 176] = "LESOTHO";
    Country[Country["LIBERIA"] = 177] = "LIBERIA";
    Country[Country["LIBYA"] = 178] = "LIBYA";
    Country[Country["LIECHTENSTEIN"] = 179] = "LIECHTENSTEIN";
    Country[Country["MACAU"] = 180] = "MACAU";
    Country[Country["MADAGASCAR"] = 181] = "MADAGASCAR";
    Country[Country["MALAWI"] = 182] = "MALAWI";
    Country[Country["MALI"] = 183] = "MALI";
    Country[Country["MARSHALL_ISLANDS"] = 184] = "MARSHALL_ISLANDS";
    Country[Country["MARTINIQUE"] = 185] = "MARTINIQUE";
    Country[Country["MAURITANIA"] = 186] = "MAURITANIA";
    Country[Country["MAYOTTE"] = 187] = "MAYOTTE";
    Country[Country["MOLDOVA"] = 188] = "MOLDOVA";
    Country[Country["MONACO"] = 189] = "MONACO";
    Country[Country["MONGOLIA"] = 190] = "MONGOLIA";
    Country[Country["MONTSERRAT"] = 191] = "MONTSERRAT";
    Country[Country["MOZAMBIQUE"] = 192] = "MOZAMBIQUE";
    Country[Country["MYANMAR"] = 193] = "MYANMAR";
    Country[Country["NAMIBIA"] = 194] = "NAMIBIA";
    Country[Country["NAURU"] = 195] = "NAURU";
    Country[Country["NEPAL"] = 196] = "NEPAL";
    Country[Country["NEW_CALEDONIA"] = 197] = "NEW_CALEDONIA";
    Country[Country["NIGER"] = 198] = "NIGER";
    Country[Country["NIUE"] = 199] = "NIUE";
    Country[Country["NORFOLK_ISLAND"] = 200] = "NORFOLK_ISLAND";
    Country[Country["NORTHERN_CYPRUS"] = 201] = "NORTHERN_CYPRUS";
    Country[Country["NORTHERN_MARIANA_ISLANDS"] = 202] = "NORTHERN_MARIANA_ISLANDS";
    Country[Country["NORTH_KOREA"] = 203] = "NORTH_KOREA";
    Country[Country["NORTH_MACEDONIA"] = 204] = "NORTH_MACEDONIA";
    Country[Country["PALAU"] = 205] = "PALAU";
    Country[Country["PALESTINE"] = 206] = "PALESTINE";
    Country[Country["PAPUA_NEW_GUINEA"] = 207] = "PAPUA_NEW_GUINEA";
    Country[Country["PITCAIRN"] = 208] = "PITCAIRN";
    Country[Country["REUNION"] = 209] = "REUNION";
    Country[Country["RWANDA"] = 210] = "RWANDA";
    Country[Country["SAINT_BARTHELEMY"] = 211] = "SAINT_BARTHELEMY";
    Country[Country["SAINT_HELENA_ASCENSION_AND_TRISTIAN_DA_CUNHA"] = 212] = "SAINT_HELENA_ASCENSION_AND_TRISTIAN_DA_CUNHA";
    Country[Country["SAINT_KITTS_AND_NEVIS"] = 213] = "SAINT_KITTS_AND_NEVIS";
    Country[Country["SAINT_LUCIA"] = 214] = "SAINT_LUCIA";
    Country[Country["SAINT_MARTIN"] = 215] = "SAINT_MARTIN";
    Country[Country["SAINT_PIERRE_AND_MIQUELON"] = 216] = "SAINT_PIERRE_AND_MIQUELON";
    Country[Country["SAINT_VINCENT_AND_THE_GRENADINES"] = 217] = "SAINT_VINCENT_AND_THE_GRENADINES";
    Country[Country["SAMOA"] = 218] = "SAMOA";
    Country[Country["SAN_MARINO"] = 219] = "SAN_MARINO";
    Country[Country["SAO_TOME_AND_PRINCIPE"] = 220] = "SAO_TOME_AND_PRINCIPE";
    Country[Country["SENEGAL"] = 221] = "SENEGAL";
    Country[Country["SEYCHELLES"] = 222] = "SEYCHELLES";
    Country[Country["SIERRA_LEONE"] = 223] = "SIERRA_LEONE";
    Country[Country["SINT_MAARTEN"] = 224] = "SINT_MAARTEN";
    Country[Country["SOLOMON_ISLANDS"] = 225] = "SOLOMON_ISLANDS";
    Country[Country["SOMALIA"] = 226] = "SOMALIA";
    Country[Country["SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS"] = 227] = "SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS";
    Country[Country["SOUTH_SUDAN"] = 228] = "SOUTH_SUDAN";
    Country[Country["SUDAN"] = 229] = "SUDAN";
    Country[Country["SURINAME"] = 230] = "SURINAME";
    Country[Country["SVALBARD_AND_JAN_MAYEN"] = 231] = "SVALBARD_AND_JAN_MAYEN";
    Country[Country["ESWATINI"] = 232] = "ESWATINI";
    Country[Country["SYRIA"] = 233] = "SYRIA";
    Country[Country["TAJIKISTAN"] = 234] = "TAJIKISTAN";
    Country[Country["TANZANIA"] = 235] = "TANZANIA";
    Country[Country["TOGO"] = 236] = "TOGO";
    Country[Country["TOKELAU"] = 237] = "TOKELAU";
    Country[Country["TONGA"] = 238] = "TONGA";
    Country[Country["TRINIDAD_AND_TOBAGO"] = 239] = "TRINIDAD_AND_TOBAGO";
    Country[Country["TURKMENISTAN"] = 240] = "TURKMENISTAN";
    Country[Country["TURKS_AND_CAICOS_ISLANDS"] = 241] = "TURKS_AND_CAICOS_ISLANDS";
    Country[Country["TUVALU"] = 242] = "TUVALU";
    Country[Country["UNITED_STATES_MINOR_OUTLYING_ISLANDS"] = 243] = "UNITED_STATES_MINOR_OUTLYING_ISLANDS";
    Country[Country["UZBEKISTAN"] = 244] = "UZBEKISTAN";
    Country[Country["VANUATU"] = 245] = "VANUATU";
    Country[Country["VATICAN_CITY"] = 246] = "VATICAN_CITY";
    Country[Country["VIRGIN_ISLANDS_BRITISH"] = 247] = "VIRGIN_ISLANDS_BRITISH";
    Country[Country["VIRGIN_ISLANDS_US"] = 248] = "VIRGIN_ISLANDS_US";
    Country[Country["WALLIS_AND_FUTUNA"] = 249] = "WALLIS_AND_FUTUNA";
    Country[Country["WESTERN_SAHARA"] = 250] = "WESTERN_SAHARA";
    Country[Country["YEMEN"] = 251] = "YEMEN";
    Country[Country["YUGOSLAVIA"] = 252] = "YUGOSLAVIA";
    Country[Country["ZAMBIA"] = 253] = "ZAMBIA";
    Country[Country["ZIMBABWE"] = 254] = "ZIMBABWE";
    Country[Country["SCHENGEN_AREA"] = 255] = "SCHENGEN_AREA";
    Country[Country["COUNT"] = 256] = "COUNT";
})(exports.Country || (exports.Country = {}));
(function (Region) {
    Region[Region["NONE"] = 0] = "NONE";
    Region[Region["ALABAMA"] = 1] = "ALABAMA";
    Region[Region["ALASKA"] = 2] = "ALASKA";
    Region[Region["ALBERTA"] = 3] = "ALBERTA";
    Region[Region["ARIZONA"] = 4] = "ARIZONA";
    Region[Region["ARKANSAS"] = 5] = "ARKANSAS";
    Region[Region["AUSTRALIAN_CAPITAL_TERRITORY"] = 6] = "AUSTRALIAN_CAPITAL_TERRITORY";
    Region[Region["BRITISH_COLUMBIA"] = 7] = "BRITISH_COLUMBIA";
    Region[Region["CALIFORNIA"] = 8] = "CALIFORNIA";
    Region[Region["COLORADO"] = 9] = "COLORADO";
    Region[Region["CONNECTICUT"] = 10] = "CONNECTICUT";
    Region[Region["DELAWARE"] = 11] = "DELAWARE";
    Region[Region["DISTRICT_OF_COLUMBIA"] = 12] = "DISTRICT_OF_COLUMBIA";
    Region[Region["FLORIDA"] = 13] = "FLORIDA";
    Region[Region["GEORGIA"] = 14] = "GEORGIA";
    Region[Region["HAWAII"] = 15] = "HAWAII";
    Region[Region["IDAHO"] = 16] = "IDAHO";
    Region[Region["ILLINOIS"] = 17] = "ILLINOIS";
    Region[Region["INDIANA"] = 18] = "INDIANA";
    Region[Region["IOWA"] = 19] = "IOWA";
    Region[Region["KANSAS"] = 20] = "KANSAS";
    Region[Region["KENTUCKY"] = 21] = "KENTUCKY";
    Region[Region["LOUISIANA"] = 22] = "LOUISIANA";
    Region[Region["MAINE"] = 23] = "MAINE";
    Region[Region["MANITOBA"] = 24] = "MANITOBA";
    Region[Region["MARYLAND"] = 25] = "MARYLAND";
    Region[Region["MASSACHUSETTS"] = 26] = "MASSACHUSETTS";
    Region[Region["MICHIGAN"] = 27] = "MICHIGAN";
    Region[Region["MINNESOTA"] = 28] = "MINNESOTA";
    Region[Region["MISSISSIPPI"] = 29] = "MISSISSIPPI";
    Region[Region["MISSOURI"] = 30] = "MISSOURI";
    Region[Region["MONTANA"] = 31] = "MONTANA";
    Region[Region["NEBRASKA"] = 32] = "NEBRASKA";
    Region[Region["NEVADA"] = 33] = "NEVADA";
    Region[Region["NEW_BRUNSWICK"] = 34] = "NEW_BRUNSWICK";
    Region[Region["NEW_HAMPSHIRE"] = 35] = "NEW_HAMPSHIRE";
    Region[Region["NEW_JERSEY"] = 36] = "NEW_JERSEY";
    Region[Region["NEW_MEXICO"] = 37] = "NEW_MEXICO";
    Region[Region["NEW_SOUTH_WALES"] = 38] = "NEW_SOUTH_WALES";
    Region[Region["NEW_YORK"] = 39] = "NEW_YORK";
    Region[Region["NORTHERN_TERRITORY"] = 40] = "NORTHERN_TERRITORY";
    Region[Region["NORTH_CAROLINA"] = 41] = "NORTH_CAROLINA";
    Region[Region["NORTH_DAKOTA"] = 42] = "NORTH_DAKOTA";
    Region[Region["NOVA_SCOTIA"] = 43] = "NOVA_SCOTIA";
    Region[Region["OHIO"] = 44] = "OHIO";
    Region[Region["OKLAHOMA"] = 45] = "OKLAHOMA";
    Region[Region["ONTARIO"] = 46] = "ONTARIO";
    Region[Region["OREGON"] = 47] = "OREGON";
    Region[Region["PENNSYLVANIA"] = 48] = "PENNSYLVANIA";
    Region[Region["QUEBEC"] = 49] = "QUEBEC";
    Region[Region["QUEENSLAND"] = 50] = "QUEENSLAND";
    Region[Region["RHODE_ISLAND"] = 51] = "RHODE_ISLAND";
    Region[Region["SASKATCHEWAN"] = 52] = "SASKATCHEWAN";
    Region[Region["SOUTH_AUSTRALIA"] = 53] = "SOUTH_AUSTRALIA";
    Region[Region["SOUTH_CAROLINA"] = 54] = "SOUTH_CAROLINA";
    Region[Region["SOUTH_DAKOTA"] = 55] = "SOUTH_DAKOTA";
    Region[Region["TASMANIA"] = 56] = "TASMANIA";
    Region[Region["TENNESSEE"] = 57] = "TENNESSEE";
    Region[Region["TEXAS"] = 58] = "TEXAS";
    Region[Region["UTAH"] = 59] = "UTAH";
    Region[Region["VERMONT"] = 60] = "VERMONT";
    Region[Region["VICTORIA"] = 61] = "VICTORIA";
    Region[Region["VIRGINIA"] = 62] = "VIRGINIA";
    Region[Region["WASHINGTON"] = 63] = "WASHINGTON";
    Region[Region["WESTERN_AUSTRALIA"] = 64] = "WESTERN_AUSTRALIA";
    Region[Region["WEST_VIRGINIA"] = 65] = "WEST_VIRGINIA";
    Region[Region["WISCONSIN"] = 66] = "WISCONSIN";
    Region[Region["WYOMING"] = 67] = "WYOMING";
    Region[Region["YUKON"] = 68] = "YUKON";
    Region[Region["CIUDAD_DE_MEXICO"] = 69] = "CIUDAD_DE_MEXICO";
    Region[Region["JALISCO"] = 70] = "JALISCO";
    Region[Region["NEWFOUNDLAND_AND_LABRADOR"] = 71] = "NEWFOUNDLAND_AND_LABRADOR";
    Region[Region["NUEVO_LEON"] = 72] = "NUEVO_LEON";
    Region[Region["BAJA_CALIFORNIA"] = 73] = "BAJA_CALIFORNIA";
    Region[Region["CHIHUAHUA"] = 74] = "CHIHUAHUA";
    Region[Region["GUANAJUATO"] = 75] = "GUANAJUATO";
    Region[Region["GUERRERO"] = 76] = "GUERRERO";
    Region[Region["MEXICO"] = 77] = "MEXICO";
    Region[Region["MICHOACAN"] = 78] = "MICHOACAN";
    Region[Region["NEW_YORK_CITY"] = 79] = "NEW_YORK_CITY";
    Region[Region["TAMAULIPAS"] = 80] = "TAMAULIPAS";
    Region[Region["VERACRUZ"] = 81] = "VERACRUZ";
    Region[Region["CHIAPAS"] = 82] = "CHIAPAS";
    Region[Region["COAHUILA"] = 83] = "COAHUILA";
    Region[Region["DURANGO"] = 84] = "DURANGO";
    Region[Region["GUERRERO_COCULA"] = 85] = "GUERRERO_COCULA";
    Region[Region["GUERRERO_JUCHITAN"] = 86] = "GUERRERO_JUCHITAN";
    Region[Region["GUERRERO_TEPECOACUILCO"] = 87] = "GUERRERO_TEPECOACUILCO";
    Region[Region["GUERRERO_TLACOAPA"] = 88] = "GUERRERO_TLACOAPA";
    Region[Region["GUJARAT"] = 89] = "GUJARAT";
    Region[Region["HIDALGO"] = 90] = "HIDALGO";
    Region[Region["KARNATAKA"] = 91] = "KARNATAKA";
    Region[Region["KERALA"] = 92] = "KERALA";
    Region[Region["KHYBER_PAKHTUNKHWA"] = 93] = "KHYBER_PAKHTUNKHWA";
    Region[Region["MADHYA_PRADESH"] = 94] = "MADHYA_PRADESH";
    Region[Region["MAHARASHTRA"] = 95] = "MAHARASHTRA";
    Region[Region["MORELOS"] = 96] = "MORELOS";
    Region[Region["NAYARIT"] = 97] = "NAYARIT";
    Region[Region["OAXACA"] = 98] = "OAXACA";
    Region[Region["PUEBLA"] = 99] = "PUEBLA";
    Region[Region["PUNJAB"] = 100] = "PUNJAB";
    Region[Region["QUERETARO"] = 101] = "QUERETARO";
    Region[Region["SAN_LUIS_POTOSI"] = 102] = "SAN_LUIS_POTOSI";
    Region[Region["SINALOA"] = 103] = "SINALOA";
    Region[Region["SONORA"] = 104] = "SONORA";
    Region[Region["TABASCO"] = 105] = "TABASCO";
    Region[Region["TAMIL_NADU"] = 106] = "TAMIL_NADU";
    Region[Region["YUCATAN"] = 107] = "YUCATAN";
    Region[Region["ZACATECAS"] = 108] = "ZACATECAS";
    Region[Region["AGUASCALIENTES"] = 109] = "AGUASCALIENTES";
    Region[Region["BAJA_CALIFORNIA_SUR"] = 110] = "BAJA_CALIFORNIA_SUR";
    Region[Region["CAMPECHE"] = 111] = "CAMPECHE";
    Region[Region["COLIMA"] = 112] = "COLIMA";
    Region[Region["QUINTANA_ROO_BENITO_JUAREZ"] = 113] = "QUINTANA_ROO_BENITO_JUAREZ";
    Region[Region["UINTANA_ROO"] = 114] = "UINTANA_ROO";
    Region[Region["QUINTANA_ROO_SOLIDARIDAD"] = 115] = "QUINTANA_ROO_SOLIDARIDAD";
    Region[Region["TLAXCALA"] = 116] = "TLAXCALA";
    Region[Region["QUINTANA_ROO_COZUMEL"] = 117] = "QUINTANA_ROO_COZUMEL";
    Region[Region["SAO_PAOLO"] = 118] = "SAO_PAOLO";
    Region[Region["RIO_DE_JANEIRO"] = 119] = "RIO_DE_JANEIRO";
    Region[Region["RIO_GRANDE_DO_SUL"] = 120] = "RIO_GRANDE_DO_SUL";
    Region[Region["NORTHWEST_TERRITORIES"] = 121] = "NORTHWEST_TERRITORIES";
    Region[Region["NUNAVUT"] = 122] = "NUNAVUT";
    Region[Region["PRINCE_EDWARD_ISLAND"] = 123] = "PRINCE_EDWARD_ISLAND";
    Region[Region["DISTRITO_FEDERAL"] = 124] = "DISTRITO_FEDERAL";
    Region[Region["MARANHAO"] = 125] = "MARANHAO";
    Region[Region["MATO_GROSSO"] = 126] = "MATO_GROSSO";
    Region[Region["MINAS_GERAIS"] = 127] = "MINAS_GERAIS";
    Region[Region["PARA"] = 128] = "PARA";
    Region[Region["PARANA"] = 129] = "PARANA";
    Region[Region["PERNAMBUCO"] = 130] = "PERNAMBUCO";
    Region[Region["SANTA_CATARINA"] = 131] = "SANTA_CATARINA";
    Region[Region["ANDHRA_PRADESH"] = 132] = "ANDHRA_PRADESH";
    Region[Region["CEARA"] = 133] = "CEARA";
    Region[Region["GOIAS"] = 134] = "GOIAS";
    Region[Region["GUERRERO_ACAPULCO_DE_JUAREZ"] = 135] = "GUERRERO_ACAPULCO_DE_JUAREZ";
    Region[Region["HARYANA"] = 136] = "HARYANA";
    Region[Region["SERGIPE"] = 137] = "SERGIPE";
    Region[Region["ALAGOAS"] = 138] = "ALAGOAS";
    Region[Region["BANGSAMORO"] = 139] = "BANGSAMORO";
    Region[Region["COUNT"] = 140] = "COUNT";
})(exports.Region || (exports.Region = {}));
(function (DocumentType) {
    DocumentType[DocumentType["NONE"] = 0] = "NONE";
    DocumentType[DocumentType["CONSULAR_ID"] = 1] = "CONSULAR_ID";
    DocumentType[DocumentType["DL"] = 2] = "DL";
    DocumentType[DocumentType["DL_PUBLIC_SERVICES_CARD"] = 3] = "DL_PUBLIC_SERVICES_CARD";
    DocumentType[DocumentType["EMPLOYMENT_PASS"] = 4] = "EMPLOYMENT_PASS";
    DocumentType[DocumentType["FIN_CARD"] = 5] = "FIN_CARD";
    DocumentType[DocumentType["ID"] = 6] = "ID";
    DocumentType[DocumentType["MULTIPURPOSE_ID"] = 7] = "MULTIPURPOSE_ID";
    DocumentType[DocumentType["MYKAD"] = 8] = "MYKAD";
    DocumentType[DocumentType["MYKID"] = 9] = "MYKID";
    DocumentType[DocumentType["MYPR"] = 10] = "MYPR";
    DocumentType[DocumentType["MYTENTERA"] = 11] = "MYTENTERA";
    DocumentType[DocumentType["PAN_CARD"] = 12] = "PAN_CARD";
    DocumentType[DocumentType["PROFESSIONAL_ID"] = 13] = "PROFESSIONAL_ID";
    DocumentType[DocumentType["PUBLIC_SERVICES_CARD"] = 14] = "PUBLIC_SERVICES_CARD";
    DocumentType[DocumentType["RESIDENCE_PERMIT"] = 15] = "RESIDENCE_PERMIT";
    DocumentType[DocumentType["RESIDENT_ID"] = 16] = "RESIDENT_ID";
    DocumentType[DocumentType["TEMPORARY_RESIDENCE_PERMIT"] = 17] = "TEMPORARY_RESIDENCE_PERMIT";
    DocumentType[DocumentType["VOTER_ID"] = 18] = "VOTER_ID";
    DocumentType[DocumentType["WORK_PERMIT"] = 19] = "WORK_PERMIT";
    DocumentType[DocumentType["IKAD"] = 20] = "IKAD";
    DocumentType[DocumentType["MILITARY_ID"] = 21] = "MILITARY_ID";
    DocumentType[DocumentType["MYKAS"] = 22] = "MYKAS";
    DocumentType[DocumentType["SOCIAL_SECURITY_CARD"] = 23] = "SOCIAL_SECURITY_CARD";
    DocumentType[DocumentType["HEALTH_INSURANCE_CARD"] = 24] = "HEALTH_INSURANCE_CARD";
    DocumentType[DocumentType["PASSPORT"] = 25] = "PASSPORT";
    DocumentType[DocumentType["S_PASS"] = 26] = "S_PASS";
    DocumentType[DocumentType["ADDRESS_CARD"] = 27] = "ADDRESS_CARD";
    DocumentType[DocumentType["ALIEN_ID"] = 28] = "ALIEN_ID";
    DocumentType[DocumentType["ALIEN_PASSPORT"] = 29] = "ALIEN_PASSPORT";
    DocumentType[DocumentType["GREEN_CARD"] = 30] = "GREEN_CARD";
    DocumentType[DocumentType["MINORS_ID"] = 31] = "MINORS_ID";
    DocumentType[DocumentType["POSTAL_ID"] = 32] = "POSTAL_ID";
    DocumentType[DocumentType["PROFESSIONAL_DL"] = 33] = "PROFESSIONAL_DL";
    DocumentType[DocumentType["TAX_ID"] = 34] = "TAX_ID";
    DocumentType[DocumentType["WEAPON_PERMIT"] = 35] = "WEAPON_PERMIT";
    DocumentType[DocumentType["VISA"] = 36] = "VISA";
    DocumentType[DocumentType["BORDER_CROSSING_CARD"] = 37] = "BORDER_CROSSING_CARD";
    DocumentType[DocumentType["DRIVER_CARD"] = 38] = "DRIVER_CARD";
    DocumentType[DocumentType["GLOBAL_ENTRY_CARD"] = 39] = "GLOBAL_ENTRY_CARD";
    DocumentType[DocumentType["MYPOLIS"] = 40] = "MYPOLIS";
    DocumentType[DocumentType["NEXUS_CARD"] = 41] = "NEXUS_CARD";
    DocumentType[DocumentType["PASSPORT_CARD"] = 42] = "PASSPORT_CARD";
    DocumentType[DocumentType["PROOF_OF_AGE_CARD"] = 43] = "PROOF_OF_AGE_CARD";
    DocumentType[DocumentType["REFUGEE_ID"] = 44] = "REFUGEE_ID";
    DocumentType[DocumentType["TRIBAL_ID"] = 45] = "TRIBAL_ID";
    DocumentType[DocumentType["VETERAN_ID"] = 46] = "VETERAN_ID";
    DocumentType[DocumentType["CITIZENSHIP_CERTIFICATE"] = 47] = "CITIZENSHIP_CERTIFICATE";
    DocumentType[DocumentType["MY_NUMBER_CARD"] = 48] = "MY_NUMBER_CARD";
    DocumentType[DocumentType["CONSULAR_PASSPORT"] = 49] = "CONSULAR_PASSPORT";
    DocumentType[DocumentType["MINORS_PASSPORT"] = 50] = "MINORS_PASSPORT";
    DocumentType[DocumentType["MINORS_PUBLIC_SERVICES_CARD"] = 51] = "MINORS_PUBLIC_SERVICES_CARD";
    DocumentType[DocumentType["DRIVING_PRIVILEGE_CARD"] = 52] = "DRIVING_PRIVILEGE_CARD";
    DocumentType[DocumentType["ASYLUM_REQUEST"] = 53] = "ASYLUM_REQUEST";
    DocumentType[DocumentType["DRIVER_QUALIFICATION_CARD"] = 54] = "DRIVER_QUALIFICATION_CARD";
    DocumentType[DocumentType["PROVISIONAL_DL"] = 55] = "PROVISIONAL_DL";
    DocumentType[DocumentType["REFUGEE_PASSPORT"] = 56] = "REFUGEE_PASSPORT";
    DocumentType[DocumentType["SPECIAL_ID"] = 57] = "SPECIAL_ID";
    DocumentType[DocumentType["UNIFORMED_SERVICES_ID"] = 58] = "UNIFORMED_SERVICES_ID";
    DocumentType[DocumentType["IMMIGRANT_VISA"] = 59] = "IMMIGRANT_VISA";
    DocumentType[DocumentType["CONSULAR_VOTER_ID"] = 60] = "CONSULAR_VOTER_ID";
    DocumentType[DocumentType["TWIC_CARD"] = 61] = "TWIC_CARD";
    DocumentType[DocumentType["EXIT_ENTRY_PERMIT"] = 62] = "EXIT_ENTRY_PERMIT";
    DocumentType[DocumentType["MAINLAND_TRAVEL_PERMIT_TAIWAN"] = 63] = "MAINLAND_TRAVEL_PERMIT_TAIWAN";
    DocumentType[DocumentType["NBI_CLEARANCE"] = 64] = "NBI_CLEARANCE";
    DocumentType[DocumentType["PROOF_OF_REGISTRATION"] = 65] = "PROOF_OF_REGISTRATION";
    DocumentType[DocumentType["TEMPORARY_PROTECTION_PERMIT"] = 66] = "TEMPORARY_PROTECTION_PERMIT";
    DocumentType[DocumentType["AFGHAN_CITIZEN_CARD"] = 67] = "AFGHAN_CITIZEN_CARD";
    DocumentType[DocumentType["EID"] = 68] = "EID";
    DocumentType[DocumentType["PASS"] = 69] = "PASS";
    DocumentType[DocumentType["SIS_ID"] = 70] = "SIS_ID";
    DocumentType[DocumentType["ASIC_CARD"] = 71] = "ASIC_CARD";
    DocumentType[DocumentType["BIDOON_CARD"] = 72] = "BIDOON_CARD";
    DocumentType[DocumentType["INTERIM_HEALTH_INSURANCE_CARD"] = 73] = "INTERIM_HEALTH_INSURANCE_CARD";
    DocumentType[DocumentType["NON_VOTER_ID"] = 74] = "NON_VOTER_ID";
    DocumentType[DocumentType["RECIPROCAL_HEALTH_INSURANCE_CARD"] = 75] = "RECIPROCAL_HEALTH_INSURANCE_CARD";
    DocumentType[DocumentType["VEHICLE_REGISTRATION"] = 76] = "VEHICLE_REGISTRATION";
    DocumentType[DocumentType["ESAAD_CARD"] = 77] = "ESAAD_CARD";
    DocumentType[DocumentType["COUNT"] = 78] = "COUNT";
})(exports.DocumentType || (exports.DocumentType = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 *
 */
class CustomClassRules {
    constructor() {
        /**
         * Specified fields will overrule our class field rules if filter conditions are met.
         */
        this.classFilter = new ClassFilter();
        /**
         * Fields to overrule our class field rules.
         */
        this.fields = new Array();
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 *
 */
class DetailedFieldType {
    constructor(fieldType, alphabetType) {
        this.fieldType = fieldType;
        this.alphabetType = alphabetType;
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (FieldType) {
    FieldType[FieldType["AdditionalAddressInformation"] = 0] = "AdditionalAddressInformation";
    FieldType[FieldType["AdditionalNameInformation"] = 1] = "AdditionalNameInformation";
    FieldType[FieldType["AdditionalOptionalAddressInformation"] = 2] = "AdditionalOptionalAddressInformation";
    FieldType[FieldType["AdditionalPersonalIdNumber"] = 3] = "AdditionalPersonalIdNumber";
    FieldType[FieldType["Address"] = 4] = "Address";
    FieldType[FieldType["ClassEffectiveDate"] = 5] = "ClassEffectiveDate";
    FieldType[FieldType["ClassExpiryDate"] = 6] = "ClassExpiryDate";
    FieldType[FieldType["Conditions"] = 7] = "Conditions";
    FieldType[FieldType["DateOfBirth"] = 8] = "DateOfBirth";
    FieldType[FieldType["DateOfExpiry"] = 9] = "DateOfExpiry";
    FieldType[FieldType["DateOfIssue"] = 10] = "DateOfIssue";
    FieldType[FieldType["DocumentAdditionalNumber"] = 11] = "DocumentAdditionalNumber";
    FieldType[FieldType["DocumentOptionalAdditionalNumber"] = 12] = "DocumentOptionalAdditionalNumber";
    FieldType[FieldType["DocumentNumber"] = 13] = "DocumentNumber";
    FieldType[FieldType["Employer"] = 14] = "Employer";
    FieldType[FieldType["Endorsements"] = 15] = "Endorsements";
    FieldType[FieldType["FathersName"] = 16] = "FathersName";
    FieldType[FieldType["FirstName"] = 17] = "FirstName";
    FieldType[FieldType["FullName"] = 18] = "FullName";
    FieldType[FieldType["IssuingAuthority"] = 19] = "IssuingAuthority";
    FieldType[FieldType["LastName"] = 20] = "LastName";
    FieldType[FieldType["LicenceType"] = 21] = "LicenceType";
    FieldType[FieldType["LocalizedName"] = 22] = "LocalizedName";
    FieldType[FieldType["MaritalStatus"] = 23] = "MaritalStatus";
    FieldType[FieldType["MothersName"] = 24] = "MothersName";
    FieldType[FieldType["Mrz"] = 25] = "Mrz";
    FieldType[FieldType["Nationality"] = 26] = "Nationality";
    FieldType[FieldType["PersonalIdNumber"] = 27] = "PersonalIdNumber";
    FieldType[FieldType["PlaceOfBirth"] = 28] = "PlaceOfBirth";
    FieldType[FieldType["Profession"] = 29] = "Profession";
    FieldType[FieldType["Race"] = 30] = "Race";
    FieldType[FieldType["Religion"] = 31] = "Religion";
    FieldType[FieldType["ResidentialStatus"] = 32] = "ResidentialStatus";
    FieldType[FieldType["Restrictions"] = 33] = "Restrictions";
    FieldType[FieldType["Sex"] = 34] = "Sex";
    FieldType[FieldType["VehicleClass"] = 35] = "VehicleClass";
    FieldType[FieldType["BloodType"] = 36] = "BloodType";
    FieldType[FieldType["Sponsor"] = 37] = "Sponsor";
    FieldType[FieldType["VisaType"] = 38] = "VisaType";
    FieldType[FieldType["DocumentSubtype"] = 39] = "DocumentSubtype";
    FieldType[FieldType["Remarks"] = 40] = "Remarks";
    FieldType[FieldType["ResidencePermitType"] = 41] = "ResidencePermitType";
    FieldType[FieldType["ManufacturingYear"] = 42] = "ManufacturingYear";
    FieldType[FieldType["VehicleType"] = 43] = "VehicleType";
    FieldType[FieldType["DependentDateOfBirth"] = 44] = "DependentDateOfBirth";
    FieldType[FieldType["DependentSex"] = 45] = "DependentSex";
    FieldType[FieldType["DependentDocumentNumber"] = 46] = "DependentDocumentNumber";
    FieldType[FieldType["DependentFullName"] = 47] = "DependentFullName";
    FieldType[FieldType["EligibilityCategory"] = 48] = "EligibilityCategory";
    FieldType[FieldType["SpecificDocumentValidity"] = 49] = "SpecificDocumentValidity";
    FieldType[FieldType["VehicleOwner"] = 50] = "VehicleOwner";
    /** Number of possible field types. */
    FieldType[FieldType["Count"] = 51] = "Count";
})(exports.FieldType || (exports.FieldType = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (ImageExtractionType) {
    ImageExtractionType[ImageExtractionType["FullDocument"] = 0] = "FullDocument";
    ImageExtractionType[ImageExtractionType["Face"] = 1] = "Face";
    ImageExtractionType[ImageExtractionType["Signature"] = 2] = "Signature";
})(exports.ImageExtractionType || (exports.ImageExtractionType = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (DocumentImageColorStatus) {
    /** Determining image color status was not performed */
    DocumentImageColorStatus[DocumentImageColorStatus["NotAvailable"] = 0] = "NotAvailable";
    /** Black-and-white image scanned */
    DocumentImageColorStatus[DocumentImageColorStatus["BlackAndWhite"] = 1] = "BlackAndWhite";
    /** Color image scanned */
    DocumentImageColorStatus[DocumentImageColorStatus["Color"] = 2] = "Color";
})(exports.DocumentImageColorStatus || (exports.DocumentImageColorStatus = {}));
(function (ImageAnalysisDetectionStatus) {
    /** Detection was not performed */
    ImageAnalysisDetectionStatus[ImageAnalysisDetectionStatus["NotAvailable"] = 0] = "NotAvailable";
    /** Object not detected on input image */
    ImageAnalysisDetectionStatus[ImageAnalysisDetectionStatus["NotDetected"] = 1] = "NotDetected";
    /** Object detected on input image */
    ImageAnalysisDetectionStatus[ImageAnalysisDetectionStatus["Detected"] = 2] = "Detected";
})(exports.ImageAnalysisDetectionStatus || (exports.ImageAnalysisDetectionStatus = {}));
(function (CardOrientation) {
    /** Card is horizontally placed inside the camera frame */
    CardOrientation[CardOrientation["Horizontal"] = 0] = "Horizontal";
    /** Card is vertically placed inside the camera frame */
    CardOrientation[CardOrientation["Vertical"] = 1] = "Vertical";
    /** Card orientation is not available */
    CardOrientation[CardOrientation["NotAvailable"] = 2] = "NotAvailable";
})(exports.CardOrientation || (exports.CardOrientation = {}));
(function (CardRotation) {
    /** Card is in its original position */
    CardRotation[CardRotation["None"] = 0] = "None";
    /** Card is rotated 90 degrees to the right */
    CardRotation[CardRotation["Clockwise90"] = 1] = "Clockwise90";
    /** Card is rotated 90 degrees to the left */
    CardRotation[CardRotation["CounterClockwise90"] = 2] = "CounterClockwise90";
    /** Card is flipped upside down */
    CardRotation[CardRotation["UpsideDown"] = 3] = "UpsideDown";
})(exports.CardRotation || (exports.CardRotation = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (ProcessingStatus) {
    /** The document was fully scanned and data was extracted as expected. */
    ProcessingStatus[ProcessingStatus["Success"] = 0] = "Success";
    /** The document was not found on the image. */
    ProcessingStatus[ProcessingStatus["DetectionFailed"] = 1] = "DetectionFailed";
    /** Preprocessing of the input image has failed. */
    ProcessingStatus[ProcessingStatus["ImagePreprocessingFailed"] = 2] = "ImagePreprocessingFailed";
    /**
     * Stability is achieved when the same document is provided on consecutive frames,
     * resulting in a consistent recognition between frames prior to data extraction.
     * Valid only for video feed.
     */
    ProcessingStatus[ProcessingStatus["StabilityTestFailed"] = 3] = "StabilityTestFailed";
    /**
     * The wrong side of the document is scanned. Front side scan is completed and back side is expected, but not
     * provided by the end-user.
     *
     * Possible also if front is expected at the start of the scanning process and back is presented first
     * by the end-user.
     */
    ProcessingStatus[ProcessingStatus["ScanningWrongSide"] = 4] = "ScanningWrongSide";
    /** Unexpected fields are present on the document and removed from the final result. */
    ProcessingStatus[ProcessingStatus["FieldIdentificationFailed"] = 5] = "FieldIdentificationFailed";
    /** Fields expected to appear on the scanned document have not been found. */
    ProcessingStatus[ProcessingStatus["MandatoryFieldMissing"] = 6] = "MandatoryFieldMissing";
    /**
     * One of the extracted fields contains a character which does not satisfy the rule defined for that
     * specific field.
     *
     * This processing status can only occur if validateResultCharacters setting is set to true.
     */
    ProcessingStatus[ProcessingStatus["InvalidCharactersFound"] = 7] = "InvalidCharactersFound";
    /** Failed to return a requested image. */
    ProcessingStatus[ProcessingStatus["ImageReturnFailed"] = 8] = "ImageReturnFailed";
    /** Reading or parsing of the barcode has failed. */
    ProcessingStatus[ProcessingStatus["BarcodeRecognitionFailed"] = 9] = "BarcodeRecognitionFailed";
    /** Parsing of the MRZ has failed. */
    ProcessingStatus[ProcessingStatus["MrzParsingFailed"] = 10] = "MrzParsingFailed";
    /**
     * Currently scanned document has been filtered out by its class.
     * Occurrence of this processing status is affected by classFilter setting.
     */
    ProcessingStatus[ProcessingStatus["ClassFiltered"] = 11] = "ClassFiltered";
    /** Document currently not supported by the recognizer. */
    ProcessingStatus[ProcessingStatus["UnsupportedClass"] = 12] = "UnsupportedClass";
    /** Document class is not included in the issued license. */
    ProcessingStatus[ProcessingStatus["UnsupportedByLicense"] = 13] = "UnsupportedByLicense";
    /**
     * Front side recognition has completed successfully, and recognizer is waiting for the other side to be scanned.
     */
    ProcessingStatus[ProcessingStatus["AwaitingOtherSide"] = 14] = "AwaitingOtherSide";
    /** If front side recognition has not completed successfully, the back side is not scanned. */
    ProcessingStatus[ProcessingStatus["NotScanned"] = 15] = "NotScanned";
    /** The barcode was not found on the image. This processing status can only occur if document has mandatory
        barcode.  */
    ProcessingStatus[ProcessingStatus["BarcodeDetectionFailed"] = 16] = "BarcodeDetectionFailed";
    /** Number of possible processing statuses. */
    ProcessingStatus[ProcessingStatus["Count"] = 17] = "Count";
})(exports.ProcessingStatus || (exports.ProcessingStatus = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
(function (RecognitionMode) {
    /** No recognition performed. */
    RecognitionMode[RecognitionMode["None"] = 0] = "None";
    /** Recognition of mrz document (does not include visa and passport) */
    RecognitionMode[RecognitionMode["MrzId"] = 1] = "MrzId";
    /** Recognition of visa mrz. */
    RecognitionMode[RecognitionMode["MrzVisa"] = 2] = "MrzVisa";
    /** Recognition of passport mrz. */
    RecognitionMode[RecognitionMode["MrzPassport"] = 3] = "MrzPassport";
    /** Recognition of documents that have face photo on the front. */
    RecognitionMode[RecognitionMode["PhotoId"] = 4] = "PhotoId";
    /** Detailed document recognition. */
    RecognitionMode[RecognitionMode["FullRecognition"] = 5] = "FullRecognition";
    /** Recognition of barcode document. */
    RecognitionMode[RecognitionMode["BarcodeId"] = 6] = "BarcodeId";
    /** Number of possible values */
    RecognitionMode[RecognitionMode["Count"] = 7] = "Count";
})(exports.RecognitionMode || (exports.RecognitionMode = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * A settings object that is used for configuring the BlinkIdSingleSideRecognizer.
 */
class BlinkIdSingleSideRecognizerSettings {
    constructor() {
        /**
         * Skip processing of blurred frames.
         */
        this.enableBlurFilter = true;
        /**
         * Skip processing of frames which contain too much glare.
         */
        this.enableGlareFilter = true;
        /**
         * Strictness level for blur detection.
         */
        this.blurStrictnessLevel = exports.StrictnessLevel.Normal;
        /**
         * Strictness level for glare detection.
         */
        this.glareStrictnessLevel = exports.StrictnessLevel.Normal;
        /**
         * Allow reading of non-standard MRZ (Machine Readable Zone). Only raw MRZ result is returned.
         * Final recognizer state is not affected.
         */
        this.allowUnparsedMrzResults = false;
        this.allowBarcodeScanOnly = false;
        this.combineFrameResults = true;
        /**
         * Allow reading of standard MRZ (Machine Readable Zone) which gets successfully parsed, but check digits are
         * incorrect (do not comply with the ICAO standard).
         *
         * Final recognizer state is not affected.
         */
        this.allowUnverifiedMrzResults = true;
        /**
         * Enable or disable recognition of specific document groups supported by the current license.
         * By default all modes are enabled.
         */
        this.recognitionModeFilter = new RecognitionModeFilter();
        /**
         * Save the raw camera frames at the moment of the data extraction or timeout.
         * This significantly increases memory consumption. The scanning performance is not affected.
         */
        this.saveCameraFrames = false;
        /**
         * Process only cropped document images with corrected perspective (frontal images of a document).
         * This only applies to still images - video feed will ignore this setting.
         */
        this.scanCroppedDocumentImage = false;
        /**
         * Allow only results containing expected characters for a given field.
         *
         * Each field is validated against a set of rules.
         *
         * All fields have to be successfully validated in order for a recognizer state to be ‘valid’.
         * Setting is used to improve scanning accuracy.
         */
        this.validateResultCharacters = true;
        /**
         * Redact specific fields based on requirements or laws regarding a specific document.
         *
         * Data can be redacted from the image, the result or both.
         *
         * The setting applies to certain documents only.
         */
        this.anonymizationMode = exports.AnonymizationMode.FullResult;
        /**
         * Redact fields for specific document class.
         *
         * Fields specified by requirements or laws for a specific document will be redacted regardless of this setting.
         *
         * Based on anonymizationMode setting, data will be redacted from the image, the result or both.
         */
        this.additionalAnonymization = null;
        /**
         * Define custom rules for specific document class.
         *
         * The new class rules will be a combination of our internal and user-defined rules.
         *
         * The more detailed class filter will have priority over the other.
         */
        this.customClassRules = null;
        /**
         * Called when barcode scanning step starts.
         */
        this.barcodeScanningStartedCallback = null;
        /**
         * Called when recognizer classifies a document.
         */
        this.classifierCallback = null;
        /**
         * If set to `null`, all supported documents will be recognized.
         * Otherwise, only classes from given array will be recognized and all other
         * documents will be treated as "not supported" (observable via classifierCallback).
         */
        this.allowedDocumentClasses = null;
        /**
         * Minimum required distance between the edge of the scanning frame and the document.
         *
         * Defined as a percentage of the frame width.
         *
         * Default value is 0.0f in which case the padding edge and the image edge are the same.
         * Alternative recommended value is 0.02f.
         */
        this.paddingEdge = 0.0;
        // implementation of the FullDocumentImageOptions interface
        this.returnFullDocumentImage = false;
        this.returnEncodedFullDocumentImage = false;
        this._fullDocumentImageDpi = 250;
        this.fullDocumentImageExtensionFactors = new ExtensionFactors();
        // implementation of the FaceImageOptions interface
        this.returnFaceImage = false;
        this.returnEncodedFaceImage = false;
        this._faceImageDpi = 250;
        // implementation of the SignatureImageOptions interface
        this.returnSignatureImage = false;
        this.returnEncodedSignatureImage = false;
        this._signatureImageDpi = 250;
    }
    get fullDocumentImageDpi() {
        return this._fullDocumentImageDpi;
    }
    set fullDocumentImageDpi(value) {
        validateDpi(value);
        this._fullDocumentImageDpi = value;
    }
    get faceImageDpi() {
        return this._faceImageDpi;
    }
    set faceImageDpi(value) {
        validateDpi(value);
        this._faceImageDpi = value;
    }
    get signatureImageDpi() {
        return this._signatureImageDpi;
    }
    set signatureImageDpi(value) {
        validateDpi(value);
        this._signatureImageDpi = value;
    }
}
/**
 * This function is used to create a new instance of `BlinkIdSingleSideRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 */
async function createBlinkIdSingleSideRecognizer(wasmSDK) {
    return wasmSDK.mbWasmModule.newRecognizer("BlinkIdSingleSideRecognizer");
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * A settings object that is used for configuring the BlinkIdMultiSideRecognizer.
 */
class BlinkIdMultiSideRecognizerSettings extends BlinkIdSingleSideRecognizerSettings {
    constructor() {
        super(...arguments);
        /**
         * Proceed to scan the back side of a document even if some of the validity checks have failed while scanning the
         * front side of a document.
         */
        this.allowUncertainFrontSideScan = false;
        /**
         * Configure the number of characters per field that are allowed to be inconsistent in data match.
         */
        this.maxAllowedMismatchesPerField = 0;
        /**
         * Back side of the document will not be scanned if only the front side is supported for a specific document.
         *
         * If set to false, a photo of the back side will be returned, as well as barcode or MRZ (Machine Readable Zone) if
         * either is present.
         */
        this.skipUnsupportedBack = false;
        /**
         * Scan only the data page ( page containing MRZ ) of the passport.
         * If set to `false`, it will be required to scan the second page of certain passports.
         */
        this.scanPassportDataPageOnly = false;
    }
}
/**
 * This function is used to create a new instance of `BlinkIdMultiSideRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 */
async function createBlinkIdMultiSideRecognizer(wasmSDK) {
    return wasmSDK.mbWasmModule.newRecognizer("BlinkIdMultiSideRecognizer");
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * A settings object that is used for configuring the IdBarcodeRecognizer.
 */
class IdBarcodeRecognizerSettings {
}
/**
 * This function is used to create a new instance of `IdBarcodeRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 */
async function createIdBarcodeRecognizer(wasmSDK) {
    return wasmSDK.mbWasmModule.newRecognizer("IdBarcodeRecognizer");
}
(function (IdBarcodeDocumentType) {
    /**
     * No document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["None"] = 0] = "None";
    /**
     * AAMVACompliant document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["AAMVACompliant"] = 1] = "AAMVACompliant";
    /**
     * ArgentinaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ArgentinaID"] = 2] = "ArgentinaID";
    /**
     * ArgentinaAlienID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ArgentinaAlienID"] = 3] = "ArgentinaAlienID";
    /**
     * ArgentinaDL document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ArgentinaDL"] = 4] = "ArgentinaDL";
    /**
     * ColombiaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ColombiaID"] = 5] = "ColombiaID";
    /**
     * ColombiaDL document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ColombiaDL"] = 6] = "ColombiaDL";
    /**
     * NigeriaVoterID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["NigeriaVoterID"] = 7] = "NigeriaVoterID";
    /**
     * NigeriaDL document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["NigeriaDL"] = 8] = "NigeriaDL";
    /**
     * PanamaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["PanamaID"] = 9] = "PanamaID";
    /**
     * SouthAfricaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["SouthAfricaID"] = 10] = "SouthAfricaID";
})(exports.IdBarcodeDocumentType || (exports.IdBarcodeDocumentType = {}));

exports.BlinkIdMultiSideRecognizerSettings = BlinkIdMultiSideRecognizerSettings;
exports.BlinkIdSingleSideRecognizerSettings = BlinkIdSingleSideRecognizerSettings;
exports.CapturedFrame = CapturedFrame;
exports.ClassFilter = ClassFilter;
exports.CustomClassRules = CustomClassRules;
exports.DetailedFieldType = DetailedFieldType;
exports.ExtensionFactors = ExtensionFactors;
exports.IdBarcodeRecognizerSettings = IdBarcodeRecognizerSettings;
exports.RecognitionModeFilter = RecognitionModeFilter;
exports.SDKError = SDKError;
exports.SelectedCamera = SelectedCamera;
exports.SerializableSDKError = SerializableSDKError;
exports.VideoRecognizer = VideoRecognizer;
exports.WasmSDKLoadSettings = WasmSDKLoadSettings;
exports.bindCameraToVideoFeed = bindCameraToVideoFeed;
exports.captureFrame = captureFrame;
exports.createBlinkIdMultiSideRecognizer = createBlinkIdMultiSideRecognizer;
exports.createBlinkIdSingleSideRecognizer = createBlinkIdSingleSideRecognizer;
exports.createIdBarcodeRecognizer = createIdBarcodeRecognizer;
exports.createRecognizerRunner = createRecognizerRunner;
exports.detectWasmFeatures = detectWasmFeatures;
exports.detectWasmType = detectWasmType;
exports.frameCaptureErrors = frameCaptureErrors;
exports.getCameraDevices = getCameraDevices;
exports.isAndroidDevice = isAndroidDevice;
exports.isBrowserSupported = isBrowserSupported;
exports.isIOSDevice = isIOSDevice;
exports.isIOSUserAgent = isIOSUserAgent;
exports.isInAppBrowser = isInAppBrowser;
exports.isMobileDevice = isMobileDevice;
exports.isSafari = isSafari;
exports.licenseErrors = licenseErrors;
exports.loadWasmModule = loadWasmModule;
exports.localSdkErrors = localSdkErrors;
exports.obtainNewServerPermission = obtainNewServerPermission;
exports.pingErrors = pingErrors;
exports.sdkErrors = sdkErrors;
exports.selectCamera = selectCamera;
exports.unlockWasmSDK = unlockWasmSDK;
exports.validateDpi = validateDpi;
exports.videoRecognizerErrors = videoRecognizerErrors;
exports.wasmFolder = wasmFolder;
exports.workerErrors = workerErrors;
