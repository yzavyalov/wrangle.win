/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
export declare class SDKError extends Error {
    code: string;
    message: string;
    details?: any;
    constructor(error: {
        code: string;
        message: string;
    } | SerializableSDKError, details?: any);
}
export declare class SerializableSDKError {
    code: string;
    message: string;
    details?: any;
    constructor(error: {
        code: string;
        message: string;
    }, details?: any);
}
