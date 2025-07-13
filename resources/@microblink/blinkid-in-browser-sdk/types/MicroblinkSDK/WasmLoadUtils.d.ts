/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { BlinkIDResource } from "./BlinkIdVariant";
import { WasmType } from "./WasmType";
export declare function isSafari(): boolean;
export declare function isIOSUserAgent(): boolean;
/**
 * Safari 16 shipped with WASM threads support, but it didn't ship with nested
 * workers support, so an extra check is needed
 * https://github.com/GoogleChromeLabs/squoosh/pull/1325/files#diff-904900db64cd3f48b0e765dbbdc6a218a7ea74a199671bde82a8944a904db86f
 */
export default function checkThreadsSupport(): Promise<boolean>;
export declare function detectWasmFeatures(): Promise<WasmType>;
export declare function detectWasmType(): Promise<WasmType>;
export declare function wasmFolder(blinkIDResource: BlinkIDResource): string;
