/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import * as Messages from "./Messages";
import { RecognizerRunner, WasmModuleProxy, WasmSDK, Recognizer, RecognizerSettings, RecognizerResult, SignedPayload, ProductIntegrationInfo } from "../DataStructures.js";
import { MetadataCallbacks } from "../MetadataCallbacks";
import { WasmSDKLoadSettings } from "../WasmLoadSettings";
import { WasmType } from "../WasmType";
interface EventHandler {
    (msg: Messages.ResponseMessage): void;
}
export declare class RemoteRecognizer implements Recognizer {
    private readonly wasmSDKWorker;
    private objectHandle;
    readonly recognizerName: string;
    private callbacks;
    constructor(wasmWorker: WasmSDKWorker, recognizerName: string, remoteObjHandle: number);
    getRemoteObjectHandle(): number;
    currentSettings(): Promise<RecognizerSettings>;
    toSignedJSON(): Promise<SignedPayload | null>;
    private clearAllCallbacks;
    private removeFunctions;
    updateSettings(newSettings: RecognizerSettings): Promise<void>;
    invokeCallback(callbackName: string, args: any[]): void;
    getResult(): Promise<RecognizerResult>;
    delete(): Promise<void>;
}
declare class WasmModuleWorkerProxy implements WasmModuleProxy {
    private readonly wasmSDKWorker;
    constructor(wasmSDKWorker: WasmSDKWorker);
    createRecognizerRunner(recognizers: Array<Recognizer>, allowMultipleResults?: boolean, metadataCallbacks?: MetadataCallbacks): Promise<RecognizerRunner>;
    newRecognizer(className: string, ...constructorArgs: any[]): Promise<Recognizer>;
}
export declare class WasmSDKWorker implements WasmSDK {
    readonly mbWasmModule: WasmModuleWorkerProxy;
    readonly mbWasmWorker: Worker;
    private eventHandlers;
    private metadataCallbacks;
    private loadCallback;
    private recognizersWithCallbacks;
    private userId;
    showOverlay: boolean;
    loadedWasmType: WasmType;
    private constructor();
    postMessage(message: Messages.RequestMessage, eventHandler: EventHandler): void;
    postTransferrableMessage(message: Messages.RequestMessage & Messages.TransferrableMessage, eventHandler: EventHandler): void;
    postMessageAndRegisterCallbacks(message: Messages.RequestMessage, metadataCallbacks: MetadataCallbacks, eventHandler: EventHandler): void;
    registerRecognizerCallbacks(remoteRecognizerHandle: number, recognizer: RemoteRecognizer): void;
    unregisterRecognizerCallbacks(remoteRecognizerHandle: number): void;
    /**
     * Clean up the active instance of the SDK.
     *
     * It's not possible to use the SDK after this method is called.
     */
    delete(): void;
    getProductIntegrationInfo(): Promise<ProductIntegrationInfo>;
    private handleWorkerEvent;
    static createWasmWorker(worker: Worker, wasmLoadSettings: WasmSDKLoadSettings, userId: string): Promise<WasmSDKWorker>;
}
export {};
