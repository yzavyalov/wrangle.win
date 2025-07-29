<script setup>
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { useLoading } from "@/composables/useLoading";
import { notifyWarning } from "@/helpers/notify";
import { fetchInPayments, createDeposit } from "@/services/payments";
import { useUser } from "@/composables/useUser";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import { cutTextLength } from "@/helpers/cutTextLength";
import { sampleTopUpMethods } from "@/utils/dummyData";
import ButtonWithClose from "@/components/details/ButtonWithClose.vue";
import { useConfirm } from '@/composables/useConfirm';
import InputBase from "@/components/details/InputBase.vue";
import InputWIthHelper from "@/components/details/InputWIthHelper.vue";
import useVuelidate from '@vuelidate/core';
import { required, minValue, maxValue, helpers } from '@vuelidate/validators';


defineOptions({ name: "MethodsIn" })

defineEmits(["close"])

const { isLoading, loadingStart, loadingStop } = useLoading();

const methodList = ref([]);
const selectedMethod = ref(null);

const formData = reactive({
  selectedAmount: 0,
  depositMessage: null,
})

const rules = computed(() => {
  return {
    selectedAmount: {
      required: helpers.withMessage('This field is required', required),
      minSum: helpers.withMessage('Minimum sun to top up 1', minValue(1)),
    },
    // whaletAddress: {
    //   required: helpers.withMessage('This field is required', required),
    // },
  }
});

const v$ = useVuelidate(rules, formData);

const selectMethod = async (method) => {
  console.log(method, 'method');
  if (selectedMethod.value?.id === method.id) {
    v$.value.$reset();
    formData.depositMessage = null;
    return selectedMethod.value = null;
  }

  selectedMethod.value = method;
}

const depositeBtnHandler = async () => {
  if (isLoading.value) {return notifyWarning("Please wait for the previous operation to complete")};

  await v$.value.$validate();
  if (v$.value.$invalid) {return};

  try {
    loadingStart();

    formData.depositMessage = null;

    const payload = {
      methodId: selectedMethod.value.id,
      amount: formData.selectedAmount,
      currency: selectedMethod.value?.currency,
    }

    const methodDetails = await createDeposit(payload);
    console.log(methodDetails, 'methodDetails');

    if (!methodDetails?.original?.message) {
      notifyWarning("Something went wrong");
      notifyWarning("No message from server")
      console.warn("No message from server");
      return;
    }

    formData.depositMessage = methodDetails?.original?.message;
  } catch (error) {
    console.warn(error, 'error - depositeBtnHandler');
    notifyWarning("Something went wrong");

  } finally {
    loadingStop();
  }
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

      <div>
        <p class="text-center mb-20">Choose payment method</p>

        <transition name="fade" mode="out-in">

          <div v-if="!selectedMethod">
            <ul class="methods-list__list mb-30">
              <li v-for="method in methodList" :key="method.id" class="methods-list__listitem" @click="selectMethod(method)">
                <p class="methods-list__listitem--left">{{ method.title?.length > 20 ? cutTextLength(method.title, 20) : method.title  }}</p>
                <p class="methods-list__listitem--right">Rate: {{ method.rate?.toFixed(2) }}%  Fee: {{ method.fix_fee?.toFixed(2)}} {{ method.currency}}</p>
              </li>
            </ul>
          </div>

          <div v-else>
            <ul class="methods-list__list mb-30">
              <ButtonWithClose class="methods-list__listitem" is-active @click="selectMethod(selectedMethod)">
                <p class="methods-list__listitem--left">{{ selectedMethod.title?.length > 20 ? cutTextLength(selectedMethod.title, 20) : selectedMethod.title  }}</p>
                <p class="methods-list__listitem--right">Rate: {{ selectedMethod.rate?.toFixed(2) }}% Fee:  {{ method.fix_fee?.toFixed(2)}} {{ method.currency}}</p>
              </ButtonWithClose>
            </ul>

            <InputWIthHelper v-model="formData.selectedAmount"
              class="mb-20"
              helper-text="Amount:"
              placeholder="Enter amount"
              type="number"
              :is-warning="v$.selectedAmount.$error"
              :warning-text="v$.selectedAmount.$errors[0]?.$message"
              @keyup:enter="depositeBtnHandler"
            />

            <p v-if="selectedMethod?.description" class="text-center mb-20 mt-20">{{ selectedMethod.description }}</p>

            <ButtonBase class="min-width-200 m-auto" @click="depositeBtnHandler">Deposit</ButtonBase>

          </div>
        </transition>

        <transition name="fade" mode="out-in">
          <div v-if="formData?.depositMessage">
            <div class="methods-list__separator mt-20"></div>
            <div v-html="formData.depositMessage"></div>
          </div>
        </transition>
      </div>
    </div>

  </div>
</template>

<style scoped lang='scss'>
@use "@/assets/scss/method-list";

//.method-logo {
//  width: auto;
//  height: 40px;
//  object-fit: contain;
//  margin-right: 10px;
//  display: inline-block;
//}
</style>
