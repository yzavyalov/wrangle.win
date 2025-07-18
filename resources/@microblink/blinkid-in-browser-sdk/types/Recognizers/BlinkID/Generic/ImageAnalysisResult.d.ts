/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
export interface ImageAnalysisResult {
    /**
     * Indicates if blur was detected on the scanned image.
     */
    readonly blurDetected: boolean;
    /**
     * Indicates if glare was detected on the scanned image.
     */
    readonly glareDetected: boolean;
    /**
     * Orientation of the card detected on the scanned image.
     */
    readonly cardOrientation: CardOrientation;
    /**
     * The color status determined from scanned image.
     */
    readonly documentImageColorStatus: DocumentImageColorStatus;
    /**
     * The Moire pattern detection status determined from the scanned image.
     */
    readonly documentImageMoireStatus: ImageAnalysisDetectionStatus;
    /**
     * Face detection status determined from the scanned image.
     */
    readonly faceDetectionStatus: ImageAnalysisDetectionStatus;
    /**
     * Mrz detection status determined from the scanned image.
     */
    readonly mrzDetectionStatus: ImageAnalysisDetectionStatus;
    /**
     * Barcode detection status determined from the scanned image.
     */
    readonly barcodeDetectionStatus: ImageAnalysisDetectionStatus;
    /**
     * RealID detection status determined from the scanned image.
     */
    readonly realIDDetectionStatus: ImageAnalysisDetectionStatus;
    /**
     * Rotation of the card detected on the scanned image.
     */
    readonly cardRotation: CardRotation | undefined;
}
/**
 * DocumentImageColorStatus enum defines possible color statuses determined from scanned image.
 */
export declare enum DocumentImageColorStatus {
    /** Determining image color status was not performed */
    NotAvailable = 0,
    /** Black-and-white image scanned */
    BlackAndWhite = 1,
    /** Color image scanned */
    Color = 2
}
/**
 *  ImageAnalysisDetectionStatus enum defines possible states of specific image object detection.
 */
export declare enum ImageAnalysisDetectionStatus {
    /** Detection was not performed */
    NotAvailable = 0,
    /** Object not detected on input image */
    NotDetected = 1,
    /** Object detected on input image */
    Detected = 2
}
/**
 * CardOrientation enum defines possible states of card orientation.
 */
export declare enum CardOrientation {
    /** Card is horizontally placed inside the camera frame */
    Horizontal = 0,
    /** Card is vertically placed inside the camera frame */
    Vertical = 1,
    /** Card orientation is not available */
    NotAvailable = 2
}
/**
 * CardRotation enum defines possible states of card rotation.
 */
export declare enum CardRotation {
    /** Card is in its original position */
    None = 0,
    /** Card is rotated 90 degrees to the right */
    Clockwise90 = 1,
    /** Card is rotated 90 degrees to the left */
    CounterClockwise90 = 2,
    /** Card is flipped upside down */
    UpsideDown = 3
}
