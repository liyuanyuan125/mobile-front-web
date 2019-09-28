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

const tooltipsDefault = tooltipStyles({
  trigger: 'item',
  formatter: '{b} <br/> {c}'
})

@Component({
  components: {}
})
// 基础面积图
export default class AreaBasic extends ViewBase {
  @Prop({ type: Boolean, default: false }) initDone!: boolean

  @Prop({ type: String, default: '' }) title!: string

  @Prop({ type: String, default: '' }) titleTips?: string

  @Prop({ type: Number, default: 0 }) currentTypeIndex!: number

  @Prop({ type: Array, default: () => [] }) dict1!: any[]

  @Prop({ type: Array, default: () => [] }) dict2!: any[]

  @Prop({ type: Array, default: () => ['#00B6CC'] }) color!: string[]

  @Prop({ type: Array, default: () => [] }) dataList!: any[]

  @Prop({ type: Number, default: 400 }) height!: number

  @Prop({ type: Object, default: () => ({ ...tooltipsDefault }) }) toolTip?: any

  currentIndex: number = this.currentTypeIndex

  currentTypeChange(index: number) {
    if (!this.initDone) {
      return
    }
    this.currentIndex = index
    this.$emit('typeChange', index)
  }

  resetOptions() {
    this.currentIndex = this.currentTypeIndex
  }
  mounted() {
    this.resetOptions()
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
        boundaryGap: false,
        data: ['09-01', '09-10', '09-20', '09-30']
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
        containLabel: true,
        show: false,
        borderWidth: 0
      },

      series: [
        {
          data: [100, 240, 300, 150],
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 1
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

  @Watch('initDone')
  watchInitDone(val: boolean) {
    if (val) {
      this.$nextTick(() => {
        this.resetOptions()
        this.updateCharts()
      })
    }
  }

  @Watch('currentTypeIndex')
  watchcurrentTypeIndex(newIndex: any, oldIndex: any) {
    if (newIndex !== oldIndex) {
      this.resetOptions()
      this.updateCharts()
    }
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