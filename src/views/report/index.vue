<template>
  <div class="viewpage">
    <DataNull v-if="dataErr" />
    <div class="viewer" v-if="orderDetail && !dataErr">
      <div class="fixbar" :style="{opacity:scrollTop}">
        <TopBar
          barColor="black"
          :title="orderDetail.planInfo.planName"
          :styleline="'background:#FBFBFB;box-shadow:0 0 20px rgba(111,131,153,.1)'"
          v-if="!barShow"
        />
      </div>
      <TopBar barColor="black" v-if="!barShow" />
      <PlanInfo :planInfo="orderDetail.planInfo" />
      <PutProgress
        :progress="orderDetail.reportCount"
        v-if="orderDetail.reportCount"
        :orderId="this.orderId"
      />
      <DataTrend :dataTrend="orderDetail.dataTrend" />
      <DataTotal
        :cinemaCount="orderDetail.planInfo.coverCinemaCount"
        :movieCount="orderDetail.planInfo.coverMovieCount"
        :orderId="this.orderId"
      />
      <DataUserStatus :userAges="orderDetail.userAges" :userGender="orderDetail.userGender" />
      <DataCity
        :cityTier="orderDetail.cityTier"
        :cityProfile="orderDetail.cityProfile"
        :orderId="this.orderId"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TopBar from '@/components/topBar'
import PlanInfo from './components/planInfo.vue' // 用户信息
import PutProgress from './components/putProgress.vue' // 投放进度
import DataTrend from './components/dataTrend.vue' // 数据趋势
import DataTotal from './components/dataTotal.vue' // 影院和电影统计
import DataUserStatus from './components/dataUserStatus.vue' // 年龄和性别占比
import DataCity from './components/dataCity.vue' // 城市相关
import { getReportDetail } from '@/api/advertiser.ts'
import { toast } from '@/util/toast'
import { setNavBarStatus } from '@/util/native'
import DataNull from '@/components/dataNull'

@Component({
  components: {
    TopBar,
    PlanInfo,
    PutProgress,
    DataTrend,
    DataTotal,
    DataUserStatus,
    DataCity,
    DataNull
  }
})
export default class ResultReport extends Vue {
  orderId: string = ''
  orderDetail: any = null
  barShow: any = ''
  scrollTop: number = 0
  dataErr: boolean = false // 数据是否错误

  mounted() {
    window.addEventListener('scroll', this.getScroll)
  }

  destroyed() {
    window.removeEventListener('scroll', this.getScroll)
  }
  beforeMount() {
    const reportId = this.$route.params.orderId
    this.orderId = reportId
    this.getReportDetail(reportId)
    document.body.style.background = '#FBFBFB'
    this.hideNavBarStatus()
    this.barShow = this.$route.query.show
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

  // 获取报告详情 563、516、515、424
  async getReportDetail(orderId: string) {
    try {
      const res: any = await getReportDetail({ orderId })
      if (res.code === 0) {
        this.orderDetail = res.data
      } else {
        this.dataErr = true
        toast(res.msg)
      }
    } catch (ex) {
      toast(ex)
    }
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
