import { useSettingsStore } from "@/store/settings";
import { computed } from "vue";

export const useFilters = () => {

  const {
    setFilters,
    toggleSortBy,
    setCategories,
    setSearchQuery,
    toggleSelectedCategory,
    setDefaultSearchParams: resetFilters,
  } = useSettingsStore();

  const searchQuery = computed(() => useSettingsStore().getSearchQuery);

  const categories = computed(() => useSettingsStore().getCategories);
  const selectedCategories = computed(() => useSettingsStore().getSelectedCategories);

  const filters = computed(() => useSettingsStore().getFilters);
  const sortBy = computed(() => useSettingsStore().getSortBy);

  return {
    searchQuery,
    setSearchQuery,

    categories,
    setCategories,

    selectedCategories,
    toggleSelectedCategory,

    filters,
    setFilters,
    resetFilters,

    sortBy,
    toggleSortBy,
  };
}
