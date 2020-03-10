<template>
  <div>
    <div class="china-map">
        <div ref="annular" :style="{width:width+'px',height:height+'px'}" class="chart-wrap"></div>
          <div class="chart-mask">
            <div class="chart-text">
                <span class="proportion" :style="{color:nameColor}">{{proportion}}</span>
                <span class="name">{{name}}</span>
            </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import {DataItem} from './types'
import { getRingOption} from './data'
import eCharts from 'echarts'
@Component({})

export default class ChinaMap extends Vue {
  /** 数据 */
  @Prop({ type: Object, default: () => [] }) data!: DataItem
   /** 长宽 */
  @Prop({ type: Number, default: 375 }) width!: number
  @Prop({ type: Number, default: 300 }) height!: number
  // 圈内的百分比
  proportion: string = ''
  // 圈内的文本
  name: string = ''
  // 文本颜色
  nameColor: string = ''
  mounted() {
    this.getcherts()
  }
  getcherts() {
  const myEcharts = this.$refs.annular as HTMLDivElement
  const myChart = eCharts.init(myEcharts)
  const openData: any = {
      data: this.data.data,
      title: this.data.title ? this.data.title : '', // title 名称
      color: this.data.color ? this.data.color : [  '#79DDC5' , '#8DC3FF', '#5B72FF', '#9577FF', '#DD77FF'] // 修改颜色
  }
  const option: object = getRingOption(openData)
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
    pointer-events: none;
    display: flex;

    align-items: center;
    justify-content: center;
    
  }
  .chart-text{
    width: 20%;
    height: 20%;
    text-align: center;
    .proportion{
      font-size: 50px;
    }
    .name{
      color: #303030;
      font-size: 24px;
    }
  }
</style>
