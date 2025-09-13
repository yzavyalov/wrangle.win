import { deleteBet, getOwnBets } from "@/services/bets";
import { BetItem, Pagination, SearchBetsPayload } from "@/types/bets";
import { onMounted, Ref, ref, reactive, computed } from "vue";
import { useLoading } from "@/composables/useLoading";
import { navigateTo } from "@/helpers/navigate";
import { useConfirm } from '@/composables/useConfirm';
import { PAGE_ROUTES } from "@/utils/datasets";
import { notifySuccess, notifyWarning } from "@/helpers/notify";

export const useOwnBets = () => {

  const { isLoading, loadingStart, loadingStop } = useLoading();

  const { confirm } = useConfirm();

  const ownBets: Ref<BetItem[]> = ref([]);

  const pagination: Pagination = reactive({
    page: 1,
    per_page: 10,
    sort_order: "asc",
    sort_by: "finish",
    is_last_page: false,
  });

  const isLastPage = computed(() => pagination.is_last_page);

  const fetchOwnBets = async () => {
    console.log('fetchOwnBets');
    if (isLoading.value) {return console.warn("Loading, plese wait");}

    try {
      loadingStart();

      const payload: SearchBetsPayload = {
        page: pagination.page || 1,
        per_page: pagination.per_page,
        sort_order: pagination.sort_order,
        sort_by: pagination.sort_by,
      }

      const bets = await getOwnBets(payload) || [];
      console.log(bets, 'bets');

      if (bets?.length < pagination?.per_page) {
        pagination.is_last_page = true;
      }

      if (!bets?.length) return;

      if (ownBets.value?.length) {
        ownBets.value = [...ownBets.value, ...bets];
      } else {
        ownBets.value = bets;
      }

    } catch (error) {
      console.warn(error);

    } finally {
      loadingStop();
    }
  }

  const fetchMoreOwnBets = async () => {
    console.log('fetchMoreBets');

    if (isLoading.value) {return console.warn("Loading, plese wait");}

    if (isLastPage.value) {return console.warn("Last page");}

    pagination.page = pagination.page + 1;

    fetchOwnBets();
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

  const deleteOwnBetHandler = async (bet) => {
    const shortBetTitle = bet.title.length > 30 ? `${bet.title.substring(0, 30)}...` : bet.title;

    const result = await confirm({
      title: 'Are you sure?',
      text: `Delete this bet - '${shortBetTitle}'?`,
      confirmText: 'Yes',
      cancelText: 'No'
    })

    if (!result) {return}

    try {
      loadingStart();

      const success = await deleteBet(bet);
      console.log(success, 'success');

      if (!success) {
        notifyWarning('Error deleting bet');
        return;
      }

      ownBets.value = ownBets.value.filter(b => b.id !== bet.id);

      notifySuccess('Bet deleted successfully');

    } catch (error) {
      console.warn(error);

    } finally {
      loadingStop();
    }
  }

  onMounted(() => {
    fetchOwnBets();
  })

  return {
    ownBets,
    isLoading,
    isLastPage,

    fetchOwnBets,
    fetchMoreOwnBets,

    openBetHandler,
    deleteOwnBetHandler,
  };
};
