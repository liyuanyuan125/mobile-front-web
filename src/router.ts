import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('./views/demo/index.vue')
    },
    {
      path: '/apply',
      name: 'apply',
      component: () => import('./views/apply/index.vue')
    }
  ]
})
