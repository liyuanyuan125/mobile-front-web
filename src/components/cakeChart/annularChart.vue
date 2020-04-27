<template>
  <div>
    <div class="china-map"  v-if="data.data && data.data.length > 0" >
        <div ref="annular" :style="{width:sizeWidth+'px',height:sizeWidth+'px'}" class="chart-wrap"></div>
          <div class="chart-mask">
            <div class="chart-text">
                <span class="proportion" :style="{color:nameColor}">{{proportion}}</span>
                <br>
                <span class="name">{{name}}</span>
            </div>
          </div>
      </div>
      <DataEmpty v-if="!data.data || (data.data&&data.data.length == 0)" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import DataEmpty from '@/views/common/dataEmpty/index.vue'
import {DataItem} from './types'
import { getRingOption} from './data'
import eCharts from 'echarts'
@Component({
  components: {
    DataEmpty
  }
})

export default class AnnularChart extends Vue {
  /** 数据 */
  @Prop({ type: Object, default: () => [] }) data!: DataItem
   /** 长宽 */
  @Prop({ type: Number, default: 0 }) width!: number
  // 圈内的百分比
  proportion: string = ''
  // 圈内的文本
  name: string = ''
  // 文本颜色
  nameColor: string = ''
  // 组件宽度
  sizeWidth: number = this.getSize(this.width)
  // 指示线的长度
  length2: number = document.documentElement.clientWidth * 0.2

  @Watch('width')
  setSize() {
    this.getSize(this.width)
  }
  mounted() {
    this.getSize(this.width)
    this.getcherts()
  }
  getSize(width: number) {
    const w = document.documentElement.clientWidth
    // 判断当前图标width 最小300  最大屏幕宽度
  if (width >= w || width == 0 ) {
        this.sizeWidth = w
    } else if (width < 300 ) {
      this.sizeWidth = 300
    }  else {
      this.sizeWidth = width
    }
    this.length2 =  this.sizeWidth * 0.2
    return this.sizeWidth
  }
  getcherts() {
    if (!this.data.data || this.data.data.length == 0 ) {
      return
    }
  const myEcharts = this.$refs.annular as HTMLDivElement
  let colorIndex = -1
  let maxValue = 0
  let allValue = 0
  let name = ''
  let fontSize: number = 10
  let withinProportion: string = '34%'
  let externalProportion: string = '44%'
  if (this.sizeWidth > 320 && this.sizeWidth <= 414) {
    fontSize = 10
    withinProportion = '34%'
    externalProportion = '44%'
  } else if (this.sizeWidth <= 320 ) {
    fontSize = 8
    withinProportion = '30%'
    externalProportion = '40%'

  } else {
    fontSize = 12
    withinProportion = '34%'
    externalProportion = '44%'
  }
  this.data.data.forEach((it: any, index: number) => {
    maxValue = it.value > maxValue ? it.value : maxValue
    allValue +=  it.value
    if (maxValue == it.value) {
      colorIndex = index
      name = it.name
    }
    if (it.name.length > 5) {
      it.name = it.name.substring(0, 4) + '...'
    }
  })
  const myChart = eCharts.init(myEcharts)
  const openData: any = {
      data: this.data.data,
      title: this.data.title ? this.data.title : '', // title 名称
      color: this.data.color ? this.data.color : [  '#79DDC5' , '#8DC3FF', '#5B72FF', '#9577FF', '#DD77FF'], // 修改颜色
      titleShow: this.data.titleShow || true, // 是否显示标题
      titleMargin: this.data.titleMargin || 20, // 标题部分padding[20,20,20,20]||20
      titleLeft: this.data.titleLeft || 'left', // 标题位置 left center right
      titleSize: this.data.titleSize || 18, // 标题字体大小
      titleWeight: this.data.titleWeight || 'bold', // 标题字体粗细
      legendtoFixed : this.data.legendtoFixed || 2, // legend显示几位小数
      length2: this.length2,
      fontsize: fontSize,
      withinProportion ,
      externalProportion
  }
  const option: object = getRingOption(openData)
  myChart.setOption(option)
  // let index = 0
  const $this: any = this
    // 设置默认选中高亮部分
    this.proportion = (Number((maxValue / allValue)) * 100).toFixed(openData.legendtoFixed) + '%'
    if (openData.color[colorIndex]) {
      this.nameColor = openData.color[colorIndex]
    }
    this.name = name
    myChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: colorIndex})
    // 当鼠标移入时
    myChart.on('mouseover', (e: any) => {
      $this.proportion = e.percent.toFixed(openData.legendtoFixed) + '%'
      $this.name = e.name
      $this.nameColor = e.color
      if (e.dataIndex != colorIndex) {
        myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: colorIndex  })
      }
      if (e.dataIndex == 0) {
        colorIndex =  e.dataIndex
        myChart.dispatchAction({type: 'highlight', seriesIndex: 0 , dataIndex: e.dataIndex})
      }

    })

    // 当鼠标离开时，把当前项置为选中
    myChart.on('mouseout', (e: any) => {
      $this.proportion = ''
      $this.name = ''
      $this.nameColor = ''
      myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: colorIndex})
    })
  }
}
</script>

<style lang="less" scoped>
  .china-map {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .chart-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background: 'rabg(255,255,255,0)';
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chart-text {
    width: 25%;
    min-width: 90px;
    height: 20%;
    text-align: center;
    .proportion {
      font-size: 50px;
    }
    .name {
      color: #303030;
      font-size: 24px;
    }
  }
</style>
