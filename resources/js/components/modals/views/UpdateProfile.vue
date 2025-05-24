<script setup>
import { onMounted, onBeforeUnmount, ref, computed, reactive, warn } from 'vue';
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
import InputPasswordWIthHelper from '@/components/details/InputPasswordWIthHelper.vue';
import ButtonBaseWithIcon from "@/components/details/ButtonBaseWithIcon.vue";
import { useInform } from '@/composables/useInform';
import { updateUserProfile } from '@/services/user';
import { useLoading } from '@/composables/useLoading';

defineOptions({ name: "UpdatePassword" })

const { getUser } = useUserStore();
const { isLoading, loadingStart, loadingStop } = useLoading();
const { inform } = useInform();

const formData = reactive({
  userName: '',
})

const currentUser = computed(() => getUser);

const rules = computed(() => {
  return {
    userName: {
      required: helpers.withMessage('This field is required', required),
      minLength: helpers.withMessage('Minimum 3 characters required', minLength(3)),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const toggleShowPassword = () => {
  formData.isShowPassword = !formData.isShowPassword;
}

const submitFormHandler = async () => {
  console.log('submitFormHandler');

  if (isLoading.value) {
    notifyWarning("Loading in progress, please wait...");
    return console.warn('Loading in progress, please wait...');
  }

  await v$.value.$validate();
  if (v$.value.$invalid) return;

  try {
    loadingStart();

    const paylaod = {
      name: formData.userName,
    };

    console.log(paylaod, 'paylaod - submitFormHandler');

    const success = await updateUserProfile(paylaod);
    console.log(success, 'success - updateUserProfile');

    success && notifySuccess("Your parofile has been updated!");

    const informed = await inform({
      title: 'Success',
      text: 'Your parofile has been updated!',
    })

    informed && triggerCloseModal();

  } catch (error) {
    console.warn(error);
    notifyWarning(error?.response?.data?.message || error?.message);

  } finally {
    loadingStop();
  }
}

</script>

<template>
  <div class="bit-modal__wrapper">
    <div class="bit-modal">
      <ButtonWithIcon icon="/images/cross.svg" class="bit-modal__close" @click.stop.prevent="triggerCloseModal" />

      <div class="bit-modal__header">
        <h3 class="bit-modal__title">WRANGLER.WIN</h3>
        <h3 class="bit-modal__title">Change your name form</h3>
        <h4 class="bit-modal__title">Current name - '{{ currentUser.name }}'</h4>
      </div>

      <div class="bit-modal__body">
        <InputWIthHelper
          v-model="formData.userName"
          helper-text="Enter your new name*"
          placeholder="Enter your new name*"
          type="text"
          :is-warning="v$.userName.$error"
          :warning-text="v$.userName.$error ? v$.userName.$errors[0]?.$message : 'Enter your new name'"
          @showPassToogle="toggleShowPassword"
        />

      </div>

      <div class="bit-modal__footer">
        <ButtonBaseWithIcon @click.stop.prevent="triggerCloseModal" text="Cancel" alt="cancel" />
        <ButtonBaseWithIcon @click.stop.prevent="submitFormHandler" text="Confirm" alt="confirm" />
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
  max-width: 1000px;

  &__wrapper {
    position: relative;
    max-width: 1440px;
  }

  &__header {
    h3, h4 {
      text-align: center;
      margin-bottom: 10px;
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
