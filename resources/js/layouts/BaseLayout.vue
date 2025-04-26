<script setup>
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from '@/components/FooterSection.vue';
import ModalBase from '@/components/modals/ModalBase.vue';
import { useModals } from '@/composables';

const { modals } = useModals({ isLayout: true });

</script>

<template>
  <div class="base-layout">

    <div class="base-layout__content">
      <div class="container">
        <HeaderSection />

        <slot></slot>

      </div>
    </div>

    <div class="modals__container">
      <Transition-group name="modal">
        <ModalBase v-for="(modal, index) in modals"
          :key="modal + '_' + index"
          :idx="index"
        />
      </Transition-group>
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
