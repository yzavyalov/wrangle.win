<script setup>
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from '@/components/FooterSection.vue';
import ModalBase from '@/components/modals/ModalBase.vue';
import { useModals } from '@/composables';
import { onBeforeMount, onMounted } from 'vue';
import { getUserData } from '@/services/user';
import { useSettingsStore } from "@/store/settings";


const { modals } = useModals({ isLayout: true });

onMounted(() => {
  // fetch user data from server
  getUserData();
})

</script>

<template>
  <div class="base-layout">

    <div class="base-layout__content">
      <div class="container">
        <HeaderSection />

        <slot></slot>

        <notifications position="bottom left" group="bottom-left">
          <template #body="props">
            <div
              @click="closeNotifyHandle"
              :class="[
                'vue-notification-template',
                props.class,
                {
                  'vue-notification-template--icon':
                    'icon' in props?.item?.data,
                },
              ]"
            >
              <div class="notification-icon" v-if="props?.item?.data?.icon">
                <img
                  :src="props?.item?.data?.icon"
                  :alt="props.item.title"
                  width="50"
                />
              </div>
              <div>
                <div class="notification-title">{{ props.item.title }}</div>
                <div class="notification-content">{{ props.item.text }}</div>
              </div>
            </div>
          </template>
        </notifications>

      </div>
    </div>

    <div class="modals__container">
      <transition-group name="modal">
        <ModalBase v-for="(modal, index) in modals"
          :key="modal + '_' + index"
          :idx="index"
        />
      </transition-group>
    </div>

    <FooterSection />
  </div>
</template>

<style scoped lang='scss'>
.base-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  // overflow: hidden;

  .container {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
