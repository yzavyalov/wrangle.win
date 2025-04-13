<script setup>
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from '@/components/FooterSection.vue';

</script>

<template>
  <div class="base-layout">

    <div class="base-layout__content">
      <div class="container">
        <HeaderSection />

        <slot></slot>

      </div>
    </div>

    <FooterSection />
  </div>
</template>

<style scoped lang='scss'>
.base-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .container {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
