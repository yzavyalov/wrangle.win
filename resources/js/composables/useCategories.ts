import ButtonBase from "@/components/details/ButtonBase.vue";
import { fetchCategories as fetchCategoriesApi } from "@/services/categories";
import { computed, onMounted, ref, watch, nextTick } from "vue";
import { useLoading } from "@/composables/useLoading";
import { useSettingsStore } from "@/store/settings";
import { notifyWarning } from "@/helpers/notify";

export const useCategories = (options: UseCategoriesOptions = {}) => {
  const { fetchOnInit = true } = options;

  const { isLoading, loadingStart, loadingStop } = useLoading();
  const { setCategories, toggleSelectedCategory, addCategories, setPagination, setIsLastPage } = useSettingsStore();

  const selectedCategoryId = ref(null);

  const pagination = computed(() => useSettingsStore().getPagination);
  const categories = computed(() => useSettingsStore().getCategories);
  const selectedCategories = computed(() => useSettingsStore().getSelectedCategories);
  const selectedCategoriesIds = computed(() => selectedCategories.value.map(category => category.id));

  const isLastPage = computed(() => useSettingsStore().getIsLastPage);
  const isFirstPage = computed(() => pagination.value.page === 1);

  const categoriesOptions = computed(() => {
    return categories.value
      .map(category => ({ label: category.name, value: category.id })).
      filter(category => !selectedCategoriesIds.value.includes(category.value))
  });

  const fetchCategories = async () => {
    console.log('fetchCategories');
    if (isLoading.value) {return console.warn("Loading, plese wait");}

    try {
      loadingStart();

      const payload: FetchCategoriesPayload = {
        page: pagination.value.page,
        per_page: pagination.value.per_page,
      };

      const fetchedCategories = await fetchCategoriesApi(payload) || [];
      console.log(fetchedCategories, "fetchedCategories");

      if (!fetchedCategories?.length || fetchedCategories?.length < pagination.value?.per_page) {
        setIsLastPage(true);
        return;
      }

      isFirstPage.value
        ? setCategories(fetchedCategories)
        : addCategories(fetchedCategories);

    } catch (error) {
      console.warn(error);

    } finally {
      loadingStop();
    }
  }

  const fetchMoreCategories = async () => {
    if (isLoading.value) {return console.warn("Loading, plese wait");}

    if (isLastPage.value) {
      notifyWarning("No more categories");
      console.warn("No more categories");
      return;
    }

    setPagination({ ...pagination.value, page: pagination.value.page + 1 });

    fetchCategories();
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
    fetchOnInit && fetchCategories();
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

    fetchCategories,
    fetchMoreCategories,
  };
}
