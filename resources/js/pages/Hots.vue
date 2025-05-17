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
import { ref, onBeforeUnmount } from "vue";
import TopEventsSection from '@/components/TopEventsSection.vue';
import CategoriesSection from "@/components/CategoriesSection.vue";
import { useFilters } from '@/composables/useFilters';

defineOptions({ name: "Hots" })

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
