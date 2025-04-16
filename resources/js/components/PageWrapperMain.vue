<script setup>
import PageCloudDecorator from '@/components/details/PageCloudDecorator.vue';
</script>

<template>
  <div class="page">
    <div class="page__wrapper">

      <slot></slot>

    </div>

    <!-- <div class="page__decorator"></div> -->
    <PageCloudDecorator />
  </div>
</template>

<style scoped lang='scss'>
  .page {
    position: relative;

    &__wrapper {
      max-width: 1000px;
      margin: 20px auto 0 auto;
      background: var(--bg-color-secondary);
      background-size: contain;
      background-position: center;
      border-radius: var(--border-radius-main);
      height: 100%;
      min-height: 700px;
      padding: 20px;
    }

    &__decorator {
      position: absolute;
      width: 100vw;
      height: 100%;
      z-index: 0;
      background: url('/images/sky.svg') no-repeat;
      background-position: top;
      background-size: cover;
      bottom: -500px;
      right: 50%;
      transform: translateX(50%);
    }
  }
</style>
