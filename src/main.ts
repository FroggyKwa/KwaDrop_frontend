import { createApp } from 'vue';
import titleMixin from '@/mixins/titleMixin';

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCaretDown,
  faBan,
  faBoltLightning,
  faCopy,
  faMagnifyingGlass,
  faHouse,
  faGear,
  faArrowDown,
  faArrowUp,
}
  from '@fortawesome/free-solid-svg-icons';
import { faCopyright, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { VueModal } from '@kouts/vue-modal';

import PerfectScrollbar from 'vue3-perfect-scrollbar';
import App from './App.vue';

import router from './router';
import vuetify from './plugins/vuetify';
import loadFonts from './plugins/webfontloader';

import './assets/css/global.sass';
import './assets/css/variables.sass';
import '@kouts/vue-modal/dist/vue-modal.css';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';

library.add(faCaretDown, faCopyright, faBan, faBoltLightning, faCopy, faMagnifyingGlass, faHouse, faGear, faTrashCan, faArrowUp, faArrowDown);
if (!loadFonts()) {
  // eslint-disable-next-line no-console
  console.log('Fonts are not loaded');
}

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mixin(titleMixin)
  .use(PerfectScrollbar)
  .use(VueModal)
  .use(router)
  .use(vuetify)
  .mount('#app');
