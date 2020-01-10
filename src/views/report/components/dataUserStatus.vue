<template>
  <div class="userStatus">
    <h3 v-if="userAges">年龄占比</h3>
    <div class="userage">
      <BarGraph :dataOption="userAgesData" :isRenderImg="isRenderImg" />
    </div>
    <h3 v-if="userGender">性别占比</h3>
    <div class="usergender">
      <PieGraph :dataOption="userGenderData" :isRenderImg="isRenderImg" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import BarGraph from '@/components/charts/barGraph.vue'
import PieGraph from '@/components/charts/pieGraph.vue'

@Component({
  components: {
    BarGraph,
    PieGraph
  }
})
export default class DataUserStatus extends ViewBase {
  @Prop({ type: Array }) userAges!: any
  @Prop({ type: Array }) userGender!: any
  @Prop({ type: Boolean }) isRenderImg!: boolean

  userAgesData: any = {}
  userGenderData: any = {}

  created() {
    this.formatAgesData()
    this.formatGenderLegend()
  }

  // 重新渲染页面
  @Watch('isRenderImg') // 进入页面开始倒计时
  watchPageOn() {
    if (this.isRenderImg) {
      this.formatAgesData()
      this.formatGenderLegend()
    }
  }

  // 处理年龄数据
  formatAgesData() {
    const xData = []
    const yData = []
    for (const item of this.userAges) {
      xData.push(item.range)
      yData.push(item.value)
    }
    this.userAgesData = {
      xData,
      yData
    }
  }

  // 处理性别数据
  formatGenderLegend() {
    const legendData = []
    for (const item of this.userGender) {
      legendData.push({
        name: item.name,
        icon: 'circle',
        textStyle: {
          color: '#8798AF',
          fontSize: 14,
          fontFamily: 'DIN Alternate'
        }
      })
    }
    this.userGenderData = {
      data: this.userGender,
      legendData,
      legendLeft: '58%',
      legendX: 'right',
      legendY: 'middle',
      orient: 'vertical',
      size: ['45%', '70%'],
      position: ['30%', '50%']
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
