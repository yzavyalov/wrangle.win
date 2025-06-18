<script setup>
import { Head } from "@inertiajs/vue3";
import { ref, onBeforeUnmount } from "vue";
import WelcomeSection from '@/components/WelcomeSection.vue';
import TopEventsSection from '@/components/TopEventsSection.vue';
import ActiveEventsSection from '@/components/ActiveEventsSection.vue';
import CategoriesSection from "@/components/CategoriesSection.vue";
import { useFilters } from '@/composables/useFilters';
import BaseLayout from "@/layouts/BaseLayout.vue";

defineOptions({
  name: "Categories",
  layout: (h, page) => h(BaseLayout, () => [page]),
})

const items = ref([]);

onBeforeUnmount(() => {
  useFilters().resetFilters();
})
</script>

<template>
  <Head title="Categories" />

  <CategoriesSection />

  <ActiveEventsSection :is-show-filters="true" />

</template>

<style scoped lang='scss'>

</style>
