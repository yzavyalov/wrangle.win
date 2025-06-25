import { getOwnBets } from "@/services/bets";
import { BetItem, SearchBetsPayload } from "@/types/bets";
import { onMounted, Ref, ref } from "vue";
import { useLoading } from "@/composables/useLoading";
import { navigateTo } from "@/helpers/navigate";
import { useConfirm } from '@/composables/useConfirm';
import { PAGE_ROUTES } from "@/utils/datasets";
import { notifyWarning } from "@/helpers/notify";

export const useOwnBets = () => {

  const { isLoading, loadingStart, loadingStop } = useLoading();

  const { confirm } = useConfirm();

  const ownBets: Ref<BetItem[]> = ref([]);

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

    // console.log(bet, 'bet');
    console.warn('No logic for delete yet...');
    notifyWarning('No logic for delete yet...');

  }

  onMounted(() => {
    fetchOwnBets();
  })

  return {
    ownBets,
    isLoading,

    fetchOwnBets,
    fetchMoreOwnBets,

    openBetHandler,
    deleteOwnBetHandler,
  };
};
