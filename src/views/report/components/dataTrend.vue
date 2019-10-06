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
      <div :style="{opacity:buttonIndex == 1 ? 1 :0}">
        <AreaBasic :dataOption="dataTrend.showCost" :key="1" />
      </div>
      <div :style="{opacity:buttonIndex == 2 ? 1 :0}">
        <AreaBasic :dataOption="dataTrend.showPerson" :key="2" />
      </div>
      <div :style="{opacity:buttonIndex == 3 ? 1 :0}">
        <AreaBasic :dataOption="dataTrend.showScene" :key="3" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import AreaBasic from '../echarts/dataTrend.vue'

@Component({
  components: {
    AreaBasic
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
  buttonIndex: number = 1

  changeIndex(event: any) {
    const ind = event.target.dataset.index
    this.buttonIndex = Number(ind)
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
