<script setup>
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { useLoading } from "@/composables/useLoading";
import { notifyWarning } from "@/helpers/notify";
import { fetchInPayments, createDeposit } from "@/services/payments";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import { sampleTopUpMethods } from "@/utils/dummyData";


defineOptions({ name: "PaymentAnswer" })

defineEmits(["close"])

const { isLoading, loadingStart, loadingStop } = useLoading();

const page = usePage();
const message = computed(() => {
  const url = new URL(page.url.value, window.location.origin);
  return url.searchParams.get('message');
});


const fetchData = async () => {
  const fetchMethods = await fetchInPayments();
  console.log(fetchMethods, 'fetchMethods - fetchData');

  fetchMethods?.length && ( methodList.value = fetchMethods );

  if (fetchMethods?.length) return;

  console.warn("dummy data - sampleTopUpMethods");
  notifyWarning("dummy data - sampleTopUpMethods");
  methodList.value = [...sampleTopUpMethods]
}

onMounted(() => {
  fetchData();
})

</script>

<template>
  <div class="methods-list">
    <div class="methods-list__header mb-20">
      <h4>
        Payment system response
      </h4>
      <ButtonWithIcon class="methods-list__header--btn" icon="/images/cross.svg" @click="$emit('close')" />
    </div>

    <div class="methods-list__body">
      <LoaderComponent v-if="isLoading" />

      <div v-if="message" class="server-message">
        {{ message }}
      </div>


    </div>

  </div>
</template>

<style scoped lang='scss'>
@use "@/assets/scss/method-list";

//.method-logo {
//  width: auto;
//  height: 40px;
//  object-fit: contain;
//  margin-right: 10px;
//  display: inline-block;
//}
</style>
