import { onMounted, Ref, ref } from "vue";
import { getFavoriteBets, toggleToFavorite } from "@/services/bets";
import { BetItem, SearchBetsPayload } from "@/types/bets";
import { useLoading } from "@/composables/useLoading";
import { useConfirm } from '@/composables/useConfirm';
import { notifySuccess, notifyWarning } from "@/helpers/notify";

export const useFavoriteBets = () => {

  const { isLoading, loadingStart, loadingStop } = useLoading();
  const { confirm } = useConfirm();

  const favoriteBets: Ref<BetItem[]> = ref([]);

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

  const toggleBetToFavoriteHandler = async (bet) => {
    const shortBetTitle = bet.title.length > 30 ? `${bet.title.substring(0, 30)}...` : bet.title;

    const result = await confirm({
      title: 'Are you sure?',
      text: `Delete this bet from favorites - '${shortBetTitle}'?`,
      confirmText: 'Yes',
      cancelText: 'No'
    })

    if (!result) {return}

    const success = await toggleToFavorite({ id: bet.id });

    if (!success) {
      notifyWarning('Error toggling to favorite');
    }

    favoriteBets.value = favoriteBets.value.filter(b => b.id !== bet.id);

    notifySuccess('Bet removed from favorites');
  }

  onMounted(() => {
    fetchFavoriteBets();
  })

  return {
    favoriteBets,
    isLoading,

    fetchFavoriteBets,
    fetchMoreFavoriteBets,
    toggleBetToFavoriteHandler,
  };
};
