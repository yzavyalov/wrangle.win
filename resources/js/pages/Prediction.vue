<script>
import BaseLayout from "@/layouts/BaseLayout.vue";

export default {
  layout: (h, page) => {
    return h(BaseLayout, () => [page]);
  },
};
</script>


<script setup>
import { Head } from "@inertiajs/vue3";
import PageWrapperMain from "@/components/PageWrapperMain.vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import PageCloudDecorator from '@/components/details/PageCloudDecorator.vue';
import { getTimeLeft } from '@/helpers/getTimeLeft';
import { predictionDemoData } from '@/utils/dummyData';


</script>

<template>
  <Head title="Prediction" />

  <PageWrapperMain class="prediction">
    <div class="prediction__wrapper">
      <div class="prediction__details">
        <div class="prediction__content">
          <div class="prediction__details--header">
            <div class="prediction__details--hot">#HOT!</div>
          </div>

          <div class="prediction__details--main">
            <h2 class="prediction__details--title">{{ predictionDemoData.title }}</h2>
            <p class="prediction__details--text" v-for="(desc, index) in predictionDemoData.description" :key="index">{{ desc }}</p>

            <div class="prediction__details--body">
              <ul class="prediction__details--info">
                <p class="color-red"><b>Time left: {{ getTimeLeft(predictionDemoData.date) }}</b></p>
                <li><p>Bet amount: <b>{{ predictionDemoData.betAmount }}</b></p></li>
                <li><p>Total bets: <b>{{ predictionDemoData.totalBets }}</b></p></li>
                <li><p>Max. profit from 1€: <b>{{ predictionDemoData.maxProfitPer1Euro }}</b></p></li>
              </ul>

              <ul class="prediction__details--info">
                <p><b>Tags:</b></p>
                <li v-for="(tag, index) in predictionDemoData.tags" :key="index">{{ tag }}</li>
              </ul>
            </div>

            <ButtonBase class="prediction__details--btn">Sources:</ButtonBase>
          </div>
        </div>
      </div>

      <div class="prediction__options">
        <div class="prediction__content">
          <h4 class="prediction__options--title">Make a prediction</h4>
          <div class="prediction__options--wallet">
            <p class="coin-decorator">
              Your Wallet: <b>{{ predictionDemoData.wallet }}</b>
            </p>
            <div class="prediction__options--input">
              <span class="text-right font-italic">Amount:</span>
              <input class="text-right" type="number" min="0" step="1">
            </div>
          </div>
          <h4 class="prediction__options--title">Сhoose option</h4>

          <div v-for="(option, index) in predictionDemoData.options"
            :key="index"
            class="prediction__option"
          >
            <p>
              <span><b>{{ option.percent }}</b> thinks so:</span>
              <span>Possible profit from 1€: <b>{{ option.profit }}</b></span>
            </p>
            <ButtonBase>{{ option.text }}</ButtonBase>
          </div>
        </div>
      </div>
    </div>

    <div class="prediction__footer">
      <ButtonWithIcon :icon="'/images/arrow-left.svg'" />
      <ButtonBase>To other Events</ButtonBase>
      <ButtonWithIcon :icon="'/images/arrow-right.svg'" />
    </div>

    <PageCloudDecorator />
  </PageWrapperMain>

</template>

<style scoped lang='scss'>
  .prediction {

    &:deep(.page__wrapper) {
      padding: 0;
      display: flex;
    }

    &__wrapper {
      display: grid;
      grid-template-columns: repeat(2, 50%);
      overflow: hidden;
      border-radius: var(--border-radius-main);
    }

    &__content {
      position: relative;
      z-index: 1;
    }

    &__details {
      padding-bottom: 80px;

      &--header {
        position: relative;
        height: 250px;
        background: linear-gradient(180deg,#ffec1c00 0%, #ffe4323b 86%, #FFE432 100%), url('https://picsum.photos/500/300?random=2') no-repeat top / cover;
      }

      &--main {
        padding: 10px;
      }

      &--hot {
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px 20px;
        font-family: "Racing Sans One", sans-serif;
        font-style: normal;
        font-size: 36px;
        line-height: 25px;
        color: black;
        background: #ffe432c7;
      }

      &--title {
        font-size: 32px;
        font-weight: var(--font-weight-light);
      }

      &--text {
        font-size: 16px;
        font-weight: var(--font-weight-light);
      }

      &--body {
        display: flex;
        justify-content: space-between;
      }

      &--info {
        font-size: 20px;
        margin-top: 10px;

        &:last-child {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }

      &--btn {
        margin: 20px auto;
        min-width: 100px;
      }
    }

    &__options {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 40px 0 40px;
      background: #FFF6BE;;
      padding-bottom: 80px;

      &--title {
        font-size: 32px;
        font-weight: var(--font-weight-light);
        margin: 15px 0;
        text-align: center;
      }

      &--wallet {
        display: grid;
        grid-template-columns: 50% 50%;
        align-items: center;
        width: 100%;
        font-size: 20px;
        padding-top: 25px;
      }

      &--input {
        position: relative;
        span {
          position: absolute;
          right: 0;
          top: -25px;
          font-weight: var(--font-weight-light);
        }

        input {
          display: block;
          min-height: 45px;
          max-width: 80%;
          padding: 5px 15px;
          border: 1px solid black;
          border-radius: var(--border-radius-main);
          background-color: var(--btn-bg-color);
          margin-left: auto;
        }
      }
    }

    &__option {
      margin-bottom: 10px;
      width: 100%;

      p {
        display: flex;
        justify-content: space-between;
      }

      span {
        font-size: 13px;
      }

      :deep(.button) {
        width: 100%;
        border: 1px solid black;
      }
    }

    &__footer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      position: absolute;
      z-index: 1;
      bottom: 20px;
      right: 50%;
      transform: translateX(50%);
    }

    .color-red {
      color: var(--text-color-red);
    }
  }
</style>
