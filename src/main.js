import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
// import Vuetify from 'vuetify'
import 'leaflet/dist/leaflet.css';
import router from "./router";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import VueGtag from "vue-gtag";

Vue.config.productionTip = false

Vue.use(VueGtag, {
  config: { id: "G-GDE2G1GN41" }
}, router);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');

