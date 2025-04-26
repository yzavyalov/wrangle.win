<script setup>
import { onMounted, ref } from 'vue';
import { getActualBets } from '@/services/bets';
import EventCard from '@/components/EventCard.vue';
import ButtonBase from '@/components/details/ButtonBase.vue';
import { demoCards } from '@/utils/dummyData';
import { useLoading } from '@/composables';
import VirtualScroller from '@/components/virtualScroller/VirtualScroller.vue';
import GridDemo from '@/components/virtualScroller/GridDemo.vue';
import { triggerOpenNewModal, triggerCloseModal } from '@/composables';

const { isLoading, loadingStart, loadingStop } = useLoading();

const bets = ref([]);

const fetchBets = async () => {
  console.log('fetchBets');

  if (isLoading.value) {return console.warn("Loading, plese wait");}

  try {
    loadingStart();

    const fetchedBets = await getActualBets();
    console.log(fetchedBets, 'fetchedBets - getActualBets');

    // test zone =====================
    // todo: remove dummy code
    if (!fetchedBets.length) {
      const dummyData = demoCards.map((card, idx) => {
        return {
          ...card,
          id: Date.now() + '_' + idx,
        }
      });
      bets.value = [...bets.value, ...dummyData]
      console.log(bets.value, 'bets.value - dummyData - fetchBets');
      return
    }
    // test zone end =====================

    fetchedBets.length && ( bets.value = [...bets.value, ...fetchedBets] );

    console.log(bets.value, 'bets.value - fetchBets');

  } catch (error) {
    console.warn(error);

  } finally {
    loadingStop();
  }
}

const fetchMoreBets = async () => {
  console.log('fetchMoreBets');

  if (isLoading.value) {return console.warn("Loading, plese wait");}

  fetchBets();
}

onMounted(() => {
  fetchBets();
})

</script>

<template>
  <div class="active_events">
    <div class="active_events__header">
      <h3>Active Events</h3>
    </div>

    <ul class="active_events__list">
      <li v-for="card in bets" :key="card.id">
        <EventCard :item="card" :is-hot="card.isHot" />
      </li>
    </ul>

    <ButtonBase class="active_events__btn" @click="fetchMoreBets">
      <p class="active_events__btn--text text-light">Fetch more</p>
    </ButtonBase>

    <!-- <VirtualScroller :items="bets" /> -->

    <!-- <GridDemo :items="bets" /> -->

    <p>
      <button @click="triggerOpenNewModal('prediction-modal')">triggerOpenNewModal - prediction-modal</button>
      <button @click="triggerOpenNewModal('prediction-modal')">triggerOpenNewModal - prediction-modal</button>
    </p>
    <p><button @click="triggerCloseModal">triggerCloseModal</button></p>

    <div class="background-decorator"></div>
  </div>
</template>

<style scoped lang='scss'>
.active_events {
  position: relative;
  // z-index: 1;
  padding-bottom: 20px;

  &__header {
    position: relative;

    h3 {
      text-align: center;
      font-size: 36px;
      font-weight: normal;
    }
  }

  &__list {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
    padding: 8px 5px 13px;

    @media screen and (max-width: 1299px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 929px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__btn {
    width: 400px;
    max-width: 100%;
    margin: 30px auto 0;
    min-height: 50px;

    &--text{
      font-size: 32px;
      line-height: 32px;
    }
  }

  .background-decorator {
    position: absolute;
    width: 100vw;
    height: 300px;
    bottom: -100px;
    z-index: -1;
    background: linear-gradient(180deg,#ffffff00 0%, #ffffff 100%), url('/images/sky.svg') no-repeat;
    right: 50%;
    transform: translateX(50%);
  }
}
</style>
