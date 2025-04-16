<script setup>

</script>

<template>
  <footer class="footer">
    <div class="container">
      <span class="footer__line"></span>

      <div class="footer__container">

        <img :src="'/images/logo.svg'" alt="Wrangle Logo" class="footer__logo" />

        <div class="footer__section">
          <div class="footer__description">
            <p>
              Make predictions on real-world events and earn rewards for accuracy.
            </p>
          </div>

          <div class="footer__links">
            <div>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Politics</a></li>
                <li><a href="#">Rules</a></li>
              </ul>
            </div>

            <div>
              <ul>
                <li><a href="#">All Events</a></li>
                <li><a href="#">Create own Event</a></li>
                <li><a href="#">To Account</a></li>
              </ul>
            </div>
          </div>

          <div class="footer__contact">
            <p>Contact us:</p>
            <p class="footer__contact--email">Wrangler@wrangler.wip</p>
            <p>012312312313</p>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        © 2025 WRANGLE.WIN
      </div>
    </div>

  </footer>
</template>

<style scoped lang='scss'>
.footer {
  --footer-gb-color: #C0C0C0;
  --footer-testvar: #fff;

  font-family: "Cabin", sans-serif;
  font-weight: var(--font-weight-bold);
  font-size: 20px;
  font-style: italic;

  background: var(--footer-gb-color);
  position: relative;

  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 auto;
    position: relative;
    padding: 45px;
  }

  &__logo {
    top: 0px;
    position: absolute;
    height: 60px;
    margin-bottom: 10px;
    background: var(--footer-gb-color);
    z-index: 1;
  }

  &__line {
    position: absolute;
    left: 0;
    top: 20px;
    width: 100%;
    height: 3px;
    background: #000000;
    z-index: 0;
  }

  &__section {
    display: grid;
    grid-template-columns: 300px 1fr 200px;
    padding-top: 20px;
    justify-content: center;
    gap: 100px;
    width: 100%;

    // @media screen and (max-width: 1299px) {
    //   grid-template-columns: repeat(3, 1fr);
    //   gap: 60px;
    // }

    // @media screen and (max-width: 929px) {
    //   grid-template-columns: repeat(1, 1fr);
    //   gap: 40px;
    // }
  }

  &__description {
    padding-top: 40px;
    font-style: normal;
  }

  &__links {
    display: flex;
    gap: 40px;

    & li:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  &__contact {
    p:not(:last-child) {
      margin-bottom: 10px;
    }

    // &--email {}
  }

  &__bottom {
    text-align: center;
    padding: 20px 0 5px;
  }

  @media screen and (max-width: 1299px) {
    &__container {
      padding: 45px 20px 20px 20px;
    }

    &__section {
      grid-template-columns: repeat(3, 1fr);
      gap: 60px;
    }
  }

  @media screen and (max-width: 929px) {
    &__section {
      grid-template-columns: repeat(1, 1fr);
      gap: 40px;
    }

    &__links {
      justify-content: space-around;
    }

    &__contact {
      text-align: center;
    }

    &__bottom {
      padding: 5px;
    }
  }
}
</style>
