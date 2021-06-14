import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import SequentialEntrance from "vue-sequential-entrance";
import "vue-sequential-entrance/vue-sequential-entrance.css";
import Router from "vue-router";
import Vuesax from 'vuesax'
// import vSelect from "vue-select";


import 'vuesax/dist/vuesax.css' //Vuesax styles
import "vue-select/dist/vue-select.css";

import { routes } from './routes'


Vue.config.productionTip = false

Vue.use(SequentialEntrance);

Vue.use(Vuesax);

// Vue.component("v-select", vSelect);

Vue.use(Router);

const router = new Router({ routes, mode: "history" });

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
