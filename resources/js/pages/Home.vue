<script setup>
import WelcomeSection from '@/components/WelcomeSection.vue';
import ActiveEventsSection from '@/components/ActiveEventsSection.vue';
import { Head } from "@inertiajs/vue3";
import { onBeforeUnmount } from 'vue';
import { useFilters } from '@/composables/useFilters';

import BaseLayout from "@/layouts/BaseLayout.vue";

defineOptions({
  name: "Home",
  layout: (h, page) => h(BaseLayout, () => [page]),
});

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
