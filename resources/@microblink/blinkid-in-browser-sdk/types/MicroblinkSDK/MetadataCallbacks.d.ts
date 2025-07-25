/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Point, Quadrilateral } from "./Geometry";
/**
 * Interface representing possible events that can occur during image processing.
 * All functions in this interface are optional and will be called only if they are
 * implemented.
 */
export interface MetadataCallbacks {
    /**
     * Called when recognition process wants to display some debug text information.
     * @param debugTest Debug text information to be displayed.
     */
    onDebugText?(debugTest: string): void;
    /**
     * Called when all recognizers in RecognizerRunner have failed to detect anything on the image.
     */
    onDetectionFailed?(): void;
    /**
     * Called when recognition process wants to display some quadrilateral.
     * @param quad Quadrilateral to be displayed.
     */
    onQuadDetection?(quad: DisplayableQuad): void;
    /**
     * Called when recognition process wants to display some points.
     * @param pointSet Points to be displayed.
     */
    onPointsDetection?(pointSet: DisplayablePoints): void;
    /**
     * Called when first side recognition with the multi-side recognizer completes.
     */
    onFirstSideResult?(): void;
}
/**
 * Detection status of the specific detected object.
 */
export declare enum DetectionStatus {
    /** Detection has failed. */
    Failed = 0,
    /** Document has been detected. */
    Success = 1,
    /** Document has been detected but the camera is too far from the document. */
    CameraTooFar = 2,
    /** Document has been detected but the camera is too close to the document. */
    CameraTooClose = 3,
    /** Document has been detected but the camera’s angle is too steep. */
    CameraAngleTooSteep = 4,
    /** Document has been detected but the document is too close to the camera edge. */
    DocumentTooCloseToCameraEdge = 5,
    /** Only part of the document is visible. */
    DocumentPartiallyVisible = 6,
    /** Fallback detection was successful (PhotoPay specific). */
    FallbackSuccess = 7
}
/**
 * Interface representing any displayable object.
 */
export interface Displayable {
    /** Detection status of the displayable object. */
    detectionStatus: DetectionStatus;
    /**
     * 3x3 transformation matrix from the image's coordinate system to view's coordinate system.
     */
    transformMatrix: Float32Array;
}
/**
 * Interface representing quadrilateral in image.
 */
export interface DisplayableQuad extends Displayable, Quadrilateral {
}
/**
 * Interface representing list of points in image.
 */
export interface DisplayablePoints extends Displayable {
    /** Array of points */
    points: Point[];
}
