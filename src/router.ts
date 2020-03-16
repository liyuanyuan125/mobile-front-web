import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import { Route } from 'vue-router'
import { MapType } from '@/util/types'
import { stringToBoolean } from '@/fn/typeCast'
Vue.use(Router)

/**
 * 处理 route 中的参数类型
 * @param config 配置
 */
const paramTypes = (
  config: MapType<NumberConstructor | BooleanConstructor | StringConstructor>
) => {
  return ({ params }: Route) => {
    const props = Object.entries(config).reduce((map, [key, type]) => {
      const strVal = params[key]
      const value = type === Number
        ? (+strVal || 0)
        : type === Boolean
          ? stringToBoolean(strVal)
          : strVal
      map[key] = value
      return map
    }, {} as MapType<any>)
    return props
  }
}

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
    // 品牌舆情
    {
      path: '/sentiment/brand/:id',
      name: 'sentimentbrand',
      component: () => import('./views/sentiment/brand/index.vue'),
      props: idProps
    },
    // 平台热度 - 查看更多（通用页）
    {
      path: '/platform/detail/:id/:type/:name/:startTime/:endTime',
      name: 'platform-detail',
      component: () => import('./views/commonPage/platform/details.vue'),
      props: paramTypes({
        id: Number,
        type: String,
        name: String,
        startTime: String,
        endTime: String
      })
    },

    // kol舆情
    {
      path: '/sentiment/actor/detail/:id',
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
      path: '/sentiment/actor/userAnalysis/:userId',
      name: 'sentimentactoruser',
      component: () => import('./views/sentiment/actor/userAnalysis/user.vue')
    },
    // kol舆情竞品分析
    {
      path: '/sentiment/actor/rivalAnalysis/products',
      name: 'sentimentkolproducts',
      component: () => import('./views/sentiment/actor/rivalAnalysis/products.vue')
    },

    // 影片舆情
    {
      path: '/sentiment/movie/:movieId',
      name: 'sentimentmovie',
      component: () => import('./views/sentiment/movie/detail/index.vue')
    },
    // 电视剧舆情
    {
      path: '/sentiment/tv/:tvId',
      name: 'sentimenttv',
      component: () => import('./views/sentiment/tv/index.vue')
    },
    // 音乐舆情
    {
      path: '/sentiment/music',
      name: 'sentimentmusic',
      component: () => import('./views/sentiment/music/index.vue')
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
    }
  ]
})
