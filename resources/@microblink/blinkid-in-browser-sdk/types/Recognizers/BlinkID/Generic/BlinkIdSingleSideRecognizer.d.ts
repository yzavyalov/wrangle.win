/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { AdditionalProcessingInfo } from "./AdditionalProcessingInfo";
import { AnonymizationMode } from "./AnonymizationMode";
import { BarcodeResult } from "./BarcodeResult";
import { ClassInfo } from "./ClassInfo";
import { DriverLicenseDetailedInfo } from "./DriverLicenseDetailedInfo";
import { DateResult, StringResult } from "./GenericResultStructures";
import { ImageAnalysisResult } from "./ImageAnalysisResult";
import { ProcessingStatus } from "./ProcessingStatus";
import { RecognitionMode } from "./RecognitionMode";
import { RecognitionModeFilter } from "./RecognitionModeFilter";
import { VIZResult } from "./VIZResult";
import { StrictnessLevel } from "./StrictnessLevel";
import { DependentInfo } from "./DependentInfo";
import { CameraFrameResult, ExtensionFactors, FaceImageOptions, FullDocumentImageOptions, ImageResult, SignatureImageOptions } from "../ImageOptions";
import { MrzResult } from "../MRTD/MrtdStructures";
import { Recognizer, RecognizerResult, RecognizerSettings, WasmSDK } from "../../../MicroblinkSDK/DataStructures";
import { ClassAnonymizationSettings } from "./ClassAnonymizationSettings";
import { Rectangle } from "../../../MicroblinkSDK/Geometry";
import { DocumentSide } from "../../../MicroblinkSDK/DocumentSide";
import { CustomClassRules } from "./CustomClassRules";
export * from "./AddressDetailedInfo";
export * from "./AdditionalProcessingInfo";
export * from "./AlphabetType";
export * from "./AnonymizationMode";
export * from "./BarcodeResult";
export * from "./ClassFilter";
export * from "./ClassInfo";
export * from "./CustomClassRules";
export * from "./DetailedFieldType";
export * from "./DocumentNumberAnonymizationSettings";
export * from "./DriverLicenseDetailedInfo";
export * from "./FieldType";
export * from "./ImageExtractionType";
export * from "./GenericResultStructures";
export * from "./ImageAnalysisResult";
export * from "./ProcessingStatus";
export * from "./RecognitionMode";
export * from "./RecognitionModeFilter";
export * from "./StrictnessLevel";
export * from "./VIZResult";
/**
 * A barcode scanning started callback function.
 */
export type BarcodeScanningStartedCallback = () => void;
/**
 * A classifier callback function.
 * @param supported True if document is supported for recognition, false otherwise.
 */
export type ClassifierCallback = (supported: boolean) => void;
/**
 * A settings object that is used for configuring the BlinkIdSingleSideRecognizer.
 */
export declare class BlinkIdSingleSideRecognizerSettings implements RecognizerSettings, FullDocumentImageOptions, FaceImageOptions, SignatureImageOptions {
    /**
     * Skip processing of blurred frames.
     */
    enableBlurFilter: boolean;
    /**
     * Skip processing of frames which contain too much glare.
     */
    enableGlareFilter: boolean;
    /**
     * Strictness level for blur detection.
     */
    blurStrictnessLevel: StrictnessLevel;
    /**
     * Strictness level for glare detection.
     */
    glareStrictnessLevel: StrictnessLevel;
    /**
     * Allow reading of non-standard MRZ (Machine Readable Zone). Only raw MRZ result is returned.
     * Final recognizer state is not affected.
     */
    allowUnparsedMrzResults: boolean;
    allowBarcodeScanOnly: boolean;
    combineFrameResults: boolean;
    /**
     * Allow reading of standard MRZ (Machine Readable Zone) which gets successfully parsed, but check digits are
     * incorrect (do not comply with the ICAO standard).
     *
     * Final recognizer state is not affected.
     */
    allowUnverifiedMrzResults: boolean;
    /**
     * Enable or disable recognition of specific document groups supported by the current license.
     * By default all modes are enabled.
     */
    recognitionModeFilter: RecognitionModeFilter;
    /**
     * Save the raw camera frames at the moment of the data extraction or timeout.
     * This significantly increases memory consumption. The scanning performance is not affected.
     */
    saveCameraFrames: boolean;
    /**
     * Process only cropped document images with corrected perspective (frontal images of a document).
     * This only applies to still images - video feed will ignore this setting.
     */
    scanCroppedDocumentImage: boolean;
    /**
     * Allow only results containing expected characters for a given field.
     *
     * Each field is validated against a set of rules.
     *
     * All fields have to be successfully validated in order for a recognizer state to be ‘valid’.
     * Setting is used to improve scanning accuracy.
     */
    validateResultCharacters: boolean;
    /**
     * Redact specific fields based on requirements or laws regarding a specific document.
     *
     * Data can be redacted from the image, the result or both.
     *
     * The setting applies to certain documents only.
     */
    anonymizationMode: AnonymizationMode;
    /**
     * Redact fields for specific document class.
     *
     * Fields specified by requirements or laws for a specific document will be redacted regardless of this setting.
     *
     * Based on anonymizationMode setting, data will be redacted from the image, the result or both.
     */
    additionalAnonymization: Array<ClassAnonymizationSettings> | null;
    /**
     * Define custom rules for specific document class.
     *
     * The new class rules will be a combination of our internal and user-defined rules.
     *
     * The more detailed class filter will have priority over the other.
     */
    customClassRules: Array<CustomClassRules> | null;
    /**
     * Called when barcode scanning step starts.
     */
    barcodeScanningStartedCallback: BarcodeScanningStartedCallback | null;
    /**
     * Called when recognizer classifies a document.
     */
    classifierCallback: ClassifierCallback | null;
    /**
     * If set to `null`, all supported documents will be recognized.
     * Otherwise, only classes from given array will be recognized and all other
     * documents will be treated as "not supported" (observable via classifierCallback).
     */
    allowedDocumentClasses: Array<ClassInfo> | null;
    /**
     * Minimum required distance between the edge of the scanning frame and the document.
     *
     * Defined as a percentage of the frame width.
     *
     * Default value is 0.0f in which case the padding edge and the image edge are the same.
     * Alternative recommended value is 0.02f.
     */
    paddingEdge: number;
    returnFullDocumentImage: boolean;
    returnEncodedFullDocumentImage: boolean;
    private _fullDocumentImageDpi;
    get fullDocumentImageDpi(): number;
    set fullDocumentImageDpi(value: number);
    fullDocumentImageExtensionFactors: ExtensionFactors;
    returnFaceImage: boolean;
    returnEncodedFaceImage: boolean;
    private _faceImageDpi;
    get faceImageDpi(): number;
    set faceImageDpi(value: number);
    returnSignatureImage: boolean;
    returnEncodedSignatureImage: boolean;
    private _signatureImageDpi;
    get signatureImageDpi(): number;
    set signatureImageDpi(value: number);
}
/**
 * The base result of image recognition when using either the BlinkIdSingleSideRecognizer or BlinkIdMultiSideRecognizer.
 */
export interface BaseBlinkIdRecognizerResult extends RecognizerResult {
    /**
     * The additional address information of the document owner.
     */
    readonly additionalAddressInformation: StringResult;
    /**
     * The additional name information of the document owner.
     */
    readonly additionalNameInformation: StringResult;
    /**
     * The one more additional address information of the document owner.
     */
    readonly additionalOptionalAddressInformation: StringResult;
    /**
     * The fathers name of the document owner.
     */
    readonly fathersName: StringResult;
    /**
     * The mothers name of the document owner.
     */
    readonly mothersName: StringResult;
    /**
     * The address of the document owner.
     */
    readonly address: StringResult;
    /**
     * The data extracted from the barcode.
     */
    readonly barcode: BarcodeResult;
    /**
    * This member indicates whether the barcode scanning step was utilized during the
    * process.
    * If the barcode scanning step was executed: a parsable barcode image will be stored in the
    * `barcodeCameraFrame`.
    * If the barcode scanning step was not executed: a parsable barcode image will be stored in the
    * `fullDocumentFrontImage` or `fullDocumentBackImage` depending on which side the barcode was on.
    * */
    readonly barcodeStepUsed: boolean;
    /**
     * The class info
     */
    readonly classInfo: ClassInfo;
    /**
     * The date of birth of the document owner.
     */
    readonly dateOfBirth: DateResult;
    /**
     * The date of expiry of the document.
     */
    readonly dateOfExpiry: DateResult;
    /**
     * Determines if date of expiry is permanent.
     */
    readonly dateOfExpiryPermanent: boolean;
    /**
     * The date of issue of the document.
     */
    readonly dateOfIssue: DateResult;
    /**
     * The additional number of the document.
     */
    readonly documentAdditionalNumber: StringResult;
    /**
     * The one more additional number of the document.
     */
    readonly documentOptionalAdditionalNumber: StringResult;
    /**
     * The document number.
     */
    readonly documentNumber: StringResult;
    /**
     * The driver license detailed info
     */
    readonly driverLicenseDetailedInfo: DriverLicenseDetailedInfo;
    /**
     * The employer of the document owner.
     */
    readonly employer: StringResult;
    /**
     * The face image
     */
    readonly faceImage: ImageResult;
    /**
     * The location of the face image on the document.
     */
    readonly faceImageLocation: Rectangle | undefined;
    /**
     * The side of the document in which the face image is located.
     */
    readonly faceImageSide: DocumentSide | undefined;
    /**
     * The first name of the document owner.
     */
    readonly firstName: StringResult;
    /**
     * The full name of the document owner.
     */
    readonly fullName: StringResult;
    /**
     * The issuing authority of the document.
     */
    readonly issuingAuthority: StringResult;
    /**
     * The last name of the document owner.
     */
    readonly lastName: StringResult;
    /**
     * The localized name of the document owner.
     */
    readonly localizedName: StringResult;
    /**
     * The marital status of the document owner.
     */
    readonly maritalStatus: StringResult;
    /**
     * The data extracted from the machine readable zone.
     */
    readonly mrz: MrzResult;
    /**
     * The nationality of the documet owner.
     */
    readonly nationality: StringResult;
    /**
     * The personal identification number.
     */
    readonly personalIdNumber: StringResult;
    /**
     * The place of birth of the document owner.
     */
    readonly placeOfBirth: StringResult;
    /**
     * Status of the last recognition process.
     */
    readonly processingStatus: ProcessingStatus;
    /**
     * The profession of the document owner.
     */
    readonly profession: StringResult;
    /**
     * The race of the document owner.
     */
    readonly race: StringResult;
    /**
     * Recognition mode used to scan current document.
     */
    readonly recognitionMode: RecognitionMode;
    /**
     * The religion of the document owner.
     */
    readonly religion: StringResult;
    /**
     * The residential status of the document owner.
     */
    readonly residentialStatus: StringResult;
    /**
     * The sex of the document owner.
     */
    readonly sex: StringResult;
    /**
     * The image of the signature
     */
    readonly signatureImage: ImageResult;
    /**
     * Sponsor of a document owner.
     */
    readonly sponsor: StringResult;
    /**
     * Blood type on a document owner.
     */
    readonly bloodType: StringResult;
    /**
     * Subtype of a document
     */
    readonly documentSubtype: StringResult;
    /**
     * Remarks on a document
     */
    readonly remarks: StringResult;
    /**
     * Type of residence permit
     */
    readonly residencePermitType: StringResult;
    /**
     * Type of visa
     */
    readonly visaType: StringResult;
    /**
     * The manufacturing year.
     */
    readonly manufacturingYear: StringResult;
    /**
     * The vehicle type.
     */
    readonly vehicleType: StringResult;
    /**
     * The eligibility category.
     */
    readonly eligibilityCategory: StringResult;
    /**
     * The specific document validity.
     */
    readonly specificDocumentValidity: StringResult;
    /**
     * The dependents info.
     */
    readonly dependentsInfo: Array<DependentInfo>;
    /**
     * The vehicle owner.
     */
    readonly vehicleOwner: StringResult;
}
/**
 * The result of image recognition when using the BlinkIdSingleSideRecognizer.
 */
export interface BlinkIdSingleSideRecognizerResult extends BaseBlinkIdRecognizerResult {
    /**
     * Detailed information about missing, invalid and extra fields.
     */
    readonly additionalProcessingInfo: AdditionalProcessingInfo;
    /**
     * Full video feed frame from which barcode data was extracted.
     */
    readonly barcodeCameraFrame: CameraFrameResult;
    /**
     * Full video feed frame from which document data was extracted.
     */
    readonly cameraFrame: CameraFrameResult;
    /**
     * Cropped and dewarped image of a document that has been scanned.
     */
    readonly fullDocumentImage: ImageResult;
    /**
     * Result of document image analysis.
     */
    readonly imageAnalysisResult: ImageAnalysisResult;
    /**
     * The data extracted from the visual inspection zone.
     */
    readonly viz: VIZResult;
}
/**
 * The Blink ID Recognizer is used for scanning any ID document.
 */
export interface BlinkIdSingleSideRecognizer extends Recognizer {
    /** Returns the currently applied BlinkIdSingleSideRecognizerSettings. */
    currentSettings(): Promise<BlinkIdSingleSideRecognizerSettings>;
    /** Applies new settings to the recognizer. */
    updateSettings(newSettings: BlinkIdSingleSideRecognizerSettings): Promise<void>;
    /** Returns the current result of the recognition. */
    getResult(): Promise<BlinkIdSingleSideRecognizerResult>;
}
/**
 * This function is used to create a new instance of `BlinkIdSingleSideRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 */
export declare function createBlinkIdSingleSideRecognizer(wasmSDK: WasmSDK): Promise<BlinkIdSingleSideRecognizer>;
