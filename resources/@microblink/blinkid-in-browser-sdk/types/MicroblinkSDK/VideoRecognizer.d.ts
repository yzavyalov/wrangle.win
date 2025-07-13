/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { PreferredCameraType, SelectedCamera } from "./CameraUtils";
import { RecognizerResultState, RecognizerRunner } from "./DataStructures";
import { BlinkIdMultiSideRecognizerResult } from "../Recognizers/BlinkID/Generic/BlinkIdMultiSideRecognizer";
import { BlinkIdSingleSideRecognizerResult } from "../Recognizers/BlinkID/Generic/BlinkIdSingleSideRecognizer";
export type BlinkIDResult = BlinkIdSingleSideRecognizerResult | BlinkIdMultiSideRecognizerResult;
/**
 * Indicates mode of recognition in `VideoRecognizer`.
 */
export declare enum VideoRecognitionMode {
    /** Normal recognition */
    Recognition = 0,
    /** Indefinite scan. Useful for profiling the performance of scan (using `onDebugText` metadata callback) */
    RecognitionTest = 1,
    /** Only detection. Useful for profiling the performance of detection (using `onDebugText` metadata callback) */
    DetectionTest = 2
}
/**
 * Invoked when VideoRecognizer finishes the recognition of the video stream.
 * @param {RecognizerResultState} recognitionState  The state of recognition
 * after finishing. If `Empty` or `Uncertain` are returned, this indicates that
 * the scanning was cancelled or timeout has been reached.
 */
export type OnScanningDone = (recognitionState: RecognizerResultState) => void;
export type OnFrameProcessed = (result: BlinkIDResult, frame: ImageData) => void;
/**
 * A wrapper around `RecognizerRunner` that can use it to perform recognition of
 * video feeds - either from live camera or from predefined video file.
 */
export declare class VideoRecognizer {
    private videoElement;
    private recognizerRunner;
    deviceId: string | null;
    private recognitionCancelRequested;
    private recognitionPauseRequested;
    private recognitionTimeoutMs;
    private timeoutStartedAt;
    private currentTimeoutCount;
    private videoRecognitionMode;
    private onScanningDone;
    private onFrameProcessed;
    private cameraFlipped;
    private threadBusy;
    private frameCallback;
    /**
     * **Use only if provided factory functions are not well-suited for your use
     * case.**
     *
     * Creates a new `VideoRecognizer` with provided `HTMLVideoElement`.
     *
     * Keep in mind that `HTMLVideoElement` **must have** a video feed which is
     * ready to use.
     *
     * - If you want to take advantage of provided camera management, use
     *   `createVideoRecognizerFromCameraStream`
     * - In case that static video file should be processed, use
     *   `createVideoRecognizerFromVideoPath`
     *
     * @param videoElement HTMLVideoElement with video feed which is going to be
     * processed
     * @param recognizerRunner RecognizerRunner that should be used for video
     * stream recognition
     * @param cameraFlipped Whether the camera is flipped, e.g. if front-facing
     * camera is used
     * @param deviceId
     */
    constructor(videoElement: HTMLVideoElement, recognizerRunner: RecognizerRunner, cameraFlipped?: boolean, deviceId?: string | null);
    private handleFlippingVideo;
    /**
     * Creates a new VideoRecognizer by opening a camera stream and attaching it
     * to given `HTMLVideoElement`. If camera cannot be accessed, the returned
     * promise will be rejected.
     *
     * @param cameraFeed `HTMLVideoElement` to which camera stream should be
     * attached
     * @param recognizerRunner `RecognizerRunner` that should be used for video
     * stream recognition
     * @param cameraId User can provide specific camera ID to be selected and used
     * @param preferredCameraType Whether back facing or front facing camera is
     *        preferred. Obeyed only if there is a choice (i.e. if device has only
     *        front-facing camera, the opened camera will be a front-facing
     *        camera, regardless of preference)
     */
    static createVideoRecognizerFromCameraStream(cameraFeed: HTMLVideoElement, recognizerRunner: RecognizerRunner, cameraId?: string | null, preferredCameraType?: PreferredCameraType): Promise<VideoRecognizer>;
    /**
     * Creates a new `VideoRecognizer` by attaching the given URL to video to
     * given `HTMLVideoElement` and using it to display video frames while
     * processing them.
     *
     * @param videoPath URL of the video file that should be recognized.
     * @param videoElement `HTMLVideoElement` to which video file will be attached
     * @param recognizerRunner `RecognizerRunner` that should be used for video
     * stream recognition.
     */
    static createVideoRecognizerFromVideoPath(videoPath: string, videoElement: HTMLVideoElement, recognizerRunner: RecognizerRunner): VideoRecognizer;
    /**
     * Sets the callback that will be invoked when frame is processed
     * @param onFrameProcessed Callback that will be invoked when frame is processed
     */
    setOnFrameProcessed: (onFrameProcessed: OnFrameProcessed | null) => void;
    flipCamera: () => Promise<void>;
    isCameraFlipped: () => boolean;
    /**
     * Sets the video recognition mode to be used.
     */
    setVideoRecognitionMode: (videoRecognitionMode: VideoRecognitionMode) => Promise<void>;
    /**
     * Starts the recognition of the video stream associated with this
     * `VideoRecognizer`. The stream will be unpaused and recognition loop will
     * start. After recognition completes, an `onScanningDone` callback will be
     * invoked with state of the recognition.
     *
     * NOTE: As soon as the execution of the callback completes, the recognition
     *       loop will continue and recognition state will be retained. To clear
     *       the recognition state, use {@linkcode resetRecognizers} (within your
     *       callback). To pause the recognition loop, use
     *       {@linkcode pauseRecognition} (within your callback) - to resume it
     *       later use {@linkcode resumeRecognition}. To completely stop the
     *       recognition and video feed, while keeping the ability to use this
     *       `VideoRecognizer` later, use {@linkcode pauseVideoFeed}. To
     *       completely stop the recognition and video feed and release all the
     *       resources involved with the video stream, use
     *       {@linkcode releaseVideoFeed}.
     *
     * @param onScanningDone Callback that will be invoked when recognition
     * completes.
     * @param recognitionTimeoutMs Amount of time in ms that the recognizer will
     * stay in the `Uncertain` state before resolving.
     */
    startRecognition: (onScanningDone: OnScanningDone, recognitionTimeoutMs?: number) => Promise<void>;
    /**
     * Resumes the recognition and video playback
     * @param resetRecognizers Indicates whether resetRecognizers should be
     * invoked while resuming the recognition
     */
    resumeRecognition: (resetRecognizers: boolean) => Promise<void>;
    /**
     * Performs the recognition of the video stream associated with this
     * `VideoRecognizer`. The stream will be unpaused, recognition will be
     * performed and promise will be resolved with recognition status. After the
     * resolution of returned promise, the video stream will be paused, but not
     * released. To release the stream, use function `releaseVideoFeed`.
     *
     * This is a simple version of {@linkcode startRecognition} that should be
     * used for most cases, like when you only need to perform one scan per video
     * session.
     *
     * @param recognitionTimeoutMs Amount of time in ms that the recognizer will
     * stay in the `Uncertain` state before resolving.
     */
    recognize: (recognitionTimeoutMs?: number) => Promise<RecognizerResultState>;
    /**
     * Pauses the video feed. You can resume the feed by calling recognize or
     * `startRecognition`. Note that this pauses both the camera feed and
     * recognition. If you just want to pause recognition, while keeping the
     * camera feed active, call method `pauseRecognition`.
     */
    pauseVideoFeed: () => void;
    /**
     * Pauses the recognition. This means that video frames that arrive from given
     * video source will not be recognized. To resume recognition, call
     * {@linkcode resumeRecognition}.
     */
    pauseRecognition: () => void;
    /**
     * Cancels current ongoing recognition. Unlike {@linkcode pauseRecognition} this will reset everything
     */
    cancelRecognition: () => void;
    /**
     * Convenience method for invoking
     * {@linkcode RecognizerRunner.resetRecognizers} on associated
     * `RecognizerRunner`.
     */
    resetRecognizers: (hardReset: boolean) => Promise<void>;
    /**
     * Convenience method for accessing `RecognizerRunner` associated with this
     * `VideoRecognizer`. Sometimes it's useful to reconfigure `RecognizerRunner`
     * while handling `onScanningDone` callback and this method makes that much
     * more convenient.
     */
    getRecognizerRunner: () => RecognizerRunner;
    /**
     * Getter for {@linkcode videoElement}
     */
    getVideoElement: () => HTMLVideoElement;
    /**
     * Change currently used camera device for recognition. To get list of
     * available camera devices use `getCameraDevices` method.
     *
     * Keep in mind that this method will reset recognizers.
     *
     * @param camera Desired camera device which should be used for recognition.
     */
    changeCameraDevice: (camera: SelectedCamera) => Promise<void>;
    /**
     * Shorthand for queuing the next frame for processing. Wrapper around
     * {@linkcode recognitionLoop}. Resolves when the frame is done processing.
     */
    private queueFrame;
    private throttledQueueFrame;
    /**
     * The main loop. Takes camera frames from {@linkcode videoElement} and
     * processes them on the `recognizerRunner`.
     */
    private recognitionLoop;
    /**
     * Clear timeout on every loop which didn't result in `RecognizerResultState.Uncertain`
     */
    private clearTimeout;
    /**
     * Stops all media stream tracks associated with {@linkcode videoElement}.
     */
    releaseVideoFeed: () => void;
}
