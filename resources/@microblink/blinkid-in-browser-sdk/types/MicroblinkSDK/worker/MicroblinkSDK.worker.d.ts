/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { BlinkIDVariant } from "../BlinkIdVariant";
/**
 * This function returns the path to the resources variant
 * based on the user's device
 */
export declare function getBlinkIdVariant(): BlinkIDVariant;
export default class MicroblinkWorker {
    private context;
    private wasmModule;
    private nativeRecognizerRunner;
    private objects;
    private nextObjectHandle;
    private metadataCallbacks;
    private lease?;
    private inFlightHeartBeatTimeoutId?;
    constructor();
    private getNextObjectHandle;
    private notifyError;
    private notifySuccess;
    private notifyInitSuccess;
    private unwrapParameters;
    private restoreFunctions;
    private scanForTransferrables;
    private registerHeartBeat;
    private unregisterHeartBeat;
    private obtainNewServerPermission;
    private willSoonExpire;
    private calculateWasmBundle;
    private calculateEngineLocationPrefix;
    private processInitMessage;
    private processInvokeFunction;
    private processCreateNewRecognizer;
    private getRecognizers;
    private processCreateRecognizerRunner;
    private processReconfigureRecognizerRunner;
    private processDeleteRecognizerRunner;
    private wrapFunctions;
    private processInvokeObject;
    private processImage;
    private resetRecognizers;
    private setPingProxyUrl;
    private setPingData;
    private setDetectionOnly;
    private setCameraPreviewMirrored;
    private setupMetadataCallbacks;
    private registerMetadataCallbacks;
    private processGetProductIntegrationInfo;
}
