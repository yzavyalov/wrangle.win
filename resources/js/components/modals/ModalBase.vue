<script setup>
import { ref, computed, onMounted, onBeforeUnmount, reactive, watch, inject, onBeforeMount, onUnmounted } from "vue";
import { getModalComponent } from "@/composables/useModalComponets";
import { useModalsStore } from "@/store/modals";
import { triggerCloseModal } from "@/composables";
import { toggleBodyScroll } from "@/helpers/toggleBodyScroll";
import { useMagicKeys } from "@vueuse/core";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";


const props = defineProps({
  idx: { type: Number || undefined, default: undefined, },
});

const magicKeys = useMagicKeys();
const ESCAPE_KEY = magicKeys["Escape"];

const modals = computed(() => useModalsStore().modals);

const modalName = computed(() => {
  if (props.idx === undefined || !modals.value?.length) {
    return;
  }

  return modals.value[props.idx];
});

const isTopLevelModal = computed(() => props.idx === modals.value.length - 1);

const dynamicModalComponent = computed(() => getModalComponent(modalName));

const closeCurrentModalHandler = () => {
  triggerCloseModal(modalName.value);
}

watch(
  () => [ ESCAPE_KEY.value ],
  () => {
    isTopLevelModal.value&& ESCAPE_KEY.value && closeCurrentModalHandler();
  }
);

onMounted(() => {
  if (props.idx === 0) {
    toggleBodyScroll(true);
  }
})

onUnmounted(() => {
  if (props.idx === 0) {
    toggleBodyScroll(false);
  }
})

</script>
<template>
  <div class="modal" >
    <ButtonWithIcon :icon="'/images/cross.svg'" class="modal__button" @click="closeCurrentModalHandler" />

    <div class="modal__wrapper">
      <div class="modal__body">
        <component :is="dynamicModalComponent" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.modal {
  position: fixed;
  background: var(--modal-bg-color);
  // backdrop-filter: blur(10px);
  // -webkit-backdrop-filter: blur(10px); /* для Safari */
  // background-color: rgba(255, 255, 255, 0.2); /* напівпрозорий фон */

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;

  &__wrapper {
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
    padding: 20px;
  }

  &__body {
    position: relative;
  }

  &__button {
    position: absolute;
    z-index: 3;
    top: 10px;
    left: 10px;
  }

  &-enter-active,
  &-leave-active {
    opacity: 0;
  }

  &-enter-from,
  &-enter-to {
    opacity: 0;
  }
}
</style>
