/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Recognizer, RecognizerRunner, WasmSDK } from "./DataStructures";
import { MetadataCallbacks } from "./MetadataCallbacks";
import { WasmSDKLoadSettings } from "./WasmLoadSettings";
export * from "./BlinkIdVariant";
export * from "./CameraUtils";
export * from "./DataStructures";
export * from "./DeviceUtils";
export * from "./DocumentSide";
export * from "./ErrorTypes";
export * from "./FrameCapture";
export * from "./License";
export * from "./MetadataCallbacks";
export * from "./SDKError";
export * from "./VideoRecognizer";
export * from "./WasmLoadSettings";
export * from "./WasmLoadUtils";
/**
 * Asynchronously loads and compiles the WebAssembly module.
 * @param loadSettings Object defining the settings for loading the WebAssembly module.
 * @returns Promise that resolves if WebAssembly module was successfully loaded and rejects if not.
 */
export declare function loadWasmModule(loadSettings: WasmSDKLoadSettings): Promise<any>;
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
export declare function createRecognizerRunner(wasmSDK: WasmSDK, recognizers: Array<Recognizer>, allowMultipleResults?: boolean, metadataCallbacks?: MetadataCallbacks): Promise<RecognizerRunner>;
