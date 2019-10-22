<template>
  <div class="userportrait">
    <h3>观影用户画像</h3>
    <h4 v-if="userAges">年龄占比</h4>
    <div style="margin-top:15px">
      <BarGraph :dataOption="userAgesData" />
    </div>
    <h4 v-if="userGender" style="margin-top:50px;">性别占比</h4>
    <div class="usergender">
      <PieGraph :dataOption="userGenderData" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import BarGraph from '@/components/charts/barGraph.vue'
import PieGraph from '@/components/charts/pieGraph.vue'

@Component({
  components: {
    BarGraph,
    PieGraph
  }
})
export default class UserPortrait extends ViewBase {
  @Prop({ type: Array }) userAges!: any
  @Prop({ type: Array }) userGender!: any

  userAgesData: any = {}
  userGenderData: any = {}

  created() {
    this.formatAgesData()
    this.formatGenderLegend()
  }

  // 处理年龄数据
  formatAgesData() {
    const xData = []
    const yData = []
    for (const item of this.userAges) {
      xData.push(item.range)
      yData.push(item.value)
    }
    this.userAgesData = {
      xData,
      yData
    }
  }

  // 处理年龄legend数据
  formatGenderLegend() {
    const legendData = []
    for (const item of this.userGender) {
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
    this.userGenderData = {
      data: this.userGender,
      legendData,
      legendLeft: '65%',
      legendX: 'right',
      legendY: 'middle',
      orient: 'vertical',
      size: ['40%', '65%'],
      position: ['35%', '50%']
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
