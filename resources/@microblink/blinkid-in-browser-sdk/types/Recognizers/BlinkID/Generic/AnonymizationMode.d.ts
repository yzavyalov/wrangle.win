/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * AnonymizationMode is used to define level of anonymization
 * performed on recognizer result.
 */
export declare enum AnonymizationMode {
    /**
     * Anonymization will not be performed.
     */
    None = 0,
    /**
     * FullDocumentImage is anonymized with black boxes
     * covering sensitive data.
     */
    ImageOnly = 1,
    /**
     * Result fields containing sensitive data are removed from result.
     */
    ResultFieldsOnly = 2,
    /**
     * This mode is combination of ImageOnly and ResultFieldsOnly modes.
     */
    FullResult = 3
}
