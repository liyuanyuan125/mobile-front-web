<template>
  <div class="userStatus">
    <h3 v-if="cityTier">线城市占比</h3>
    <div class="userage">
      <PieGraph :dataOption="cityTierData" />
    </div>
    <h3 v-if="cityProfile" style="margin-top:30px;">城市分布占比</h3>
    <div class="usergender">
      <BarGraphRow :dataOption="cityProfileData" />
    </div>
    <div class="morecity" @click="goCityList">查看全部城市</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import BarGraphRow from '@/components/charts/barGraphRow.vue'
import PieGraph from '@/components/charts/pieGraph.vue'
import { openAppLinkClient } from '@/util/native'

@Component({
  components: {
    BarGraphRow,
    PieGraph
  }
})
export default class DataCity extends ViewBase {
  @Prop({ type: Array }) cityTier!: any
  @Prop({ type: Array }) cityProfile!: any
  @Prop({ type: String }) orderId!: string

  cityTierData: any = {}
  cityProfileData: any = {}

  created() {
    this.formatCityTierData()
    this.formatProfileData()
  }

  // 处理一下城市线数据
  formatCityTierData() {
    const legendData = []
    for (const item of this.cityTier) {
      legendData.push({
        name: item.name,
        icon: 'circle',
        textStyle: {
          color: '#8798AF',
          fontSize: 14,
          fontFamily: 'DIN Alternate'
        }
      })
    }
    this.cityTierData = {
      data: this.cityTier,
      legendData,
      legendX: 'right',
      legendY: 'middle',
      legendLeft: '55%',
      orient: 'vertical',
      size: ['45%', '70%'],
      position: ['27%', '50%']
    }
  }

  // 处理一下城市分布
  formatProfileData() {
    const xData = []
    const yData = []
    for (const item of this.cityProfile) {
      yData.push(item.name)
      xData.push(item.value)
    }
    this.cityProfileData = {
      xData,
      yData,
      labelFormatter: '{c}%'
    }
  }

  // 去往列表页
  async goCityList() {
    const applink = 'reportRelateCityList'
    const objectData = {
      applinkData:
        'jydataadvertiser://scheme?p=' + applink + '&orderId=' + this.orderId,
      originUrl: location.href
    }
    const obj = { params: objectData }
    await openAppLinkClient(obj)
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
.morecity {
  font-size: 30px;
  line-height: 28px;
  color: #7aa0f5;
  text-align: center;
  padding: 0 0 60px 0;
}
</style>
