/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Host, h } from "@stencil/core";
export class MbTooltipAdvanced {
  constructor() {
    this.show = undefined;
    this.message = undefined;
    this.arrowPosition = undefined;
    this.textAlign = undefined;
  }
  render() {
    return (h(Host, null, h("p", { part: "tooltip", class: `mb-tooltip ${this.show ? "visible" : ""} ${this.arrowPosition ? this.arrowPosition : "arrow-none"} ${this.textAlign ? this.textAlign : "text-center"} ` }, this.message)));
  }
  static get is() { return "mb-tooltip-advanced"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["mb-tooltip-advanced.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["mb-tooltip-advanced.css"]
    };
  }
  static get properties() {
    return {
      "show": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "show",
        "reflect": false
      },
      "message": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "message",
        "reflect": false
      },
      "arrowPosition": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "| \"arrow-left\"\n    | \"arrow-right\"\n    | \"arrow-up\"\n    | \"arrow-up-left\"\n    | \"arrow-up-right\"\n    | \"arrow-down\"\n    | \"arrow-down-left\"\n    | \"arrow-down-right\"",
          "resolved": "\"arrow-down\" | \"arrow-down-left\" | \"arrow-down-right\" | \"arrow-left\" | \"arrow-right\" | \"arrow-up\" | \"arrow-up-left\" | \"arrow-up-right\"",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "arrow-position",
        "reflect": false
      },
      "textAlign": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"text-center\" | \"text-left\" | \"text-right\"",
          "resolved": "\"text-center\" | \"text-left\" | \"text-right\"",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "text-align",
        "reflect": false
      }
    };
  }
}
