import { getOwnBets } from "@/services/bets";
import { SearchBetsPayload } from "@/types/bets";
import { onMounted, ref } from "vue";
import { useLoading } from "@/composables/useLoading";

export const useOwnBets = () => {

  const { isLoading, loadingStart, loadingStop } = useLoading();

  const ownBets = ref([]);

  const pagination = ref({
    page: 1,
    per_page: 20,
  });

  const fetchOwnBets = async () => {
    console.log('fetchOwnBets');
    if (isLoading.value) {return console.warn("Loading, plese wait");}

    try {
      loadingStart();

      const payload: SearchBetsPayload = {
        page: 1,
        per_page: 50,
        sort_order: "asc",
        sort_by: "finish",
      }

      const bets = await getOwnBets(payload) || [];
      console.log(bets, 'bets');

      if (!bets.length) return;

      ownBets.value = bets;

    } catch (error) {
      console.warn(error);

    } finally {
      loadingStop();
    }
  }

  const fetchMoreOwnBets = async () => {
    console.log('fetchMoreBets');

    if (isLoading.value) {return console.warn("Loading, plese wait");}

    pagination.value.page += 1;

    fetchOwnBets();
  }

  onMounted(() => {
    fetchOwnBets();
  })

  return {
    ownBets,
    isLoading,

    fetchOwnBets,
    fetchMoreOwnBets,
  };
};
