<script lang="ts">
import BaseLayout from "@/layouts/BaseLayout.vue";

export default {
  layout: (h, page) => {
    return h(BaseLayout, () => [page]);
  },
};
</script>


<script setup lang="ts">
import { reactive } from "vue";
import { Head } from "@inertiajs/vue3";
import PredictionComp from "@/components/bet/PredictionComp.vue";
import PageWrapperMain from "@/components/PageWrapperMain.vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import { predictionDemoData, demoBetDataPayload } from '@/utils/dummyData';
import { createBet } from "@/services/bets";
import { useLoading } from "@/composables/useLoading";

const { isLoading, loadingStart, loadingStop } = useLoading()

const formData = reactive({
  title: '',
  description: '',
  categories: [],
  source1: '',
  answers: [],
  finish: '',
})

const handleCreatePrediction = () => {
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

const handleCreateDemoPrediction = async () => {
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
  <Head title="New bet" />

  <PageWrapperMain class="new-bet">

    <PredictionComp :item="predictionDemoData" />

    <div class="new-bet__footer">
      <ButtonBase @click="handleCreatePrediction">Create prediction</ButtonBase>
      <ButtonBase @click="handleCreateDemoPrediction">Create DEMO prediction</ButtonBase>
    </div>

  </PageWrapperMain>

</template>

<style scoped lang='scss'>
.new-bet {

  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    position: absolute;
    z-index: 1;
    bottom: 20px;
    right: 50%;
    transform: translateX(50%);
  }
}
</style>
