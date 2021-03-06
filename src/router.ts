import Vue from 'vue'
import Router from 'vue-router'
import { paramTypes } from '@/util/router'

Vue.use(Router)

const idProps = paramTypes({ id: Number })

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/downLoad/download.vue')
    },
    // jssdk 联调用
    {
      path: '/jssdk',
      name: 'jssdk',
      component: () => import('./views/sdk/index.vue')
    },
    // 影院端下载
    {
      path: '/download/ad',
      name: 'downloadAdvertiser',
      component: () => import('./views/downLoad/download.vue')
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
    // 影城端协议
    {
      path: '/help/cinemament',
      name: 'cinemament',
      component: () => import('./views/help/agreementCinema/index.vue')
    },
    // 指南
    {
      path: '/help/guide',
      name: 'guide',
      component: () => import('./views/help/guide/index.vue')
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
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/register/login.vue')
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
    },

    // ---------------舆情---------------
    // 个人中心-我的
    {
      path: '/my/service',
      name: 'myservice',
      component: () => import('./views/my/index.vue')
    },
    // 品牌舆情
    {
      path: '/sentiment/brand/:id(\\d+)',
      name: 'sentiment-brand',
      component: () => import('./views/sentiment/brand/detail.vue'),
      props: idProps,
    },
    // 品牌舆情 - 用户分析二级详情页
    {
      path: '/sentiment/branduser/:id',
      name: 'sentimentbrand-user',
      component: () => import('./views/sentiment/brand/userAnalysis/user.vue'),
      props: idProps
    },
    // 品牌舆情 - 竞品分析二级详情页
    {
      path: '/sentiment/brand/rivalAnalysis',
      name: 'sentimentbrand-analyze',
      component: () => import('./views/sentiment/brand/rivalAnalysis/index.vue'),
    },
    // 平台热度 - 查看更多（通用页）
    {
      path: '/platform/detail/:id/:type/:name/:startTime/:endTime',
      name: 'platform-detail',
      component: () => import('./views/commonPage/platform/details.vue'),
      props: paramTypes({
        id: Number,
        type: Number,
        name: String,
        startTime: Number,
        endTime: Number
      })
    },

    // kol舆情
    // 艺人详情
    {
      path: '/sentiment/actor/:actorId(\\d+)',
      name: 'sentimentactor',
      component: () => import('./views/sentiment/actor/detail/index.vue')
    },
    {
      path: '/sentiment/actor/rivalAnalysis/demo',
      name: 'sentimentkoluser',
      component: () => import('./views/sentiment/actor/rivalAnalysis/demo.vue')
    },
    // kol舆情用户分析
    {
      path: '/sentiment/actor/userAnalysis/:actorId(\\d+)',
      name: 'sentimentactoruser',
      component: () => import('./views/sentiment/actor/userAnalysis/user.vue')
    },
    // kol舆情竞品分析
    {
      path: '/sentiment/actor/rivalAnalysis',
      name: 'sentimentkolproducts',
      component: () => import('./views/sentiment/actor/rivalAnalysis/products.vue')
    },

    // 影片详情
    {
      path: '/sentiment/movie/:movieId(\\d+)',
      name: 'sentimentmovie',
      component: () => import('./views/sentiment/movie/detail/index.vue')
    },
    // 影片竞品分析
    {
      path: '/sentiment/movie/rivalAnalysis',
      name: 'sentimentmovierivalanalysis',
      component: () => import('./views/sentiment/movie/rivalAnalysis/index.vue')
    },
    // 影片用户分析
    {
      path: '/sentiment/movie/userAnalysis/:movieId(\\d+)',
      name: 'sentimentmovieuseranalysis',
      component: () => import('./views/sentiment/movie/userAnalysis/index.vue')
    },
    // 电视剧舆情
    {
      path: '/sentiment/tv/:tvId(\\d+)',
      name: 'sentimenttv',
      component: () => import('./views/sentiment/tv/detail/index.vue')
    },
    // 电视剧竞品分析
    {
      path: '/sentiment/tv/rivalAnalysis',
      name: 'sentimenttvrivalanalysis',
      component: () => import('./views/sentiment/tv/rivalAnalysis/index.vue')
    },
    // 电视剧用户分析
    {
      path: '/sentiment/tv/userAnalysis/:tvId(\\d+)',
      name: 'sentimenttvuseranalysis',
      component: () => import('./views/sentiment/tv/userAnalysis/index.vue')
    },
    // 用户地域分布三级页
    {
      path: '/sentiment/common/userRegion',
      name: 'sentimentuserregion',
      component: () => import('./views/commonPage/userRegion/index.vue')
    },
    // 全网事件分析详情页 姜英英
    {
      path: '/sentiment/eventNetwork/:eventId(\\d+)',
      name: 'sentimenteventNetwork',
      component: () => import('./views/sentiment/eventNetwork/detail/index.vue')
    },
    // 营销事件详情页 纪洁琼
    {
      path: '/sentiment/eventMarketing/:eventId(\\d+)',
      name: 'sentimenteventmarketing',
      component: () => import('./views/sentiment/eventMarketing/index.vue')
    },

    // ===*** 单曲
    {
      path: '/sentiment/song/:id(\\d+)',
      name: 'sentiment-song',
      component: () => import('./views/sentiment/music/detail.vue'),
      props: idProps
    },
    // 单曲 - 用户分析二级页
    {
      path: '/sentiment/song/:id(\\d+)/user',
      name: 'sentiment-song-user',
      component: () => import('./views/sentiment/music/user.vue'),
      props: idProps
    },
    // 单曲 - 竞品分析二级页
    {
      path: '/sentiment/song/rivalAnalysis',
      name: 'sentiment-song-rival',
      component: () => import('./views/sentiment/music/rival.vue'),
    },

    // ===*** 专辑
    {
      path: '/sentiment/album/:id(\\d+)',
      name: 'sentiment-album',
      component: () => import('./views/sentiment/music/detail.vue'),
      props: paramTypes({ id: Number, isAlbum: true })
    },
    // 专辑 - 用户分析二级页
    {
      path: '/sentiment/album/:id(\\d+)/user',
      name: 'sentiment-album-user',
      component: () => import('./views/sentiment/music/user.vue'),
      props: paramTypes({ id: Number, isAlbum: true })
    },
    // 专辑 - 竞品分析二级页
    {
      path: '/sentiment/album/rivalAnalysis',
      name: 'sentiment-album-rival',
      component: () => import('./views/sentiment/music/rival.vue'),
      props: paramTypes({ isAlbum: true })
    },

    // demo
    {
      path: '/demo/twobar',
      name: 'demo-twobar',
      component: () => import('./views/demo/twoBar.vue')
    },
    {
      path: '/demo/chinamap',
      name: 'demo-chinamap',
      component: () => import('./views/demo/chinaMap.vue')
    },
    {
      path: '/demo/verticalbar',
      name: 'demo-verticalbar',
      component: () => import('./views/demo/verticalBar.vue')
    },
    {
      path: '/demo/vslist',
      name: 'demo-vslist',
      component: () => import('./views/demo/vsList.vue')
    },

    {
      path: '/demo/tabnav',
      name: 'demo-tabnav',
      component: () => import('./views/demo/tabnav.vue')
    },

    {
      path: '/demo/userAreaPortrait',
      name: 'demo-userAreaPortrait',
      component: () => import('./views/demo/userAreaPortrait.vue')
    },

    // test canvas
    {
      path: '/demo/bubble',
      name: 'demo-bubble',
      component: () => import('./views/demo/bubble.vue')
    },
    {
      path: '/demo/cakeEcharts',
      name: 'demo-chinamap',
      component: () => import('./views/demo/cakeEcharts.vue')
    },
    {
      path: '/demo/options',
      name: 'demo-options',
      component: () => import('./views/demo/options.vue')
    },
    {
      path: '/demo/tableForFixed',
      name: 'demo-tableForFixed',
      component: () => import('./views/demo/tableForFixed.vue')
    },
    {
      path: '/error/:code(\\d+)',
      name: 'error',
      component: () => import('./components/404/404.vue'),
      props: paramTypes({ code: Number })
    },
    // 放在最后
    {
      path: '*',
      component: () => import('./components/404/404.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
