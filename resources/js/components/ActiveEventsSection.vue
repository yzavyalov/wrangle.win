<script setup>
import EventCard from '@/components/EventCard.vue';
import ButtonBase from '@/components/details/ButtonBase.vue';
import { demoCards } from '@/utils/dummyData';



</script>

<template>
  <div class="active_events">
    <div class="active_events__header">
      <h3>Active Events</h3>
    </div>

    <ul class="active_events__list">
      <li v-for="card in demoCards" :key="card.id">
        <EventCard :item="card" :is-hot="card.isHot" />
      </li>
    </ul>

    <ButtonBase class="active_events__btn">
      <p class="active_events__btn--text text-light">Fetch more</p>
    </ButtonBase>

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
