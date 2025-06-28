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

defineOptions({ name: "MethodsOut" })

defineEmits(["close"])

const { isLoading, loadingStart, loadingStop } = useLoading();
const { userBalanceWithCurrency, userBalance } = useUser();

const methodList = ref([]);

const formData = reactive({
  selectedAmount: 0
})

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

  await v$.value.$validate();
  if (v$.value.$invalid) return;

  console.warn("this feature is comming soon...");
  notifyWarning("this feature is comming soon...");
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

      <ul v-if="methodList?.length" class="methods-list__list mb-40">
        <li v-for="method in methodList" :key="method.id" class="methods-list__listitem" @click="selectMethod(method)">
          <p class="methods-list__listitem--left">{{ method.name?.length > 20 ? cutTextLength(method.name, 20) : method.name }}</p>
          <p class="methods-list__listitem--right">{{ method.commission }}% Commission</p>
        </li>
      </ul>

      <ButtonBase class="methods-list__btn">Continue</ButtonBase>
    </div>

  </div>
</template>

<style scoped lang='scss'>
@use "@/assets/scss/method-list";
</style>
