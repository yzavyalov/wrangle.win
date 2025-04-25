import { useSettingsStore } from "@/store/settings";
import { computed } from "vue";
export const useModals = () => {

  const isShowModal = computed(() => useSettingsStore().getIsShowModal);

  const openNewModal = () => {
    useSettingsStore().setIsShowModal(true);
  }

  const closeModal = () => {
    useSettingsStore().setIsShowModal(false);
  }

  return {
    isShowModal,
    openNewModal,
    closeModal,
  }
}
