<script setup>
import ModalConfirm from '@/components/modals/ModalConfirm.vue';
import ButtonBaseWithIcon from "@/components/details/ButtonBaseWithIcon.vue";
import { triggerCloseModal } from '@/composables/useModalsTriggers';
import { navigateTo } from '@/helpers/navigate';
import { PAGE_ROUTES } from '@/utils/datasets';
import { nextTick } from 'vue';

const modelTitle = 'Attention !';
const modalText = 'To perform this action, you need to pop up your balance';

const popupHandler = () => {
  console.log('popupHandler');
  console.warn("NO LOGIC YET");
}

</script>

<template>
  <div>
    <ModalConfirm :text="modalText" :title="modelTitle" @cancel="triggerCloseModal">

      <template #footer>
        <ButtonBaseWithIcon text="Pop up balance" @click="popupHandler" />
        <ButtonBaseWithIcon text="Cancel" @click="triggerCloseModal" />
      </template>
    </ModalConfirm>
  </div>
</template>

<style scoped lang='scss'>

</style>
