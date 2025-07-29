<script setup>
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import { useLoading } from "@/composables/useLoading";
import { notifyWarning } from "@/helpers/notify";
import { createWidrawal, fetchOutPayments, getOutPaymentCode, checkPaymentCode } from "@/services/payments";
import { useUser } from "@/composables/useUser";
import { cutTextLength } from "@/helpers/cutTextLength";
import { required, minValue, maxValue, helpers, minLength, maxLength } from '@vuelidate/validators';
import { sampleWiddrawMethods } from "@/utils/dummyData";
import { useConfirm } from '@/composables/useConfirm';
import { useCodeConfirm } from '@/composables/useCodeConfirm';
import { useInform } from '@/composables/useInform';
import useVuelidate from '@vuelidate/core';
import { METHOD_TYPES, outMethodsWithWalletAddress } from "@/utils/constants";

import ButtonBase from "@/components/details/ButtonBase.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import ButtonWithClose from "@/components/details/ButtonWithClose.vue";
import InputWIthHelper from "@/components/details/InputWIthHelper.vue";

defineOptions({ name: "MethodsOut" })

defineEmits(["close"])

const { isLoading, loadingStart, loadingStop } = useLoading();
const { userBalanceWithCurrency, userBalance } = useUser();
const { confirm } = useConfirm();
const { confirm: confirmCode } = useCodeConfirm();
const { inform } = useInform();

const methodList = ref([]);
const selectedMethod = ref(null);
const verifyCodeSymbolsNumber = 6;

const formData = reactive({
  selectedAmount: 0,
  whaletAddress: '',
  widrawalMessage: null,
})

const isNeedWalletAddress = computed(() => selectedMethod.value && outMethodsWithWalletAddress.includes(selectedMethod.value?.type))

const rules = computed(() => {

  if (!isNeedWalletAddress.value) {
    return {
      selectedAmount: {
        required: helpers.withMessage('This field is required', required),
        minSum: helpers.withMessage('Minimum sun to withdraw 10', minValue(10)),
        maxSum: helpers.withMessage('Maximum sum to withdraw ' + userBalance.value, maxValue(userBalance.value)),
      },
    }
  }

  return {
    selectedAmount: {
      required: helpers.withMessage('This field is required', required),
      minSum: helpers.withMessage('Minimum sun to withdraw 10', minValue(10)),
      maxSum: helpers.withMessage('Maximum sum to withdraw ' + userBalance.value, maxValue(userBalance.value)),
    },
    whaletAddress: {
      required: helpers.withMessage('This field is required', required),
      minLength: helpers.withMessage('Minimum length 3', minLength(3)),
      maxLength: helpers.withMessage('Maximum length 100', maxLength(100)),
    },
  }
});

const v$ = useVuelidate(rules, formData);

const selectMethod = async (method) => {
  console.log(method, 'method');

  if (selectedMethod.value?.id === method.id) {
    v$.value.$reset();
    formData.widrawalMessage = null;
    return selectedMethod.value = null;
  }

  selectedMethod.value = method;
}

const submitHandler = async () => {
  if (isLoading.value) {return notifyWarning("Please wait for the previous operation to complete")};

  await v$.value.$validate();
  if (v$.value.$invalid) {return};

  try {
    loadingStart();

    const codePayload = {
      methodId: selectedMethod.value.id,
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

    const checkCodePayload = {
      methodId: selectedMethod.value.id,
      code: code,
      amount: formData.selectedAmount,
      currency: selectedMethod.value?.currency,
    }

    if (isNeedWalletAddress.value) {
      checkCodePayload.card_number = formData.whaletAddress;
    }

    const checkCodeResult = await checkPaymentCode(checkCodePayload)
    console.log(checkCodeResult, 'checkCodeResult');


    if (checkCodeResult.message) {
      formData.widrawalMessage = checkCodeResult.message;
    }

    console.log(formData.widrawalMessage, 'formData.widrawalMessage');

    // if (!checkCodeData) {
    //   await inform({
    //     title: 'Warning',
    //     text: 'Something went wrong',
    //   })
    //   return;
    // }

    // await inform({
    //   title: 'Success',
    //   text: 'Withdrawal successful',
    // })

  } catch (error) {
    console.warn(error, 'error - submitHandler');
    notifyWarning("Something went wrong");

  } finally {
    loadingStop();
  }
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

      <transition name="fade" mode="out-in">
        <div v-if="!selectedMethod">
          <ul  class="methods-list__list mb-30">
            <ButtonWithClose v-for="method in methodList"
              :key="method.id"
              :is-show-close="selectedMethod?.id === method.id"
              :is-active="selectedMethod?.id === method.id"
              class="methods-list__listitem"
              @click="selectMethod(method)"
            >
              <p class="methods-list__listitem--left">{{ method.title?.length > 20 ? cutTextLength(method.title, 20) : method.title  }}</p>
              <p class="methods-list__listitem--right">Rate: {{ method.rate?.toFixed(2) }}%  Fee: {{ method.fix_fee?.toFixed(2)}} {{ method.currency}}</p>
            </ButtonWithClose>
          </ul>
        </div>

        <div v-else>
          <ul class="methods-list__list mb-30">
            <ButtonWithClose class="methods-list__listitem" is-active @click="selectMethod(selectedMethod)">
              <p class="methods-list__listitem--left">{{ selectedMethod.title?.length > 20 ? cutTextLength(selectedMethod.title, 20) : selectedMethod.title  }}</p>
              <p class="methods-list__listitem--right">Rate: {{ selectedMethod.fix_fee?.toFixed(2) }}% Fix: {{ selectedMethod.fix_fee?.toFixed(2) }}{{method.currency}}</p>
            </ButtonWithClose>
          </ul>

          <InputWIthHelper v-if="isNeedWalletAddress"
            v-model="formData.whaletAddress"
            class="mb-20"
            :helper-text="selectedMethod?.type === METHOD_TYPES.CARD ? 'Card number:' : 'Wallet adress:'"
            :placeholder="selectedMethod?.type === METHOD_TYPES.CARD ? 'Card number' : 'Wallet address'"
            :type="selectedMethod?.type === METHOD_TYPES.CARD ? 'number' : 'text'"
            :is-warning="v$.whaletAddress.$error"
            :warning-text="v$.whaletAddress.$errors[0]?.$message"
          />

          <ButtonBase class="methods-list__btn" @click="submitHandler">Continue</ButtonBase>
        </div>
      </transition>

      <transition name="fade" mode="out-in">
        <div v-if="formData?.widrawalMessage">
          <div class="methods-list__separator mt-20"></div>
          <div v-html="formData.widrawalMessage"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@use "@/assets/scss/method-list";
</style>
