<script setup>
import { onMounted, onUnmounted } from "vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import ButtonBurger from "@/components/details/ButtonBurger.vue"
import { toggleBodyScroll } from "@/helpers/toggleBodyScroll";

defineOptions({
  name: "SideBar"
})

const props = defineProps({
  links: { type: Array, required: true, default: () => [] },
})

const emit = defineEmits(["close", "item:click"]);

const emitClose = () => emit("close");

onMounted(() => {
  toggleBodyScroll(true);
});

onUnmounted(() => {
  toggleBodyScroll(false);
});

</script>

<template>
  <div class="sidebar" v-click-outside="() => emitClose" >
    <ButtonBurger @click="emitClose" />

    <ul class="sidebar__list">
      <li v-for="item in links" :key="item.id" class="sidebar__listitem">
        <ButtonBase class="sidebar__item" @click.stop.prevent="emit('item:click', item)">
          {{ item.name }}
        </ButtonBase>
      </li>
    </ul>
  </div>
</template>

<style scoped lang='scss'>

.sidebar {
  position: absolute;
  border-radius: var(--border-radius-main);
  z-index: 2;
  box-shadow: var(--box-shadow-main);
  background: linear-gradient(0deg, #EADCDC 0%, #EADCDC 60%, #ffec6d83 100%), linear-gradient(0deg, #EADCDC 0%, #EADCDC 100%),;
  padding: 15px;
  min-width: 260px;

  top: 0;
  left: 0;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 30px;
  }

  // &__listitem:last-child {
  //   margin-top: 50px;
  // }

  &__item {
    display: flex;
    width: 100%;
  }
}
</style>
