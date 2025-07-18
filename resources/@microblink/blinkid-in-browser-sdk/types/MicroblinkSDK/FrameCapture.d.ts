/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { ImageOrientation } from "./DataStructures";
/**
 * Represents a captured frame from HTMLVideoElement.
 */
export declare class CapturedFrame {
    /** Instance of ImageData object - contains pixels and metadata about the captured image. */
    readonly imageData: ImageData;
    /** Orientation of the captured frame */
    readonly orientation: ImageOrientation;
    /** Indicates whether captured frame originated from still image or video stream. */
    readonly videoFrame: boolean;
    constructor(imageData: ImageData, orientation: ImageOrientation, videoFrame: boolean);
}
/**
 * Captures a frame from any CanvasImageSource, such as HTMLVideoElement or HTMLImageElement.
 * @param imageSource image source from which frame should be captured
 * @returns instance of CapturedFrame
 */
export declare function captureFrame(imageSource: CanvasImageSource): CapturedFrame;
