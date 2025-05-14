<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { getTimeLeft, getDaysLeft } from '@/helpers/getTimeLeft';
import ButtonBase from "@/components/details/ButtonBase.vue";
import { triggerOpenNewModal } from '@/composables';
import { getCurrency } from '@/helpers/getCurrency';

const props = defineProps({
  item: { type: Object, default: () => ({}) },
})

const maxTextLength = 40;

const shortTitle = computed(() => {
  return props.item.title?.length > maxTextLength
    ? props.item.title.slice(0, maxTextLength) + '...'
    : props.item.title;
});

const dynamicHot = computed(() => {
  // console.log('getDaysLeft - dynamicHot', getDaysLeft(props.item.finish));

  return getDaysLeft(props.item.finish) < 1
});

const currencyName = getCurrency();

const showMoreDetailsHandler = () => {
  triggerOpenNewModal('bet-modal', { 'updateModalContent': { currentBet: props.item } });
};

</script>

<template>
  <div :class="['event-card', { hot: dynamicHot }]">
    <div class="event-card__overlay">
      <div v-if="item.img" class="event-card__overlay--image"
        :style="{
          backgroundImage: `url(${item.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      ></div>

      <div class="event-card__overlay--gradient"></div>
    </div>

    <div class="event-card__body text-light">
      <div class="event-card__body--left">
        <p>{{ shortTitle }}</p>
      </div>

      <div class="event-card__body--right">
        <p v-if="dynamicHot" class="event-card__time text-bold"><span class="hot-text">HOT!</span> Time left: {{ getTimeLeft(item.finish) }}</p>
        <p v-else class="event-card__time text-bold">Time left: {{ getTimeLeft(item.finish) }}</p>

        <p class="event-card__bet">Bet amount: <b class="text-bold">{{ item.budget }}{{ currencyName }}</b></p>
        <p v-if="item.tags?.length" class="event-card__tags">
          <span v-for="tag in item.tags.slice(0, 2)" :key="tag.id || tag">#{{ tag }}</span>
        </p>
        <ButtonBase class="event-card__btn" @click="showMoreDetailsHandler">More Details</ButtonBase>
      </div>

    </div>
  </div>
</template>

<style scoped lang='scss'>
.event-card {
  --card-indent: 5px;

  background: var(--event-card-bg-color);
  box-shadow: var(--box-shadow-main);
  overflow: hidden;
  position: relative;
  height: 177px;

  &__overlay {
    position: absolute;
    top: 0px;
    z-index: 0;
    width: 100%;
    height: 100%;

    &--image {
      position: absolute;
      top: 0;
      left: 0;
      width: 60%;
      height: 100%;
    }

    &--gradient {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, #ffe49239 0%,#FFE492 70%, #FFE492 100%);
    }
  }

  &__body {
    position: relative;
    z-index: 1;
    top: 0px;
    display: grid;
    grid-template-columns: 60% 40%;
    height: 100%;
    font-size: 20px;

    &--left {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 100%;
      padding: var(--card-indent);
      font-size: 32px;
      line-height: 32px;
    }

    &--right {
      text-align: right;
      padding: 36px var(--card-indent) 10px var(--card-indent);
      display: flex;
      flex-direction: column;
      gap: var(--card-indent);
      height: 100%;
    }
  }

  &__time {
    position: absolute;
    right: var(--card-indent);
    top: var(--card-indent);
  }

  &__btn {
    padding: var(--card-indent) 10px;
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
  }

  &.hot &__time {
    border: 1px solid black;
    border-bottom-left-radius: 5px;
    background-color: var(--btn-bg-color);
    top: 0;
    right: 0;
    padding: var(--card-indent) var(--card-indent) 3px var(--card-indent);
    color:  var(--text-color-red);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  &__tags {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }

  .hot-text {
    font-family: "Racing Sans One", sans-serif;
    font-style: normal;
    font-size: 36px;
    line-height: 25px;
    color: black;
  }
}

</style>
