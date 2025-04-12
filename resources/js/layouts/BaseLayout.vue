<script setup>
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from '@/components/FooterSection.vue';

</script>

<template>
  <div class="base-layout">
    <div class="container">
      <HeaderSection />

      <slot></slot>

    </div>

    <FooterSection class="mt-auto" />
  </div>
</template>

<style scoped lang='scss'>
.base-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .container {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
  }

  .mt-auto {
    margin-top: auto;
  }
}
</style>
