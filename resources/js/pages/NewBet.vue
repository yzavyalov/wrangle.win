<script setup lang="ts">
import { onBeforeUnmount, reactive } from "vue";
import { Head } from "@inertiajs/vue3";
import PredictionComp from "@/components/bet/PredictionComp.vue";
import PageWrapperMain from "@/components/PageWrapperMain.vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import { predictionDemoData, demoBetDataPayload } from '@/utils/dummyData';
import { createBet } from "@/services/bets";
import { useLoading } from "@/composables/useLoading";
import { useFilters } from '@/composables/useFilters';
import NewBet from "@/components/NewBet.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import SeoMeta from "@/components/SeoMeta.vue";

defineOptions({
  name: "NewBet",
  layout: (h, page) => h(BaseLayout, () => [page]),
});

</script>

<template>
  <SeoMeta
    title="New bet"
    description="New bet page"
  />

  <PageWrapperMain class="new-bet">

    <NewBet />

    <!-- <PredictionComp :item="predictionDemoData" /> -->

    <!-- <div class="new-bet__footer">
      <ButtonBase @click="handleCreatePrediction">Create prediction</ButtonBase>
      <ButtonBase @click="handleCreateDemoPrediction">Create DEMO prediction</ButtonBase>
    </div> -->

  </PageWrapperMain>

</template>

<style scoped lang='scss'>
.new-bet {

  &__main {
    position: relative;
    z-index: 1;
  }

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
