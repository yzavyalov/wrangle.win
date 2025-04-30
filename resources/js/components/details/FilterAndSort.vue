<script setup>
import { computed, ref } from "vue";
import { useShowComponent } from "@/composables";
import SortOptions from '@/components/details/SortOptions.vue';
import ButtonWithIcon from '@/components/details/ButtonWithIcon.vue';
import { useSettingsStore } from "@/store/settings";

const {
  position,
  isVisible: isSortOptionsActive,
  showComponent: showSortOption,
  closeComponent: closeSortOption,
} = useShowComponent({ variant: 'sortOptions' });

const sortDirection = ref(false);

const sortBy = computed(() => useSettingsStore().sortBy);

const toggleSortByHandler = () => useSettingsStore().toggleSortBy();

const submitSortOptions = (options) => {
  console.log(options, "options - submitSortOptions");
  closeSortOption();
}


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
      @click="toggleSortByHandler"
    />

    <Teleport to="body">
        <transition name="fade">
          <SortOptions v-if="isSortOptionsActive"
            :style="position"
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
