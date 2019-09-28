<template>
  <div class="datatrend">
    <div class="tit">
      <h3>数据趋势</h3>
      <span>09-17 至 09-23</span>
    </div>
    <ul>
      <li>
        <button>支付金额</button>
      </li>
      <li>
        <button>曝光人次</button>
      </li>
      <li>
        <button>曝光场次</button>
      </li>
    </ul>
    <div>
      <AreaBasic />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import AreaBasic from '../echarts/dataTrend.vue'

@Component({
  components: {
    AreaBasic
  }
})
export default class DataTrend extends ViewBase {}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
