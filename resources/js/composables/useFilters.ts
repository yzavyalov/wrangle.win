import { useSettingsStore } from "@/store/settings";
import { computed } from "vue";

export const useFilters = () => {

  const { setSearchQuery, setDefaultSearchParams } = useSettingsStore();

  const resetFilters = setDefaultSearchParams;

  const searchQuery = computed(() => useSettingsStore().getSearchQuery);
  const selectedCategories = computed(() => useSettingsStore().getSelectedCategories);
  const filters = computed(() => useSettingsStore().getFilters);
  const sortBy = computed(() => useSettingsStore().getSortBy);

  return {
    searchQuery,
    selectedCategories,
    filters,
    sortBy,

    setSearchQuery,

    resetFilters,
  };
}
