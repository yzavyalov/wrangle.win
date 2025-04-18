<script setup>
import EventCard from '@/components/EventCard.vue';
import ButtonBase from '@/components/details/ButtonBase.vue';
import { demoCards } from '@/utils/dummyData';

const demoCards2 = [
  {
    id: 1,
    title: 'Next Prime Minister of Canada after the election?',
    img: 'https://img.goodfon.ru/wallpaper/big/0/70/badfon-peyzazhi-priroda-foto-krasota.webp',
    bet: '$100',
    tags: ['Tag 1', 'Tag 2'],
    date: new Date('2025-04-15T20:18:00'),
  },
  {
    id: 2,
    title: 'Ukraine agrees to Trump mineral deal before April?',
    img: 'https://www.fonstola.ru/images/202306/www.fonstola.ru.1687828675.2414.jpg',
    bet: '$200',
    tags: ['Tag 3', 'Tag 4'],
    date: new Date('2025-04-10T20:18:00'),
  },
  {
    id: 3,
    title: 'Ukraine agrees to Trump mineral deal before April?',
    img: 'https://i.pinimg.com/736x/17/83/6b/17836b7698244921e54d21f449512edd.jpg',
    bet: '$300',
    tags: ['Tag 5', 'Tag 6'],
    date: new Date('2025-04-11T20:18:00'),
  },
]

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
      <p class="active_events__btn--text text-light">Create own Event</p>
    </ButtonBase>

    <div class="background-decorator"></div>
  </div>
</template>

<style scoped lang='scss'>
.active_events {
  position: relative;
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
