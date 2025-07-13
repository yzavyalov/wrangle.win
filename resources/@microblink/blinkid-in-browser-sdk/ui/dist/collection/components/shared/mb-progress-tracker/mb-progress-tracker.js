/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Host, h } from "@stencil/core";
export class MbProgressTracker {
  constructor() {
    this.getCurrentCorrected = () => {
      if (this.current < 1) {
        return 1;
      }
      if (this.current > this.size) {
        return this.size;
      }
      return this.current;
    };
    this.getSteps = () => {
      const array = [];
      for (let counter = 1; counter <= this.size; counter++) {
        array.push(counter);
      }
      return array;
    };
    this.size = 3;
    this.current = 1;
  }
  render() {
    const currentCorrected = this.getCurrentCorrected();
    const steps = this.getSteps();
    return (h(Host, null, h("div", { class: "mb-progress-tracker" }, steps.map((step) => (h("div", { class: `dot ${currentCorrected === step ? "active" : "inactive"}` }))))));
  }
  static get is() { return "mb-progress-tracker"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["mb-progress-tracker.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["mb-progress-tracker.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Steps count.\n\nDefault is 3."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "3"
      },
      "current": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Current step.\n\nSteps start from 1 up to the size number.\n\nDefault is 1."
        },
        "attribute": "current",
        "reflect": false,
        "defaultValue": "1"
      }
    };
  }
}
