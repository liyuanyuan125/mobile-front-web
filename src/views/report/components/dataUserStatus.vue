<template>
  <div class="userStatus">
    <h3 v-if="userAges">年龄占比</h3>
    <div class="userage">
      <BarGraph :dataOption="userAgesData" />
    </div>
    <h3 v-if="userGender">性别占比</h3>
    <div class="usergender">
      <PieGraph :dataOption="userGender" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
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

  userAgesData: any = []
  userGenderLegend: any = []

  created() {
    this.formatAgesData()
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
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
