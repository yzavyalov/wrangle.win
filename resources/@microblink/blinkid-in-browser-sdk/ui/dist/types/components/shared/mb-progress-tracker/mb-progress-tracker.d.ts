/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
export declare class MbProgressTracker {
  /**
   * Steps count.
   *
   * Default is 3.
   */
  size: number;
  /**
   * Current step.
   *
   * Steps start from 1 up to the size number.
   *
   * Default is 1.
   */
  current: number;
  render(): any;
  private getCurrentCorrected;
  private getSteps;
}
