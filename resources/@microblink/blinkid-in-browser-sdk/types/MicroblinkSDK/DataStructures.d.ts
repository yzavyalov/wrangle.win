/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { CapturedFrame } from "./FrameCapture";
import { MetadataCallbacks } from "./MetadataCallbacks";
import { WasmType } from "./WasmType";
/**
 * Specifies the orientation of the contents of the image.
 * This is important for some recognizers, especially when
 * performing recognition on the mobile device.
 */
export declare enum ImageOrientation {
    /**
     * Image contents are rotated 90 degrees left.
     * This usually happens on mobile devices when capturing image while
     * device is held in "portrait" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    RotatedLeft90 = 0,
    /**
     * Image contents are not rotated in any manner.
     * This is the default for images captured using HTML canvas, as
     * used in FrameCapture class.
     * This orientation also usually happens on mobile devices when capturing
     * image while device is held in "landscape" orientation, while device
     * camera sensor is mounted horizontally (i.e. also in same orientation).
     */
    NoRotation = 1,
    /**
     * Image contents are rotated 90 degrees right.
     * This usually happens on mobile devices when capturing image while
     * device is held in "reverse-portrait" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    RotatedRight90 = 2,
    /**
     * Image contents are rotated 180 degrees, i.e. image contents are "upside down".
     * This usually happens on mobile devices when capturing image while
     * device is held in "reverse-landscape" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    Rotated180 = 3
}
/**
 * Specifies the state of the recognition result.
 */
export declare enum RecognizerResultState {
    /** Nothing has been recognized. */
    Empty = 0,
    /** Something has been recognized, but some mandatory data is still missing. */
    Uncertain = 1,
    /** All required data has been recognized. */
    Valid = 2,
    /** Single stage of a multi-stage recognition is finished. */
    StageValid = 3
}
/**
 * Specifies an abstract object placed on the WebAssembly heap.
 * Objects placed on the WebAssembly heap are not cleaned up by the
 * garbage collector of the JavaScript engine. The memory used by
 * the object must be cleaned up manually by calling the delete() method.
 */
export interface WasmNativeObject {
    /**
     * Cleans up the object from the WebAssembly heap.
     */
    delete(): Promise<void>;
}
/**
 * Specifies the abstract recognition result.
 */
export interface RecognizerResult {
    /** State of the recognition result. See the documentation for RecognizerResultState for more information. */
    readonly state: RecognizerResultState;
}
/**
 * Specifies the abstract settings for the Recognizer object.
 */
export interface RecognizerSettings {
}
/**
 * Specifies an abstract Recognizer object. The Recognizer object is the basic unit of processing.
 */
export interface Recognizer extends WasmNativeObject {
    /**
     * Name of this recognizer.
     */
    readonly recognizerName: string;
    /**
     * Returns the currently applied settings to the specific recognizer.
     */
    currentSettings(): Promise<RecognizerSettings>;
    /**
     * Applies the new settings to the specific recognizer.
     * Note: if the recognizer is associated with RecognizerRunner, this method will fail.
     * @param newSettings New settings to be applied to the recognizer.
     */
    updateSettings(newSettings: RecognizerSettings): Promise<void>;
    /**
     * Returns the current result of the recognition.
     */
    getResult(): Promise<RecognizerResult>;
    /**
     * Returns the JSON representation of the recognizer's result.
     * The JSON will be digitally signed and can be used to verify
     * that the result was provided by the SDK and that it hasn't been
     * manually altered.
     * If the SDK does not have this feature compiled into the WASM, this
     * method will return null.
     */
    toSignedJSON(): Promise<SignedPayload | null>;
}
/**
 * Specifies a main Recognizer orchestrator object.
 */
export interface RecognizerRunner extends WasmNativeObject {
    /**
     * Array of recognizer objects that are currently associated with the RecognizerRunner.
     */
    recognizers: Array<Recognizer>;
    /**
     * Starts the recognition of the given image using recognizer objects currently associated
     * with the RecognizerRunner.
     * @param image Image to be processed.
     * @returns Promise that will resolve when image processing finishes.
     */
    processImage(image: CapturedFrame): Promise<RecognizerResultState>;
    /**
     * Reconfigures the instance of RecognizerRunner with new recognizers. The currently associated
     * recognizer objects are un-associated from this RecognizerRunner and are elligible for calling
     * the updateSettings() method on them after that.
     * @param recognizers Array of recognizer objects that should be associated with the RecognizerRunner.
     * @param allowMultipleResults Whether or not it is allowed to return multiple results from single image.
     *        See README.md for more details about this option.
     */
    reconfigureRecognizers(recognizers: Array<Recognizer>, allowMultipleResults: boolean): Promise<void>;
    /**
     * Sets the new callbacks for obtaining recognition event. Make sure you call this method while image processing is
     * not in progress, otherwise you will have undefined behaviour.
     * @param metadataCallbacks Callback functions that will be called when certain recognition events occur.
     *
     * For more information, check the documentation of MetadataCallbacks class.
     */
    setMetadataCallbacks(metadataCallbacks: MetadataCallbacks): Promise<void>;
    /**
     * Resets the state of all recognizers in current recognition chain, i.e. deletes the cached data from multiple
     * recognitions.
     * @param hardReset If set to false, multi-side recognizers will not be reset. If set to true, all recognizers
     *        will be reset.
     */
    resetRecognizers(hardReset: boolean): Promise<void>;
    /**
     * If enabled, recognizers will be instructed to only perform object detection, but not the entire
     * recognition process. This is useful for testing your implementations of MetadataCallbacks without
     * the need for the entire process to complete. Also, VideoRecognizers sets this to true only if in
     * DetectionTest mode of video recognition.
     * @param detectionOnly Should recognizers perform only object detection.
     */
    setDetectionOnlyMode(detectionOnly: boolean): Promise<void>;
    /**
     * Sets whether camera preview displaying the image being recognized is being mirrored horizontally.
     * If enabled, coordinates returned via metadatacallbacks will be adjusted accordingly due to the
     * image being processed being different of image being displayed.
     * The camera preview is usually mirrored when using front-facing camera.
     * @param mirrored Whether or not metadatacallbacks should adjust coordinates for mirrored image.
     */
    setCameraPreviewMirrored(mirrored: boolean): Promise<void>;
    /**
     * Sets a url to the ping proxy service. Ping proxy is a server which is hosted on you own infrastructure
     * and forwards ping messages from SDK to the Microblink servers. That way web application which has
     * integrated this SDK will only directly communicate with your own servers.
     * In order to use this service, you need a `ALLOW PING PROXY` permission in your license. If permission is
     * not presented in the license, this method will throw an error.
     * @param url Url of a server where ping proxy is hosted.
     */
    setPingProxyUrl(url: string): Promise<void>;
    /**
     * Sets custom data to be sent with ping message. This data will be sent inside "extra" field in ping message.
     * Data should be in key-value format, where key is a string and value is a string.
     * @param data Data to be sent with ping message.
     */
    setPingData(data: Record<string, string>): Promise<void>;
}
/**
 * @hidden
 * A proxy object for accessing the WebAssembly module.
 * Only for internal use. It's API may change in the future without any notice.
 * Please do not invoke methods directly on the instance of this interface.
 */
export interface WasmModuleProxy {
    createRecognizerRunner(recognizers: Array<Recognizer>, allowMultipleResults: boolean, metadataCallbacks: MetadataCallbacks): Promise<RecognizerRunner>;
    newRecognizer(className: string, ...constructorArgs: any[]): Promise<Recognizer>;
}
/**
 * Specifies a main object that is used for communication with the WebAssembly module.
 * This object is usually given as a parameter to functions that interop with the WebAssembly module.
 * You can obtain an instance of this object after a promise from MicroblinkSDK.loadWasmModule is successfully
 * resolved.
 */
export interface WasmSDK {
    /**
     * @hidden
     * A proxy object to the WebAssmebly module.
     * Only for internal use. It's API may change in the future without any notice.
     */
    readonly mbWasmModule: WasmModuleProxy;
    readonly mbWasmWorker: Worker;
    delete: () => void;
    getProductIntegrationInfo: () => Promise<ProductIntegrationInfo>;
    /**
     * The type of the WASM that was actually loaded.
     */
    loadedWasmType: WasmType;
    showOverlay: boolean;
}
/**
 * Specifies a date object, as parsed from some documents.
 * Unlike JavaScript Date object, it does not depend on time zone.
 */
export interface MBDate {
    /** Day in month. */
    readonly day: number;
    /** Month in year. */
    readonly month: number;
    /** Year */
    readonly year: number;
    /** Original string on the document from which date was parsed. */
    readonly originalString: string;
    /** Indicates whether date was parsed successfully. */
    readonly successfullyParsed: boolean;
    /** Indicates whether object is empty. Note that it is possible to successfully parse an empty date. */
    readonly empty: boolean;
}
/**
 * Specifies a digital signature of the specific recognizer result.
 */
export interface SignedPayload {
    /** The digital signature payload. */
    readonly payload: string;
    /** The digital signature of the payload. */
    readonly signature: string;
    /** Version of the digital signature. */
    readonly signatureVersion: string;
}
/**
 * Describes a structure containing information about product integration.
 */
export interface ProductIntegrationInfo {
    readonly userId: string;
    readonly licenseId: string;
    readonly licensee: string;
    readonly productVersion: string;
    readonly platform: string;
    readonly device: string;
    readonly packageName: string;
}
