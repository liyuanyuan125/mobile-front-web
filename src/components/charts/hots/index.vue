<template>
  <div class="content-wrap">
    <div class="line-echart" ref="refChart"></div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import echarts from 'echarts'


@Component
export default class Main extends Vue {
  @Prop({ type: Array, default: () => [] }) lineData!: any
  @Prop({ type: String, default: 'YYYYMMDD'}) timeFormat!: string

  mounted() {
    this.initChart()
  }
  initChart() {
    const chartEl = this.$refs.refChart as HTMLDivElement
    const myChart = echarts.init(chartEl)

    const seriesItems = {
      type: 'line',
      symbol: 'circle',
      symbolSize: 7,
    }
    const options: any = {
      legend: {
        bottom: 0,
        icon: 'rect', // 设置图例标记
        itemHeight: 1.5,
        itemWidth: 20,
        textStyle: {
          color: '#000'
        }
      },
      tooltip: {
        trigger: 'axis',
        confine: true, // 限制在图表的区域内
        // 去掉指示线
        axisPointer: {
          lineStyle: {
            width: 3,
            opacity: 0,
            color: '#8DB0FF'
          }
        },
      },
      grid: {
        left: 20,
        right: 20,
        top: 30,
        bottom: 40,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        // data: ['', '', '', '01-05', '01-10', '01-15', '01-20'],
        axisLabel: {
          color: '#e8e8e8',
        },
        axisTick: { // 隐藏刻度尺
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#ccc',
          }
        }
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        // 分割线样式
        splitLine: {
          lineStyle: {
            color: 'rgba(151,167,195,.45)',
            type: 'dashed'
          }
        }
      },
      dataset: {
        source: this.lineData
      },
      color: ['green', '#ededed', '#000', 'red'],
      // stack: '总量', 占总量的比例
      series: [
        { ...seriesItems},
        { ...seriesItems},
        { ...seriesItems},
        { ...seriesItems},
      ]
    }
    myChart.clear() // 清空画布内容，实例可用
    // myChat.dispose() 释放图标实例，释放后实例不可用
    myChart.setOption(options)

  }
}

</script>

<style lang='less' scoped>
.content-wrap {
  position: relative;
  width: 100%;
}
.line-echart {
  width: 100%;
  height: 500px;
}
.line-title {
  display: flex;
  justify-items: center;
  justify-content: space-between;
}
</style>
