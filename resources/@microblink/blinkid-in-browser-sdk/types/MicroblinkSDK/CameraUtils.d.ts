/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Preferred type of camera to be used when opening the camera feed.
 */
export declare enum PreferredCameraType {
    /** Prefer back facing camera */
    BackFacingCamera = 0,
    /** Prefer front facing camera */
    FrontFacingCamera = 1
}
export declare const isAndroidDevice: () => boolean;
export declare const isIOSDevice: () => boolean;
export declare const isMobileDevice: () => boolean;
export declare class SelectedCamera {
    readonly deviceId: string;
    readonly groupId: string;
    readonly facing: PreferredCameraType;
    readonly label: string;
    constructor(mdi: MediaDeviceInfo, facing: PreferredCameraType, label?: string);
}
export interface CameraDevices {
    frontCameras: SelectedCamera[];
    backCameras: SelectedCamera[];
}
export declare function getCameraDevices(): Promise<CameraDevices>;
export declare function selectCamera(cameraId: string | null, preferredCameraType: PreferredCameraType): Promise<SelectedCamera | null>;
/**
 * Bind camera device to video feed (HTMLVideoElement).
 *
 * This function will return `true` in case that video feed of camera device has been flipped,
 * and `false` otherwise.
 *
 * @param camera                Camera device which should be binded with the video element.
 * @param videoFeed             HTMLVideoElement to which camera device should be binded.
 * @param preferredCameraType   Enum representing whether to use front facing or back facing camera.
 */
export declare function bindCameraToVideoFeed(camera: SelectedCamera, videoFeed: HTMLVideoElement, preferredCameraType?: PreferredCameraType): Promise<boolean>;
