import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueSession from 'vue-session'
import routes from './plugins/router'


Vue.config.productionTip = false;

// Session config
let options = {
  persist: false
};
Vue.use(VueSession, options);

new Vue({
  vuetify,
  router: routes,
  VueSession,
  render: h => h(App)
}).$mount('#app')
