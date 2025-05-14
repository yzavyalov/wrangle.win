import ButtonBase from "@/components/details/ButtonBase.vue";
import { getAllCtegories } from "@/services/categories";
import { computed, onMounted, ref, watch, nextTick } from "vue";
import { useLoading } from "@/composables/useLoading";
import { useSettingsStore } from "@/store/settings";

export const useCategories = () => {
  const { isLoading, loadingStart, loadingStop } = useLoading();

  const { setCategories, toggleSelectedCategory, addCategory } = useSettingsStore();

  const selectedCategoryId = ref(null);
  const categories = computed(() => useSettingsStore().getCategories);
  const selectedCategories = computed(() => useSettingsStore().getSelectedCategories);
  const selectedCategoriesIds = computed(() => selectedCategories.value.map(category => category.id));

  const categoriesOptions = computed(() => {
    return categories.value
      .map(category => ({ label: category.name, value: category.id })).
      filter(category => !selectedCategoriesIds.value.includes(category.value))
  });

  const fetchCategories = async () => {
    if (categories.value?.length) {return;}

    try {
      loadingStart();

      const fetchedCategories = await getAllCtegories() || [];
      console.log(fetchedCategories, "fetchedCategories");

      fetchedCategories.length && setCategories(fetchedCategories);

    } catch (error) {
      console.warn(error);

    } finally {
      loadingStop();
    }
  }

  const selectCategoryHandler = categoryId => {
    console.log(categoryId, "categoryId");

    const selectedCategory = categories.value.find(category => category.id === categoryId);

    toggleSelectedCategory(selectedCategory);

    nextTick(() => {
      selectedCategoryId.value = null;
    });
  }

  onMounted(() => {
    fetchCategories();
  })

  return {
    isLoading,

    selectedCategoryId,
    categories,
    selectedCategories,
    selectedCategoriesIds,

    categoriesOptions,

    setCategories,
    toggleSelectedCategory,
    selectCategoryHandler,
  };
}
