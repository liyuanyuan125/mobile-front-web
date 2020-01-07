// hooks 必须放在任何 vue 代码之前才有效
import '@/util/hooks'

import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueCookies from 'vue-cookies'
import vconsole from 'vconsole'

if (process.env.VUE_APP_MODE !== 'production') {
  const vConsole = new vconsole()
}

Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
