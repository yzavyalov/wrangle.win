<script setup>
import { reactive, computed, onMounted } from "vue";
import { Head } from "@inertiajs/vue3";
import BaseLayout from "@/layouts/BaseLayout.vue";
import PageWrapperMain from "@/components/PageWrapperMain.vue";
import FormBase from "@/components/form/FormBase.vue";
import InputWIthHelper from "@/components/details/InputWIthHelper.vue";
import InputPasswordWIthHelper from "@/components/details/InputPasswordWIthHelper.vue";
import useVuelidate from "@vuelidate/core";
import { required, sameAs, email, minLength, helpers } from '@vuelidate/validators';
import ButtonBaseWithIcon from "@/components/details/ButtonBaseWithIcon.vue";
import { resetUserPassword } from "@/services/user";
import { useLoading } from "@/composables/useLoading";
import { notifySuccess, notifyWarning } from "@/helpers/notify";
import { navigateTo } from "@/helpers/navigate";
import { PAGE_ROUTES } from "@/utils/datasets";
import { passwordRegex } from "@/utils/regex";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { useInform } from "@/composables/useInform"

defineOptions({
  name: "NewPasswordForm",
  layout: (h, page) => h(BaseLayout, () => [page]),
})

const { isLoading, loadingStart, loadingStop } = useLoading();
const {} = useInform();

const formData = reactive({
  password: '',
  passwordRepeat: '',
  isShowPassword: false,

  token: '',
  email: '',
})

const isCanChangePassword = computed(() => formData.token !== '' && formData.email !== '')

const passwordRequirmentText = 'Password must be at least 8 characters long, contain at least one uppercase and one lowercase letter, one digit, and one special character'

const rules = computed(() => {
  return {
    password: {
      required: helpers.withMessage('This field is required', required),
      minLength: helpers.withMessage('Minimum 8 characters required', minLength(6)),
      strongPassword: helpers.withMessage( passwordRequirmentText, (value) => passwordRegex.test(value)),
    },
    passwordRepeat: {
      required: helpers.withMessage('This field is required', required),
      sameAs: helpers.withMessage('Passwords do not match', sameAs(formData.password))
    },
  }
});

const v$ = useVuelidate(rules, formData);

const toggleShowPassword = () => formData.isShowPassword = !formData.isShowPassword;

const submitForm = async () => {
  if (isLoading.value) {return notifyWarning("Loading in progress, please wait...");};

  await v$.value.$validate();
  if (v$.value.$invalid) {return;}

  try {
    loadingStart();

    const payload = {
      password: formData.password,
      password_confirmation: formData.passwordRepeat,
      token: formData.token,
      email: formData.email,
    }

    const success = await resetUserPassword(payload);

    if (!success) {return notifyWarning('Something went wrong');}

    notifySuccess('Password successfully changed');

    await inform({
      title: 'Congratulations',
      text: 'Your password successfully changed. You will be redirected to login page',
    })

    navigateTo(PAGE_ROUTES.LOGIN);

  } catch (error) {
    console.warn(error);

  } finally {
    loadingStop();
  }
}

const init = () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email');
  const token = params.get('token');

  if (!email || !token) {
    return notifyWarning('Invalid link... need email and token');
  }

  formData.email = email;
  formData.token = token;
}

onMounted(() => {
  init();
})


</script>

<template>
  <Head title="New password form" />

  <PageWrapperMain>
    <div class="form__wrapper">
      <div v-if="!isCanChangePassword">
        <p>Invalid link</p>
        <p>Need email and token</p>

        <ButtonBaseWithIcon
          text="Set new password"
          @click="navigateTo(PAGE_ROUTES.LOGIN)"
        />
      </div>

      <FormBase v-else title="New password form">

      <LoaderComponent v-if="isLoading" />

      <InputPasswordWIthHelper
        v-model="formData.password"
        helperText="Input new password *"
        placeholder="Password"
        :is-warning="v$.password.$error"
        :warning-text="v$.password.$error ? v$.password.$errors[0]?.$message : 'Enter new password'"
        :type="formData.isShowPassword ? 'text' : 'password'"
        @showPassToogle="toggleShowPassword"
      />

      <InputPasswordWIthHelper
        v-model="formData.passwordRepeat"
        helperText="Repeat new password *"
        placeholder="Password repeat"
        :is-warning="v$.passwordRepeat.$error"
        :warning-text="v$.passwordRepeat.$error ? v$.passwordRepeat.$errors[0]?.$message : 'Repeat new password'"
        :type="formData.isShowPassword ? 'text' : 'password'"
        @showPassToogle="toggleShowPassword"
      />

      <ButtonBaseWithIcon
        text="Set new password"
        @click="submitForm"
      />

      </FormBase>
    </div>
  </PageWrapperMain>
</template>

<style scoped lang='scss'>
  .form__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    padding: 30px;
    position: relative;
    z-index: 1
  }
</style>
