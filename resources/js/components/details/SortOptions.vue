<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import ButtonWithIcon from '@/components/details/ButtonWithIcon.vue';
import { toggleBodyScroll } from "@/helpers/toggleBodyScroll";

const emit = defineEmits(["submit", "close"]);

const betAmount = ref(0);
const thema = ref('');
const tags = ref('');
const endDate = ref('');

const isValid = () => {
  if (!betAmount.value > 0) {
    console.warn("Field 'Bet Amount' is required");
    return false;
  }
  if (!thema.value?.trim()) {
    console.warn("Field 'Thema' is required");
    return false;
  }
  if (!tags.value?.trim()) {
    console.warn("Field 'Tags' is required");
    return false;
  }
  if (!endDate.value) {
    console.warn("Field 'End date' is required");
    return false;
  }
  return true;
};

const submitHandler = () => {
  if (!isValid()) return;

  const payload = {
    betAmount: betAmount.value,
    thema: thema.value,
    tags: tags.value,
    endDate: new Date(endDate.value).toUTCString(),
  }
  console.log(payload, "payload - submitHandler");

  emit('submit', payload);
}

const cancelHandler = () => emit('close');

onMounted(() => {
  toggleBodyScroll(true);
});

onUnmounted(() => {
  toggleBodyScroll(false);
});

</script>

<template>
  <div class="sort_options">
    <div class="sort_options__head">
      <ButtonWithIcon :icon="'/images/settings.svg'" />

      <h4>Sort Events</h4>
    </div>

    <table>
      <tbody>
        <tr>
          <td>
            <p>Bet Amount</p>
          </td>
          <td><input type="number" v-model="betAmount" min="0" max="1000"></td>
        </tr>

        <tr>
          <td>
            <p>Thema</p>
          </td>
          <td><input type="text" v-model="thema"></td>
        </tr>

        <tr>
          <td>
            <p>Tags</p>
          </td>
          <td><input type="text" v-model="tags"></td>
        </tr>

        <tr>
          <td>
            <p>End date</p>
          </td>
          <td><input type="datetime-local" v-model="endDate"></td>
        </tr>
      </tbody>
    </table>

    <div class="sort_options__footer">
      <button class="sort_options__footer--btn" @click="submitHandler">Save Changes</button>
      <button class="sort_options__footer--btn" @click="cancelHandler">Decline</button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.sort_options {
  position: absolute;
  z-index: 2;
  border-radius: var(--border-radius-main);
  box-shadow: var(--box-shadow-main);
  background: linear-gradient(0deg, #eadcdc 0%, #ffec6d 100%);
  padding: 20px;
  width: 100%;
  min-width: 260px;
  max-width: 700px;

  top: 0;
  left: 0;

  &__head {
    display: flex;
    align-items: center;
    gap: 10px;

    h4 {
      font-size: 32px;
      font-weight: var(--font-weight-light);
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    margin-bottom: 15px;
    table-layout: auto;

    tr {
      display: grid;
      grid-template-columns: max-content 1fr;
      border: 1px solid #000;
      background: #FFE432;
      min-height: 51px;


      &:not(:last-child) {
        border-bottom: none;
      }

      td {
        padding: 8px 12px;
        color: #000;

        p {
          font-size: 24px;
          font-weight: var(--font-weight-light);
        }

        &:first-child {
          display: flex;
          align-items: center;
          min-width: 180px;

          &::after {
            content: '';
            width: 25px;
            height: 25px;
            margin-left: 10px;
            background: url('/images/arrow.svg');
            background-size: cover;
          }
        }

        &:last-child {
          input {
            width: 100%;
            padding: 8px 12px;
            border-radius: var(--border-radius-main);
            background-color: #FFEA00;
          }
        }
      }
    }
  }

  &__footer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 24px;
    font-weight: var(--font-weight-light);

    &--btn {
      border: 1px solid #000;
      min-height: 51px;
      background: #FFE432;

      &:first-child {
        border-right: none;
      }

      &:hover {
        background: #F2BB16;
      }
    }
  }
}
</style>
