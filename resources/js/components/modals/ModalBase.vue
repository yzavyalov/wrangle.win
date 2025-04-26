<script setup>
import { ref, computed, onMounted, onBeforeUnmount, reactive, watch, inject, onBeforeMount, onUnmounted } from "vue";
import { getModalComponent } from "@/composables/useModalComponets";
import { useModalsStore } from "@/store/modals";
import { triggerCloseModal } from "@/composables";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import { addClass, removeClass, select } from "@/helpers/domHelpers";

const props = defineProps({
  idx: { type: Number || undefined, default: undefined, },
});

const modals = computed(() => useModalsStore().modals);

const modalName = computed(() => {
  if (props.idx === undefined || !modals.value?.length) {
    return;
  }

  return modals.value[props.idx];
});

const dynamicModalComponent = computed(() => getModalComponent(modalName));

const closeCurrentModalHandler = () => {
  triggerCloseModal(modalName.value);
}

onMounted(() => {
  if (props.idx === 0) {
    addClass(select("html"), "stop-scrolling");
  }
})

onUnmounted(() => {
  if (props.idx === 0) {
    removeClass(select("html"), "stop-scrolling");
  }
})

</script>
<template>
  <div class="modal">
    <ButtonWithIcon :icon="'/images/arrow-left.svg'" class="modal__button" @click="closeCurrentModalHandler" />

    <div class="modal__wrapper">
      <div class="modal__body" v-click-outside="() => closeCurrentModalHandler()">
        <component :is="dynamicModalComponent" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.modal {
  position: fixed;
  background: var(--modal-bg-color);
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
    padding: 60px 10px;
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
