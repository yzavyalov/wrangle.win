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
import ActiveEventsSection from '@/components/ActiveEventsSection.vue';
import { Head } from "@inertiajs/vue3";
import { onBeforeUnmount } from 'vue';
import { useFilters } from '@/composables/useFilters';

onBeforeUnmount(() => {
  useFilters().resetFilters();
})

</script>

<template>
  <Head title="Home" />

  <WelcomeSection />

  <ActiveEventsSection :is-show-filters="true"  />
</template>

<style scoped lang='scss'>

</style>
