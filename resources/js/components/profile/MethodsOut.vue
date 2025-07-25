<script setup>
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import { useLoading } from "@/composables/useLoading";
import { notifyWarning } from "@/helpers/notify";
import { createWidrawal, fetchOutPayments, getOutPaymentCode } from "@/services/payments";
import { useUser } from "@/composables/useUser";
import { cutTextLength } from "@/helpers/cutTextLength";
import { required, minValue, maxValue, helpers } from '@vuelidate/validators';
import { sampleWiddrawMethods } from "@/utils/dummyData";
import { useConfirm } from '@/composables/useConfirm';
import { useCodeConfirm } from '@/composables/useCodeConfirm';
import { useInform } from '@/composables/useInform';
import useVuelidate from '@vuelidate/core';

import ButtonBase from "@/components/details/ButtonBase.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import ButtonWithClose from "@/components/details/ButtonWithClose.vue";

defineOptions({ name: "MethodsOut" })

defineEmits(["close"])

const { isLoading, loadingStart, loadingStop } = useLoading();
const { userBalanceWithCurrency, userBalance } = useUser();
const { confirm } = useConfirm();
const { confirm: confirmCode } = useCodeConfirm();
const { inform } = useInform();

const methodList = ref([]);
const selectedMethod = ref(null);
const selectedPayment = ref(null);
const verifyCodeSymbolsNumber = 6;

const formData = reactive({
  selectedAmount: 0
})

const paymentList = computed(() => selectedMethod.value?.payments || []);

const rules = computed(() => {
  return {
    selectedAmount: {
      required: helpers.withMessage('This field is required', required),
      minSum: helpers.withMessage('Minimum sun to withdraw 10', minValue(10)),
      maxSum: helpers.withMessage('Maximum sun to withdraw ' + userBalance.value, maxValue(userBalance.value)),
    },
  }
});

const v$ = useVuelidate(rules, formData);

const selectMethod = async (method) => {
  console.log(method, 'method');

  if (selectedMethod.value?.id === method.id) {
    return selectedMethod.value = null;
  }

  selectedMethod.value = method;

  if (selectedPayment.value) {
    selectedPayment.value = null;
  }
}

const selectPayment = async (payment) => {
  console.log(payment, 'payment');

  if (selectPayment.value?.id === payment.id) {
    return selectedPayment.value = null;
  }

  await v$.value.$validate();
  if (v$.value.$invalid) {return};

  selectedPayment.value = payment;
}

const submitHandler = async () => {

  await v$.value.$validate();
  if (v$.value.$invalid) {return};

  const codePayload = {
    methodId: selectedPayment.value.id,
    amount: formData.selectedAmount
  }

  const codeSended = await getOutPaymentCode(codePayload)
  console.log(codeSended, 'codeSended');

  const code = await confirmCode({
    title: 'Do not close this window',
    text: `Enter the ${verifyCodeSymbolsNumber}-symbols code sent to your email`,
    symbols: verifyCodeSymbolsNumber,
    confirmText: 'Continue',
  })
  console.log(code, 'code - submitHandler');
  if (!code) {return;}

  const widrawalPayload = {
    methodId: selectedPayment.value.id,
    code: code,
    amount: formData.selectedAmount
  }

  const widrawalData = await createWidrawal(widrawalPayload)
  console.log(widrawalData, 'widrawalData');

  if (!widrawalData) {
    await inform({
      title: 'Warning',
      text: 'Something went wrong',
    })
    return;
  }

  window.location.href = widrawalData.link;
}

const fetchData = async () => {
  const fetchMethods = await fetchOutPayments();
  console.log(fetchMethods, 'fetchMethods - fetchData');

  fetchMethods?.length && ( methodList.value = fetchMethods );

  if (fetchMethods?.length) return;

  console.warn("dummy data - sampleWiddrawMethods");
  notifyWarning("dummy data - sampleWiddrawMethods");
  methodList.value = [...sampleWiddrawMethods]
}

onMounted(() => {
  fetchData();
})

</script>

<template>
  <div class="methods-list">
    <div class="methods-list__header mb-20">
      <h4>
        Withdraw money
      </h4>
      <ButtonWithIcon class="methods-list__header--btn" icon="/images/cross.svg" @click="$emit('close')" />
    </div>

    <div class="methods-list__body">
      <LoaderComponent v-if="isLoading" />

      <div class="methods-list__form mb-20">
        <span class="coin-decorator">Your internal Balance:</span>
        <input readonly :value="userBalanceWithCurrency" type="text">

        <span class="coin-decorator font-italic">Amount to withdraw:</span>
        <input v-model="formData.selectedAmount" :max="userBalance" type="number">

        <transition name="bounce" mode="out-in">
          <p v-if="v$.selectedAmount.$error" class="methods-list__form--warning">
            {{ v$.selectedAmount.$errors[0]?.$message }}
          </p>
        </transition>
      </div>


      <p class="text-center mb-20">Choose withdraw method</p>

      <ul class="methods-list__list mb-30">
        <ButtonWithClose v-for="method in methodList"
          :key="method.id"
          :is-show-close="selectedMethod?.id === method.id"
          :is-active="selectedMethod?.id === method.id"
          @click="selectMethod(method)"
        >
          {{ method.title }}
        </ButtonWithClose>
      </ul>

      <transition name="fade" mode="out-in">
        <ul v-if="paymentList?.length" class="methods-list__list mb-40">
          <li v-for="method in paymentList" :key="method.id" class="methods-list__listitem" @click="selectPayment(method)">
            <p class="methods-list__listitem--left">{{ method.name?.length > 20 ? cutTextLength(method.name, 20) : method.name  }}</p>
            <p class="methods-list__listitem--right">{{ method.commission }}% Commission</p>
          </li>
        </ul>
      </transition>

      <transition name="bounce" mode="out-in">
        <ButtonBase v-if="selectedPayment" class="methods-list__btn" @click="submitHandler">Continue</ButtonBase>
      </transition>
    </div>

  </div>
</template>

<style scoped lang='scss'>
@use "@/assets/scss/method-list";
</style>
