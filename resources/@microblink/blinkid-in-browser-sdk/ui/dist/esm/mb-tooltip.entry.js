import { r as registerInstance, h, H as Host } from './index-a26bf010.js';

const mbTooltipCss = ":host{display:block}.mb-tooltip{display:none;position:absolute;margin:2px 40px 2px 32px;padding:8px;font-size:12px;line-height:16px;color:#374151;background-color:#fff;border:1px solid rgba(120, 120, 128, 0.2);filter:drop-shadow(0px 2px 4px rgba(31, 41, 55, 0.06)) drop-shadow(0px 4px 6px rgba(31, 41, 55, 0.1));border-radius:4px}.mb-tooltip.text-center{text-align:center}.mb-tooltip.text-left{text-align:left}.mb-tooltip.text-right{text-align:right}.mb-tooltip svg{display:block;float:left;margin:6px 14px 6px 6px}.mb-tooltip::after{position:absolute;display:block;content:\" \";background-color:#fff;width:10px;height:10px;transform:rotate(-45deg)}.mb-tooltip.arrow-none::after{display:none}.mb-tooltip.arrow-left::after{left:-3px;top:calc(50% - 5px)}.mb-tooltip.arrow-right::after{right:-3px;top:calc(50% - 5px)}.mb-tooltip.arrow-up::after{top:-3px;left:calc(50% - 5px)}.mb-tooltip.arrow-down::after{bottom:-3px;left:calc(50% - 5px)}.mb-tooltip.visible{display:block}";

const MbTooltip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.show = undefined;
    this.message = undefined;
    this.arrowPosition = undefined;
    this.showWarningIcon = undefined;
    this.showInfoIcon = undefined;
    this.textAlign = undefined;
    this.containerWidth = undefined;
  }
  render() {
    return (h(Host, null, h("p", { part: "tooltip", class: `mb-tooltip ${this.show ? "visible" : ""} ${this.arrowPosition ? this.arrowPosition : "arrow-none"} ${this.textAlign ? this.textAlign : "text-center"} ` }, this.message)));
  }
};
MbTooltip.style = mbTooltipCss;

export { MbTooltip as mb_tooltip };
