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
import { passwordRegex } from '@/utils/regex';
import { changeUserPassword } from '@/services/user';
import { useLoading } from '@/composables/useLoading';

defineOptions({ name: "UpdatePassword" })

const { getUser } = useUserStore();
const { isLoading, loadingStart, loadingStop } = useLoading();
const { inform } = useInform();

const formData = reactive({
  currentPassword: '',
  newPassword: '',
  newPasswordRepeat: '',

  isShowPassword: false,
})

const currentUser = computed(() => getUser);

const passwordRequirmentText = 'Password must be at least 8 characters long, contain at least one uppercase and one lowercase letter, one digit, and one special character'

const rules = computed(() => {
  return {
    currentPassword: {
      required: helpers.withMessage('This field is required', required),
      minLength: helpers.withMessage('Minimum 8 characters required', minLength(8)),
    },
    newPassword: {
      required: helpers.withMessage('This field is required', required),
      strongPassword: helpers.withMessage( passwordRequirmentText, (value) => passwordRegex.test(value)),
    },
    newPasswordRepeat: {
      sameAs: helpers.withMessage('Passwords do not match', sameAs(formData.newPassword))
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
      current_password: formData.currentPassword,
      new_password: formData.newPassword,
    };

    console.log(paylaod, 'paylaod - submitFormHandler');

    const success = await changeUserPassword(paylaod);
    console.log(success, 'success - changeUserPassword');

    success && notifySuccess("Your password has been changed!");

    const informed = await inform({
      title: 'Success',
      text: 'Your password has been changed!',
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
        <h3 class="bit-modal__title">Change password form</h3>

        <p>type - {{ formData.isShowPassword ? 'text' : 'password' }}</p>
      </div>

      <div class="bit-modal__body">
        <InputPasswordWIthHelper
          v-model="formData.currentPassword"
          helper-text="Enter current password*"
          placeholder="Enter current password*"
          :type="formData.isShowPassword ? 'text' : 'password'"
          :is-warning="v$.currentPassword.$error"
          :warning-text="v$.currentPassword.$error ? v$.currentPassword.$errors[0]?.$message : 'Enter current password'"
          @showPassToogle="toggleShowPassword"
        />


        <p>Requirments for new password:</p>
        <p>{{ passwordRequirmentText }}</p>

        <InputPasswordWIthHelper
          v-model="formData.newPassword"
          helper-text="Enter new password*"
          placeholder="Enter new password*"
          :type="formData.isShowPassword ? 'text' : 'password'"
          :is-warning="v$.newPassword.$error"
          :warning-text="v$.newPassword.$error ? v$.newPassword.$errors[0]?.$message : 'Enter new password'"
          @showPassToogle="toggleShowPassword"
        />

        <InputPasswordWIthHelper
          v-model="formData.newPasswordRepeat"
          helper-text="Repeat new password*"
          placeholder="Repeat new password*"
          :type="formData.isShowPassword ? 'text' : 'password'"
          :is-warning="v$.newPasswordRepeat.$error"
          :warning-text="v$.newPasswordRepeat.$error ? v$.newPasswordRepeat.$errors[0]?.$message : 'Repeat new password'"
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
    h3 {
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
