/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Structures of Error Codes, Error Messages, and CustomError compatible objects for the Error Generator utility.
 * Error Code convention: SECTION_OBJECT_(ACTION)_PROBLEM
 */
export declare enum ErrorCodes {
  BrowserNotSupported = "BROWSER_NOT_SUPPORTED",
  LicenseError = "LICENSE_ERROR",
  SdkLoadFailed = "SDK_LOAD_FAILED",
  InternetNotAvailable = "INTERNET_NOT_AVAILABLE",
  InvalidRecognizers = "INVALID_RECOGNIZERS",
  InvalidPingProxyUrl = "INVALID_PING_PROXY_URL",
  PingProxyPermissionNotGranted = "PING_PROXY_PERMISSION_NOT_GRANTED"
}
export declare enum ErrorMessages {
  BrowserNotSupported = "Browser is not supported!",
  LicenseError = "Something is wrong with the license.",
  SdkLoadFailed = "Failed to load SDK!",
  InvalidPingProxyUrl = "Provided ping proxy URL is not a valid secure URL in format 'https://{host}:{port?}'.",
  PingProxyPermissionNotGranted = "Allow ping proxy permission not found in license."
}
export declare const componentErrors: {
  browserNotSupported: {
    code: ErrorCodes;
    message: ErrorMessages;
  };
  licenseError: {
    code: ErrorCodes;
    message: ErrorMessages;
  };
  sdkLoadFailed: {
    code: ErrorCodes;
    message: ErrorMessages;
  };
  pingProxyErrors: {
    invalidProxyUrl: {
      message: ErrorMessages;
      code: ErrorCodes;
    };
    permissionNotGranted: {
      message: ErrorMessages;
      code: ErrorCodes;
    };
  };
};
