/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Checks if browser is supported by the SDK. The minimum requirements for the browser is
 * the support for WebAssembly. If your browser does not support executing WebAssembly,
 * this function will return `false`.
 */
export declare function isBrowserSupported(): boolean;
/**
 * Check if current browser is in-app / embedded.
 * Detects Instagram, Facebook, LinkedIn, Twitter, WeChat, Whatsapp, and Tiktok.
 * @returns Boolean whether the browser is in-app or not
 */
export declare function isInAppBrowser(): boolean;
/**
 * Check if browser supports ES6, which is prerequisite for this SDK to execute.
 *
 * IMPORTANT: it's not possible to run this function from MicroblinkSDK if browser doesn't support
 * ES6 since this file won't be able to load.
 *
 * This function is here as a placeholder so it can be copied to standalone JS file or directly into 'index.html'.
 */
