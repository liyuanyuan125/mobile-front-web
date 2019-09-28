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

@Component({
  components: {}
})
// 基础面积图
export default class UserAge extends ViewBase {
  mounted() {
    this.updateCharts()
  }

  // 接口没调
  updateCharts() {
    const chartEl = this.$refs.refChart as HTMLDivElement

    echarts.dispose(chartEl)
    chartEl.innerHTML = ''

    const myChart = echarts.init(chartEl)

    const option: any = {
      // color: this.color[this.currentIndex],
      // ...pubOption,
      // tooltip: this.toolTip,
      // height: '445px',

      xAxis: {
        type: 'category',
        data: ['小于25岁', '26-35岁', '36-45岁', '大于46岁']
        // axisLabel: {
        //   textStyle: {
        //     color: '#fff'
        //   }
        // }
      },

      yAxis: {
        type: 'value'
        // axisLabel: {
        //   textStyle: {
        //     color: '#fff'
        //   }
        // }
      },

      grid: {
        // height: 445,
        containLabel: true,
        show: false,
        borderWidth: 0
      },

      series: [
        {
          data: [10, 44, 30, 26],
          type: 'bar',
          smooth: true,
          label: {
            normal: {
              show: true,
              position: 'outside'
            }
          },
          areaStyle: {
            // shadowColor: this.color[this.currentIndex],
            // opacity: 0.4,
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(0,182,204, 1)'
                },
                {
                  offset: 1,
                  color: ' rgba(0,182,204, 0.2)'
                }
              ])
            }
          }
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