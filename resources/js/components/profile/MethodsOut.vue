<script setup>
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { useLoading } from "@/composables/useLoading";
import { notifyWarning } from "@/helpers/notify";
import { fetchOutPayments } from "@/services/payments";
import { useUser } from "@/composables/useUser";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import { cutTextLength } from "@/helpers/cutTextLength";
import useVuelidate from '@vuelidate/core';
import { required, minValue, maxValue, helpers } from '@vuelidate/validators';
import { sampleWiddrawMethods } from "@/utils/dummyData";
import ButtonWithClose from "@/components/details/ButtonWithClose.vue";
import { useConfirm } from '@/composables/useConfirm';
import { useCodeConfirm } from '@/composables/useCodeConfirm';

defineOptions({ name: "MethodsOut" })

defineEmits(["close"])

const { isLoading, loadingStart, loadingStop } = useLoading();
const { userBalanceWithCurrency, userBalance } = useUser();
const { confirm } = useConfirm();
const { confirm: confirmCode } = useCodeConfirm();

const methodList = ref([]);
const selectedMethod = ref(null);
const selectedPayment = ref(null);

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
  if (v$.value.$invalid) return;

  selectedPayment.value = payment;
}

const submit = async () => {

  const code = await confirmCode({
    title: 'Do not close this window',
    text: `Enter the 6-digit code sent to your email`,
    digits: 6,
    confirmText: 'Continue',
  })

  if (!code) {return;}

  console.log(code, 'code - submit');


  // const result = await confirm({
  //   title: 'Withdraw a Balance',
  //   text: `You will be redirected to this page ${selectedPayment.value.link}`,
  //   confirmText: 'Confirm',
  //   cancelText: 'Cancel'
  // })

  // if (!result) {return;}

  window.location.href = selectedPayment.value.link
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
        <ButtonBase v-if="selectedPayment" class="methods-list__btn" @click="submit">Continue</ButtonBase>
      </transition>
    </div>

  </div>
</template>

<style scoped lang='scss'>
@use "@/assets/scss/method-list";
</style>
