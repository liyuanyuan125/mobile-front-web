<template>
  <div class="content-wrap">
    <div ref="refChart" class="chart-wrap"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import echarts from 'echarts'
import { find } from 'lodash'
import { tooltipStyles } from '@/util/echarts'
const defaultColor: any = ['#85B9FF', '#9FDECF', '#FFCB84', '#FF8080', '#dddeef']

@Component({
  components: {}
})
// 基础面积图
export default class UserGender extends ViewBase {
  @Prop({ type: Array }) genderOption!: any
  @Prop({ type: Array, default: () => defaultColor }) bgColor: any

  // chart数据
  chartData: any = {
    xData: [],
    yData: []
  }
  mounted() {
    this.formatChartData()
    this.updateCharts()
  }

  // 格式化数据
  formatChartData() {
    const xData = []
    const yData = []
    for (const item of this.genderOption) {
      this.chartData.xData.push(item.name)
      this.chartData.yData.push(item.value)
    }
    // console.log(this.bgColor)
  }

  // 接口没调
  updateCharts() {
    const chartEl = this.$refs.refChart as HTMLDivElement
    echarts.dispose(chartEl)
    chartEl.innerHTML = ''
    const myChart = echarts.init(chartEl)
    const option: any = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        y: 'middle',
        data: this.chartData.xData
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
          hoverOffset: 5,
          center: ['40%', '50%'],
          radius: ['45%', '80%'],
          data: this.genderOption
          // label: {
          //   normal: {
          //     show: false,
          //     position: 'center'
          //   },
          //   emphasis: {
          //     show: true,
          //     textStyle: {
          //       fontSize: '30',
          //       fontWeight: 'bold'
          //     }
          //   }
          // },
          // labelLine: {
          //   normal: {
          //     show: false
          //   }
          // }
        }
      ]
    }
    // console.save(option, `${new Date()}.json`)
    myChart.setOption(option)
  }
}
</script>

<style lang="less" scoped>
.content-wrap {
  position: relative;
  width: 100%;
  height: 400px;
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