import './bootstrap';
import './assets/scss/styles.scss';

import { createApp } from 'vue'
import App from './App.vue'
import pinia from "./store";
import vClickOutside from "click-outside-vue3";


createApp(App)
  .use(pinia)
  .use(vClickOutside)
  .mount('#app')
