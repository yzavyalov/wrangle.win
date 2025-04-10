<script setup>
import EventCard from '@/components/EventCard.vue';
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
  </div>
</template>

<style scoped lang='scss'>
.active_events {
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
    padding: 8px 0 13px;
  }

  &__btn {
    position: absolute;
    border-radius: var(--border-radius-main);
    background-color: var(--btn-bg-color);
    padding: 5px;
  }

}
</style>
