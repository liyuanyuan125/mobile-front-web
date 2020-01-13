<template>
  <div>
    <DataNull v-if="dataErr" />
    <div class="viewpage" v-if="orderDetail && !dataErr">
      <div class="reshare" @click="renderPage" v-if="!renderNew && appVer">导出</div>
      <div class="viewer">
        <div class="fixbar" :style="{opacity:scrollTop}" v-if="!renderNew">
          <TopBar
            barColor="black"
            :title="orderDetail.planInfo.planName"
            :styleline="'background:#FBFBFB;box-shadow:0 0 20px rgba(111,131,153,.1)'"
            v-if="!barShow"
          />
        </div>
        <TopBar barColor="black" v-if="!barShow && !renderNew" />

        <PlanInfo :planInfo="orderDetail.planInfo" />

        <PutProgress
          :progress="orderDetail.reportCount"
          v-if="orderDetail.reportCount"
          :orderId="orderId"
        />

        <DataTrend :dataTrend="orderDetail.dataTrend" v-if="!renderNew" />
        <DataTrendList :dataTrend="dataList" v-if="renderNew && dataList.length" />

        <DataTotal
          :cinemaCount="orderDetail.planInfo.coverCinemaCount"
          :movieCount="orderDetail.planInfo.coverMovieCount"
          :orderId="orderId"
          v-if="!renderNew"
        />
        <DataCinemaList :cinemaList="cinemaList" v-if="renderNew && cinemaList.length" />
        <DataMovieList :movieList="movieList" v-if="renderNew && movieList.length" />

        <DataUserStatus
          :userAges="orderDetail.userAges"
          :userGender="orderDetail.userGender"
          :isRenderImg="renderNew"
        />

        <DataCity
          :cityTier="orderDetail.cityTier"
          :cityProfile="orderDetail.cityProfile"
          :orderId="this.orderId"
          :cityList="cityList"
          :renderNew="renderNew"
        />
        <div class="nulldiv"></div>
        <div class="footer" v-if="renderNew">
          <div class="lr">
            <img src="../../assets/qrdownload.png" />
            <h4>鲸鱼数据APP</h4>
            <p>银幕映前广告 在线精准投放</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import TopBar from '@/components/topBar'
import PlanInfo from './components/planInfo.vue' // 用户信息
import PutProgress from './components/putProgress.vue' // 投放进度
import DataTrend from './components/dataTrend.vue' // 数据趋势
import DataTotal from './components/dataTotal.vue' // 影院和电影统计
import DataUserStatus from './components/dataUserStatus.vue' // 年龄和性别占比
import DataCity from './components/dataCity.vue' // 城市相关
import DataTrendList from './components/dataTrendList.vue' // 数据超势表格
import DataCinemaList from './components/dataCinemaList.vue' // 相关影院列表
import DataMovieList from './components/dataMovieList.vue' // 相关影片列表
import {
  getReportDetail,
  getReportCinemaList,
  getReportMovieList,
  getReportCityList
} from '@/api/advertiser.ts'
import { toast, alert } from '@/util/toast'
import { setNavBarStatus, startCaptureImage } from '@/util/native'
import DataNull from '@/components/dataNull'
import { isJyApp } from '@/fn/ua'

@Component({
  components: {
    TopBar,
    PlanInfo,
    PutProgress,
    DataTrend,
    DataTotal,
    DataUserStatus,
    DataCity,
    DataNull,
    DataTrendList,
    DataCinemaList,
    DataMovieList
  }
})
export default class ResultReport extends Vue {
  orderId: string = ''
  orderDetail: any = null
  barShow: any = ''
  scrollTop: number = 0
  dataErr: boolean = false // 数据是否错误
  renderNew: boolean = false // 是否重新渲染了页面
  dataList: any = [] // 趋势列表
  cinemaList: any = [] // 影院列表
  movieList: any = [] // 影片列表
  cityList: any = [] // 影片列表
  appVer: boolean = false // 根据 APP 版本号判断是否显示分享
  getCount: number = 0

  created() {
    const reportId = this.$route.params.orderId
    this.orderId = reportId
    this.getReportDetail(reportId)
    document.body.style.background = '#FBFBFB'
    this.getAppVersion()
    if (isJyApp()) {
      this.hideNavBarStatus()
    }
    this.barShow = this.$route.query.show
  }

  mounted() {
    window.addEventListener('scroll', this.getScroll)
  }

  destroyed() {
    window.removeEventListener('scroll', this.getScroll)
    window.removeEventListener('touchmove', this.getMoveTouch)
  }

  // 获取报告详情 563、516、515、424
  async getReportDetail(orderId: string) {
    try {
      const res: any = await getReportDetail({ orderId })
      if (res.code === 0) {
        this.orderDetail = res.data
        this.formatTrend(res.data.dataTrend)
      } else {
        this.dataErr = true
      }
    } catch (ex) {
      toast(ex)
    }
  }
  // 获取报告详情相关影院
  async getReportCinemaList(orderId: string) {
    try {
      const res: any = await getReportCinemaList({
        orderId,
        pageIndex: 1,
        pageSize: 100
      })
      if (res.code === 0) {
        this.cinemaList = res.data.cinemaList
        this.getCount += 1
      } else {
        // this.dataErr = true
        toast(res.msg)
      }
    } catch (ex) {
      toast(ex)
    }
  }

  // 获取报告详情相关影片
  async getReportMovieList(orderId: string) {
    try {
      const res: any = await getReportMovieList({
        orderId,
        pageIndex: 1,
        pageSize: 30
      })
      if (res.code === 0) {
        this.movieList = res.data.movieList
        this.getCount += 1
      } else {
        // this.dataErr = true
        toast(res.msg)
      }
    } catch (ex) {
      toast(ex)
    }
  }

  // 获取报告详情相关城市
  async getReportCityList(orderId: string) {
    try {
      const res: any = await getReportCityList({
        orderId,
        pageIndex: 1,
        pageSize: 30
      })
      if (res.code === 0) {
        this.cityList = res.data.cityList
        this.getCount += 1
      } else {
        // this.dataErr = true
        toast(res.msg)
      }
    } catch (ex) {
      toast(ex)
    }
  }

  // 根据 app 版本判断是否显示下载按钮
  getAppVersion() {
    // Fn 里有个方法
    const ua = navigator.userAgent.toLowerCase()
    const ar = ua.split('(webview')[0].split('/')
    const ver = Number(ar[ar.length - 1].split('.').join(''))
    // ios版本大于1.3.0，android版本大于1.2.0才支持截屏 jssdk
    const isIos = ua.indexOf('jydataadvertiser_ios') > -1 && ver >= 130
    const isAndroid = ua.indexOf('jydataadvertiser_android') > -1 && ver >= 120
    if (isIos || isAndroid) {
      this.appVer = true
    }
  }

  // 隐藏导航
  async hideNavBarStatus() {
    const objectData = {
      isShowNavBar: false,
      statusBarColor: '#FBFBFB'
    }
    const obj = { params: objectData }
    await setNavBarStatus(obj)
  }

  // 处理趋势数据
  formatTrend(trend: any) {
    const len = trend.showCost.data.length
    const cost = trend.showCost.data
    const person = trend.showPerson.data
    const scene = trend.showScene.data
    const trendArr = []
    for (let i = 0; i < len; i++) {
      const trendObj = {
        date: '',
        cost: 0,
        person: 0,
        scene: 0
      }
      trendObj.date = cost[i].year + '-' + cost[i].date
      trendObj.cost = cost[i].valueStr
      trendObj.person = person[i].valueStr
      trendObj.scene = scene[i].valueStr
      trendArr.push(trendObj)
    }
    this.dataList = trendArr
  }

  renderPage() {
    window.addEventListener('touchmove', this.getMoveTouch, { passive: false })
    const reportId = this.$route.params.orderId
    this.getReportCinemaList(reportId)
    this.getReportMovieList(reportId)
    this.getReportCityList(reportId)
    // 三个接口请求时间，加起来，如果超过1000ms，则认为是网慢，不允许用户截图
    setTimeout(() => {
      if (this.getCount === 3) {
        this.renderNew = true
      } else {
        window.removeEventListener('touchmove', this.getMoveTouch, false)
        toast('网络异常，请稍后再试~')
      }
    }, 1000)
  }

  // 重新渲染页面
  @Watch('renderNew') // 进入页面开始倒计时
  watchPageOn() {
    if (this.renderNew) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.captureImage()
        }, 800)
      })
    }
  }

  //  截屏
  async captureImage() {
    window.removeEventListener('touchmove', this.getMoveTouch, false)
    const obj = {
      callBackName: 'callBackCaptureImage'
    }
    const result: any = await startCaptureImage(obj)
    const resultJSON = JSON.parse(result)
    if (!resultJSON.success && !resultJSON.code) {
      alert({
        title: '导出图片成功',
        message: '请在手机文件夹中查看生成的图片',
        showConfirmButton: true,
        beforeClose: (action: any, done: any) => {
          if (action === 'confirm') {
            this.renderNew = false
            done()
          }
        }
      })
    } else {
      alert({
        title: '导出图片失败',
        message: '请重试',
        showConfirmButton: true,
        beforeClose: (action: any, done: any) => {
          if (action === 'confirm') {
            this.renderNew = false
            done()
          }
        }
      })
    }
  }

  // 监听滚动事件，防止用户在点了截屏按后去滚动图片
  getMoveTouch(e: any) {
    e.preventDefault()
  }

  // 监听滚动显示顶部导航
  getScroll() {
    const topNum =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    this.scrollTop = topNum > 0 ? 1 : 0
  }
}
</script>

<style lang="less" scoped>
@import 'less/main.less';
</style>
