<script setup>
import { Head } from "@inertiajs/vue3";
import PageWrapperMain from "@/components/PageWrapperMain.vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import { navigateTo } from '@/helpers/navigate';
import { PAGE_ROUTES } from '@/utils/datasets';
import BaseLayout from "@/layouts/BaseLayout.vue";

defineOptions({
  name: "Page404",
  layout: (h, page) => h(BaseLayout, () => [page]),
});

</script>

<template>
  <Head title="404" />

  <PageWrapperMain class="page-404">
    <div class="page-404__wrapper">
      <h2>Ups... no such page :(</h2>

      <ButtonBase class="page-404__btn" @click="navigateTo(PAGE_ROUTES.HOME)">Home page</ButtonBase>
    </div>
  </PageWrapperMain>
</template>

<style scoped lang='scss'>
.page-404 {
  &__wrapper {
    width: 100%;
    // height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 50px;
    padding: 30px;
    position: relative;
    z-index: 1;

    h2 {
      font-size: 32px;
    }
  }

  &__btn {
    padding: 20px 30px;
  }

  :deep(.page__wrapper) {
    min-height: 500px;
  }
}
</style>
