import { computed, defineAsyncComponent, onMounted, onBeforeMount, ref, shallowRef } from "vue";
import { useUserStore } from "@/store/user";
import { getCurrency } from "@/helpers/getCurrency";
import { useUserAccessToken } from "@/composables/useUserAccessToken";

export const useUser = () => {
  const currencyName = getCurrency();

  const currentUser = computed(() => useUserStore().getUser);

  const userBalance = computed(() => Number(currentUser.value?.balance?.balance || 0)?.toFixed(2) || 0);

  const userBalanceWithCurrency = computed(() => `${userBalance.value}${currencyName}`);

  return {
    currentUser,
    userBalance,
    userBalanceWithCurrency,

    currencyName,
  }
};
