import './bootstrap';
import './assets/scss/styles.scss';

import { createApp, h, nextTick } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import pinia from './store';
import vClickOutside from 'click-outside-vue3';

import VirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import Notifications from '@kyvg/vue3-notification';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => title ? `${title} - ${appName}` : appName,
  resolve: (name) => {
    const pages = import.meta.glob('./pages/**/*.vue', { eager: true });
    return pages[`./pages/${name}.vue`].default;
  },
  progress: false,
  setup({ el, App, props, plugin }) {
    return createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(pinia)
      .use(VirtualScroller)
      .use(vClickOutside)
      .use(Notifications)
      .mount(el);
  },
});
