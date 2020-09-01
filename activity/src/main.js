import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Search } from 'vant';
Vue.use(Search);
Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
import { Loading } from 'vant';
Vue.use(Loading);
import { ActionSheet } from 'vant';
import { Toast } from 'vant';
Vue.use(Toast)
Vue.use(ActionSheet)
import 'vant/lib/index.css';
import { Button } from 'vant';
Vue.use(Button);
import clipboard from 'clipboard';
// import Vconsole from 'vconsole';
// const vConsole = new Vconsole();
// Vue.use(vConsole)
import { Overlay } from 'vant';
Vue.use(Overlay)
import '@vant/touch-emulator';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
