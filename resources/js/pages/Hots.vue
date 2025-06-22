<script setup>
import { Head } from "@inertiajs/vue3";
import { ref, onBeforeUnmount } from "vue";
import TopEventsSection from '@/components/TopEventsSection.vue';
import CategoriesSection from "@/components/CategoriesSection.vue";
import { useFilters } from '@/composables/useFilters';
import BaseLayout from "@/layouts/BaseLayout.vue";

defineOptions({
  name: "Hots",
  layout: (h, page) => h(BaseLayout, () => [page]),
});

const items = ref([]);

onBeforeUnmount(() => {
  useFilters().resetFilters();
})
</script>

<template>
  <Head title="Hots" />

  <CategoriesSection />

  <TopEventsSection :is-show-filters="true" />

</template>

<style scoped lang='scss'>

</style>
