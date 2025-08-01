/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/* eslint-disable max-len */
/**
 * Structures of Error Codes, Error Messages, and CustomError compatible objects for the Error Generator utility.
 * Error Code convention: SECTION_OBJECT_(ACTION)_PROBLEM
 */
export var ErrorCodes;
(function (ErrorCodes) {
  ErrorCodes["BrowserNotSupported"] = "BROWSER_NOT_SUPPORTED";
  ErrorCodes["LicenseError"] = "LICENSE_ERROR";
  ErrorCodes["SdkLoadFailed"] = "SDK_LOAD_FAILED";
  ErrorCodes["InternetNotAvailable"] = "INTERNET_NOT_AVAILABLE";
  ErrorCodes["InvalidRecognizers"] = "INVALID_RECOGNIZERS";
  ErrorCodes["InvalidPingProxyUrl"] = "INVALID_PING_PROXY_URL";
  ErrorCodes["PingProxyPermissionNotGranted"] = "PING_PROXY_PERMISSION_NOT_GRANTED";
})(ErrorCodes || (ErrorCodes = {}));
export var ErrorMessages;
(function (ErrorMessages) {
  ErrorMessages["BrowserNotSupported"] = "Browser is not supported!";
  ErrorMessages["LicenseError"] = "Something is wrong with the license.";
  ErrorMessages["SdkLoadFailed"] = "Failed to load SDK!";
  ErrorMessages["InvalidPingProxyUrl"] = "Provided ping proxy URL is not a valid secure URL in format 'https://{host}:{port?}'.";
  ErrorMessages["PingProxyPermissionNotGranted"] = "Allow ping proxy permission not found in license.";
})(ErrorMessages || (ErrorMessages = {}));
export const componentErrors = {
  browserNotSupported: {
    code: ErrorCodes.BrowserNotSupported,
    message: ErrorMessages.BrowserNotSupported,
  },
  licenseError: {
    code: ErrorCodes.LicenseError,
    message: ErrorMessages.LicenseError,
  },
  sdkLoadFailed: {
    code: ErrorCodes.SdkLoadFailed,
    message: ErrorMessages.SdkLoadFailed,
  },
  pingProxyErrors: {
    invalidProxyUrl: {
      message: ErrorMessages.InvalidPingProxyUrl,
      code: ErrorCodes.InvalidPingProxyUrl,
    },
    permissionNotGranted: {
      message: ErrorMessages.PingProxyPermissionNotGranted,
      code: ErrorCodes.PingProxyPermissionNotGranted,
    },
  },
};
