/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Returns safe path, i.e. URL for given path and filename (file path).
 *
 * @param path      String representing file path.
 * @param fileName  String representing file name.
 * @returns String representing URL for specified resource.
 */
export declare function getSafePath(path: string, fileName: string): string;
/**
 * Checks if provided string is valid secure URL without subpaths.
 * @param url URL to check.
 * @returns Boolean indicating if provided URL is valid.
 */
export declare function isValidURL(url: string): boolean;
