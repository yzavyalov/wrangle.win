import { nextTick, ref } from "vue";
import { componentOffsetsByVariant } from "@/utils/constants";

export const useShowComponent = ({ variant = 'default' }: UseShowComponentOptions = {}) => {
  const isVisible = ref(false);
  const position = ref({});

  const { offsetX, offsetY } = componentOffsetsByVariant[variant] || componentOffsetsByVariant.default;

  const showComponent = (target) => {
    const el = target instanceof HTMLElement ? target : target?.currentTarget;
    if (!(el instanceof HTMLElement)) return;

    const { left, top, width, height } = el.getBoundingClientRect();

    position.value = {
      left: `${left + width / 2 + window.scrollX + offsetX}px`,
      top: `${top + height / 2 + window.scrollY + offsetY}px`,
    };


    console.log(position.value, "position.value - showComponent. variant", variant);

    nextTick(() => {
      isVisible.value = true;
    });
  };

  const closeComponent = () => isVisible.value = false;

  return {
    isVisible,
    position,
    showComponent,
    closeComponent,
  };
};
