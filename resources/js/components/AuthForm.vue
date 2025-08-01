<script setup>
import { computed, nextTick, reactive, ref } from 'vue';
import InputBase from '@/components/details/InputBase.vue';
import CheckboxBase from '@/components/details/CheckboxBase.vue';
import ButtonBaseWithIcon from '@/components/details/ButtonBaseWithIcon.vue';
import { navigateTo } from '@/helpers/navigate';
import useVuelidate from '@vuelidate/core';
import { required, sameAs, email, minLength } from '@vuelidate/validators';
import { register, login, loginWithSocial } from '@/services/user';
import { PAGE_ROUTES } from '@/utils/datasets';
import { useInform } from "@/composables/useInform"
import { notifyWarning } from '@/helpers/notify';
import { triggerOpenNewModal } from '@/composables/useModalsTriggers';
import LoaderComponent from '@/components/LoaderComponent.vue';
import { useLoading } from '@/composables/useLoading';

const props = defineProps({
  isLoginVariant: { type: Boolean, default: true, },
});

const { inform } = useInform()
const { isLoading, loadingStart, loadingStop } = useLoading();

const formData = reactive({
  name: '',

  email: '',

  password: '',
  passwordRepeat: '',

  isShowPassword: false,
});

const rules = computed(() => {
  return props.isLoginVariant
    ? {
        email: { required, email },
        password: { required, minLength: minLength(6) },
      }
    : {
        name: { required, minLength: minLength(3) },
        email: { required, email },
        password: { required, minLength: minLength(8) },
        passwordRepeat: { required, sameAsPassword: sameAs(formData.password) },
      };
});

const v$ = useVuelidate(rules, formData);

const loginInHandle = async () => {
  console.log('loginInHandle');
  if (isLoading.value) {return notifyWarning("Loading in progress, please wait...");};

  await v$.value.$validate();
  if (v$.value.$invalid) return;

  try {
    loadingStart();
    const paylaod = {
      email: formData.email,
      password: formData.password,
    };

    const result = await login(paylaod);
    console.log(result, 'result - login');

    if (!result) return console.warn('Login error');

    navigateTo(PAGE_ROUTES.PROFILE);

  } catch (error) {
    console.warn(error);

  } finally {
    loadingStop();
  }
}

const loginWithSocialHandler = async (socialName) => {
  if (isLoading.value) {return notifyWarning("Loading in progress, please wait...");};

  try {
    loadingStart();

    const result = await loginWithSocial(socialName);
    console.log(result, 'result - loginWithSocialHandler');

    if (!result) {
      notifyWarning(`Login with ${socialName} error. Please try again later`);
      return console.warn('loginWithSocialHandler error');
    }

    navigateTo(PAGE_ROUTES.PROFILE);

  } catch (error) {
    console.warn(error);

  } finally {
    loadingStop();
  }
}

const registerHandle = async () => {
  console.log('registerHandle');
  if (isLoading.value) {return notifyWarning("Loading in progress, please wait...");};

  await v$.value.$validate();
  if (v$.value.$invalid) return;

  try {
    loadingStart();

    const paylaod = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.passwordRepeat
    };

    const result = await register(paylaod);
    console.log(result, 'result - registerHandle');

    if (!result) {
      await inform({
        title: 'Warning',
        text: 'Wrong data...',
      })
      return console.warn('Register error');
    }

    await inform({
      title: 'Congratulations',
      text: 'Your Profile successfully created. Please check your email to activate your account',
    })

    navigateTo(PAGE_ROUTES.LOGIN);

  } catch (error) {
    console.warn(error);

  } finally {
    loadingStop();
  }
}

const formActionHandler = (action) => {
  console.log(action,  'action - formActionHandler');

  switch (action) {
    case 'to_sign_in':
      navigateTo(PAGE_ROUTES.LOGIN)
      break;

    case 'to_sign_up':
      navigateTo(PAGE_ROUTES.REGISTER)
      break;

    case 'login':
      loginInHandle();
      break;

    case 'register':
      registerHandle();
      break;

    case 'google':
    case 'facebook':
    case 'telegram':
    loginWithSocialHandler(action);
      break;

    case "forgot_password":
      triggerOpenNewModal('forgot-password-modal');
      break;

    default:
      console.warn(`No handle for such action - ${action}`);
      break;
  }
}

</script>

<template>
  <div class="auth-form">
    <div class="auth-form__wrapper">
      <div class="auth-form__header">
        <h3 v-if="isLoginVariant">Login</h3>
        <h3 v-else>Create Account</h3>
      </div>

      <div class="auth-form__form">
        <LoaderComponent v-if="isLoading" />

        <InputBase v-if="!isLoginVariant" v-model="formData.name" :placeholder="'User name'" type="text" class="form__input" />
        <span v-if="v$.name?.$error" class="error">
          <span v-if="v$.name?.required?.$invalid">Name is required</span>
        </span>

        <InputBase v-model="formData.email" :placeholder="'Email address'" type="email" class="form__input" />
        <span v-if="v$.email?.$error" class="error">
          <span v-if="v$.email?.required?.$invalid">Email is required</span>
          <span v-else-if="v$.email?.email?.$invalid">Email is invalid</span>
        </span>

        <InputBase v-model="formData.password" placeholder="Password" :type="formData.isShowPassword ? 'text' : 'password'" class="form__input" @keyup:enter="loginInHandle" />
        <span v-if="v$.password?.$error" class="error">
          <span v-if="v$.password?.required?.$invalid">Password is required</span>
          <span v-else-if="v$.password?.minLength?.$invalid">Password must be at least 6 characters</span>
        </span>
        <InputBase v-if="!isLoginVariant" v-model="formData.passwordRepeat" placeholder="Password (Repeat)" :type="formData.isShowPassword ? 'text' : 'password'" class="form__input" @keyup:enter="registerHandle" />
        <span v-if="v$.passwordRepeat?.$error" class="error">
          <span v-if="v$.passwordRepeat?.required?.$invalid">Password (repeat) is required</span>
          <span v-else-if="v$.passwordRepeat?.sameAsPassword?.$invalid">Passwords do not match</span>
        </span>

        <CheckboxBase v-model="formData.isShowPassword" label="Show Password" />

        <ButtonBaseWithIcon v-if="isLoginVariant"
          text="Login"
          @click="formActionHandler('login')"
          class="auth-button"
        />
        <ButtonBaseWithIcon v-else
          text="Register"
          class="auth-button"
          @click="formActionHandler('register')"
        />

        <div class="auth-form__separator">
          <span></span>
          <span>or</span>
          <span></span>
        </div>

        <ButtonBaseWithIcon
          icon="/images/google.svg"
          text="Continue with Google"
          class="btn__google"
          @click="formActionHandler('google')"
        />
        <ButtonBaseWithIcon
          icon="/images/facebook.svg"
          text="Continue with Facebook"
          class="btn__facebook"
          @click="formActionHandler('facebook')"
        />
        <ButtonBaseWithIcon
          icon="/images/telegram.svg"
          text="Continue with Telegram"
          class="btn__telegram"
          @click="formActionHandler('telegram')"
        />
      </div>

      <div class="auth-form__footer">
        <ul v-if="isLoginVariant">
          <li @click="formActionHandler('forgot_password')">Forgot password?</li>
          <li @click="formActionHandler('to_sign_up')">Want to sign up?</li>
        </ul>
        <ul v-else>
          <li @click="formActionHandler('contact_us')">Need help? Contact us</li>
          <li @click="formActionHandler('to_sign_in')">Want to sign login?</li>
        </ul>
      </div>

      <p v-if="isLoginVariant"
        class="auth-form__bottom--text text-center mt-30"
        @click="formActionHandler('contact_us')"
      >
        Need help? Contact us
      </p>
    </div>

  </div>
</template>

<style scoped lang='scss'>
  .auth-form {
    --border-radius-form: 8px;

    border-radius: var(--border-radius-main);
    box-shadow: var(--box-shadow-main);
    background: linear-gradient(180deg,#FFEC1C 0%, #FFE432 100%);
    max-width: 600px;
    margin: 0 auto;
    padding: 10px 20px;
    min-height: 100%;
    position: relative;
    z-index: 1;

    &__wrapper {
      // display: flex;
      // flex-direction: column;
      // gap: 10px;
      // max-width: 350px;
      // margin: 0 auto;
    }

    &__header {
      margin-bottom: 30px;

      h3 {
        font-size: 32px;
        text-align: center;
        font-weight: var(--font-weight-light);
      }
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__separator {
      display: flex;
      align-items: center;
      gap: 10px;
      // margin: 20px 0;

      & span:first-child,
      & span:last-child {
        width: 50%;
        height: 1px;
        background: #000;
      }
    }

    &__footer {
      border-top: 1px solid #000;
      // max-width: 350px;
      margin: 20px 0;
      padding: 10px;
      display: flex;
      justify-content: space-around;

      ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        font-family: "Cabin", sans-serif;
        font-size: 12px;
        font-style: italic;
        text-decoration: underline;
        width: 100%;

        li {
          text-align: center;
          position: relative;
          cursor: pointer;

          &:first-child::after {
            content: '';
            position: absolute;
            right: 0;
            top: -5px;
            height: 40px;
            width: 1px;
            background: #fff;
          }
        }
      }
    }

    &__bottom--text {
      font-family: "Cabin", sans-serif;
      font-size: 20px;
      font-weight: var(--font-weight-bold);
      font-style: italic;
      text-decoration: underline;
      margin: 20px 0;
      cursor: pointer;
    }

    .auth-button {
      background: var(--btn-bg-color);
      // border-radius: var(--border-radius-form);
      border: 1px solid var(--btn-border-color);

      &:hover {
        background: var(--btn-bg-color-active);
      }
    }

    .form__input {
      border-radius: var(--border-radius-form);
    }

    .btn__google {
      border-radius: var(--border-radius-form);
      background: #fff;
      border: 1px solid #000;
    }

    .btn__facebook {
      border-radius: var(--border-radius-form);
      background: #1877F2;
      color: #fff;
      border: 1px solid #1877F2;
    }

    .btn__telegram {
      border-radius: var(--border-radius-form);
      background: #26A4E2;
      color: #fff;
      border: 1px solid #26A4E2;
    }

    .error {
      font-size: 12px;
      color: red;
      margin-top: -6px;
      margin-bottom: 6px;
    }
  }
</style>
