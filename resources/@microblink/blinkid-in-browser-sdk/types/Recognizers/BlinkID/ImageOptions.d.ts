/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { ImageOrientation } from "../../MicroblinkSDK/DataStructures";
/**
 * Extension factors relative to corresponding dimension of the full image. For example,
 * {@code upFactor} and {@code downFactor} define extensions relative to image height, e.g.
 * when {@code upFactor} is 0.5, upper image boundary will be extended for half of image's full
 * height.
 *
 *                      ._______________________________________.
 *                      |                   ↑                   |
 *                      |                upFactor               |
 *   .________.         |              .________.               |
 *   |        |   -->   |  ⃖ leftFactor |        | rightFactor  ⃗ |
 *   |________|         |              |________|               |
 *                      |                   ↓                   |
 *                      |               downFactor              |
 *                      |_______________________________________|
 *
 */
export declare class ExtensionFactors {
    /**
     * Currently used image extension factor relative to full image height in UP direction.
     */
    readonly upFactor: number;
    /**
     * Currently used image extension factor relative to full image height in DOWN direction.
     */
    readonly downFactor: number;
    /**
     * Currently used image extension factor relative to full image height in LEFT direction.
     */
    readonly leftFactor: number;
    /**
     * Currently used image extension factor relative to full image height in RIGHT direction.
     */
    readonly rightFactor: number;
    /**
     * Constructor which accepts image extension factors which must be in range [-1.0f, 1.0f].
     * @param upFactor image extension factor relative to full image height in UP direction
     * @param downFactor image extension factor relative to full image height in DOWN direction
     * @param leftFactor image extension factor relative to full image width in LEFT direction
     * @param rightFactor image extension factor relative to full image width in RIGHT direction
     */
    constructor(upFactor?: number, downFactor?: number, leftFactor?: number, rightFactor?: number);
    private checkExtensionFactor;
}
export interface FullDocumentImageOptions {
    /**
     * If enabled, the result will contain dewarped image of the document.
     */
    returnFullDocumentImage: boolean;
    /**
     * If enabled, the result will contain JPEG-encoded image of the document.
     */
    returnEncodedFullDocumentImage: boolean;
    /**
     * The DPI (Dots Per Inch) for full document image in cases when it
     * should be returned. It applies for both encoded and non-encoded versions.
     */
    fullDocumentImageDpi: number;
    /**
     * extension factors for full document image.
     */
    fullDocumentImageExtensionFactors: ExtensionFactors;
}
export interface FaceImageOptions {
    /**
     * If enabled, the result will contain dewarped image of the face.
     */
    returnFaceImage: boolean;
    /**
     * If enabled, the result will contain JPEG-encoded image of the face.
     */
    returnEncodedFaceImage: boolean;
    /**
     * The DPI (Dots Per Inch) for face image in cases when it
     * should be returned. It applies for both encoded and non-encoded versions.
     */
    faceImageDpi: number;
}
export interface SignatureImageOptions {
    /**
     * If enabled, the result will contain dewarped image of the signature.
     */
    returnSignatureImage: boolean;
    /**
     * If enabled, the result will contain JPEG-encoded image of the signature.
     */
    returnEncodedSignatureImage: boolean;
    /**
     * The DPI (Dots Per Inch) for signature image in cases when it
     * should be returned. It applies for both encoded and non-encoded versions.
     */
    signatureImageDpi: number;
}
export declare function validateDpi(dpi: number): void;
export interface ImageResult {
    /**
     * Contains the original image that can be drawn to canvas.
     */
    readonly rawImage: ImageData | null;
    /**
     * Contains the JPEG-encoded bytes of the image.
     */
    readonly encodedImage: Uint8Array | null;
}
export interface CameraFrameResult {
    /**
     * Contains both original image and JPEG-encoded bytes of the image.
     */
    readonly frame: ImageData | null;
    /** Orientation of the captured frame */
    readonly orientation: ImageOrientation;
}
