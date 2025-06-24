<script setup>
import { computed } from 'vue';
import ModalConfirm from '@/components/modals/ModalConfirm.vue';
import ButtonBaseWithIcon from "@/components/details/ButtonBaseWithIcon.vue";
import { triggerCloseModal, triggerOpenNewModal } from '@/composables/useModalsTriggers';
// import { triggerCloseModal } from "@/composables";
import { navigateTo } from '@/helpers/navigate';
import { PAGE_ROUTES } from '@/utils/datasets';
import { nextTick } from 'vue';
import { useUserStore } from "@/store/user";
import { getCurrency } from '@/helpers/getCurrency';

defineOptions({ name: "ProposePopUpBalance" })

const currentUser = computed(() => useUserStore().getUser);
const userBalance = computed(() => Number(currentUser.value?.balance?.balance || 0)?.toFixed(2) || 0);

const currencyName = getCurrency();

const modelTitle = 'Attention !';
const modalText = `
<p>To perform this action, you need to pop up your balance.</p>
<p>Current balance: <b>${userBalance.value}${currencyName}</b></p>
`;

const popupHandler = async () => {
  console.log('popupHandler');
  console.warn("NO LOGIC YET");
  notifyWarning("NO LOGIC YET");
}

</script>

<template>
  <div>
    <ModalConfirm :text="modalText" :title="modelTitle" @cancel="triggerCloseModal">

      <template #footer>
        <ButtonBaseWithIcon text="Pop up balance" @click.stop.prevent="popupHandler" />
        <ButtonBaseWithIcon text="Cancel" @click.stop.prevent="triggerCloseModal" />
      </template>
    </ModalConfirm>
  </div>
</template>

<style scoped lang='scss'>

</style>
