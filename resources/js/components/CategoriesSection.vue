<script setup>
import ButtonBase from "@/components/details/ButtonBase.vue";
import { getAllCtegories } from "@/services/categories";
import { computed, onMounted, ref, onBeforeUnmount } from "vue";
import { useLoading } from "@/composables/useLoading";
import { useSettingsStore } from "@/store/settings";
import LoaderComponent from "@/components/LoaderComponent.vue";

const { isLoading, loadingStart, loadingStop } = useLoading();

const { setCategories, toggleSelectedCategory, setDefaultSearchParams } = useSettingsStore();

const categories = computed(() => useSettingsStore().getCategories);
const selectedCategories = computed(() => useSettingsStore().getSelectedCategories);
const selectedCategoriesIds = computed(() => selectedCategories.value.map(category => category.id));

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

onBeforeUnmount(() => {

})

</script>

<template>
  <div class="categories">
    <LoaderComponent v-if="isLoading" />

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
