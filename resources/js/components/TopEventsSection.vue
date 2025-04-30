<script setup>
import { ref } from 'vue';
import { demoCardsV1, demoCards } from '@/utils/dummyData';
import { useShowComponent } from "@/composables";
import EventCard from '@/components/EventCard.vue';
import SortOptions from '@/components/details/SortOptions.vue';
import ButtonWithIcon from '@/components/details/ButtonWithIcon.vue';
import SwiperList from '@/components/swiper/SwiperList.vue';
import FilterAndSort from "@/components/details/FilterAndSort.vue"
import SectionHaeder from "@/components/details/SectionHaeder.vue"

defineOptions({ name: "TopEventsSection" });

const {
  position,
  isVisible: isSortOptionsActive,
  showComponent: showSortOption,
  closeComponent: closeSortOption,
} = useShowComponent({ variant: 'sortOptions' });

const sortDirection = ref(false);

</script>

<template>
  <div class="active_events">

    <SectionHaeder :title="'Top Events'">

      <FilterAndSort class="active_events__filters" />

    </SectionHaeder>
    <!-- <div class="active_events__header">


      <h3>Top Events</h3>

      <p></p>
    </div> -->

    <SwiperList :items="demoCards" >
      <template v-slot:item="{ item }">
        <EventCard :item="item" :is-hot="true" />
      </template>
    </SwiperList>
  </div>
</template>

<style scoped lang='scss'>
.active_events {
  position: relative;
  z-index: 1;

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
