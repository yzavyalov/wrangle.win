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
import WelcomeSection from '@/components/WelcomeSection.vue';
import TopEventsSection from '@/components/TopEventsSection.vue';
import ActiveEventsSection from '@/components/ActiveEventsSection.vue';

defineOptions({ name: "Categories" })

</script>

<template>
  <Head title="Categories" />

  <TopEventsSection />

  <ActiveEventsSection />

</template>

<style scoped lang='scss'>

</style>
