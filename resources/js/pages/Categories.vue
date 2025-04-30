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
import { ref } from "vue";
import WelcomeSection from '@/components/WelcomeSection.vue';
import TopEventsSection from '@/components/TopEventsSection.vue';
import ActiveEventsSection from '@/components/ActiveEventsSection.vue';
import CategoriesSection from "@/components/CategoriesSection.vue";

defineOptions({ name: "Categories" })

const items = ref([]);

</script>

<template>
  <Head title="Categories" />

  <CategoriesSection />

  <ActiveEventsSection :items="[]" />

</template>

<style scoped lang='scss'>

</style>
