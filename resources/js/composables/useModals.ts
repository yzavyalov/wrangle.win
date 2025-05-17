import { computed, onMounted, onUnmounted } from "vue";
import { useSettingsStore } from "@/store/settings";
import { useModalsStore } from "@/store/modals";
import { OPEN_MODAL_EVENT_NAME, CLOSE_MODAL_EVENT_NAME } from "@/composables";
import { OpenNewModalHandlerOptions, UseModalsOptions } from "@/types/modals";

export const useModals = (options: UseModalsOptions) => {

  const { isLayout = false } = options;

  const {
    newModal,
    closeModal,
    updateModalContent,
    setModalContent,
    clearModalContent
  } = useModalsStore();

  const modals = computed(() => useModalsStore().getModals);
  const modalContent = computed(() => useModalsStore().getModalContent);

  const openNewModalHandler = (modalName, options: OpenNewModalHandlerOptions = {}) => {

    if (options.clearModalContent) {
      clearModalContent();
    }

    if (options.setModalContent) {
      setModalContent(options.setModalContent);
    }

    if (options.updateModalContent) {
      updateModalContent(options.updateModalContent);
    }

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

  const closeModalEventHandler = (event) => {
    const { modalName, options } = event.detail;
    console.log(event.detail, "event.detail - closeModalEventHandler");

    const dynamicModalName = typeof modalName === "string" ? modalName : null;

    closeModalhandler(dynamicModalName, options);
  }

  onMounted(() => {
    console.log(isLayout, "isLayout - onMounted");

    isLayout && window.addEventListener(OPEN_MODAL_EVENT_NAME, openNewModalEventHandler);
    isLayout && window.addEventListener(CLOSE_MODAL_EVENT_NAME, closeModalEventHandler);
  })

  onUnmounted(() => {
    console.log(isLayout, "isLayout - onUnmounted");

    isLayout && window.removeEventListener(OPEN_MODAL_EVENT_NAME, openNewModalEventHandler);
    isLayout && window.removeEventListener(CLOSE_MODAL_EVENT_NAME, closeModalEventHandler);
  })

  return {
    modals,
    modalContent,

    openNewModalHandler,
    closeModalhandler,
  }
}
