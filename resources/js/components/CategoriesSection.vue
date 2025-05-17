<script setup>
import ButtonBase from "@/components/details/ButtonBase.vue";
import { getAllCtegories } from "@/services/categories";
import { computed, onMounted, ref, onBeforeUnmount, watch, nextTick } from "vue";
import { useLoading } from "@/composables/useLoading";
import { useSettingsStore } from "@/store/settings";
import LoaderComponent from "@/components/LoaderComponent.vue";
import DynamicSelector from "@/components/details/DynamicSelector.vue";
import ButtonWithClose from "@/components/details/ButtonWithClose.vue";
import { useCategories } from "@/composables/useCategories";
import { triggerOpenNewModal } from "@/composables/useModalsTriggers";

const {
  categories,
  selectedCategories,
  selectedCategoriesIds,
  categoriesOptions,
  toggleSelectedCategory,
  isLoading,
} = useCategories();

const selectedCategoryId = ref(null);

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
    <LoaderComponent v-if="isLoading" />

    <div class="categories__header">
      <DynamicSelector v-model="selectedCategoryId" :options="categoriesOptions" class="categories__header--input" />
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
