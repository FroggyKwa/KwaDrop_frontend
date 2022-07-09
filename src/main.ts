import { createApp } from 'vue';

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCaretDown, faBan, faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

import { VueModal } from '@kouts/vue-modal';

import PerfectScrollbar from 'vue3-perfect-scrollbar';
import App from './App.vue';

import router from './router';
import vuetify from './plugins/vuetify';
import loadFonts from './plugins/webfontloader';

import '@/assets/logo.png';
import './assets/css/global.sass';
import './assets/css/variables.sass';
import '@kouts/vue-modal/dist/vue-modal.css';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';

library.add(faCaretDown, faCopyright, faBan, faBoltLightning);
if (!loadFonts()) {
  // eslint-disable-next-line no-console
  console.log('Fonts are not loaded');
}

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(PerfectScrollbar)
  .use(VueModal)
  .use(router)
  .use(vuetify)
  .mount('#app');
