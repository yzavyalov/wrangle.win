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


</script>

<template>
  <Head title="Register" />

  <div>
    register page
  </div>
</template>

<style scoped lang='scss'>

</style>
