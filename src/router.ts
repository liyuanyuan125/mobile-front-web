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
      path: '/jssdk',
      name: 'jssdk',
      component: () => import('./views/sdk/index.vue')
    },
    {
      path: '/help/privacy',
      name: 'privacy',
      component: () => import('./views/help/privacy.vue')
    },
    {
      path: '/apply',
      name: 'apply',
      component: () => import('./views/theater/apply/index.vue')
    },
    {
      path: '/submit',
      name: 'submit',
      component: () => import('./views/theater/submit/index.vue')
    },
    {
      path: '/application',
      name: 'application',
      component: () => import('./views/theater/entryApplication/index.vue')
    }
  ]
})
