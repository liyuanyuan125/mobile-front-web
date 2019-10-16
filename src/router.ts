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
    // jssdk 联调用
    {
      path: '/jssdk',
      name: 'jssdk',
      component: () => import('./views/sdk/index.vue')
    },
    // 影院端下载
    {
      path: '/download/yc',
      name: 'downloadCinema',
      component: () => import('./views/downLoad/downloadCinema.vue')
    },
    // 隐私政策
    {
      path: '/help/privacy',
      name: 'privacy',
      component: () => import('./views/help/privacy/index.vue')
    },
    // 广告片新手需知
    {
      path: '/help/videoexplain',
      name: 'videoexplain',
      component: () => import('./views/help/video/index.vue')
    },
    // 充值规范
    {
      path: '/help/rechargerule',
      name: 'rechargerule',
      component: () => import('./views/help/recharge/index.vue')
    },
    // 广告主协议
    {
      path: '/help/agreement',
      name: 'agreement',
      component: () => import('./views/help/agreement/index.vue')
    },
    // 修改密码
    {
      path: '/apply',
      name: 'apply',
      component: () => import('./views/findPassWord/index.vue')
    },
    // 入驻申请
    {
      path: '/application',
      name: 'application',
      component: () => import('./views/register/index.vue')
    },
    // 影片资料页
    {
      path: '/movie/detail/:movieId',
      name: 'movieDetail',
      component: () => import('./views/movie/detail/index.vue')
    },
    // 影院资料页
    {
      path: '/cinema/detail/:cinemaId',
      name: 'cinemadetail',
      component: () => import('./views/cinema/detail/index.vue')
    },
    // 效果报告
    {
      path: '/report/detail/:orderId',
      name: 'resultreport',
      component: () => import('./views/report/index.vue')
    },
    // 广告片详情
    {
      path: '/video/detail/:videoId',
      name: 'videodetail',
      component: () => import('./views/video/index.vue')
    }
  ]
})
