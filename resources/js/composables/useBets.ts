import { ref } from "vue";
import { useLoading } from "@/composables";
import { getActualBets } from '@/services/bets';
import { demoCards } from '@/utils/dummyData';
import { triggerOpenNewModal } from "@/composables";


export const useBets = () => {
  const { isLoading, loadingStart, loadingStop } = useLoading();

  const bets = ref([]);

  const openBetModal = () => {
    console.log('openBetModal');
    triggerOpenNewModal("bet-modal");
  }

  const fetchBets = async () => {
    console.log('fetchBets');

    if (isLoading.value) {return console.warn("Loading, plese wait");}

    try {
      loadingStart();

      const fetchedBets = await getActualBets();
      console.log(fetchedBets, 'fetchedBets - getActualBets');

      // test zone =====================
      // todo: remove dummy code
      if (!fetchedBets.length) {
        const dummyData = demoCards.map((card, idx) => {
          return {
            ...card,
            id: Date.now() + '_' + idx,
          }
        });
        bets.value = [...bets.value, ...dummyData]
        console.log(bets.value, 'bets.value - dummyData - fetchBets');
        return
      }
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
    bets,
    openBetModal,
    fetchBets,
    fetchMoreBets
  };
};
