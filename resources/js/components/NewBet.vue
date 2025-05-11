<script setup lang="ts">
import { computed, nextTick, reactive, ref, shallowRef } from 'vue';
import { linkRegex } from "@/utils/regex";
import { createBet } from '@/services/bets';
import { CreateBetPayload } from '@/types/bets';
import { navigateTo } from '@/helpers/navigate';
import { cutTextLength } from '@/helpers/cutTextLength.ts';
import { useLoading } from '@/composables/useLoading';
import { useCategories } from "@/composables/useCategories";
import { register, login, loginWithSocial } from '@/services/user';
import { predictionDemoData, demoBetDataPayload } from '@/utils/dummyData';
import { required, sameAs, email, minLength, helpers, maxLength, forEach } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import LoaderComponent from '@/components/LoaderComponent.vue';
import NewCategory from "@/components/NewCategory.vue";
import InputBase from '@/components/details/InputBase.vue';
import ButtonBase from "@/components/details/ButtonBase.vue";
import CheckboxBase from '@/components/details/CheckboxBase.vue';
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import DynamicSelector from "@/components/details/DynamicSelector.vue";
import ButtonWithClose from "@/components/details/ButtonWithClose.vue";
import InputWIthHelper from "@/components/details/InputWIthHelper.vue";
import ButtonBaseWithIcon from '@/components/details/ButtonBaseWithIcon.vue';

const { isLoading, loadingStart, loadingStop } = useLoading()
const { categories, categoriesOptions, isLoading: isCategoiesLoading } = useCategories();

const maxViewedCategories = shallowRef(5);
const isShowNewCategory = ref(false);

const formData = reactive({
  title: '',
  description: '',
  categories: [],
  source1: '',
  source2: '',
  source3: '',
  answers: [
    '',
    '',
  ],
  finish: '',
})

const rules = computed(() => {
  return {
    title: { required, minLength: minLength(3), maxLength: maxLength(120) },
    description: { required, minLength: minLength(3), maxLength: maxLength(1500) },
    categories: { required, arrey: (v) => v.length >= 1 },
    source1: { required, url: helpers.regex(linkRegex) },
    source2: { url: helpers.regex(linkRegex) },
    source3: { url: helpers.regex(linkRegex) },
    answers: {
      required,
      minItems: (v) => v.length >= 2,
    },
    finish: { required, date: (v) => Date.parse(v) > Date.now() },
  };
});

const dynamicOptions = computed(() => {
  if (!categoriesOptions.value?.length) return [];

  return categoriesOptions.value.filter(
    category => !formData.categories.some(item => item.id === category.value)
  );
});

const v$ = useVuelidate(rules, formData);

const toggleIsShowNewCategory = () => {
  isShowNewCategory.value = !isShowNewCategory.value;
}

const newAnswerField = () => {
  formData.answers.push('');

  nextTick(() => {
    v$.value.$reset();
    v$.value.$touch();
  });
}

const toggleSelectedCategory = (category) => {
  const index = formData.categories.findIndex(item => item.id === category.id);
  if (index !== -1) {
    formData.categories.splice(index, 1);
  } else {
    formData.categories.push(category);
  }
}

const addCategoryHandler = (categoryId: number) => {
  const selectedCategory = categories.value.find(category => category.id === categoryId);

  if (!selectedCategory) return;

  const isCategoryAlreadySelected = formData.categories.some(category => category.id === selectedCategory.id);
  if (isCategoryAlreadySelected) {
    console.warn('Category already selected');
    return;
  }

  formData.categories.push(selectedCategory);
}

const deleteAnswerField = (index: number) => {
  if (formData.answers.length <= 2) {
    console.warn('Minimum 2 answers required');
    return;
  }

  formData.answers.splice(index, 1);

  nextTick(() => {
    v$.value.$reset();
    v$.value.$touch();
  });
}

const newCategoryHandler = (newCategory) => {
  if (!newCategory) return;

  formData.categories.push(newCategory);
}

const handleCreateBet = async () => {
  console.log('handleCreatePrediction');

  await v$.value.$validate();
  if (v$.value.$invalid) return;

  try {
    loadingStart();

    formData.answers.forEach(item => {
      if (item.length < 1) {
        console.warn('Answer is required');
        v$.value.answers.$commit(false)
        v$.value.$touch();
        return;
      }
    });

    const payload: CreateBetPayload = {
      title: formData.title,
      description: formData.description,
      categories: formData.categories.map(item => item.id),
      source1: formData.source1,
      answers: formData.answers,
      finish: formData.finish,
    }

    if (formData.source2) { payload.source2 = formData.source2; }
    if (formData.source3) { payload.source3 = formData.source3; }

    const newBet = await createBet(payload);
    console.log(newBet, "newBet - handleCreatePrediction");

    if (!newBet) { return console.warn('Error creating bet'); }

    setDefaultValues();

  } catch (error) {
    console.warn(error);

  } finally {
    loadingStop();
  }
}

const setDefaultValues = () => {
  formData.title = '';
  formData.description = '';
  formData.categories = [];
  formData.source1 = '';
  formData.source2 = '';
  formData.source3 = '';
  formData.answers = ['', ''];

  v$.value.$reset();
  v$.value.$touch();
}

</script>

<template>
  <div class="new-bet">
    <div class="new-bet__header">
      <h2 class="text-center">New bet</h2>
    </div>

    <div class="new-bet__body">
      <LoaderComponent v-if="isLoading" />

      <InputWIthHelper
        v-model="formData.title"
        helperText="Input the bet's title *"
        placeholder="Title"
        :is-warning="v$.title.$error"
      />


      <div class="new-bet__categories">
        <p :class="['mb-5', { warning: v$.categories.$error }]">Select Categories *:</p>
        <DynamicSelector
          v-model="selectedCategoryId"
          :options="dynamicOptions"
          class="mb-10"
          @update:model-value="addCategoryHandler"
        />

        <ul v-if="formData.categories.length" class="new-bet__categories--list">
          <transition-group name="fade">
            <li v-for="category in formData.categories.slice(0, maxViewedCategories)" :key="category.id">
              <ButtonWithClose is-active @click="toggleSelectedCategory(category)">
                <span>{{ cutTextLength(category.name) }}</span>
              </ButtonWithClose>
            </li>

            <li v-if="formData.categories.length > maxViewedCategories" key="more">
              <ButtonBase is-active>
                <p class="text-length-wrapper">... total selected: {{ formData.categories.length }}</p>
              </ButtonBase>
            </li>
          </transition-group>
        </ul>

        <Transition name="fade" mode="out-in">
          <NewCategory v-if="isShowNewCategory" @close:click="toggleIsShowNewCategory" @submit="newCategoryHandler" />
          <ButtonBase v-else @click="toggleIsShowNewCategory" class="m-auto">Create new category</ButtonBase>
        </Transition>
      </div>

      <InputWIthHelper
        v-model="formData.description"
        helperText="Input the bet's description *"
        placeholder="Description"
        inputType="textarea"
        :is-warning="v$.description.$error"
      />

      <InputWIthHelper
        v-model="formData.finish"
        helperText="Input the bet's finish date *"
        placeholder="Finish date"
        type="datetime-local"
        :is-warning="v$.finish.$error"
      />

      <InputWIthHelper
        v-model="formData.source1"
        helperText="Enter a link 1 to the source where the outcome of the dispute will be indicated on the appointed date *"
        placeholder="Source 1"
        :is-warning="v$.source1.$error"
      />

      <InputWIthHelper
        v-model="formData.source2"
        helperText="Enter a link 2 to the source where the outcome of the dispute will be indicated on the appointed date"
        placeholder="Source 2"
        :is-warning="v$.source2.$error"
      />

      <InputWIthHelper
        v-model="formData.source3"
        helperText="Enter a link 3 to the source where the outcome of the dispute will be indicated on the appointed date"
        placeholder="Source 3"
        :is-warning="v$.source3.$error"
      />

      <transition-group name="fade">
        <InputWIthHelper v-for="(answer, index) in formData.answers" :key="index"
          v-model="formData.answers[index]"
          :helperText="`Describe the result ${index + 1} very precisely. ${index <= 1 ? '*' : ''}`"
          :placeholder="`answer ${index + 1}`"
          inputType="input"
          is-show-close
          :is-warning="v$.answers.$error"
          @close:click="deleteAnswerField(index)"
        />
      </transition-group>

      <div>
        <ButtonBase @click="newAnswerField" class="m-auto">Add new answer</ButtonBase>
      </div>
    </div>

    <div class="new-bet__footer">
      <ButtonBase @click="handleCreateBet">Submit form</ButtonBase>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.new-bet {
  width: 100%;
  padding: 20px;
  position: relative;
  z-index: 1;

  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__categories {

    & .warning {
      color: var(--warning-border-color);
    }

    &--list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 10px;
    }
  }

  &__footer {
    position: relative;
    display: flex;
    justify-content: space-around;
    gap: 10px;
    margin-top: 20px;
  }

  .text-length-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
