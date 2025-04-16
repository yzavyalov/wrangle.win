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
import PageWrapperMain from "@/components/PageWrapperMain.vue";

</script>

<template>
  <Head title="New bet" />

  <PageWrapperMain>

    <p>NewBet - dummy data</p>
  </PageWrapperMain>

</template>

<style scoped lang='scss'>

</style>
