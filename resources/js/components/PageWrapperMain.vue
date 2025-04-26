<script setup>
import { computed } from 'vue';
import PageCloudDecorator from '@/components/details/PageCloudDecorator.vue';

const props = defineProps({
  showDecorator: { type: Boolean, default: true },
  padding: { type: String, default: 0 },
})

const padding = computed(() => props.padding + 'px');

</script>

<template>
  <div class="page">
    <div class="page__wrapper">

      <slot></slot>

    </div>

    <PageCloudDecorator v-if="showDecorator" />
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
      padding: v-bind(padding);
      display: flex;
    }
  }
</style>
