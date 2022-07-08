// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles/main.css';

// Vuetify
import { createVuetify } from 'vuetify';

export default createVuetify({
  defaults: {
    global: {
      ripple: false,
    },
    VSheet: {
      elevation: 4,
    },
  },
});
