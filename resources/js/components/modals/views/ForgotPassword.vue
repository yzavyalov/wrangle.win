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
import ButtonBaseWithIcon from "@/components/details/ButtonBaseWithIcon.vue";
import { useInform } from '@/composables/useInform';
import { passwordRegex } from '@/utils/regex';
import { changeUserPassword, forgotUserPassword } from '@/services/user';
import { useLoading } from '@/composables/useLoading';
import { useConfirm } from '@/composables/useConfirm';
import InputBase from '@/components/details/InputBase.vue';

defineOptions({ name: "ForgotPassword" })

const { getUser } = useUserStore();
const { isLoading, loadingStart, loadingStop } = useLoading();
const { inform } = useInform();
const { confirm } = useConfirm();

const formData = reactive({
  email: '',
})

const rules = computed(() => {
  return {
    email: { required, email },
  };
});

const v$ = useVuelidate(rules, formData);


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
      email: formData.email,
    };

    console.log(paylaod, 'paylaod - submitFormHandler');

    const success = await forgotUserPassword(paylaod);
    console.log(success, 'success - forgotUserPassword');

    if (!success) { return notifyError("Something went wrong"); }

    notifySuccess("Your request has been sent!");

    await inform({
      title: 'Success',
      text: 'Your request has been sent!',
    })

    triggerCloseModal();

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
        <h3 class="bit-modal__title">Forgot password form</h3>
      </div>

      <div class="bit-modal__body">

        <InputWIthHelper
        v-model="formData.email"
        helper-text="Enter email*"
        placeholder="Email"
        :is-warning="v$.email.$error"
        />

        <!-- <InputBase v-model="formData.email" :placeholder="'Email address'" type="email" class="form__input" />
        <span v-if="v$.email?.$error" class="error">
          <span v-if="v$.email?.required?.$invalid">Email is required</span>
          <span v-else-if="v$.email?.email?.$invalid">Email is invalid</span>
        </span> -->

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

  .error {
    font-size: 12px;
    color: red;
    margin-top: -6px;
    margin-bottom: 6px;
  }
}
</style>
