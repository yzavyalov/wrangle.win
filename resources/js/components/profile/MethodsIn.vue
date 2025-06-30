<script setup>
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { useLoading } from "@/composables/useLoading";
import { notifyWarning } from "@/helpers/notify";
import { fetchInPayments } from "@/services/payments";
import { useUser } from "@/composables/useUser";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import { cutTextLength } from "@/helpers/cutTextLength";
import { sampleTopUpMethods } from "@/utils/dummyData";
import ButtonWithClose from "@/components/details/ButtonWithClose.vue";

defineOptions({ name: "MethodsOut" })

defineEmits(["close"])

const { isLoading, loadingStart, loadingStop } = useLoading();
const { userBalanceWithCurrency, userBalance } = useUser();

const methodList = ref([]);
const selectedMethod = ref(null);
const paymentList = computed(() => selectedMethod.value?.payments || []);

const selectMethod = async (method) => {
  console.log(method, 'method');
  if (selectedMethod.value?.id === method.id) {
    return selectedMethod.value = null;
  }

  selectedMethod.value = method;
}

const selectPayment = async (payment) => {
  console.log(payment, 'payment');

  console.warn("this feature is comming soon...");
  notifyWarning("this feature is comming soon...");
}

const fetchData = async () => {
  const fetchMethods = await fetchInPayments();
  console.log(fetchMethods, 'fetchMethods - fetchData');

  fetchMethods?.length && ( methodList.value = fetchMethods );

  if (fetchMethods?.length) return;

  console.warn("dummy data - sampleTopUpMethods");
  notifyWarning("dummy data - sampleTopUpMethods");
  methodList.value = [...sampleTopUpMethods]
}

onMounted(() => {
  fetchData();
})

</script>

<template>
  <div class="methods-list">
    <div class="methods-list__header mb-20">
      <h4>
        Top up a Balance
      </h4>
      <ButtonWithIcon class="methods-list__header--btn" icon="/images/cross.svg" @click="$emit('close')" />
    </div>

    <div class="methods-list__body">
      <LoaderComponent v-if="isLoading" />

      <p class="text-center mb-20">Choose payment method</p>

      <ul class="methods-list__list mb-30">
        <ButtonWithClose v-for="method in methodList"
          :key="method.id"
          :is-show-close="selectedMethod?.id === method.id"
          :is-active="selectedMethod?.id === method.id"
          @click="selectMethod(method)"
        >
          {{ method.title }}
        </ButtonWithClose>
        <!-- <li v-for="method in methodList"
          :key="method.id"
          :class="['methods-list__listitem single', { active: selectedMethod?.id === method.id }]"
          @click="selectMethod(method)"
        >
          <p class="text-center">{{ method.title }}</p>
        </li> -->
      </ul>

      <ul v-if="paymentList?.length" class="methods-list__list mb-40">
        <li v-for="method in paymentList" :key="method.id" class="methods-list__listitem" @click="selectPayment(method)">
          <p class="methods-list__listitem--left">{{ method.name?.length > 20 ? cutTextLength(method.name, 20) : method.name  }}</p>
          <p class="methods-list__listitem--right">{{ method.commission }}% Commission</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<style scoped lang='scss'>
@use "@/assets/scss/method-list";
</style>
