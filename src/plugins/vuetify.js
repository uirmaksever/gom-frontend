import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

import tr from 'vuetify/es5/locale/tr'

export default new Vuetify({
    lang: {
      locales: {tr,},
      current: "tr",
    },
    theme: {
        themes: {
            light: {
              // Custom colors
              primary: "#4caf50",
              secondary: "#ff9800",
              accent: "#2196f3",
              error: "#f44336",
              warning: "#ffeb3b",
              info: "#00bcd4",
              success: "#cddc39"
            }
        }
    }
});
