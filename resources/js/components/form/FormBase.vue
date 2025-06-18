<script setup>
defineProps({
  title: { type: String, default: 'form title' },
})

</script>

<template>
  <div class="w-form">
    <div class="w-form__wrapper">
      <div class="w-form__header">
        <slot name="header">
          <h1>{{ title }}</h1>
        </slot>
      </div>

      <div class="w-form__form">
        <slot></slot>
      </div>

      <div class="w-form__footer">
        <slot name="footer"></slot>
      </div>
    </div>

  </div>
</template>

<style scoped lang='scss'>
  .w-form {
    --border-radius-form: 8px;

    border-radius: var(--border-radius-main);
    box-shadow: var(--box-shadow-main);
    background: linear-gradient(180deg,#FFEC1C 0%, #FFE432 100%);
    max-width: 600px;
    margin: 0 auto;
    padding: 10px 20px;
    min-height: 100%;
    position: relative;
    z-index: 1;
    width: 100%;

    &__wrapper {
      // display: flex;
      // flex-direction: column;
      // gap: 10px;
      // max-width: 350px;
      margin: 0 auto;
    }

    &__header {
      margin-bottom: 30px;

      h3 {
        font-size: 32px;
        text-align: center;
        font-weight: var(--font-weight-light);
      }
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__footer {
      // border-top: 1px solid #000;
      max-width: 350px;
      margin: 20px 0;
      padding: 10px;

      ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        font-family: "Cabin", sans-serif;
        font-size: 12px;
        font-style: italic;
        text-decoration: underline;

        li {
          text-align: center;
          position: relative;
          cursor: pointer;

          &:first-child::after {
            content: '';
            position: absolute;
            right: 0;
            top: -5px;
            height: 40px;
            width: 1px;
            background: #fff;
          }
        }
      }
    }
  }
</style>
