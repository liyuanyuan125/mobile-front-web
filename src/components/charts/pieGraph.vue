<template>
  <div class="content-wrap">
    <div class="chart-default" v-if="!dataOption"></div>
    <div ref="refChart" v-if="dataOption" class="chart-wrap"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import echarts from 'echarts'
import { find } from 'lodash'
import { tooltipStyles } from '@/util/echarts'
const defaultColor: any = [
  '#85B9FF',
  '#FF8080',
  '#9FDECF',
  '#99D8FF',
  '#FFCB84',
  '#B9A5FF'
]

@Component({
  components: {}
})
// 基础面积图
export default class PieGraph extends ViewBase {
  @Prop({ type: Object }) dataOption!: any
  @Prop({ type: Array, default: () => defaultColor }) bgColor: any
  @Prop({ type: Boolean }) isRenderImg!: boolean

  mounted() {
    if (this.dataOption) {
      this.updateCharts()
    }
  }

  // 重新渲染页面
  @Watch('isRenderImg')
  watchPageOn() {
    if (this.isRenderImg) {
      // this.updateCharts()
      setTimeout(() => {
        this.changeCanvas()
      }, 800)
    } else {
      this.updateCharts()
    }
  }

  // 将canvas 转成图
  changeCanvas() {
    const chartEl = this.$refs.refChart as HTMLDivElement
    const canvasEl = chartEl.getElementsByTagName('canvas')[0] as HTMLCanvasElement
    if (canvasEl) {
      const image = new Image()
      image.src = canvasEl.toDataURL('image/png')
      image.style.width = '100%'
      chartEl.innerHTML = `<img src="${image.src}" style="width:100%" />`
    }
  }

  // 接口没调
  updateCharts() {
    const chartEl = this.$refs.refChart as HTMLDivElement
    echarts.dispose(chartEl)
    chartEl.innerHTML = ''
    const myChart = echarts.init(chartEl)
    const option: any = {
      tooltip: {
        show: false
        // trigger: 'item',
        // formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: this.dataOption.orient, // 方向 横或竖
        x: this.dataOption.legendX, // 位置
        y: this.dataOption.legendY,
        data: this.dataOption.legendData,
        itemWidth: 8,
        itemGap: 15, // 图例之间的距离
        align: 'left', // 图例对齐方向
        left: this.dataOption.legendLeft,
        selectedMode: false, // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态
        formatter: (name: string) => this.handleLegendLayout(name)
      },
      grid: {
        left: '15px',
        right: '15px',
        top: '15px',
        bottom: '15px'
      },
      color: this.bgColor,
      series: [
        {
          type: 'pie',
          selectedOffset: 3,
          label: {
            show: false
          },
          // markPoint: {
          //   emphasis: {
          //     itemStyle: {
          //       opacity: 1
          //     }
          //   }
          // },
          itemStyle: {
            shadowColor: 'rgba(0, 0, 0, 0.14)',
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowOffsetY: 0
          },
          center: this.dataOption.position,
          radius: this.dataOption.size,
          data: this.dataOption.data
        }
      ]
    }
    // console.save(option, `${new Date()}.json`)
    myChart.setOption(option)
  }

  // 处理legend显示格式
  handleLegendLayout(name: string) {
    const nameArr = []
    const dataArr = []
    for (const item of this.dataOption.data) {
      nameArr.push(item.name)
      dataArr.push(item.value)
    }
    let index = 0
    const labels = nameArr
    const counts = dataArr
    labels.forEach((value, i) => {
      if (value == name) {
        index = i
      }
    })
    return name + ' ' + counts[index] + '%'
  }
}
</script>

<style lang="less" scoped>
.content-wrap {
  position: relative;
  width: 100%;
  height: 400px;
}
.chart-default {
  background: url('../../assets/data-null.png') no-repeat center;
  background-size: 201px auto;
  width: 100%;
  height: 100%;
}
.chart-wrap {
  width: 100%;
  height: 400px;
}
.chart-wrap:empty {
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: '暂无数据';
    font-size: 18px;
    color: #999;
  }
}
.chart-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
}
</style>
