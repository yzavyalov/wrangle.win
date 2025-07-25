/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { SDKError } from "./SDKError";
export declare enum LicenseTokenState {
    Invalid = 0,
    RequiresServerPermission = 1,
    Valid = 2
}
export interface LicenseUnlockResult {
    readonly allowRemoveDemoOverlay: boolean;
    readonly allowRemoveProductionOverlay: boolean;
    readonly isTrial: boolean;
    readonly licenseId: string;
    readonly licensee: string;
    readonly applicationIds: Array<string>;
    readonly packageName: string;
    readonly sdkName: string;
    readonly sdkVersion: string;
    readonly unlockResult: LicenseTokenState;
    readonly userId: string;
    readonly licenseError: string;
}
export declare enum LicenseErrorType {
    LicenseTokenStateInvalid = "LICENSE_TOKEN_STATE_INVALID",
    NetworkError = "NETWORK_ERROR",
    RemoteLock = "REMOTE_LOCK",
    PermissionExpired = "PERMISSION_EXPIRED",
    PayloadCorrupted = "PAYLOAD_CORRUPTED",
    PayloadSignatureVerificationFailed = "PAYLOAD_SIGNATURE_VERIFICATION_FAILED",
    IncorrectTokenState = "INCORRECT_TOKEN_STATE"
}
export declare enum ServerPermissionSubmitResultStatus {
    Ok = 0,
    NetworkError = 1,
    RemoteLock = 2,
    PermissionExpired = 3,
    PayloadCorrupted = 4,
    PayloadSignatureVerificationFailed = 5,
    IncorrectTokenState = 6
}
export interface ServerPermissionSubmitResult {
    readonly status: ServerPermissionSubmitResultStatus;
    readonly lease: number;
    readonly networkErrorDescription?: string;
}
export interface UnlockResult {
    readonly error: SDKError | null;
    readonly lease?: number;
    readonly showOverlay?: boolean;
}
export declare function obtainNewServerPermission(unlockResult: LicenseUnlockResult, wasmModule: any): Promise<ServerPermissionSubmitResult>;
export declare function unlockWasmSDK(licenseKey: string, allowHelloMessage: boolean, userId: string, wasmModule: any): Promise<UnlockResult>;
