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
import { useUser } from "@/composables/useUser";
import { getOperationLabel } from "@/helpers/getTransactionStatus";
import { getMethodLabel } from "@/helpers/getTransactionStatus";
import { getStatusLabel } from "@/helpers/getTransactionStatus";


defineOptions({ name: "TransactionTable" })

defineEmits(["close"])

const { isLoading, loadingStart, loadingStop } = useLoading();
const { userBalanceWithCurrency } = useUser();

const transactions = ref([]);
const pagination = ref({
  page: 1,
  per_page: 10,
});
const isFirstPage = computed(() => pagination.value.page === 1);
const isLastPage = ref(false);


const fetchTransactions = async (page) => {
  console.log('fetchTransactions');
  if (isLoading.value) {
    notifyWarning("Loading, please wait");
    return console.warn("Loading, please wait");
  }

  if (isLastPage.value) {
    notifyWarning('Last page');
    return console.warn('Last page');
  }

  try {
    loadingStart();

    const payload = {
      page: page || pagination.value.page || 1,
      per_page: pagination.value.per_page,
    }

    const fethcedTransactions = await fetchUserTransactions(payload);
    console.log(fethcedTransactions, 'response - fetchTransactions');

    isFirstPage.value
      ? transactions.value = fethcedTransactions
      : transactions.value.push(...fethcedTransactions);

    isLastPage.value = fethcedTransactions.length < pagination.value.per_page;

  } catch (error) {
    console.warn(error);
    notifyWarning(error?.message);

  } finally {
    loadingStop();
  }
}

const fetchMoreTransactions = async () => {
  console.log('fetchMoreTransactions');
  if (isLoading.value) {
    notifyWarning("Loading, please wait");
    return console.warn("Loading, please wait");
  }

  if (isLastPage.value) {
    notifyWarning('Last page');
    return console.warn('Last page');
  }

  pagination.value.page++

  await nextTick();

  fetchTransactions();
}

onMounted(() => {
  fetchTransactions();
})

</script>

<template>
  <div class="transaction-table">
    <div class="transaction-table__header">
      <h4 class="coin-decorator">
        Balance: {{ userBalanceWithCurrency }}
      </h4>
      <ButtonBase class="min-width-80" @click="$emit('close')">Exit</ButtonBase>
    </div>

    <div class="transaction-table__body">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Operation</th>
            <th>Status</th>
            <th>Method</th>
            <th>Summ</th>
            <th>Comment</th>
            <th>Created at</th>
          </tr>
        </thead>

        <tbody v-if="transactions?.length">
          <tr v-for="item in transactions" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ getOperationLabel(item.operation) }}</td>
            <td>{{ getStatusLabel(item.status) }}</td>
            <td>{{ getMethodLabel(item.method) }}</td>
            <td>{{ item.sum }}</td>
            <td>{{ item.comment }}</td>
            <td>{{ item.date }}</td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td> -- </td>
            <td> -- </td>
            <td> -- </td>
            <td> -- </td>
            <td> -- </td>
            <td> -- </td>
            <td> -- </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="transaction-table__footer">
      <LoaderComponent v-if="isLoading" class="transaction-table__loader" />

      <ButtonBase v-if="transactions.length && !isLastPage"
        class="min-width-120 m-auto"
        @click="fetchMoreTransactions"
      >
        Load more
      </ButtonBase>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.transaction-table {
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


  &__body {
    border: 1px solid black;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }

  &__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    position: relative;
  }

  table {
    width: 100%;

    td, th {
      padding: 8px;
      text-align: center;
      font-weight: var(--font-weight-light);
    }



    thead {
      background: var(--btn-bg-color);
    }

    tbody {
      background: var(--btn-bg-color-active);
    }

    thead tr {
      border-bottom: 2px solid black;
    }

    thead th:not(:last-child) {
      border-right: 1px solid black;
    }

    tbody tr:not(:last-child) {
      border-bottom: 1px solid black;
    }

    tbody td:not(:last-child) {
      border-right: 1px solid black;
    }

  }

}
</style>
