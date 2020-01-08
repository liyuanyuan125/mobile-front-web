<template>
  <div class="datatrendlist">
    <div class="tit">
      <h3>数据趋势</h3>
    </div>
    <dl>
      <dt>
        <span>日期</span>
        <span>曝光人次</span>
        <span>曝光场次</span>
        <span>曝光金额</span>
      </dt>
      <dd v-for="(item,index) in dataTrend" :key="item.date + index">
        <span style="color:#8798AF">{{item.date}}</span>
        <span>{{item.person}}</span>
        <span>{{item.scene}}</span>
        <span>{{item.cost}}</span>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class DataTrendList extends ViewBase {
  @Prop({ type: Array }) dataTrend!: any
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
