<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue';
import InputBase from '@/components/details/InputBase.vue';
import CheckboxBase from '@/components/details/CheckboxBase.vue';
import ButtonBaseWithIcon from '@/components/details/ButtonBaseWithIcon.vue';
import { navigateTo } from '@/helpers/navigate';
import useVuelidate from '@vuelidate/core';
import { required, sameAs, email, minLength } from '@vuelidate/validators';
import { register, login, loginWithSocial } from '@/services/user';
import { useLoading } from '@/composables/useLoading';
import { CreateBetPayload } from '@/types/bets';
import { createBet } from '@/services/bets';
import { predictionDemoData, demoBetDataPayload } from '@/utils/dummyData';
import ButtonBase from "@/components/details/ButtonBase.vue";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import LoaderComponent from './LoaderComponent.vue';

const { isLoading, loadingStart, loadingStop } = useLoading()

const formData = reactive({
  title: '',
  description: '',
  categories: [],
  source1: '',
  source2: '',
  source3: '',
  answers: [],
  finish: '',
})

const rules = computed(() => {
  return {
    title: { required, minLength: minLength(3) },
    description: { required, minLength: minLength(3) },
    categories: { required, arrey: (v) => v.length > 0 },
    source1: { required },
    source2: { required },
    source3: { required },
    answers: { required, arrey: (v) => v.length > 0 },
    finish: { required, date: (v) => Date.parse(v) > Date.now() },
  };
});

const v$ = useVuelidate(rules, formData);

const newAnswerField = () => {
  formData.answers.push('');
}

const handleCreateBet = () => {
  console.log('handleCreatePrediction');

  try {
    loadingStart();

    const payload: CreateBetPayload = {
      title: formData.title,
      description: formData.description,
      categories: formData.categories,
      source1: formData.source1,
      answers: formData.answers,
      finish: formData.finish,
    }

    const newBet = createBet(payload);
    console.log(newBet, "newBet - handleCreatePrediction");

  } catch (error) {
    console.warn(error);

  } finally {
    loadingStop();
  }
}

const handleCreateDemoBet = async () => {
  console.log('handleCreateDemoPrediction');

  try {
    loadingStart();

    const newBet = await createBet(demoBetDataPayload);
    console.log(newBet, "newBet - handleCreateDemoPrediction");

  } catch (error) {
    console.warn(error);

  } finally {
    loadingStop();
  }
}

</script>

<template>
  <div class="new-bet">
    <div class="new-bet__header">
      <h2 class="text-center">new bet</h2>
    </div>

    <div class="new-bet__body">
      <p>body</p>
      <ButtonBase @click="newAnswerField">Add new answer</ButtonBase>
    </div>

    <div class="new-bet__footer">
      <LoaderComponent v-if="isLoading" />

      <ButtonBase @click="handleCreateBet">Submit form</ButtonBase>
      <ButtonBase @click="handleCreateDemoBet">Create DEMO bet</ButtonBase>
    </div>


  </div>
</template>

<style scoped lang='scss'>
.new-bet {
  width: 100%;
  padding: 20px;

  &__footer {
    position: relative;
    display: flex;
    justify-content: space-around;
    gap: 10px;
  }
}
</style>
