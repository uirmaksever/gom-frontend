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
    breakpoint: {
      mobileBreakpoint: "sm",
    },
    theme: {
        themes: {
            light: {
              // Custom colors
              primary: "#01AF9C",
              secondary: "#FF5013",
              accent: "#2196f3",
              error: "#f44336",
              warning: "#e5a30c",
              info: "#00bcd4",
              success: "#cddc39"
            }
        }
    }
});
