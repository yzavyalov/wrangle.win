<script setup>
import { onMounted, reactive } from "vue";
import PageWrapperMain from "@/components/PageWrapperMain.vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import PageCloudDecorator from '@/components/details/PageCloudDecorator.vue';
import { getTimeLeft } from '@/helpers/getTimeLeft';
import { predictionDemoData } from '@/utils/dummyData';
import BetOptionItem from "@/components/details/BetOptionItem.vue"

const props = defineProps({
  item: { type: Object, required: true, default: predictionDemoData }, // todo: remove demo data
})


onMounted(() => {
  console.log(props.item, 'props.item - onMounted');
})

</script>

<template>
  <div class="p-item__wrapper">
    <div class="p-item__details">
      <div class="p-item__content">
        <div class="p-item__details--header">
          <div v-if="item.isHot" class="p-item__details--hot">#HOT!</div>
        </div>

        <div class="p-item__details--main">
          <h2 class="p-item__details--title">{{ item.title }}</h2>
          <p class="p-item__details--text">Description:</p>
          <p class="p-item__details--text" >{{ item.description }}</p>

          <div class="p-item__details--body">
            <ul class="p-item__details--info">
              <p class="color-red"><b>Time left: {{ getTimeLeft(item.date) }}</b></p>
              <li><p>Bet amount: <b>{{ item.betAmount }}</b></p></li>
              <li><p>Total bets: <b>{{ item.totalBets }}</b></p></li>
              <li><p>Max. profit from 1€: <b>{{ item.maxProfitPer1Euro }}</b></p></li>
            </ul>

            <ul class="p-item__details--info">
              <p><b>Tags:</b></p>
              <li v-for="(tag, index) in item.tags" :key="index">{{ tag }}</li>
            </ul>
          </div>

          <ButtonBase class="p-item__details--btn">Sources:</ButtonBase>
        </div>
      </div>
    </div>

    <div class="p-item__options">
      <div class="p-item__content">
        <h4 class="p-item__options--title">Make a prediction</h4>
        <div class="p-item__options--wallet">
          <p class="coin-decorator">
            Your Wallet: <b>{{ predictionDemoData.wallet }}</b>
          </p>
          <div class="p-item__options--input">
            <span class="text-right font-italic">Amount:</span>
            <input class="text-right" type="number" min="0" step="1">
          </div>
        </div>
        <h4 class="p-item__options--title">Сhoose option</h4>

        <BetOptionItem v-for="(item, index) in predictionDemoData.options"
          :key="index"
          :option="item"
          class="mb-10"
        />

      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.p-item {

  .color-red {
    color: var(--text-color-red);
  }

  &__wrapper {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    overflow: hidden;
    border-radius: var(--border-radius-main);

    @media screen and (max-width: 720px) {
      grid-template-columns: repeat(1, 100%);
    }
  }

  &__content {
    position: relative;
    z-index: 1;
  }

  &__details {
    padding-bottom: 80px;
    background: var(--btn-bg-color);

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
}
</style>
