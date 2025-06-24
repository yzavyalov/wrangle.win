<script setup>
import TruncateText from '@/components/details/TruncateText.vue';
import { getBetStatus } from '@/helpers/getBetStatus';

defineOptions({ name: "BetItemSmall" })

const props = defineProps({
  item: { type: Object, required: true },
})

const emit = defineEmits(['delete', 'detail'])

</script>

<template>
  <div class="bet-small">
    <div class="bet-small__left cursor-pointer" @click.stop.prevent="emit('delete', item)">
      <img :src="'/images/trash.svg'" alt="delete">
    </div>

    <div class="bet-small__main">
      <TruncateText :text="item?.title" />
    </div>

    <div class="bet-small__right cursor-pointer" @click.stop.prevent="emit('detail', item)">
      {{ getBetStatus(item?.status) }}
    </div>
  </div>
</template>

<style scoped lang='scss'>
  .bet-small {
    background: var(--btn-bg-color);
    box-shadow: var(--box-shadow-main);
    border-radius: 30px;
    height: 60px;
    display: grid;
    grid-template-columns: 55px 1fr 70px;
    overflow: hidden;

    &__left {
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);

      img {
        width: 100%;
        max-width: 25px;
        max-height: 25px;
      }
    }

    &__main {
      padding: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    &__right {
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.25);
      padding: 3px;
      font-size: 14px;
    }
  }
</style>
