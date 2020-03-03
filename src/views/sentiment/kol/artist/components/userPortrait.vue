<template>
  <div class="userportrait">
    <h4>性别年龄占比</h4>
    <div style="margin-top:15px;width: 35%;display: inline-block">
      <BarGraph :dataOption="userAgesData" />
    </div>
    <div style="margin-top:15px;width: 65%;display: inline-block">
      <barGraphRow :dataOption="userGenderData" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import BarGraph from '@/components/kol/barGraph.vue'
import barGraphRow from '@/components/kol/barGraphRow.vue'

@Component({
  components: {
    BarGraph,
    barGraphRow
  }
})
export default class UserPortrait extends ViewBase {
  @Prop({ type: Array }) userAges!: any
  @Prop({ type: Array }) userGender!: any

  userAgesData: any = null
  userGenderData: any = null

  created() {
    this.formatAgesData()
    this.formatAgesData1()
  }

  // 处理年龄数据
  formatAgesData() {
    const xData = []
    const yData = []
    const rait = this.userAges
    if (rait && rait.length) {
      for (const item of this.userAges) {
        xData.push(item.range)
        yData.push(item.value)
      }
      this.userAgesData = {
        xData,
        yData
      }
    }
  }

  formatAgesData1() {
    const xData = []
    const yData = []
    const rait = this.userGender
    if (rait && rait.length) {
      for (const item of this.userGender) {
        xData.push(item.value)
        yData.push(item.type)
      }
      this.userGenderData = {
        xData,
        yData
      }
    }
  }

  // 处理年龄legend数据
  formatGenderLegend() {
    const legendData = []
    const rait = this.userGender
    if (rait && rait.length) {
      for (const item of this.userGender) {
        legendData.push({
          name: item.name,
          icon: 'circle',
          textStyle: {
            color: '#8798AF',
            fontSize: 13,
            fontFamily: 'DIN Alternate'
          }
        })
      }
      this.userGenderData = {
        data: this.userGender,
        legendData,
        legendLeft: '65%',
        legendX: 'right',
        legendY: 'middle',
        orient: 'vertical',
        size: ['40%', '65%'],
        position: ['35%', '50%']
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
h4 {
  font-size: 40px;
  font-weight: 500;
  color: rgba(48,48,48,1);
  line-height: 40px;
  margin-left: 5%;
}

</style>
