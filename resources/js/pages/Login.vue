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
import LoginSection from "@/components/LoginSection.vue";
</script>

<template>
  <Head title="Login" />

  <div class="login-page">

  </div>
</template>

<style scoped lang='scss'>
  .login-page {
    &__wrapper {

    }
  }
</style>
