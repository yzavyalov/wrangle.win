import { onMounted, reactive, Ref, ref, computed } from "vue";
import { getFavoriteBets, toggleToFavorite } from "@/services/bets";
import { BetItem, Pagination, SearchBetsPayload } from "@/types/bets";
import { useLoading } from "@/composables/useLoading";
import { useConfirm } from '@/composables/useConfirm';
import { notifySuccess, notifyWarning } from "@/helpers/notify";
import { navigateTo } from "@/helpers/navigate";
import { PAGE_ROUTES } from "@/utils/datasets";

export const useFavoriteBets = () => {

  const { isLoading, loadingStart, loadingStop } = useLoading();
  const { confirm } = useConfirm();

  const favoriteBets: Ref<BetItem[]> = ref([]);

  const pagination: Pagination = reactive({
    page: 1,
    per_page: 10,
    sort_order: "asc",
    sort_by: "finish",
    is_last_page: false,
  });

  const isLastPage = computed(() => pagination.is_last_page);

  const fetchFavoriteBets = async () => {
    console.log('fetchFavoriteBets');
    if (isLoading.value) {return console.warn("Loading, plese wait");}

    try {
      loadingStart();

      const payload: SearchBetsPayload = {
        page: pagination.page || 1,
        per_page: pagination.per_page,
        sort_order: pagination.sort_order,
        sort_by: pagination.sort_by,
      }

      const bets = await getFavoriteBets(payload) || [];
      console.log(bets, 'bets');

      if (bets?.length < pagination?.per_page) {
        pagination.is_last_page = true;
      }

      if (!bets?.length) return;

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

    if (isLastPage.value) {return console.warn("Last page");}

    pagination.page = pagination.page + 1;

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

  const openBetHandler = async (bet) => {
    console.log(bet, 'bet');

    const shortBetTitle = bet.title.length > 30 ? `${bet.title.substring(0, 30)}...` : bet.title;

    const result = await confirm({
      title: 'Are you sure?',
      text: `You will be redirected to this page - '${shortBetTitle}'?`,
      confirmText: 'Yes',
      cancelText: 'No'
    })

    if (!result) {return}

    navigateTo(`${PAGE_ROUTES.BET}/${bet.id}`);
  }

  onMounted(() => {
    fetchFavoriteBets();
  })

  return {
    favoriteBets,
    isLoading,
    isLastPage,

    fetchFavoriteBets,
    fetchMoreFavoriteBets,
    toggleBetToFavoriteHandler,
    openBetHandler,
  };
};
