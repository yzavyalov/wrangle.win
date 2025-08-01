/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 *
 * RecognitionModeFilter is used to enable/disable recognition of specific document groups.
 * Setting is taken into account only if the right for that document is purchased.
 */
export declare class RecognitionModeFilter {
    /** Enable scanning of MRZ IDs. Setting is taken into account only if the mrz_id right is purchased. */
    enableMrzId: boolean;
    /** Enable scanning of Passport MRZ. Setting is taken into account only if the passport right is purchased. */
    enableMrzPassport: boolean;
    /** Enable scanning of visa MRZ. Setting is taken into account only if the visa right is purchased. */
    enableMrzVisa: boolean;
    /** Enable scanning of Photo ID. Setting is taken into account only if the photo_id right is purchased. */
    enablePhotoId: boolean;
    /**
     * Enable scanning of barcode IDs. Setting is taken into account only if the barcode right to
     * scan that barcode is purchased.
     */
    enableBarcodeId: boolean;
    /**
     * Enable full document recognition. Setting is taken into account only if the document right to
     * scan that document is purchased.
     */
    enableFullDocumentRecognition: boolean;
}
