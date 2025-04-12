<script>
import BaseLayout from "@/layouts/BaseLayout.vue";

export default {
  layout: (h, page) => {
    return h(BaseLayout, () => [page]);
  },
};
</script>


<script setup>
import WelcomeSection from '@/components/WelcomeSection.vue';
import TopEventsSection from '@/components/TopEventsSection.vue';
import ActiveEventsSection from '@/components/ActiveEventsSection.vue';

</script>

<template>
  <WelcomeSection />

  <TopEventsSection />

  <ActiveEventsSection />
</template>

<style scoped lang='scss'>

</style>
