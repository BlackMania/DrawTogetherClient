import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueSession from 'vue-session'
import router from './plugins/router'


Vue.config.productionTip = false;

// Session config
let options = {
  persist: true
};
Vue.use(VueSession, options);

new Vue({
  vuetify,
  VueSession,
  router,
  render: h => h(App)
}).$mount('#app')
