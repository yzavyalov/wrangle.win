<script setup>
import ModalConfirm from '@/components/modals/ModalConfirm.vue';
import ButtonBaseWithIcon from "@/components/details/ButtonBaseWithIcon.vue";
import { triggerCloseModal } from '@/composables/useModalsTriggers';
import { navigateTo } from '@/helpers/navigate';
import { PAGE_ROUTES } from '@/utils/datasets';
import { nextTick } from 'vue';

const modelTitle = 'Attention !';
const modalText = 'To perform this action, you need to log in or register';

const handleNavigate = async (url) => {
  navigateTo(url);

  await nextTick(() => window.scrollTo(0, 0));
  triggerCloseModal();
}

</script>

<template>
  <div>
    <ModalConfirm :text="modalText" :title="modelTitle" @cancel="triggerCloseModal">

      <template #footer>
        <ButtonBaseWithIcon text="Login" @click="handleNavigate(PAGE_ROUTES.LOGIN)" />
        <ButtonBaseWithIcon text="Register" @click="handleNavigate(PAGE_ROUTES.REGISTER)" />
      </template>
    </ModalConfirm>
  </div>
</template>

<style scoped lang='scss'>

</style>
