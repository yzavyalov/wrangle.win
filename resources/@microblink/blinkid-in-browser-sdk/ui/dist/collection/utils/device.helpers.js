/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import * as BlinkIDSDK from "../../../es/blinkid-sdk";
export function hasVideoDevices() {
  return new Promise((resolve) => {
    if (!window.navigator ||
      !window.navigator.mediaDevices ||
      typeof window.navigator.mediaDevices.enumerateDevices !== "function") {
      resolve(false);
      return;
    }
    window.navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices = devices || [];
      for (const device of devices) {
        if (device && device.kind === "videoinput") {
          resolve(true);
          return;
        }
      }
      resolve(false);
    });
  });
}
export function isWasmSupported() {
  return new Promise((resolve) => {
    const wasmSupport = BlinkIDSDK.isBrowserSupported();
    resolve(wasmSupport);
  });
}
export async function checkMandatoryCapabilites() {
  const wasmSupport = await isWasmSupported();
  return wasmSupport;
}
/**
 * Determine whether this is a desktop device based on the screen resolution.
 */
export function isDesktop() {
  return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
