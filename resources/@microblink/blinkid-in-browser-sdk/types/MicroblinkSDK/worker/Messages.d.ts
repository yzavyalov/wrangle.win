/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { CapturedFrame } from "../FrameCapture";
import { WasmSDKLoadSettings } from "../WasmLoadSettings";
import { WasmType } from "../WasmType";
import { SerializableSDKError } from "../SDKError";
import { ProductIntegrationInfo } from "../DataStructures";
import { BlinkIDVariant } from "../BlinkIdVariant";
export interface RequestMessage {
    readonly action: string;
    readonly messageID: number;
}
export interface TransferrableMessage {
    getTransferrables(): Array<Transferable>;
}
declare abstract class BaseRequestMessage implements RequestMessage {
    readonly action: string;
    readonly messageID: number;
    protected constructor(action: string);
}
export declare class InitMessage extends BaseRequestMessage {
    static readonly action: string;
    readonly wasmModuleName: string;
    readonly licenseKey: string;
    readonly userId: string;
    readonly registerLoadCallback: boolean;
    readonly allowHelloMessage: boolean;
    readonly engineLocation: string;
    readonly wasmType: WasmType | null;
    readonly blinkIDVariant?: BlinkIDVariant;
    readonly numberOfWorkers: number | null;
    readonly initialMemory?: number;
    constructor(wasmLoadSettings: WasmSDKLoadSettings, userId: string);
}
export declare enum ParameterType {
    Any = 0,
    Recognizer = 1,
    RecognizerSettings = 2,
    Callback = 3
}
export interface CallbackAddress {
    readonly recognizerHandle: number;
    readonly callbackName: string;
}
export interface WrappedParameter {
    parameter: any;
    type: ParameterType;
}
export declare class InvokeFunction extends BaseRequestMessage {
    static readonly action: string;
    readonly funcName: string;
    readonly params: Array<WrappedParameter>;
    constructor(funcName: string, params: Array<WrappedParameter>);
}
export declare class CreateNewRecognizer extends BaseRequestMessage {
    static readonly action: string;
    readonly className: string;
    readonly params: Array<WrappedParameter>;
    constructor(className: string, params: Array<WrappedParameter>);
}
export declare class CreateRecognizerRunner extends BaseRequestMessage {
    static readonly action: string;
    readonly recognizerHandles: Array<number>;
    readonly allowMultipleResults: boolean;
    readonly registeredMetadataCallbacks: RegisteredMetadataCallbacks;
    constructor(recognizerHandles: Array<number>, allowMultipleResults: boolean, registeredMetadataCallbacks: RegisteredMetadataCallbacks);
}
export declare class ReconfigureRecognizerRunner extends BaseRequestMessage {
    static readonly action: string;
    readonly recognizerHandles: Array<number>;
    readonly allowMultipleResults: boolean;
    constructor(recognizerHandles: Array<number>, allowMultipleResults: boolean);
}
export declare class DeleteRecognizerRunner extends BaseRequestMessage {
    static readonly action: string;
    constructor();
}
export declare class InvokeObjectMethod extends BaseRequestMessage {
    static readonly action: string;
    readonly objectHandle: number;
    readonly methodName: string;
    readonly params: Array<WrappedParameter>;
    constructor(objectHandle: number, methodName: string, params: Array<WrappedParameter>);
}
export declare class ProcessImage extends BaseRequestMessage implements TransferrableMessage {
    static readonly action: string;
    readonly frame: CapturedFrame;
    constructor(image: CapturedFrame);
    getTransferrables(): Array<Transferable>;
}
export declare class ResetRecognizers extends BaseRequestMessage {
    static readonly action: string;
    readonly hardReset: boolean;
    constructor(hardReset: boolean);
}
export declare class RegisteredMetadataCallbacks {
    onDebugText: boolean;
    onDetectionFailed: boolean;
    onQuadDetection: boolean;
    onPointsDetection: boolean;
    onFirstSideResult: boolean;
}
export declare class RegisterMetadataCallbacks extends BaseRequestMessage {
    static readonly action: string;
    readonly registeredMetadataCallbacks: RegisteredMetadataCallbacks;
    constructor(registeredMetadataCallbacks: RegisteredMetadataCallbacks);
}
export declare class SetDetectionOnly extends BaseRequestMessage {
    static readonly action: string;
    readonly detectionOnlyMode: boolean;
    constructor(detectionOnlyMode: boolean);
}
export declare class SetCameraPreviewMirrored extends BaseRequestMessage {
    static readonly action: string;
    readonly cameraPreviewMirrored: boolean;
    constructor(cameraPreviewMirrored: boolean);
}
export declare class GetProductIntegrationInfo extends BaseRequestMessage {
    static readonly action: string;
    readonly userId: string;
    constructor(userId: string);
}
export declare class SetPingProxyUrl extends BaseRequestMessage {
    static readonly action: string;
    readonly pingProxyUrl: string;
    constructor(pingProxyUrl: string);
}
export declare class SetPingData extends BaseRequestMessage {
    static readonly action: string;
    readonly data: Record<string, string>;
    constructor(data: Record<string, string>);
}
export interface ResponseMessage {
    readonly messageID: number;
}
export declare class StatusMessage implements ResponseMessage {
    readonly messageID: number;
    readonly success: boolean;
    readonly error: SerializableSDKError | string | null;
    constructor(msgID: number, success: boolean, error: SerializableSDKError | string | null);
}
export declare class InitSuccessMessage implements ResponseMessage {
    readonly messageID: number;
    readonly success: boolean;
    readonly showOverlay: boolean;
    readonly wasmType: WasmType;
    constructor(msgID: number, success: boolean, showOverlay: boolean, wasmType: WasmType);
}
export declare class InvokeResultMessage extends StatusMessage {
    readonly result: any;
    constructor(msgID: number, result: any);
}
export declare class ObjectCreatedMessage extends StatusMessage {
    readonly objectHandle: number;
    constructor(msgID: number, handle: number);
}
export declare class ImageProcessResultMessage extends StatusMessage {
    readonly recognitionState: number;
    constructor(msgID: number, recognitionState: number);
}
export declare class ProductIntegrationResultMessage extends StatusMessage {
    readonly result: ProductIntegrationInfo;
    constructor(msgID: number, result: ProductIntegrationInfo);
}
export declare class LoadProgressMessage {
    readonly isLoadProgressMessage = true;
    readonly progress: number;
    constructor(progress: number);
}
export declare enum MetadataCallback {
    onDebugText = 0,
    onDetectionFailed = 1,
    onQuadDetection = 2,
    onPointsDetection = 3,
    onFirstSideResult = 4,
    recognizerCallback = 5
}
export declare class InvokeCallbackMessage {
    readonly isCallbackMessage: boolean;
    readonly callbackType: MetadataCallback;
    readonly callbackParameters: any[];
    constructor(callbackType: MetadataCallback, callbackParams: any[]);
}
export {};
