<script setup>
import { ref, onMounted } from 'vue';
import EventCard from '@/components/EventCard.vue';
import SwiperList from '@/components/swiper/SwiperList.vue';
import FilterAndSort from "@/components/details/FilterAndSort.vue"
import SectionHeader from "@/components/details/SectionHeader.vue"
import { useBets } from '@/composables/useBets';
import LoaderComponent from '@/components/LoaderComponent.vue';

defineOptions({ name: "TopEventsSection" });

defineProps({
  isShowFilters: { type: Boolean, default: false }
})

const { fetchBets, fetchMoreBets, dynamicBets, isLoading } = useBets({ isHot: true });

onMounted(() => {
  fetchBets();
})

</script>

<template>
  <div class="active_events">

    <SectionHeader :title="'Top Events'">

      <LoaderComponent v-if="isLoading" />

      <FilterAndSort v-if="isShowFilters" class="active_events__filters" />

    </SectionHeader>

    <SwiperList v-if="dynamicBets?.length" :items="dynamicBets" @reach-end="fetchMoreBets">
      <template v-slot:item="{ item }">
        <EventCard :item="item" />
      </template>
    </SwiperList>

    <p v-else class="text-center">No events found</p>
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
