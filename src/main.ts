// hooks 必须放在任何 vue 代码之前才有效
import '@/util/hooks'

import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import vconsole from 'vconsole'
import event from '@/fn/event'
import { openAppLink } from '@/util/native'

import './mock'

if (process && process.env && process.env.NODE_ENV !== 'production') {
  new vconsole()
}

Vue.use(VueCookies)

Vue.config.productionTip = false

// 全局事件监听
// 采用低优先级监听 ajax*** 事件，以便其他地方可以拦截取消
event.on(
  {
    'ajax-10000'() {
      openAppLink('loginPage')
    },

    ajax401() {
      openAppLink('loginPage')
    },
  },
  false
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
