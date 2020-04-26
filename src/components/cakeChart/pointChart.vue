<template>
  <div>
    <div class="china-map" v-if="data.data && data.data.length > 0">
      <div ref="annular" :style="{width:sizeWidth+'px',height:sizeWidth+'px'}"  class="chart-wrap"></div>
        <div class="chart-mask" :style="{width:sizeWidth+'px',height:sizeWidth+'px'}">
        <div class="chart-text" :style="{color:nameColor}">{{sesnsitivity}}</div>
      </div>
  </div>
  <DataEmpty v-if="!data.data || (data.data&&data.data.length == 0)" />
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import {DataItem} from './types'
import { getPointOption} from './data'
import eCharts from 'echarts'
import DataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
      DataEmpty
  }
})

export default class PointChart extends Vue {
  /** 数据 */
  @Prop({ type: Object, default: () => [] }) data!: DataItem
 /** 长宽 */
  @Prop({ type: Number, default: 0 }) width!: number
  // 敏感度
  sesnsitivity: string = ''
  // 文本颜色
  nameColor: string = ''
  // 组件宽度
  sizeWidth: number = this.getSize(this.width)
  mounted() {
    this.getcherts()
  }
  getcherts() {
  if (!this.data.data || this.data.data.length == 0 ) {
    return
  }
  const myEcharts = this.$refs.annular as HTMLDivElement
  const myChart = eCharts.init(myEcharts)
  const openData: any = {
      optionName: [],
      optionData: [],
      data: this.data.data,
      title: this.data.title || '', // title 名称
      emphasisShow: this.data.emphasisShow ||  true, // 是否显示中间的文字
      color: this.data.color || [  '#FF6262' , '#7CA4FF' , '#4AC2A4' , '#FFCB84' , '#999999'], // 修改颜色
      titleShow: this.data.titleShow || false, // 是否显示标题
      titleMargin: this.data.titleMargin || 20, // 标题部分padding[20,20,20,20]||20
      titleLeft: this.data.titleLeft || 'left', // 标题位置 left center right
      titleSize: this.data.titleSize || 18, // 标题字体大小
      titleWeight: this.data.titleWeight || 'bold', // 标题字体粗细
      legendtoFixed : this.data.legendtoFixed || 1 // legend显示几位小数
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
  getSize(width: number) {
    const w = document.documentElement.clientWidth
        if (width >= w || width < 300) {
            this.sizeWidth = w
        } else {
            this.sizeWidth = width
        }
        return this.sizeWidth
  }
}
</script>

<style lang="less" scoped>
  .china-map {
    position: relative;
    display: flex;
    justify-content: center;
  }
  .chart-wrap {
    width: 100%;
    height: 600px;
  }
  .chart-mask {
    position: absolute;
    top: 0;
    background: 'rabg(255,255,255,0)';
    display: flex;
    align-items: center;
  }
  .chart-text {
    left: 23%;
    position: relative;
    width: 20%;
    height: 20%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #4a4a4a;
    font-size: 24px;
  }
</style>
