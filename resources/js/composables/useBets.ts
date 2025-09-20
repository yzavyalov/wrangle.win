import { computed, nextTick, onBeforeUnmount, onMounted, Ref, ref, watch, watchEffect } from "vue";
import { getActualBets, getHotBets, searchBets as apiSearchBets, BET_OPTION_KEY, UPDATE_BET_EVENT_NAME } from '@/services/bets';
import { triggerCloseModal, triggerOpenNewModal } from "@/composables/useModalsTriggers";
import { BetItem, SearchBetsPayload, UseBetsOptions } from "@/types/bets";
import { useFilters } from "@/composables/useFilters";
import { useLoading } from "@/composables/useLoading";
import { useUserStore } from "@/store/user";
import { useHistory } from "@/composables/useHistory";
import { useDebounceFn } from "@vueuse/core";
import { sortArr } from "@/helpers/sortArr"
import { useModalsStore } from '@/store/modals';


export const useBets = (options: UseBetsOptions = {}) => {

  const { isHot = false } = options;

  const currentUser = computed(() => useUserStore().getUser);
  const { isLoading, loadingStart, loadingStop } = useLoading();
  const { searchQuery, filters, sortBy, selectedCategories, isDefualtFilters } = useFilters();
  const { setQueryParam } = useHistory();
  const { updateModalContent } = useModalsStore();

  const bets: Ref<BetItem[]> = ref([]);

  const pagination = ref({
    page: 1,
    per_page: 20,
  });

  const isFirstPage = computed(() => pagination.value.page === 1);

  const dynamicBets = computed(() => {
    if (!bets.value?.length) {return [];}

    return sortArr(bets.value, sortBy, 'finish');
  });

  const currentBetFromStore = computed(() => useModalsStore().getModalContent?.currentBet);

  const openBetModal = () => {
    console.log('openBetModal');
    triggerOpenNewModal("bet-modal");
  }

  const makeSearchPayload = async () => {
    console.log('searchBets');

    const payload: SearchBetsPayload = {
      page: pagination.value.page,
      per_page: pagination.value.per_page,

      sort_by: "finish",
      sort_order: sortBy.value,
    }

    searchQuery.value && (payload.title = searchQuery.value);
    selectedCategories.value.length && (payload.categories = selectedCategories.value.map(category => category.id));

    return payload;
  }

  const makeNewBit = async (option: any) => {
    console.log(option, 'option - makeNewBit');

    if (!currentUser.value) {
      return triggerOpenNewModal('login-or-register-modal')
    }

    if (!currentUser.value?.balance) {
      triggerOpenNewModal('propose-balance-modal')
      return
    }

    setQueryParam(BET_OPTION_KEY, `${option.id}`)

    triggerOpenNewModal('new-bit-modal');
  }

  const fetchBets = async () => {
    console.log('fetchBets');

    if (isLoading.value) {return console.warn("Loading, plese wait");}

    try {
      loadingStart();

      let betsHandler;

      console.log(isDefualtFilters.value, 'isDefualtFilters.value');

      if (isDefualtFilters.value) {
        betsHandler = isHot ? getHotBets : getActualBets;

      } else {
        betsHandler = apiSearchBets;
      }

      const payload = await makeSearchPayload();

      const fetchedBets = await betsHandler(payload) || [];
      console.log(fetchedBets, 'fetchedBets - getActualBets');

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

  const newFetchDebounced = useDebounceFn(() => {
    fetchBets();
  }, 500)


  watch(
    () => [ filters.value, searchQuery.value, selectedCategories.value ],
    () => {
      console.log('filters.value, searchQuery.value, selectedCategories.value - watch');

      nextTick(() => newFetchDebounced())
    },
    { deep: true }
  )

  watch(
    () => filters.value,
    () => {
      pagination.value.page = 1;
      nextTick(() => fetchBets());
    },
  )

  const updatedBetEventHandler = (event) => {
    console.log(event, 'event - updatedBetEventHandler');

    const { betData } = event.detail;
    if (!betData) { return console.warn("No betData in event. updatedBetEventHandler"); }


    if (bets.value?.length) {
      const idx = bets.value.findIndex(bet => bet.id === betData.id);

      if (idx > -1) {
        bets.value[idx] = { ...bets.value[idx], ...betData, };
      }
    }

    if (currentBetFromStore.value?.id === betData.id) {
      const betFromStore = { ...currentBetFromStore.value, ...betData, };
      updateModalContent({ currentBet: betFromStore });
    }
  }

  onMounted(() => {
    window.addEventListener(UPDATE_BET_EVENT_NAME, updatedBetEventHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener(UPDATE_BET_EVENT_NAME, updatedBetEventHandler)
  })

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
