<script setup>
import ButtonBase from "@/components/details/ButtonBase.vue";
import { getAllCtegories } from "@/services/categories";
import { computed, onMounted, ref } from "vue";
import { useLoading } from "@/composables/useLoading";
import { useSettingsStore } from "@/store/settings";

const { isLoading, loadingStart, loadingStop } = useLoading();

const { setCategories, toggleSelectedCategory } = useSettingsStore();

const categories = computed(() => useSettingsStore().getCategories);
const selectedCategories = computed(() => useSettingsStore().getSelectedCategories);
const selectedCategoriesIds = computed(() => selectedCategories.value.map(category => category.id));

const selectCategory = (category) => {
  if (selectedCategory.value?.id === category.id) {
    selectedCategory.value = null;
    return
  }

  selectedCategory.value = category;
}

const createNewCategoryHandler = () => {
  console.warn('No logic for createNewCategoryHandler');
}

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

onMounted(() => {
  fetchCategories();
})

</script>

<template>
  <div class="categories">
    <ButtonBase @click="createNewCategoryHandler">Create new one category</ButtonBase>
    <ButtonBase v-for="category in categories" :key="category" :is-active="selectedCategoriesIds.includes(category.id)" @click="toggleSelectedCategory(category)">
      <span class="text-length-wrapper" >{{ category.name }}</span>
    </ButtonBase>
  </div>
</template>

<style scoped lang='scss'>
.categories {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;

  .text-length-wrapper {
    // overflow: ellipsis;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 200px;
  }
}
</style>
