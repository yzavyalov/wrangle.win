<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { useUserStore } from "@/store/user";
import { getCurrency } from '@/helpers/getCurrency';
import { useHistory } from "@/composables/useHistory";
import { BET_OPTION_KEY, createBit } from '@/services/bets';
import { triggerCloseModal } from '@/composables/useModalsTriggers';
import { notifyError, notifySuccess, notifyWarning } from '@/helpers/notify';
import { required, sameAs, email, minLength, helpers, maxLength } from '@vuelidate/validators';
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import InputWIthHelper from '@/components/details/InputWIthHelper.vue';
import ButtonBaseWithIcon from "@/components/details/ButtonBaseWithIcon.vue";
import { useInform } from '@/composables/useInform';

defineOptions({ name: "NewBitModal" })

const { removeQueryParam, getQueryParam } = useHistory();
const { inform } = useInform();
const { updateUserBalance, getUser } = useUserStore();

const betOption = ref(null)
const bitAmount = ref(1);
const currencyName = getCurrency();

const currentUser = computed(() => getUser);
const userBalance = computed(() => Number(currentUser.value?.balance?.balance || 0)?.toFixed(2) || 0);

const rules = computed(() => {
  return {
    bitAmount: {
      required: helpers.withMessage('Field is required', required),
      isNumber: helpers.withMessage('Must be a number', (value) => !isNaN(value)),
      positive: helpers.withMessage('Must be 1 or greater than 1', (value) => Number(value) >= 1),
      maxBalance: helpers.withMessage('Exceeds your balance', (value) => Number(value) <= userBalance.value),
    },
  };
});

const v$ = useVuelidate(rules, { bitAmount });


const makeBitHandler = async () => {
  await v$.value.$validate();
  if (v$.value.$invalid) return;

  const payload = {
    sum: Number(bitAmount.value),
    id: Number(betOption.value),
  }
  console.log(payload, 'payload - NewBitModal - makeBitHandler');

  const newBit = await createBit(payload);
  console.log(newBit, 'newBit - NewBitModal - makeBitHandler');

  if (!newBit) { return notifyWarning("Error creating bit"); }

  const newBalance = Number(userBalance.value) - Number(bitAmount.value);
  updateUserBalance(newBalance);

  notifySuccess("Your bet has been accepted!");

  await inform({
    title: 'Success',
    text: 'Your bet has been accepted!',
  })

  triggerCloseModal();
}

const initModal = () => {
  console.log(window.location.href, 'window.location.href - initModal');
  const query = getQueryParam(BET_OPTION_KEY);

  if (query) {
    betOption.value = query;
  }
}

onMounted(() => {
  initModal();
})

onBeforeUnmount(() => {
  removeQueryParam(BET_OPTION_KEY);
})
</script>

<template>
  <div class="bit-modal__wrapper">
    <div class="bit-modal">
      <ButtonWithIcon icon="/images/cross.svg" class="bit-modal__close" @click.stop.prevent="triggerCloseModal" />

      <div class="bit-modal__header">
        <h3 class="bit-modal__title">New Bit</h3>
      </div>

      <div class="bit-modal__body">
        <h4>{{ currentUser?.name }}</h4>
        <p class="coin-decorator">Your Balance - <b>{{ userBalance }}{{ currencyName }}</b></p>

        <InputWIthHelper
          v-model="bitAmount"
          placeholder="Enter bit amount"
          helperText="Enter bit amount"
          inputType="number"
          :warning-text="v$.bitAmount.$error ? v$.bitAmount.$errors[0]?.$message : 'Enter bit amount'"
          :is-warning="v$.bitAmount.$invalid && v$.bitAmount.$dirty"
        />

      </div>

      <div class="bit-modal__footer">
        <ButtonBaseWithIcon @click.stop.prevent="triggerCloseModal" text="Cancel" alt="cancel" />
        <ButtonBaseWithIcon @click.stop.prevent="makeBitHandler" text="Confirm" alt="confirm" />
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.bit-modal {
  position: relative;
  background: var(--bg-color-secondary);
  padding: 20px 40px 10px 40px;
  border-radius: var(--border-radius-main);
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
  font-weight: var(--font-weight-light);
  position: relative;

  &__wrapper {
    position: relative;
    max-width: 1440px;
  }

  &__header {
    h3 {
      text-align: center;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;

    h4 {
      text-align: center;
    }
  }

  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 10px;
    font-style: italic;
  }

  &__close {
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 5px;
    padding: 0px;
    width: 20px;
    height: 20px;
    z-index: 1;
  }
}
</style>
