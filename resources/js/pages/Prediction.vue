<script setup>
import { Head } from "@inertiajs/vue3";
import { onBeforeUnmount } from "vue";
import PageWrapperMain from "@/components/PageWrapperMain.vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import PredictionComp from "@/components/bet/PredictionComp.vue";
import { useFilters } from '@/composables/useFilters';
import BaseLayout from "@/layouts/BaseLayout.vue";

defineOptions({
  name: "Prediction",
  layout: (h, page) => h(BaseLayout, () => [page]),
});

onBeforeUnmount(() => {
  useFilters().resetFilters();
})
</script>

<template>
  <Head title="Prediction" />

  <PageWrapperMain>

    <PredictionComp />

    <div class="prediction__footer">
      <ButtonWithIcon :icon="'/images/arrow-left.svg'" />
      <ButtonBase>To other Events</ButtonBase>
      <ButtonWithIcon :icon="'/images/arrow-right.svg'" />
    </div>

  </PageWrapperMain>
</template>

<style scoped lang='scss'>
.prediction {

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
