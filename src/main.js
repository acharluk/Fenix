import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCogs, faPlusCircle, faRocket, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'typeface-poppins';

library.add(faCogs, faPlusCircle, faRocket, faCaretDown);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


window.vm = new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
