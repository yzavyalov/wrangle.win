<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Grid, Virtual } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import ButtonBaseWithIcon from '@/components/details/ButtonBaseWithIcon.vue';

const BASE_HEIGHT = 200;

const props = defineProps({
  items: { type: Array, default: [] },
  rows: { type: Number, default: 2 },
})

const emit = defineEmits(['reachEnd']);

const swiperRef = ref(null);

const breakpoints = {
  928: { slidesPerView: 1 },
  929: { slidesPerView: 2 },
  1299: { slidesPerView: 3 },
  1920: { slidesPerView: 4 },
}

const dynamicHeight = computed(() => `${props.rows * BASE_HEIGHT + 20}px`);

const dynamicWidth = ref(0);

const updateRows = () => {
  dynamicWidth.value = window.innerWidth;
};

const paginationOptions = {
  clickable: true,
  dynamicBullets: true,
  dynamicMainBullets: 10,
  renderBullet: (index, className) => `<span class='${className}'>${index + 1}</span>`,
};

const emitReachEnd = () => emit('reachEnd');

onMounted(() => {
  updateRows();
  window.addEventListener('resize', updateRows);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateRows);
});


</script>

<template>
  <swiper
    :key="dynamicWidth"
    :modules="[ Navigation, Pagination, Grid ]"
    :slides-per-view="1"
    :space-between="10"
    :pagination="paginationOptions"
    :navigation="true"
    :grab-cursor="true"
    :breakpoints="breakpoints"
    :grid="{ rows: rows, fill: 'column' }"
    :watch-slides-progress="true"
    class="my_swiper"
    @swiper="(swiper) => swiperRef = swiper"
    @reach-end="emitReachEnd"
  >
    <swiper-slide v-for="(item, index) in items" :key="index">
      <slot :item="item" name="item"></slot>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.my_swiper {
  --swiper-navigation-color: var(--btn-bg-color-inactive);
  --swiper-pagination-color: var(--btn-bg-color-inactive);

  width: 100%;
  height: v-bind(dynamicHeight);
}
.swiper-pagination-bullet {
  display: inline-block;
}
</style>
