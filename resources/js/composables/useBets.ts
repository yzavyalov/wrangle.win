import { computed, Ref, ref } from "vue";
import { useLoading, useFilters } from "@/composables";
import { getActualBets, getHotBets } from '@/services/bets';
import { demoCards } from '@/utils/dummyData';
import { triggerOpenNewModal } from "@/composables";
import { BetItem, UseBetsOptions } from "@/types/bets";


export const useBets = (options: UseBetsOptions = {}) => {

  const { isHot = false } = options;

  const { isLoading, loadingStart, loadingStop } = useLoading();
  const { searchQuery } = useFilters();

  const bets: Ref<BetItem[]> = ref([]);

  const dynamicBets = computed(() => {
    if (!searchQuery.value?.trim()) {return bets.value;}

    return bets.value.filter(bet => bet.title.toLowerCase().includes(searchQuery.value.toLowerCase() || bet.description.toLowerCase().includes(searchQuery.value.toLowerCase())));
  });

  const openBetModal = () => {
    console.log('openBetModal');
    triggerOpenNewModal("bet-modal");
  }

  const fetchBets = async () => {
    console.log('fetchBets');

    if (isLoading.value) {return console.warn("Loading, plese wait");}

    try {
      loadingStart();

      const betsHandler = isHot ? getHotBets : getActualBets;

      const fetchedBets = await betsHandler() || [];
      console.log(fetchedBets, 'fetchedBets - getActualBets');

      // test zone =====================
      // todo: remove dummy code
      // if (!fetchedBets.length) {
      //   const dummyData = demoCards.map((card, idx) => {
      //     return {
      //       ...card,
      //       id: Date.now() + '_' + idx,
      //     }
      //   });
      //   bets.value = [...bets.value, ...dummyData]
      //   console.log(bets.value, 'bets.value - dummyData - fetchBets');
      //   return
      // }
      // test zone end =====================

      fetchedBets.length && ( bets.value = [...bets.value, ...fetchedBets] );

      console.log(bets.value, 'bets.value - fetchBets');

    } catch (error) {
      console.warn(error);

    } finally {
      loadingStop();
    }
  }

  const fetchMoreBets = async () => {
    console.log('fetchMoreBets');

    if (isLoading.value) {return console.warn("Loading, plese wait");}

    fetchBets();
  }

  return {
    isLoading,

    bets,
    dynamicBets,

    openBetModal,
    fetchBets,
    fetchMoreBets
  };
};
