/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { TranslationService } from "../../../utils/translation.service";
import { MbHelpCallbacks } from "./mb-help.model";
export declare class MbHelp {
  private readonly ONBOARDING_OPEN_DELAY_MS;
  private texts;
  private onboardingOpenCount;
  private tooltipTimerId;
  private callbacks;
  isInitialized: boolean;
  isTooltipShownHover: boolean;
  isTooltipShownTimer: boolean;
  isModalShown: boolean;
  activeStepIndex: number;
  /**
   * Dictates if usage is allowed (turned on).
   */
  allow: boolean;
  /**
   * Dictates if Floating-Action-Button (Fab) is shown.
   */
  allowFab: boolean;
  /**
   * Dictates if the onboarding is allowed.
   */
  allowOnboarding: boolean;
  /**
   * Dictates if onboarding is executed all the time, or just once.
   */
  allowOnboardingPerpetuity: boolean;
  /**
   * Dictates Milliseconds after which a "Need Help?" tooltip will be shown.
   */
  tooltipPauseTimeout: number;
  /**
   * Translation service.
   */
  translationService: TranslationService;
  /**
   * Initializes - starts tooltip timer, etc.
   */
  initialize(callbacks: MbHelpCallbacks): Promise<void>;
  /**
   * Opens modal for Onboarding purpose.
   */
  openOnboarding(): Promise<void>;
  /**
   * Opens modal for Help Screens purpose.
   */
  openHelpScreens(): Promise<void>;
  /**
   * Closes modal.
   */
  close(): Promise<void>;
  /**
   * Terminates - cancels tooltip timer, closes modal, etc.
   */
  terminate(): Promise<void>;
  constructor();
  private openInternal;
  private closeInternal;
  private startTooltipTimer;
  private cancelTooltipTimer;
  private amIVisible;
  render(): any;
  private prepareTexts;
}
