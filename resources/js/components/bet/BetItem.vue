<script setup>
import { onMounted, reactive, computed, ref } from "vue";
// import PageWrapperMain from "@/components/PageWrapperMain.vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
// import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
// import PageCloudDecorator from '@/components/details/PageCloudDecorator.vue';
// import { predictionDemoData } from '@/utils/dummyData';
import BetOptionItem from "@/components/details/BetOptionItem.vue"
import { getTimeLeft, getDaysLeft } from '@/helpers/getTimeLeft';
import { getCurrency } from '@/helpers/getCurrency';
import { useUserStore } from "@/store/user";
import { useBets } from '@/composables/useBets';
import EventCardFavoriteBar from '@/components/details/EventCardFavoriteBar.vue';

const props = defineProps({
  item: { type: Object, required: true },
})

const { makeNewBit } = useBets();

const isShowSorces = ref(false);

const betAmount = ref(0);

const dynamicHot = computed(() => getDaysLeft(props.item.finish) <= 1);
const currentUser = computed(() => useUserStore().getUser);
const userBalance = computed(() => Number(currentUser.value?.balance?.balance || 0)?.toFixed(2));

const currencyName = getCurrency();
const biggestProfit = computed(() => {
  if (!props.item.answers.length) return 0.00;
  return Math.max(...props.item.answers.map(item => item.profit)).toFixed(2)
});

const toggleIsShowSorces = () => {
  isShowSorces.value = !isShowSorces.value;
}

onMounted(() => {
  console.log(props.item, 'props.item - onMounted');
})

</script>

<template>
  <div class="p-item__wrapper">
    <div class="p-item__details">
      <EventCardFavoriteBar class="p-item__details--favorite" :item="item" p-item__details--favorite />

      <div class="p-item__content">
        <div class="p-item__details--header">
          <div v-if="dynamicHot" class="p-item__details--hot">#HOT!</div>
        </div>

        <div class="p-item__details--main">
          <h2 class="p-item__details--title">{{ item.title }}</h2>
          <p class="p-item__details--text">Description:</p>
          <p class="p-item__details--text" >{{ item.description }}</p>

          <div class="p-item__details--body">
            <ul class="p-item__details--info">
              <p class="color-red"><b>Time left: {{ getTimeLeft(item.finish) }}</b></p>
              <li><p>Bet amount: <b>{{ item.betAmount || '--:--' }}</b></p></li>
              <li><p>Total bets: <b>{{ item.budget }}{{ currencyName }}</b></p></li>
              <li><p>Max. profit from 1€: <b>{{ biggestProfit }}{{ currencyName }}</b></p></li>
            </ul>

            <ul v-if="item.tags" class="p-item__details--info">
              <p><b>Tags:</b></p>
              <li v-for="(tag, index) in item.tags" :key="index">{{ tag }}</li>
            </ul>
            <ul v-else class="p-item__details--info">
              <p><b>No tags...</b></p>
            </ul>
          </div>

          <ButtonBase class="p-item__details--btn" :is-active="isShowSorces" @click="toggleIsShowSorces">Sources</ButtonBase>

          <transition name="fade">
            <ul v-if="isShowSorces">
              <li v-if="item.source1">1: {{ item.source1 }}</li>
              <li v-if="item.source2">2: {{ item.source2 }}</li>
              <li v-if="item.source3">3: {{ item.source3 }}</li>
              <li v-else>No sources...</li>
            </ul>
          </transition>
        </div>
      </div>
    </div>

    <div class="p-item__options">
      <div class="p-item__content">
        <h4 class="p-item__options--title">Make a prediction</h4>
        <div class="p-item__options--wallet">
          <p class="coin-decorator">
            Your Wallet: <b>{{ userBalance }}{{ currencyName }}</b>
          </p>
          <div class="p-item__options--input">
            <span class="text-right font-italic">Amount:</span>
            <!-- <input v-model="betAmount" class="text-right" type="number" min="0" step="1"> -->
            <input v-model="betAmount"
              class="text-right"
              type="number"
              :min="1"
              :step="0.01"
            >
          </div>
        </div>
        <h4 class="p-item__options--title">Сhoose option</h4>

        <BetOptionItem v-for="(item, index) in item.answers"
          :key="index"
          :option="item"
          class="mb-10"
          @click="makeNewBit(item)"
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
    width: 100%;
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
    position: relative;
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
      margin-bottom: auto;

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

    &--favorite {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 2;
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
