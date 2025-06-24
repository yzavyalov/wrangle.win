import { onMounted, ref } from "vue";
import { getFavoriteBets } from "@/services/bets";
import { SearchBetsPayload } from "@/types/bets";
import { useLoading } from "@/composables/useLoading";

export const useFavoriteBets = () => {

  const { isLoading, loadingStart, loadingStop } = useLoading();

  const favoriteBets = ref([]);

  const pagination = ref({
    page: 1,
    per_page: 20,
  });

  const fetchFavoriteBets = async () => {
    console.log('fetchFavoriteBets');
    if (isLoading.value) {return console.warn("Loading, plese wait");}

    try {
      loadingStart();

      const payload: SearchBetsPayload = {
        page: 1,
        per_page: 50,
        sort_order: "asc",
        sort_by: "finish",
      }

      const bets = await getFavoriteBets(payload) || [];
      console.log(bets, 'bets');

      if (!bets.length) return;

      favoriteBets.value = bets;

    } catch (error) {
      console.warn(error);

    } finally {
      loadingStop();
    }
  }

  const fetchMoreFavoriteBets = async () => {
    console.log('fetchMoreBets');

    if (isLoading.value) {return console.warn("Loading, plese wait");}

    pagination.value.page += 1;

    fetchFavoriteBets();
  }

  onMounted(() => {
    fetchFavoriteBets();
  })

  return {
    favoriteBets,
    isLoading,

    fetchFavoriteBets,
    fetchMoreFavoriteBets,
  };
};
