<script setup>
import { computed, onMounted, ref, onBeforeUnmount, watch, nextTick } from "vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import DynamicSelector from "@/components/details/DynamicSelector.vue";
import ButtonWithClose from "@/components/details/ButtonWithClose.vue";
import { useCategories } from "@/composables/useCategories";

const {
  categories,
  selectedCategories,
  selectedCategoriesIds,
  categoriesOptions,
  toggleSelectedCategory,
  isLoading,
  fetchMoreCategories,
} = useCategories();

const selectedCategoryId = ref(null);
const footerText = ref("Fetch more");

const selectCategoryHandler = categoryId => {
  const selectedCategory = categories.value.find(category => category.id === categoryId);

  toggleSelectedCategory(selectedCategory);
}

watch(
  () => selectedCategoryId.value,
  () => {
    if (selectedCategoryId.value) {
      console.log(selectedCategoryId.value, 'selectedCategoryId.value');

      selectCategoryHandler(selectedCategoryId.value);
      nextTick(() => selectedCategoryId.value = null);
    }
  }
);

</script>

<template>
  <div class="categories">
    <LoaderComponent style="z-index: 1000;" v-if="isLoading" />

    <div class="categories__header">
      <DynamicSelector v-model="selectedCategoryId"
        :options="categoriesOptions"
        class="categories__header--input"
        :is-show-footer="true"
        :footer-text="footerText"
        @footerAction="fetchMoreCategories"
      />
    </div>

    <div class="categories__list">
      <transition-group name="bounce" mode="out-in">
        <ButtonWithClose v-for="category in selectedCategories" :key="category" is-active @click="toggleSelectedCategory(category)">
          <span class="text-length-wrapper" >{{ category.name }}</span>
        </ButtonWithClose>
      </transition-group>
    </div>

  </div>
</template>

<style scoped lang='scss'>
.categories {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;

  &__header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;

    &--input {
      max-width: 500px;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 10px;
  }

  .text-length-wrapper {
    // overflow: ellipsis;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 200px;
  }
}
</style>
