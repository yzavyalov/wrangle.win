<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { useShowComponent } from "@/composables";
import SortOptions from '@/components/details/SortOptions.vue';
import ButtonWithIcon from '@/components/details/ButtonWithIcon.vue';
import { useFilters } from "@/composables/useFilters";

const {
  position,
  isVisible: isSortOptionsActive,
  showComponent: showSortOption,
  closeComponent: closeSortOption,
  adjustElementPosition,
} = useShowComponent({ variant: 'sortOptions' });
const { setFilters, sortBy, filters, toggleSortBy } = useFilters();

const sortOptionsEl = ref(null);

const submitSortOptions = (options) => {
  setFilters(options);

  closeSortOption();
};

watch(
  () => isSortOptionsActive.value,
  () => {
    if (isSortOptionsActive.value) {
      nextTick(() => adjustElementPosition(sortOptionsEl, position));
    }
  }
);

</script>

<template>
  <div class="filters">
    <ButtonWithIcon
      :icon="'/images/settings.svg'"
      @submit="closeSortOption"
      @click="showSortOption"
    />
    <ButtonWithIcon
      :icon="'/images/sort_arrow.svg'"
      :is-icon-reversed="sortBy === 'asc' ? true : false"
      @click="toggleSortBy"
    />

    <Teleport to="body">
        <transition name="fade">
          <SortOptions v-if="isSortOptionsActive"
            ref="sortOptionsEl"
            :style="position"
            :options="filters"
            v-click-outside="closeSortOption"
            @submit="submitSortOptions"
            @close="closeSortOption"
          />
        </transition>
      </Teleport>
  </div>
</template>

<style scoped lang='scss'>
.filters {
  position: absolute;
  display: flex;
  gap: 5px;
}
</style>
