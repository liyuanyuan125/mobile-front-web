<template>
  <div class="portrait">
    <h3>用户画像</h3>
    <h4>年龄占比</h4>
    <div class="userage">
      <BarGraph :dataOption="userAgesData" />
    </div>
    <div class="col">
      <div>
        <h4>性别占比</h4>
        <div class="usergender">
          <PieGraph :dataOption="userGenderData" />
        </div>
      </div>
      <div>
        <h4>婚恋状态</h4>
        <div class="usergender">
          <PieGraph :dataOption="userGenderData" />
        </div>
      </div>
    </div>
    <h4>消费偏好</h4>
    <div class="usergender">
      <BarGraphRow :dataOption="userPerferData" />
      <p>{{portrait.consumePerfer.desc}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import BarGraph from '@/components/charts/barGraph.vue'
import PieGraph from '@/components/charts/pieGraph.vue'
import BarGraphRow from '@/components/charts/barGraphRow.vue'

@Component({
  components: {
    BarGraph,
    PieGraph,
    BarGraphRow
  }
})
export default class CinemaPortrait extends ViewBase {
  @Prop({ type: Object }) portrait!: any

  userAgesData: any = {}
  userGenderData: any = {}
  userPerferData: any = {}

  created() {
    this.formatAgesData()
    this.formatGenderLegend()
    this.formatPerferData()
  }

  // 处理年龄数据
  formatAgesData() {
    const xData = []
    const yData = []
    for (const item of this.portrait.userAges) {
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
    const userGender = []
    for (const item of this.portrait.userGender) {
      userGender.push({
        name: item.type,
        value: item.value
      })
      legendData.push({
        name: item.name,
        icon: 'circle',
        textStyle: {
          color: '#8798AF',
          fontSize: 16
        }
      })
    }
    this.userGenderData = {
      data: userGender,
      legendData,
      legendX: 'right',
      legendY: 'middle',
      orient: 'vertical',
      size: ['40%', '65%'],
      position: ['35%', '50%']
    }
  }

  // 处理一下城市线数据
  formatPerferData() {
    const xData = []
    const yData = []
    for (const item of this.portrait.consumePerfer.data) {
      yData.push(item.type)
      xData.push(item.value)
    }
    this.userPerferData = {
      xData,
      yData
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
