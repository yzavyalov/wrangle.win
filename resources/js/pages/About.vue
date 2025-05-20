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
import PageWrapperText from "@/components/PageWrapperText.vue";

const pageTitle = "About";
const lastUpdated = "Last Updated: 07.05.2025";
const pageText = `
<div>
  <p style="margin-bottom: 20px;">
  Our team is a community of seasoned professionals with over 10 years of experience in online business.
  We bring together expertise in development, finance, and the gaming industry.
  Today, we are excited to launch WRANGLE.WIN — a platform that allows anyone to create their own disputes, place bets, and earn revenue.
  </p>

  <p style="margin-bottom: 20px;">
  Our goal is to build the first true marketplace for bets, where enthusiasts can engage in disputes with confidence, knowing the platform is built on transparency and fairness. We are also working on introducing professional betting options for more advanced users.
  At the same time, we are committed to promoting responsible spending.
  </p>

  <p style="margin-bottom: 20px;">
  That’s why we partner with <a href="https://iafs.info/ludo-system" alt="Ludo system">https://iafs.info/ludo-system</a>, a platform where individuals struggling with gambling addiction can register themselves to limit their spending and take back control.
   </p>
</div>
`;
</script>

<template>
  <Head :title="pageTitle" />

  <PageWrapperText
    :title="pageTitle"
    :last-updated="lastUpdated"
    :text="pageText"
  />
</template>

<style scoped lang='scss'>

</style>
