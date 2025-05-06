<script setup>
import { computed, onMounted, ref } from 'vue';
import { getTimeLeft, getDaysLeft } from '@/helpers/getTimeLeft';
import ButtonBase from '@/components/details/ButtonBase.vue';
import { predictionDemoData } from '@/utils/dummyData';
import { useModalsStore } from '@/store/modals';
import BetOptionItem from '@/components/details/BetOptionItem.vue';

const currentBet = computed(() => useModalsStore().getModalContent?.currentBet || predictionDemoData);

const showMore = ref(false);

const maxTextLength = 50;

const shortTitle = computed(() => {
  return currentBet.value.title?.length > maxTextLength
    ? currentBet.value.title.slice(0, maxTextLength) + '...'
    : currentBet.value.title;
});

const dynamicHot = computed(() => getDaysLeft(currentBet.value.finish) <= 1);

const showMoreHandler = () => {
  showMore.value = !showMore.value;
}

onMounted(() => {
  // showMore.value = props.currentBet.showMore;
  console.log(currentBet.value, 'currentBet - onMounted');

});
</script>

<template>
  <div :class="['event-card', { hot: dynamicHot }]">
    <div class="event-card__main">
      <div class="event-card__overlay">
        <div v-if="currentBet.img" class="event-card__overlay--image"
          :style="{
            backgroundImage: `url(${currentBet.img})`,
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
          <p v-if="dynamicHot" class="event-card__time text-bold"><span class="hot-text">HOT!</span> Time left: {{ getTimeLeft(currentBet.finish) }}</p>
          <p v-else class="event-card__time text-bold">Time left: {{ getTimeLeft(currentBet.finish) }}</p>

          <p class="event-card__bet">Bet amount: <b class="text-bold">{{ currentBet.bet || '--:--' }}</b></p>
          <p v-if="currentBet?.tags?.length" class="event-card__tags">
            <span v-for="tag in currentBet.tags" :key="tag?.id || tag">#{{ tag }}</span>
          </p>
        </div>

      </div>
    </div>

    <div class="event-card__details">
      <span>Description:</span>
      <p class="event-card__details--text">{{ currentBet.description }}</p>
    </div>

    <div class="event-card__info">
      <span>Total bets: <b>{{ currentBet.totalBets || '--:--' }}</b></span>
      <span>Maximal profit from 1€: <b>3€</b></span>
    </div>

    <div class="event-card__footer">
      <div class="event-card__footer--wrapper">
        <p class="event-card__footer--text">Your Prediction:</p>
        <!-- uncomment after Api fix -->
        <!-- <BetOptionItem v-for="(item, index) in currentBet.options"
          :key="index"
          :option="item"
          class="mb-10"
        />
        <p v-if="!currentBet.options?.length">No oprtions for prediction</p> -->

        <BetOptionItem v-for="(item, index) in currentBet.answers"
          :key="index"
          :option="item"
          class="event-card__option"
        />
        <p v-if="!predictionDemoData.options?.length">No oprtions for prediction</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.event-card {
  --card-height-main: 177px;
  --card-indent: 5px;


  background: var(--event-card-bg-color);
  box-shadow: var(--box-shadow-main);
  overflow: hidden;
  position: relative;
  min-height: var(--card-height-main);
  height: 100%;
  max-width: 450px;

  &__overlay {
    position: absolute;
    top: 0px;
    z-index: 0;
    width: 100%;
    height: 100%;
    max-height: var(--card-height-main);

    &--image {
      position: absolute;
      top: 0;
      left: 0;
      width: 60%;
      height: 100%;
      max-height: var(--card-height-main);
    }

    &--gradient {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-height: var(--card-height-main);
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
    min-height: var(--card-height-main);
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

  // &__bet {}

  &__tags {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }

  &__btn {
    background-color: var(--btn-bg-color);
    box-shadow: var(--box-shadow-main);
    border-radius: var(--border-radius-main);
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
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  .hot-text {
    font-family: "Racing Sans One", sans-serif;
    font-style: normal;
    font-size: 36px;
    line-height: 25px;
    color: black;
  }

  &__details {
    padding: 15px 5px;
    min-height: 100px;

    &--text {
      font-size: 20px;
      font-weight: var(--font-weight-light);
    }
  }

  &__main {
    min-height: var(--card-height-main);
  }

  &__info {
    background: linear-gradient(180deg, var(--event-card-bg-color) 0%, var(--btn-bg-color-active)30%);
    padding: 20px 10px 10px 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 1;

    & span {
      font-size: 14px;
      font-weight: var(--font-weight-light);
    }

    & span b {
      font-size: 16px;
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: var(--btn-bg-color-active);

    &--wrapper {
      padding: 30px 20px 20px 20px;
    }

    &--text {
      font-size: 20px;
      font-weight: var(--font-weight-light);
      text-align: center;
      margin-bottom: 10px;
    }
  }

  &__option {
    font-style: italic;
    font-weight: var(--font-weight-light);
    margin-bottom: 10px;
  }
}


</style>
