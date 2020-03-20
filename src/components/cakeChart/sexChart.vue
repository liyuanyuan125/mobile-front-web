<template>
  <div class="china-map">
      <div ref="annular" :style="{width:width+'px',height:height+'px'}" class="chart-wrap"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import {DataItem} from './types'
import {getSexOption , getRingOption} from './data'
import eCharts from 'echarts'
@Component({})

export default class ChinaMap extends Vue {
  /** 数据 */
  @Prop({ type: Object, default: () => [] }) data!: DataItem
  /** 长宽 */
  @Prop({ type: Number, default: 375 }) width!: number
  @Prop({ type: Number, default: 300 }) height!: number


  mounted() {
    this.getcherts()
  }
  getcherts() {
  const myEcharts = this.$refs.annular as HTMLDivElement
  const eChart = eCharts.init(myEcharts)
  const data: any = {
      optionName: [],
      optionData: [],
      data: this.data.data,
      title: this.data.title || '', // title 名称
      emphasisShow: this.data.emphasisShow ||  true, // 是否显示中间的文字
      color: this.data.color || [  '#7CA4FF' , '#FF6262'], // 修改颜色
      titleShow: this.data.titleShow || false, // 是否显示标题
      titleMargin: this.data.titleMargin || 20, // 标题部分padding[20,20,20,20]||20
      titleLeft: this.data.titleLeft || 'left', // 标题位置 left center right
      titleSize: this.data.titleSize || 18, // 标题字体大小
      titleWeight: this.data.titleWeight || 'bold', // 标题字体粗细
      legendtoFixed : this.data.legendtoFixed || 1 // legend显示几位小数
  }
  let max: number = 0
  this.data.data.forEach((it: any) => {
    max += Number(it.value + '')
  })
  this.data.data.forEach((it: any) => {
    data.optionName.unshift(it.name)
    const obj = {
      name: it.name,
      value: Number((Number(it.value + '') / max)) * 100
    }
    data.optionData.unshift(obj)
  })
  const option: object = getSexOption(data)
  eChart.setOption(option)
  }
}
</script>

<style lang="less" scoped>
  .chart-wrap {
    width: 400px;
    height: 400px;
  }
</style>