<script setup>
import { ref, computed } from 'vue';
import ButtonBase from "@/components/details/ButtonBase.vue";
import InputWIthHelper from "@/components/details/InputWIthHelper.vue";
import LoaderComponent from '@/components/LoaderComponent.vue';
import useVuelidate from '@vuelidate/core';
import { useLoading } from '@/composables/useLoading';
import { required, minLength, maxLength } from '@vuelidate/validators';
import { createCategory } from '@/services/categories';
import { useCategories } from "@/composables/useCategories";
import { useSettingsStore } from "@/store/settings";

const emit = defineEmits(['close:click', 'submit']);

const { isLoading, loadingStart, loadingStop } = useLoading()
const { addCategory } = useSettingsStore();

const categoryName = ref('');

const rules = computed(() => {
  return {
    categoryName: { required, minLength: minLength(10), maxLength: maxLength(120) },
  };
});

const v$ = useVuelidate(rules, { categoryName });

const emitClose = () => {
  if (isLoading.value) return console.warn('Loading in progress, please wait...');

  emit('close:click');
};

const handleSubmit = async () => {
  if (isLoading.value) return console.warn('Loading in progress, please wait...');

  await v$.value.$validate();
  if (v$.value.$invalid) return;

  try {
    loadingStart();
    console.log('categoryName', categoryName.value);

    const payload = {
      name: categoryName.value,
    };

    const newCategory = await createCategory(payload);
    console.log('newCategory - handleSubmit', newCategory);

    if (!newCategory) {
      return console.warn('Error creating category');
    }

    addCategory(newCategory);

    emit('submit', newCategory);

    categoryName.value = '';

    await v$.value.$reset();

  } catch (error) {
    console.error('Error creating category:', error);

  } finally {
    loadingStop();
  }
};

</script>

<template>
  <div class="new-category">
    <LoaderComponent v-if="isLoading" class="new-category__loader" />

    <InputWIthHelper
      v-model="categoryName"
      placeholder="Input categories name"
      helper-text="Input category name *"
      is-show-close
      class="mb-10"
      :is-warning="v$.categoryName.$error"
      :warning-text="v$.categoryName.$error ? 'This field is required' : ''"
      @close:click="emitClose"
    >
      <template #warning>
        <span v-if="v$.categoryName?.$error">
          <span class="text-warning" v-if="v$.categoryName?.required?.$invalid">Category name is required</span>
          <span class="text-warning" v-else-if="v$.categoryName?.minLength?.$invalid">Category name must be at least 10 characters</span>
          <span class="text-warning" v-else-if="v$.categoryName?.maxLength?.$invalid">Category name must be less than 120 characters</span>
        </span>
      </template>
    </InputWIthHelper>

    <ButtonBase class="m-auto" @click="handleSubmit">Save your category</ButtonBase>
  </div>
</template>

<style scoped lang='scss'>

.new-category {
  position: relative;

  &__loader {
    z-index: 3;
  }
}

.text-warning {
  color: var(--text-color-warning);
}

</style>
