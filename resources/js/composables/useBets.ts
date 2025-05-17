import { computed, nextTick, Ref, ref, watch } from "vue";
import { getActualBets, getHotBets, searchBets as apiSearchBets, BET_OPTION_KEY } from '@/services/bets';
import { triggerOpenNewModal } from "@/composables/useModalsTriggers";
import { BetItem, SearchBetsPayload, UseBetsOptions } from "@/types/bets";
import { useFilters } from "@/composables/useFilters";
import { useLoading } from "@/composables/useLoading";
import { useUserStore } from "@/store/user";
import { useHistory } from "@/composables/useHistory";


export const useBets = (options: UseBetsOptions = {}) => {

  const { isHot = false } = options;

  const currentUser = computed(() => useUserStore().getUser);
  const { isLoading, loadingStart, loadingStop } = useLoading();
  const { searchQuery, filters, sortBy, selectedCategories, isDefualtFilters } = useFilters();
  const { setQueryParam } = useHistory();

  const bets: Ref<BetItem[]> = ref([]);

  const pagination = ref({
    page: 1,
    per_page: 20,
  });

  const isFirstPage = computed(() => pagination.value.page === 1);

  const dynamicBets = computed(() => {
    if (!searchQuery.value?.trim()) {return bets.value;}

    return bets.value.filter(bet => bet.title.toLowerCase().includes(searchQuery.value.toLowerCase() || bet.description.toLowerCase().includes(searchQuery.value.toLowerCase())));
  });

  const openBetModal = () => {
    console.log('openBetModal');
    triggerOpenNewModal("bet-modal");
  }

  const makeSearchPayload = async () => {
    console.log('searchBets');

    const payload: SearchBetsPayload = {
      page: pagination.value.page,
      per_page: pagination.value.per_page,

      sort_order: sortBy.value,
    }

    // filters.value?.finish?.length && (payload.sort_by = filters.value.finish);
    searchQuery.value && (payload.title = searchQuery.value);
    selectedCategories.value.length && (payload.categories = selectedCategories.value.map(category => category.id));

    return payload;
  }

  const makeNewBit = async (option: any) => {
    console.log(option, 'option - makeNewBit');

    // if (!currentUser.value) {
    //   return triggerOpenNewModal('login-or-register-modal')
    // }

    // if (!currentUser.value?.balance) {
    //   return triggerOpenNewModal('propose-balance-modal')
    // }

    console.warn('NO LOGIC YET');

    setQueryParam(BET_OPTION_KEY, `${option.id}`)

    triggerOpenNewModal('new-bit-modal');
  }

  const fetchBets = async () => {
    console.log('fetchBets');

    if (isLoading.value) {return console.warn("Loading, plese wait");}

    try {
      loadingStart();

      let betsHandler;

      // console.log("AAAAAAAAAAAAAAAAAAA");
      // console.log("AAAAAAAAAAAAAAAAAAA");

      console.log(isDefualtFilters.value, 'isDefualtFilters.value');

      // console.log("AAAAAAAAAAAAAAAAAAA");
      // console.log("AAAAAAAAAAAAAAAAAAA");


      if (isDefualtFilters.value) {
        betsHandler = isHot ? getHotBets : getActualBets;

      } else {
        betsHandler = apiSearchBets;
      }

      const payload = await makeSearchPayload();

      const fetchedBets = await betsHandler(payload) || [];
      // console.log(fetchedBets, 'fetchedBets - getActualBets');

      if (!fetchedBets.length) {return console.warn("No fetchedBets");}

      if (isFirstPage.value) {
        bets.value = fetchedBets;

      } else {
        bets.value = [...bets.value, ...fetchedBets];
      }

      // console.log(bets.value, 'bets.value - fetchBets');

    } catch (error) {
      console.warn(error);

    } finally {
      loadingStop();
    }
  }

  const fetchMoreBets = async () => {
    console.log('fetchMoreBets');

    if (isLoading.value) {return console.warn("Loading, plese wait");}

    pagination.value.page += 1;

    fetchBets();
  }

  watch(
    () => filters.value,
    () => {
      pagination.value.page = 1;
      nextTick(() => fetchBets());
    },
  )

  return {
    isLoading,

    bets,
    dynamicBets,

    openBetModal,
    fetchBets,
    fetchMoreBets,

    makeNewBit,
  };
};
