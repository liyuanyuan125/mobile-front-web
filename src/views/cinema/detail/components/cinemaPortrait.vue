<template>
  <div class="portrait">
    <h3>用户画像</h3>
    <h4>年龄占比</h4>
    <div class="userage">
      <div class="example" v-if="!portrait.showData"></div>
      <BarGraph :dataOption="userAgesData" />
    </div>
    <div class="col">
      <span class="example" v-if="!portrait.showData"></span>
      <div>
        <h4>性别占比</h4>
        <div class="usergender">
          <PieGraph :dataOption="userGenderData" />
        </div>
      </div>
      <div>
        <h4>婚恋状态</h4>
        <div class="usergender">
          <PieGraph :dataOption="userMaritalData" :bgColor="bgcolor" />
        </div>
      </div>
    </div>
    <h4 style="margin-top:40px">消费偏好</h4>
    <div class="usergender">
      <div class="example" v-if="!portrait.showData"></div>
      <BarGraphRow :dataOption="userPerferData" :bgcolor="perferColor" />
      <p class="perferdesc" v-if="portrait.consumePerfer">{{portrait.consumePerfer.desc}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import BarGraph from '@/components/charts/barGraph.vue'
import PieGraph from '@/components/charts/pieGraph.vue'
import BarGraphRow from '@/components/charts/barGraphRow.vue'

@Component({
  components: {
    BarGraph,
    PieGraph,
    BarGraphRow
  }
})
export default class CinemaPortrait extends ViewBase {
  @Prop({ type: Object }) portrait!: any

  userAgesData: any = null
  userGenderData: any = null
  userMaritalData: any = null
  userPerferData: any = null
  bgcolor: any = ['#9FDECF', '#FFCB84', '#A0BBF9', '#D9E0E9']
  perferColor: any = ['#A0BBF9', '#A0BBF9', '#A0BBF9', '#D9E0E9']

  created() {
    this.formatAgesData()
    this.formatGenderLegend()
    this.formatMaritalLegend()
    this.formatPerferData()
  }

  // 处理年龄数据
  formatAgesData() {
    const xData = []
    const yData = []
    const rait = this.portrait.userAges
    if (rait && rait.length) {
      for (const item of rait) {
        xData.push(item.range)
        yData.push(item.value)
      }
      this.userAgesData = {
        xData,
        yData
      }
    }
  }

  // 处理性别数据
  formatGenderLegend() {
    const legendData = []
    const userGenderObj = []
    const rait = this.portrait.userGender
    if (rait && rait.length) {
      for (const item of rait) {
        userGenderObj.push({
          name: item.type,
          value: item.value
        })
        legendData.push({
          name: item.type,
          icon: 'circle',
          textStyle: {
            color: '#8798AF',
            fontSize: 14,
            fontFamily: 'DIN Alternate'
          }
        })
      }
      this.userGenderData = {
        data: userGenderObj,
        legendData,
        legendX: 'left',
        legendY: '68%',
        legendLeft: 30,
        orient: 'vertical',
        size: ['40%', '65%'],
        position: ['50%', '35%']
      }
    }
  }

  // 处理婚恋数据
  formatMaritalLegend() {
    const legendData = []
    const userMaritalObj = []
    const rait = this.portrait.userMarital
    if (rait && rait.length) {
      for (const item of rait) {
        userMaritalObj.push({
          name: item.status,
          value: item.value
        })
        legendData.push({
          name: item.status,
          icon: 'circle',
          textStyle: {
            color: '#8798AF',
            fontSize: 14,
            fontFamily: 'DIN Alternate'
          }
        })
      }
      this.userMaritalData = {
        data: userMaritalObj,
        legendData,
        legendX: 'center',
        legendY: '68%',
        legendLeft: 30,
        orient: 'vertical',
        size: ['40%', '65%'],
        position: ['50%', '35%']
      }
    }
  }

  // 处理消费偏好的数据
  formatPerferData() {
    const xData = []
    const yData = []
    const rait = this.portrait.consumePerfer
    if (rait && rait.data.length) {
      for (const item of rait.data) {
        yData.push(item.type)
        xData.push(item.value)
      }
      this.userPerferData = {
        xData,
        yData,
        labelFormatter: '{c}'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
