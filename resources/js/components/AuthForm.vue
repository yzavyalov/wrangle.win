<script setup>
import { reactive } from 'vue';
import InputBase from '@/components/details/InputBase.vue';
import CheckboxBase from '@/components/details/CheckboxBase.vue';
import ButtonBaseWithIcon from '@/components/details/ButtonBaseWithIcon.vue';
import { navigateTo } from '@/helpers/navigate';

const props = defineProps({
  isLoginVariant: { type: Boolean, default: true, },
});

const formData = reactive({
  email: '',
  emailRepeat: '',

  password: '',
  passwordRepeat: '',

  isShowPassword: false,
});

const actionHandler = (action) => {
  console.log(action,  'action - actionHandler');

  switch (action) {
    case 'sign_in':
      navigateTo('/login')
      break;

    case 'sign_up':
      navigateTo('/register')
      break;

    default:
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
        <InputBase v-model="formData.email" :placeholder="'Email address'" type="email" class="form__input" />
        <InputBase v-if="!isLoginVariant" v-model="formData.emailRepeat" :placeholder="'Email address (Repeat)'" type="email" class="form__input mb-20" />

        <InputBase v-model="formData.password" placeholder="Password" :type="formData.isShowPassword ? 'text' : 'password'" class="form__input" />
        <InputBase v-if="!isLoginVariant" v-model="formData.passwordRepeat" placeholder="Password (Repeat)" :type="formData.isShowPassword ? 'text' : 'password'" class="form__input" />

        <CheckboxBase v-model="formData.isShowPassword" label="Show Password" />

        <ButtonBaseWithIcon
          icon="/images/google.svg"
          text="Continue with Google"
          class="btn__google mt-20"
          @click="actionHandler('google')"
        />
        <ButtonBaseWithIcon
          icon="/images/facebook.svg"
          text="Continue with Facebook"
          class="btn__facebook"
          @click="actionHandler('facebook')"
        />
        <ButtonBaseWithIcon
          icon="/images/telegram.svg"
          text="Continue with Telegram"
          class="btn__telegram"
          @click="actionHandler('telegram')"
        />
      </div>

      <div class="auth-form__footer">
        <ul v-if="isLoginVariant">
          <li @click="actionHandler('forgot_password')">Forgot password?</li>
          <li @click="actionHandler('sign_up')">Want to sign up?</li>
        </ul>
        <ul v-else>
          <li @click="actionHandler('contact_us')">Need help? Contact us</li>
          <li @click="actionHandler('sign_in')">Want to sign login?</li>
        </ul>
      </div>

      <p v-if="isLoginVariant"
        class="auth-form__bottom--text text-center mt-30"
        @click="actionHandler('contact_us')"
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
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 350px;
      margin: 0 auto;
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

    &__footer {
      border-top: 1px solid #000;
      max-width: 350px;
      margin: 20px 0;
      padding: 10px;

      ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        font-family: "Cabin", sans-serif;
        font-size: 12px;
        font-style: italic;
        text-decoration: underline;

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
  }
</style>
