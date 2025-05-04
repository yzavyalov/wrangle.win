import { nextTick, ref, Ref } from "vue";
import { componentOffsetsByVariant } from "@/utils/constants";
import { UseShowComponentOptions } from "@/types/types";

interface ElementPositionObject {
  top: string;
  left: string;
  topNum: number;
  leftNum: number;
}

export const useShowComponent = ({ variant = 'default' }: UseShowComponentOptions = {}) => {
  const isVisible: Ref<boolean> = ref(false);
  const position: Ref<ElementPositionObject | {}> = ref({});

  const { offsetX, offsetY } = componentOffsetsByVariant[variant] || componentOffsetsByVariant.default;

  const showComponent = (target) => {
    const el = target instanceof HTMLElement ? target : target?.currentTarget;
    if (!(el instanceof HTMLElement)) return;

    const { left, top, width, height } = el.getBoundingClientRect();

    const calculatedPosistion: ElementPositionObject = {
      top: `${top + height / 2 + window.scrollY + offsetY}px`,
      left: `${left + width / 2 + window.scrollX + offsetX}px`,
      topNum: top + height / 2 + window.scrollY + offsetY,
      leftNum: left + width / 2 + window.scrollX + offsetX,
    };

    position.value = calculatedPosistion;

    console.log(position.value, "position.value - showComponent. variant", variant);

    nextTick(() => {
      isVisible.value = true;
    });
  };

  const closeComponent = () => isVisible.value = false;

  const adjustElementPosition = (elementRef: Ref<any>, positionObject: Ref<ElementPositionObject>) => {
    const el = elementRef.value?.$el || elementRef.value;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const padding = 10;

    let rectTop = rect.top;
    let rectHeight = rect.height;

    const windowHeight = window.innerHeight;
    const windowScrollY = window.scrollY;

    const prevTop = positionObject.value.topNum;
    const prevLeft = positionObject.value.leftNum;

    const diffTop = windowScrollY - prevTop;
    const diffBottom = windowHeight - (rectHeight + rectTop);

    if (diffBottom < 0) {
      return position.value = {
        top: `${prevTop + diffBottom - padding}px`,
        left: `${prevLeft}px`,
      };

    } else if (diffTop > 0) {
      return position.value = {
        top: `${prevTop + diffTop + padding}px`,
        left: `${prevLeft}px`,
      };
    }
  };

  return {
    isVisible,
    position,
    showComponent,
    closeComponent,
    adjustElementPosition,
  };
};
