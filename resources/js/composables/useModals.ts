import { computed, onMounted, onUnmounted } from "vue";
import { useSettingsStore } from "@/store/settings";
import { useModalsStore } from "@/store/modals";
import { OPEN_MODAL_EVENT_NAME, CLOSE_MODAL_EVENT_NAME } from "@/composables";

interface UseModalsOptions {
  isLayout?: boolean
}

export const useModals = (options: UseModalsOptions) => {

  const { isLayout = false } = options;

  const { newModal, closeModal } = useModalsStore();

  const modals = computed(() => useModalsStore().getModals);

  const openNewModalHandler = (modalName, options = {}) => {
    newModal(modalName);
  }

  const closeModalhandler = (modalName, options = {}) => {
    closeModal(modalName);
  }

  const openNewModalEventHandler = (event) => {
    const { modalName, options } = event.detail;
    console.log(event.detail, "event.detail - openNewModalEventHandler");

    modalName && openNewModalHandler(modalName, options);
  }

  const closeModalEventhandler = (event) => {
    const { modalName, options } = event.detail;
    console.log(event.detail, "event.detail - closeModalEventhandler");

    closeModalhandler(modalName, options);
  }

  onMounted(() => {
    console.log(isLayout, "isLayout - onMounted");

    isLayout && window.addEventListener(OPEN_MODAL_EVENT_NAME, openNewModalEventHandler);
    isLayout && window.addEventListener(CLOSE_MODAL_EVENT_NAME, closeModalEventhandler);
  })

  onUnmounted(() => {
    console.log(isLayout, "isLayout - onUnmounted");

    isLayout && window.removeEventListener(OPEN_MODAL_EVENT_NAME, openNewModalEventHandler);
    isLayout && window.removeEventListener(CLOSE_MODAL_EVENT_NAME, closeModalEventhandler);
  })

  return {
    modals,

    openNewModalHandler,
    closeModalhandler,
  }
}
