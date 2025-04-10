<script setup>
import EventCard from '@/components/EventCard.vue';
import ButtonWithIcon from '@/components/details/ButtonWithIcon.vue';


const demoCards = [
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
      <div class="active_events__filters">
        <ButtonWithIcon :icon="'/images/settings.svg'" />
        <ButtonWithIcon :icon="'/images/settings_arrows.svg'" />
      </div>

      <h3>Top Events</h3>

      <p></p>
    </div>

    <ul class="active_events__list">
      <li v-for="card in demoCards" :key="card.id">
        <EventCard :item="card" :is-hot="true" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang='scss'>
.active_events {

  --header-height: 50px;

  &__header {
    position: relative;
    height: var(--header-height);
    padding: 0 110px;

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
    padding: 8px 0 13px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }

  &__filters {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    gap: 5px;
    height: var(--header-height);
  }
}
</style>
