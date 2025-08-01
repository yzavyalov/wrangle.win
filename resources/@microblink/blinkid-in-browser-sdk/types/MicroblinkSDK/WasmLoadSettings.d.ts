/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { WasmType } from "./WasmType";
import type { BlinkIDVariant } from "./BlinkIdVariant";
/**
 * Function that will be called during loading of the SDK.
 * @param loadPercentage Number between 0 and 100 indicating the loading progress.
 */
export type LoadProgressCallback = (loadPercentage: number) => void;
export type OptionalLoadProgressCallback = LoadProgressCallback | null;
export { WasmType };
/**
 * Settings object for function loadWasmModule.
 */
export declare class WasmSDKLoadSettings {
    /**
     * License key for unlocking the WebAssembly module. Bound to the domain name from which the application is served.
     */
    licenseKey: string;
    /**
     * Write a hello message to the browser console when license check is successfully performed.
     *
     * Hello message will contain the name and version of the SDK, which are required information for all support
     * tickets.
     *
     * The default value is true.
     */
    allowHelloMessage: boolean;
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
    engineLocation: string;
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
    workerLocation: string;
    /**
     * Type of the WASM that will be loaded. By default, if not set, the SDK will automatically determine the best WASM
     * to load.
     */
    wasmType: WasmType | null;
    /**
     * Overrides the BlinkID build that will be loaded.
     *
     * The `lightweight` variant is smaller but doesn't support barcode deblurring. This variant is loaded by default on
     * mobile devices. The `full` version is loaded by default on desktop devices.
     */
    blinkIdVariant?: BlinkIDVariant;
    /**
     * Defines the initial memory size that will be allocated for the WebAssembly module, in megabytes.
     *
     * If not set, the memory resolves to 700MB for iOS and 200 MB for other platforms.
     */
    initialMemory?: number;
    /**
     * Defines the number of workers that will be used for multi-threaded processing of the images. If not set, the
     * number of worker used will match the number of detected CPU cores on a device.
     *
     * If the browser does not support multi-threaded processing or it was deliberately disabled using the `wasmType`
     * property, then this property will be ignored.
     */
    numberOfWorkers: number | null;
    /**
     * Optional callback function that will report the SDK loading progress.
     *
     * This can be useful for displaying progress bar to users with slow connections.
     *
     * The default value is null.
     */
    loadProgressCallback: OptionalLoadProgressCallback;
    /**
     * Name of the file containing the WebAssembly module.
     *
     * Change this only if you have renamed the original WASM and its support JS file for your purposes.
     */
    wasmModuleName: string;
    /**
     * @param licenseKey License key for unlocking the WebAssembly module.
     */
    constructor(licenseKey: string);
}
