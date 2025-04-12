<script setup>
import EventCard from '@/components/EventCard.vue';
import ButtonWithIcon from '@/components/details/ButtonWithIcon.vue';
import { demoCardsV1 } from '@/utils/dummyData';

defineOptions({ name: "TopEventsSection" });

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
      <li v-for="card in demoCardsV1" :key="card.id">
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
    padding: 8px 5px 13px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;

    @media screen and (max-width: 1299px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 929px) {
      grid-template-columns: repeat(1, 1fr);
    }
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
