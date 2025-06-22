<script setup>
import { onBeforeUnmount, ref, onMounted } from "vue";
import { Head, usePage } from "@inertiajs/vue3";
import { useLoading } from '@/composables/useLoading';
import { navigateTo } from '@/helpers/navigate';
import { useFilters } from '@/composables/useFilters';
import { betCarusel, getBetById } from '@/services/bets';
import { PAGE_ROUTES } from '@/utils/datasets';
import PageWrapperMain from "@/components/PageWrapperMain.vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import BetItem from "@/components/bet/BetItem.vue";
import LoaderComponent from '@/components/LoaderComponent.vue';
import { router } from "@inertiajs/vue3";
import BaseLayout from "@/layouts/BaseLayout.vue";

defineOptions({
  name: "Bet",
  layout: (h, page) => h(BaseLayout, () => [page]),
});

const props = defineProps({
  bet: { type: Object, default: () => ({}) },
})

const { isLoading, loadingStart, loadingStop } = useLoading();

const betFullData = ref(null);

const betCaruselHandler = async ( direction ) => {

  if (isLoading.value) return;

  try {
      const payload = {
        currency_id: betFullData.value?.id,      // remove after API will be ready
        current_id: betFullData.value?.id,
        direction: direction, // "next" | "previous"
      }

      const newBet = await betCarusel(payload)
      if (!newBet) { return; }

      betFullData.value = newBet

      const { pathname } = window.location
      const newPathName = pathname.replace(props.bet.id, newBet.id);
      router.replace(newPathName);

  } catch (error) {
    console.warn(error);

  } finally {
    loadingStop();
  }
}

const getFullBetData = async () => {
  console.log('getFullBetData - start');

  if (isLoading.value) return;

  if (!props?.bet?.id) {
    console.warn('Bet ID is not provided');
    return;
  }

  try {
    loadingStart();

    const bet = await getBetById(props.bet.id);
    // console.log(bet, 'Bet - betFullData');

    betFullData.value = bet;

  } catch (error) {
    console.warn(error);
  } finally {
    loadingStop();
  }
};

onBeforeUnmount(() => {
  useFilters().resetFilters();

  getFullBetData();
})

onMounted(() => {
  getFullBetData();
});
</script>

<template>
  <Head title="Bet" />

  <PageWrapperMain>

    <LoaderComponent v-if="isLoading" />

    <BetItem v-if="betFullData" :item="betFullData" />

    <div v-else-if="!isLoading && !betFullData" class="text-center">
      <p>No such bet</p>

      <ButtonBase @click="navigateTo(PAGE_ROUTES.HOME)">To home page</ButtonBase>
    </div>

    <div v-if="betFullData" class="bet__footer">
      <ButtonWithIcon @click="betCaruselHandler('previous')" :icon="'/images/arrow-left.svg'" />
      <ButtonBase>To other Events</ButtonBase>
      <ButtonWithIcon @click="betCaruselHandler('next')" :icon="'/images/arrow-right.svg'" />
    </div>

  </PageWrapperMain>
</template>

<style scoped lang='scss'>
.bet {

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
