<script setup>
import ButtonBase from "@/components/details/ButtonBase.vue";
import { getAllCtegories } from "@/services/categories";
import { onMounted, ref } from "vue";
import { useLoading } from "@/composables/useLoading";

const { isLoading, loadingStart, loadingStop } = useLoading();

const categories = ref([]);
const selectedCategory = ref(null);

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
  try {
    loadingStart();

    const fetchedCategories = await getAllCtegories() || [];
    console.log(fetchedCategories, "fetchedCategories");

    categories.value = fetchedCategories;

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
    <ButtonBase v-for="category in categories" :key="category" :is-active="selectedCategory?.id === category.id" @click="selectCategory(category)">
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
