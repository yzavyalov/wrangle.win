<script setup>
import { computed, nextTick, onMounted, ref } from "vue";
import PageWrapperMain from "@/components/PageWrapperMain.vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import { useUserStore } from "@/store/user";
import { getCurrency } from "@/helpers/getCurrency";
import { getBetStatus } from "@/helpers/getBetStatus";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { useLoading } from "@/composables/useLoading";
import { notifyWarning } from "@/helpers/notify";
import { fetchUserTransactions } from "@/services/transactions";
import { fetchInPayments } from "@/services/payments";

defineOptions({ name: "MethodsIn" })

defineEmits(["close"])

const { isLoading, loadingStart, loadingStop } = useLoading();

const currentUser = computed(() => useUserStore().getUser);
const userBalance = computed(() => Number(currentUser.value?.balance?.balance || 0)?.toFixed(2) || 0);

const currencyName = getCurrency();

const fetchData = async () => {
  const methods = await fetchInPayments();
  console.log(methods, 'methods - fetchData');
}

onMounted(() => {
  fetchData();
})

</script>

<template>
  <div class="methods-list">
    <div class="methods-list__header">
      <h4 class="coin-decorator">
        Balance: {{ userBalance }}{{ currencyName }}
      </h4>
      <ButtonBase class="min-width-80" @click="$emit('close')">Exit</ButtonBase>
    </div>

    <p>MethodsIn</p>
  </div>
</template>

<style scoped lang='scss'>
.methods-list {
  width: 100%;
  position: relative;
  z-index: 1;
  padding: 20px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    h4 {
      font-size: 24px;
      font-weight: var(--font-weight-light);
    }
  }


}
</style>
