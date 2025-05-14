import { computed } from "vue";
import { useSettingsStore } from "@/store/settings";
import { defaultFilters } from '@/utils/datasets'
import { isEqual } from "@/helpers/isEqual";

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

  const isDefualtFilters = computed(() => {
    if (searchQuery.value !== '') { return false; }
    if (selectedCategories.value.length) { return false; }
    if (!isEqual(filters.value, defaultFilters)) { return false; }

    return true;
  });

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

    isDefualtFilters,

    sortBy,
    toggleSortBy,
  };
}
