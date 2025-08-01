/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Structures of Error Codes, Error Messages, and CustomError compatible objects for the Error Generator utility.
 * Error Code convention: SECTION_OBJECT_(ACTION)_PROBLEM
 */
export declare enum ErrorCodes {
    WORKER_WASM_LOAD_FAILURE = "WORKER_WASM_LOAD_FAILURE",
    WORKER_WASM_INIT_MISSING = "WORKER_WASM_INIT_MISSING",
    WORKER_FUNCTION_INVOKE_FAILURE = "WORKER_FUNCTION_INVOKE_FAILURE",
    WORKER_RECOGNIZER_CREATION_FAILURE = "WORKER_RECOGNIZER_CREATION_FAILURE",
    WORKER_RUNNER_EXISTS = "WORKER_RUNNER_EXISTS",
    WORKER_RUNNER_CREATION_FAILURE = "WORKER_RUNNER_CREATION_FAILURE",
    WORKER_RUNNER_MISSING = "WORKER_RUNNER_MISSING",
    WORKER_RUNNER_RECONFIGURE_FAILURE = "WORKER_RUNNER_RECONFIGURE_FAILURE",
    WORKER_RUNNER_DELETED = "WORKER_RUNNER_DELETED",
    WORKER_RUNNER_DELETE_FAILURE = "WORKER_RUNNER_DELETE_FAILURE",
    WORKER_OBJECT_INVOKE_FAILURE = "WORKER_OBJECT_INVOKE_FAILURE",
    WORKER_IMAGE_PROCESS_FAILURE = "WORKER_IMAGE_PROCESS_FAILURE",
    WORKER_HANDLE_UNDEFINED = "WORKER_HANDLE_UNDEFINED",
    WORKER_MESSAGE_ACTION_UNKNOWN = "WORKER_MESSAGE_ACTION_UNKNOWN",
    WORKER_LICENSE_UNLOCK_ERROR = "WORKER_LICENSE_UNLOCK_ERROR",
    WORKER_INTEGRATION_INFO_FAILURE = "WORKER_INTEGRATION_INFO_FAILURE",
    LOCAL_SDK_RUNNER_MISSING = "LOCAL_SDK_RUNNER_MISSING",
    LOCAL_SDK_RUNNER_EMPTY = "LOCAL_SDK_RUNNER_EMPTY",
    LICENSE_UNLOCK_ERROR = "LICENSE_UNLOCK_ERROR",
    FRAME_CAPTURE_SVG_UNSUPPORTED = "FRAME_CAPTURE_SVG_UNSUPPORTED",
    FRAME_CAPTURE_CANVAS_MISSING = "FRAME_CAPTURE_CANVAS_MISSING",
    SDK_WASM_SETTINGS_MISSING = "SDK_WASM_SETTINGS_MISSING",
    SDK_LICENSE_KEY_MISSING = "SDK_LICENSE_KEY_MISSING",
    SDK_WASM_MODULE_NAME_MISSING = "SDK_WASM_MODULE_NAME_MISSING",
    SDK_ENGINE_LOCATION_INVALID = "SDK_ENGINE_LOCATION_INVALID",
    SDK_WORKER_LOCATION_INVALID = "SDK_WORKER_LOCATION_INVALID",
    SDK_MISSING = "SDK_MISSING",
    SDK_RECOGNIZERS_MISSING = "SDK_RECOGNIZERS_MISSING",
    VIDEO_RECOGNIZER_ELEMENT_MISSING = "VIDEO_RECOGNIZER_ELEMENT_MISSING",
    VIDEO_RECOGNIZER_CAMERA_MISSING = "VIDEO_RECOGNIZER_CAMERA_MISSING",
    VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED = "VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED",
    VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE = "VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE",
    VIDEO_RECOGNIZER_CAMERA_IN_USE = "VIDEO_RECOGNIZER_CAMERA_IN_USE",
    VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED = "VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED",
    VIDEO_RECOGNIZER_FEED_RELEASED = "VIDEO_RECOGNIZER_FEED_RELEASED",
    VIDEO_RECOGNIZER_FEED_NOT_PAUSED = "VIDEO_RECOGNIZER_FEED_NOT_PAUSED",
    VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED = "VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED",
    VIDEO_RECOGNIZER_FEED_PAUSED = "VIDEO_RECOGNIZER_FEED_PAUSED",
    VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE = "VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE",
    VIDEO_RECOGNIZER_FEED_MISSING = "VIDEO_RECOGNIZER_FEED_MISSING",
    INVALID_PING_PROXY_URL = "INVALID_PROXY_URL",
    PING_PROXY_PERMISSION_NOT_GRANTED = "PING_PROXY_PERMISSION_NOT_GRANTED",
    PING_DATA_KEYS_AMOUNT_EXCEEDED = "PING_DATA_KEYS_AMOUNT_EXCEEDED",
    PING_DATA_KEY_LENGTH_EXCEEDED = "PING_DATA_KEY_LENGTH_EXCEEDED",
    PING_DATA_VALUE_LENGTH_EXCEEDED = "PING_DATA_VALUE_LENGTH_EXCEEDED"
}
export declare enum ErrorMessages {
    WORKER_HANDLE_UNDEFINED = "Cannot find object with handle: undefined",
    WORKER_WASM_LOAD_FAILURE = "Failed to load WASM in web worker!",
    WORKER_WASM_INIT_MISSING = "WASM module is not initialized!",
    WORKER_FUNCTION_INVOKE_FAILURE = "Failed to invoke function!",
    WORKER_RECOGNIZER_CREATION_FAILURE = "Failed to create new recognizer!",
    WORKER_RUNNER_EXISTS = "Recognizer runner is already created! Multiple instances are not allowed!",
    WORKER_RUNNER_CREATION_FAILURE = "Failed to create new recognizer runner!",
    WORKER_RUNNER_MISSING = "Recognizer runner is not created! There is nothing to reconfigure!",
    WORKER_RUNNER_RECONFIGURE_FAILURE = "Failed to reconfigure recognizer runner!",
    WORKER_RUNNER_DELETED = "Recognizer runner is already deleted!",
    WORKER_RUNNER_DELETE_FAILURE = "Failed to delete recognizer runner!",
    WORKER_OBJECT_INVOKE_FAILURE = "Failed to invoke object!",
    WORKER_IMAGE_PROCESS_FAILURE = "Recognizer runner is not initialized! Cannot process image!",
    WORKER_INTEGRATION_INFO_FAILURE = "Failed to get product integration info!",
    LOCAL_SDK_RUNNER_MISSING = "Property nativeRecognizerRunner is not available!",
    LOCAL_SDK_RUNNER_EMPTY = "Native RecognizerRunner cannot be empty!",
    LICENSE_TOKEN_STATE_INCORRECT = "Internal error (Incorrect token state)",
    LICENSE_PAYLOAD_VERIFICATION_FAILED = "Failed to verify server permission's digital signature!",
    LICENSE_PAYLOAD_CORRUPTED = "Server permission payload is corrupted!",
    LICENSE_PERMISSION_EXPIRED = "Internal error (server permission expired)",
    LICENSE_REMOTE_LOCKED = "Provided license key has been remotely locked. Please contact support for more information!",
    FRAME_CAPTURE_SVG_UNSUPPORTED = "Recognition of SVG elements not supported!",
    FRAME_CAPTURE_CANVAS_MISSING = "Could not get canvas 2d context!",
    SDK_WASM_SETTINGS_MISSING = "Missing WASM load settings!",
    SDK_LICENSE_KEY_MISSING = "Missing license key!",
    SDK_WASM_MODULE_NAME_MISSING = "Missing WASM module name!",
    SDK_ENGINE_LOCATION_INVALID = "Setting property 'engineLocation' must be a string!",
    SDK_WORKER_LOCATION_INVALID = "Setting property 'workerLocation' must be a string!",
    SDK_MISSING = "SDK is not provided!",
    SDK_RECOGNIZERS_MISSING = "To create RecognizerRunner at least 1 recognizer is required.",
    VIDEO_RECOGNIZER_ELEMENT_MISSING = "Video element, i.e. camera feed is not provided!",
    VIDEO_RECOGNIZER_CAMERA_MISSING = "Camera not found!",
    VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED = "Camera not allowed!",
    VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE = "Camera not available!",
    VIDEO_RECOGNIZER_CAMERA_IN_USE = "Camera in use!",
    VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED = "Media devices not supported by browser.",
    VIDEO_RECOGNIZER_FEED_RELEASED = "The associated video feed has been released!",
    VIDEO_RECOGNIZER_FEED_NOT_PAUSED = "The associated video feed is not paused. Use resumeRecognition instead!",
    VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED = "The play() request was interrupted or prevented by browser security rules!",
    VIDEO_RECOGNIZER_FEED_PAUSED = "Cannot resume recognition while video feed is paused! Use recognize or startRecognition",
    VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE = "Could not reset recognizers!",
    VIDEO_RECOGNIZER_FEED_MISSING = "Missing video feed!",
    INVALID_PING_PROXY_URL = "Provided ping proxy URL is not a valid secure URL in format 'https://{host}:{port?}'.",
    PING_PROXY_PERMISSION_NOT_GRANTED = "Allow ping proxy permission not found in license.",
    PING_DATA_KEYS_AMOUNT_EXCEEDED = "Maximum number of ping data keys exceeded.",
    PING_DATA_KEY_LENGTH_EXCEEDED = "Ping data key is too long.",
    PING_DATA_VALUE_LENGTH_EXCEEDED = "Ping data value is too long."
}
export declare const videoRecognizerErrors: {
    feedMissing: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    recognizersResetFailure: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    feedPaused: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    playRequestInterrupted: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    videoFeedNotPaused: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    videoFeedReleased: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    mediaDevicesUnsupported: {
        code: ErrorCodes;
        message: ErrorMessages;
    };
    cameraMissing: {
        code: ErrorCodes;
        message: ErrorMessages;
    };
    cameraNotAllowed: {
        code: ErrorCodes;
        message: ErrorMessages;
    };
    elementMissing: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
};
export declare const sdkErrors: {
    wasmSettingsMissing: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    licenseKeyMissing: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    wasmModuleNameMissing: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    engineLocationInvalid: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    workerLocationInvalid: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    missing: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    recognizersMissing: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
};
export declare const frameCaptureErrors: {
    svgUnsupported: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    canvasMissing: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
};
export declare const licenseErrors: {
    licenseTokenStateIncorrect: {
        code: ErrorCodes;
        message: ErrorMessages;
    };
    licensePayloadVerificationFailed: {
        code: ErrorCodes;
        message: ErrorMessages;
    };
    licensePayloadCorrupted: {
        code: ErrorCodes;
        message: ErrorMessages;
    };
    licensePermissionExpired: {
        code: ErrorCodes;
        message: ErrorMessages;
    };
    licenseRemoteLocked: {
        code: ErrorCodes;
        message: ErrorMessages;
    };
    licenseNetworkError: {
        code: ErrorCodes;
    };
    licenseInvalid: {
        code: ErrorCodes;
    };
};
export declare const localSdkErrors: {
    runnerMissing: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    runnerEmpty: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
};
export declare const workerErrors: {
    imageProcessFailure: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    objectInvokeFailure: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    runnerDeleteFailure: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    runnerDeleted: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    runnerReconfigureFailure: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    runnerMissing: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    runnerCreationFailure: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    runnerExists: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    recognizerCreationFailure: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    functionInvokeFailure: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    wasmInitMissing: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    wasmLoadFailure: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    handleUndefined: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    integrationInfoFailure: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
};
export declare const pingErrors: {
    invalidProxyUrl: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    permissionNotGranted: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    dataKeysAmountExceeded: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    dataKeyLengthExceeded: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
    dataValueLengthExceeded: {
        message: ErrorMessages;
        code: ErrorCodes;
    };
};
