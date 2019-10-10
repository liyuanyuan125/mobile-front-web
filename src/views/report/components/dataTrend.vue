<template>
  <div class="datatrend">
    <div class="tit">
      <h3>数据趋势</h3>
      <span>{{dataTrend.showDate}}</span>
    </div>
    <ul class="tabindex">
      <li v-for="item in buttonArr" :key="item.id" :class="item.id === buttonIndex ? 'active' : ''">
        <button @click="changeIndex($event)" :data-index="item.id">{{item.name}}</button>
      </li>
    </ul>
    <div class="chartbox">
      <div :style="{opacity:showCost,zIndex:showCost}">
        <LineGraph :dataOption="showCostData" />
      </div>
      <div :style="{opacity:showPerson,zIndex:showPerson}">
        <LineGraph :dataOption="showPersonData" />
      </div>
      <div :style="{opacity:showScene,zIndex:showScene}">
        <LineGraph :dataOption="showSceneData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import LineGraph from '@/components/charts/lineGraph.vue'

@Component({
  components: {
    LineGraph
  }
})
export default class DataTrend extends ViewBase {
  @Prop({ type: Object }) dataTrend!: any

  buttonArr: any = [
    {
      name: '支付金额',
      id: 1
    },
    {
      name: '曝光人次',
      id: 2
    },
    {
      name: '曝光场次',
      id: 3
    }
  ]
  // button切换签
  buttonIndex: number = 1
  // 控制相应的chart显示
  showCost: number = 1
  showPerson: number = 0
  showScene: number = 0
  // 处理相应的数据
  showCostData: any = {}
  showPersonData: any = {}
  showSceneData: any = {}

  created() {
    this.formatCostData()
    this.formatPersonData()
    this.formatSceneData()
  }
  // 处理金额支出
  formatCostData() {
    const xData = []
    const yData = []
    for (const item of this.dataTrend.showCost.data) {
      xData.push(item.date)
      yData.push(item.value)
    }
    this.showCostData = {
      xData,
      yData,
      title: '支出金额',
      unit: this.dataTrend.showCost.dataUnit,
      type: 1
    }
  }
  // 处理曝光人次
  formatPersonData() {
    const xData = []
    const yData = []
    for (const item of this.dataTrend.showPerson.data) {
      xData.push(item.date)
      yData.push(item.value)
    }
    this.showPersonData = {
      xData,
      yData,
      title: '曝光人次',
      unit: this.dataTrend.showPerson.dataUnit,
      type: 2
    }
  }
  // 处理曝光场次
  formatSceneData() {
    const xData = []
    const yData = []
    for (const item of this.dataTrend.showScene.data) {
      xData.push(item.date)
      yData.push(item.value)
    }
    this.showSceneData = {
      xData,
      yData,
      title: '曝光场次',
      unit: this.dataTrend.showScene.dataUnit,
      type: 3
    }
  }

  changeIndex(event: any) {
    const ind = event.target.dataset.index
    this.buttonIndex = Number(ind)
    this.showCost = ind == '1' ? 1 : 0
    this.showPerson = ind == '2' ? 1 : 0
    this.showScene = ind == '3' ? 1 : 0
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
