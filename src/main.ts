import { createApp } from 'vue';

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCaretDown /* faCopyright */ } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

import App from './App.vue';

import router from './router';
import vuetify from './plugins/vuetify';
import loadFonts from './plugins/webfontloader';

import './assets/css/global.sass';
import './assets/css/variables.sass';

library.add(faCaretDown, faCopyright);
loadFonts();

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(vuetify)
  .mount('#app');
