<script setup>
import { ref } from 'vue';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import EventCard from '@/components/EventCard.vue';
import ButtonBase from '@/components/details/ButtonBase.vue';

const props = defineProps({
  items: { type: Array, default: () => [] }
})

const emit = defineEmits(['fetchMore'])

</script>

<template>
  <DynamicScroller
    :items="items"
    key-field="id"
    class="dynamic-scroller"
    :min-item-size="50"
    >
    <template #default="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :size-dependencies="[item.text]"
      >
        <div class="vs-item-spacer">
          <EventCard :item="item" :data-index="index" />
        </div>
      </DynamicScrollerItem>
    </template>

    <template #after>
      <ButtonBase @click="emit('fetchMore')">Fetch more</ButtonBase>
    </template>
  </DynamicScroller>
</template>

<style scoped>
.dynamic-scroller {
  height: 100%;
  min-height: 200px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  position: relative;
}

.item {
  padding: 16px;
  border-bottom: 1px solid #ccc;
}

.vs-item-spacer {
  padding-bottom: 12px;
  box-sizing: border-box;
}
</style>
