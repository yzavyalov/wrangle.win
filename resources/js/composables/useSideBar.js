import { nextTick, ref } from "vue";

export const useSideBar = () => {
  const isSideBatActive = ref(false);

  const positions = ref({});

  const openSideBar = (event) => {
    console.log(event ,'event - openSideBar');

    const el = event.currentTarget;
    if (!(el instanceof HTMLElement)) return;

    const rect = el.getBoundingClientRect();
    const centerX = (rect.left + rect.width / 2 + window.scrollX) - 41;
    const centerY = (rect.top + rect.height / 2 + window.scrollY) - 30;

    positions.value = { left: `${centerX}px`, top: `${centerY}px` };

    nextTick(() => {
      isSideBatActive.value = true;
    })
  };

  const closeSideBar = () => {
    isSideBatActive.value = false;
  };

  return {
    isSideBatActive,
    positions,
    openSideBar,
    closeSideBar,
  };
}
