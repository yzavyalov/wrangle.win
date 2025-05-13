<script setup>
import { computed } from 'vue';
import PageCloudDecorator from '@/components/details/PageCloudDecorator.vue';
import ButtonBase from '@/components/details/ButtonBase.vue';
import { navigateTo } from '@/helpers/navigate';
import { PAGE_ROUTES } from '@/utils/datasets';

const props = defineProps({
  title: { type: String, default: 'page title' },
  lastUpdated: { type: String, default: 'last updated' },
  text: { type: String, default: 'page text' },

  showDecorator: { type: Boolean, default: true },
})

const padding = computed(() => props.padding + 'px');

</script>

<template>
  <div class="page">
    <div class="page__wrapper">

      <div class="page__header">
        <slot name="header">
          <h2>{{ title }}</h2>
          <p>{{ lastUpdated }}</p>
        </slot>
      </div>

      <slot>
        <div class="page__body" v-html="text"></div>
      </slot>

      <slot name="footer">
        <div class="page__footer">
          <ButtonBase class="page__btn" @click="navigateTo(PAGE_ROUTES.HOME)">To main page</ButtonBase>
        </div>
      </slot>
    </div>

    <PageCloudDecorator v-if="showDecorator" />
  </div>
</template>

<style scoped lang='scss'>
  .page {
    position: relative;

    --header-height: 150px;

    &__wrapper {
      max-width: 1000px;
      margin: 20px auto 0 auto;
      background: linear-gradient(to bottom,
        rgb(255 255 255 / 62%) 0%,
        rgb(255 255 255 / 62%) 100px,
        rgb(255 228 50 / 100) var(--header-height),
        rgb(255 228 50 / 100) 300px,
        rgb(255 255 255 / 100) 100%
      );
      background-size: contain;
      background-position: center;
      border-radius: var(--border-radius-main);
      height: 100%;
      min-height: 700px;
      padding: 10px 20px;
    }

    &__header {
      position: relative;
      z-index: 1;
      height: var(--header-height);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 50px;
    }

    &__body {
      position: relative;
      z-index: 1;
      margin-bottom: 50px;

      p,
      li,
      ul,
      :deep(p) {
        // margin-bottom: 20px;
        font-size: 16px;
        line-height: 20px;
        font-weight: var(--font-weight-light);
      }
    }

    &__footer {
      position: relative;
      z-index: 1;
    }

    & &__btn {
      margin: 0 auto;
      padding: 5px 30px;
    }

    h2 {
      font-size: 32px;
      font-weight: var(--font-weight-light);
    }
  }
</style>
