<script setup>
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from '@/components/FooterSection.vue';
import ModalBase from '@/components/modals/ModalBase.vue';
import { useModals } from '@/composables';
import { onMounted } from 'vue';
import { getUserData } from '@/services/user';

const { modals } = useModals({ isLayout: true });

onMounted(() => {
  // fetch user data from server
  getUserData();
})

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
      <transition-group name="modal">
        <ModalBase v-for="(modal, index) in modals"
          :key="modal + '_' + index"
          :idx="index"
        />
      </transition-group>
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
