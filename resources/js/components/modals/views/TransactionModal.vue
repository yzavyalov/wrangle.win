<script setup>
import { onMounted, computed, onBeforeUnmount } from 'vue';
import { triggerCloseModal } from '@/composables/useModalsTriggers';
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import { useModalsStore } from '@/store/modals';

defineOptions({ name: "TransactionModal" })

const modalContent = computed(() => useModalsStore().getModalContent);

// onMounted(() => {
//   console.log(modalContent.value, 'modalContent');
// })

onBeforeUnmount(() => {
  useModalsStore().clearModalContent();
})
</script>

<template>
  <div class="tranzaction-modal__wrapper">
    <div class="tranzaction-modal">
      <ButtonWithIcon icon="/images/cross.svg" class="tranzaction-modal__close" @click.stop.prevent="triggerCloseModal" />

      <div class="tranzaction-modal__header">
        <h3 class="tranzaction-modal__title">WRANGLER.WIN</h3>
        <h3 class="tranzaction-modal__title">Transaction details</h3>
      </div>

      <div v-if="modalContent?.transactionMessage" class="tranzaction-modal__body">
        <div v-html="modalContent.transactionMessage"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.tranzaction-modal {
  position: relative;
  background: var(--bg-color-secondary);
  padding: 20px 40px 10px 40px;
  border-radius: var(--border-radius-main);
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
  font-weight: var(--font-weight-light);
  position: relative;
  max-width: 1000px;

  &__wrapper {
    position: relative;
    max-width: 1440px;
  }

  &__header {
    margin-bottom: 20px;

    h3, h4 {
      text-align: center;
      margin-bottom: 10px;
    }
  }

  &__body {
    position: relative;
  }

  &__close {
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 5px;
    padding: 0px;
    width: 20px;
    height: 20px;
    z-index: 1;
  }
}
</style>
