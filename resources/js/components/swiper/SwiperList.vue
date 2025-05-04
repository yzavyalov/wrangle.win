<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Virtual } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ButtonBaseWithIcon from '@/components/details/ButtonBaseWithIcon.vue';

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

const groupedItems = computed(() => {
  const result = [];
  for (let i = 0; i < props.items.length; i += props.rows) {
    result.push(props.items.slice(i, i + props.rows));
  }
  return result;
});

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
    :modules="[ Navigation, Pagination, Virtual ]"
    :slides-per-view="1"
    :space-between="10"
    :pagination="paginationOptions"
    :navigation="true"
    :grab-cursor="true"
    :virtual="true"
    :breakpoints="breakpoints"
    :watch-slides-progress="true"
    class="my_swiper"
    @swiper="(swiper) => swiperRef = swiper"
    @reach-end="emitReachEnd"
  >
    <swiper-slide
      v-for="(group, index) in groupedItems"
      :key="index"
      :virtualIndex="index"
    >
      <div
        v-for="item in group"
        :key="item.id ?? item"
        class="slide-item mb-10"
      >
        <slot :item="item" name="item" />
      </div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.my_swiper {
  --swiper-navigation-color: var(--btn-bg-color-inactive);
  --swiper-pagination-color: var(--btn-bg-color-inactive);

  width: 100%;
  padding-bottom: 20px
}

.swiper-pagination-bullet {
  display: inline-block;
}
</style>
