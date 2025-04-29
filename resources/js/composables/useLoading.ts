import { ref } from "vue";

export const useLoading = () => {

  const isLoading = ref(false);

  const loadingStart = (): void => {
    isLoading.value = true;
  };

  const loadingStop = (): void => {
    isLoading.value = false;
  };

  return {
    isLoading,
    loadingStart,
    loadingStop,
  };
}
