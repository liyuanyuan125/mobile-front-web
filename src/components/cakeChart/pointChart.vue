<template>
  <div class="china-map">
      <div ref="annular" :style="{width:width+'px',height:height+'px'}"  class="chart-wrap"></div>
        <div class="chart-mask">
          <div class="chart-text" :style="{color:nameColor}">{{sesnsitivity}}</div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import {DataItem} from './types'
import { getPointOption} from './data'
import eCharts from 'echarts'
@Component({})

export default class ChinaMap extends Vue {
  /** 数据 */
  @Prop({ type: Object, default: () => [] }) data!: DataItem
 /** 长宽 */
  @Prop({ type: Number, default: 375 }) width!: number
  @Prop({ type: Number, default: 300 }) height!: number
  // 敏感度
  sesnsitivity: string = ''
  // 文本颜色
  nameColor: string = ''
  mounted() {
    this.getcherts()
  }
  getcherts() {
  const myEcharts = this.$refs.annular as HTMLDivElement
  const myChart = eCharts.init(myEcharts)
  const openData: any = {
      optionName: [],
      optionData: [],
      data: this.data.data,
      title: this.data.title || '', // title 名称
      emphasisShow: this.data.emphasisShow ||  true, // 是否显示中间的文字
      color: this.data.color || [  '#FF6262' , '#7CA4FF' , '#4AC2A4' , '#FFCB84' , '#999999'] // 修改颜色
  }

  this.sesnsitivity = this.data.sesnsitivity || ''
  let max: number = 0
  this.data.data.forEach((it: any) => {
    max += Number(it.value + '')
  })
  this.data.data.forEach((it: any) => {
    openData.optionName.push(it.name)
    const obj = {
      name: it.name,
      value: Number((Number(it.value + '') / max)) * 100
    }
    openData.optionData.push(obj)
  })
  const option: object = getPointOption(openData)
  myChart.setOption(option)
    // let index = 0
  const $this: any = this
    // 当鼠标移入时
    myChart.on('mouseover', (e: any) => {
      $this.proportion = e.percent + '%'
      $this.name = e.name
      $this.nameColor = e.color
    })

    // 当鼠标离开时，把当前项置为选中
    myChart.on('mouseout', (e: any) => {
      $this.proportion = ''
      $this.name = ''
      $this.nameColor = ''
    })
  }
}
</script>

<style lang="less" scoped>
  .china-map{
    position: relative;
  }
  .chart-wrap{
    width: 100%;
    height:600px;
  }
  .chart-mask{
    position: absolute;
    width: 100%;
    height:600px;
    top: 0;
    background: 'rabg(255,255,255,0)';
    display: flex;
    align-items: center;
    
    
  }
  .chart-text{
    left: 23%;
    position: relative;
    width: 20%;
    height: 20%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #4A4A4A;
    font-size: 24px;
  
  }
</style>
