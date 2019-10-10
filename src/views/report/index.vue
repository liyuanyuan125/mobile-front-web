<template>
  <div class="viewpage">
    <div class="viewer">
      <TopBar />
      <PlanInfo :planInfo="orderDetail.planInfo" v-if="orderDetail.planInfo" />
      <PutProgress
        :progress="orderDetail.reportCount"
        v-if="orderDetail.reportCount"
        :orderId="this.orderId"
      />
      <DataTrend :dataTrend="orderDetail.dataTrend" v-if="orderDetail.dataTrend" />
      <DataTotal
        :cinemaCount="orderDetail.planInfo.coverCinemaCount"
        :movieCount="orderDetail.planInfo.coverMovieCount"
        v-if="orderDetail.planInfo"
        :orderId="this.orderId"
      />
      <DataUserStatus
        :userAges="orderDetail.userAges"
        :userGender="orderDetail.userGender"
        v-if="orderDetail.userAges || orderDetail.userGender"
      />
      <DataCity
        :cityTier="orderDetail.cityTier"
        :cityProfile="orderDetail.cityProfile"
        v-if="orderDetail.cityTier || orderDetail.cityProfile"
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

@Component({
  components: {
    TopBar,
    PlanInfo,
    PutProgress,
    DataTrend,
    DataTotal,
    DataUserStatus,
    DataCity
  }
})
export default class ResultReport extends Vue {
  orderId: string = ''
  orderDetail: any = {}

  beforeMount() {
    const reportId = this.$route.params.orderId
    this.orderId = reportId
    this.getReportDetail(reportId)
    document.body.style.background = '#FBFBFB'
  }

  // 获取报告详情 563、516、515、424
  async getReportDetail(orderId: string) {
    try {
      const res: any = await getReportDetail({ orderId })
      if (res.code === 0) {
        this.orderDetail = res.data
      } else {
        toast(res.msg)
      }
    } catch (ex) {
      toast(ex)
    }
  }
}
</script>

<style lang="less" scoped>
@import 'less/main.less';
</style>
