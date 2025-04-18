<script>
import BaseLayout from "@/layouts/BaseLayout.vue";

export default {
  layout: (h, page) => {
    return h(BaseLayout, () => [page]);
  },
};
</script>


<script setup>
import { Head } from "@inertiajs/vue3";
import AuthForm from "@/components/AuthForm.vue";
</script>

<template>
  <Head title="Login" />

  <div class="login-page">
    <div class="login-page__wrapper">
      <AuthForm :is-login-variant="true" />
    </div>

    <div class="background-decorator"></div>

  </div>
</template>

<style scoped lang='scss'>
  .login-page {
    position: relative;

    &__wrapper {
      max-width: 1000px;
      margin: 20px auto 0 auto;
      background: var(--bg-color-secondary) url('/images/logo.svg') no-repeat;
      background-size: contain;
      background-position: center;
      border-radius: var(--border-radius-main);
      height: 100%;
      min-height: 700px;
      padding: 20px;
    }

    .background-decorator {
      position: absolute;
      width: 100vw;
      height: 100%;
      z-index: 0;
      background: url('/images/sky.svg') no-repeat;
      background-position: top;
      background-size: cover;
      bottom: -500px;
      right: 50%;
      transform: translateX(50%);
    }
  }
</style>
