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
      <p class="active_events__btn--text text-light">Create own Event</p>
    </ButtonBase>
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
    width: 400px;
    max-width: 100%;
    margin: 30px auto 20px;
    min-height: 50px;

    &--text{
      font-size: 32px;
      line-height: 32px;
    }
  }

}
</style>
