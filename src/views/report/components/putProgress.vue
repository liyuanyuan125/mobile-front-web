<template>
  <div class="putprogress">
    <!-- <button class="addbudget">追加费用</button> -->
    <dl>
      <dt>总金额 ￥11,000</dt>
      <dd>
        <div class="progress expend">
          <span>
            <b style=" width:40%"></b>
          </span>
          <em>已支出 ￥6,500</em>
        </div>
      </dd>
      <dt>总曝光人次 21,200</dt>
      <dd>
        <div class="progress exposure">
          <span>
            <b style="width:70%"></b>
          </span>
          <em>已曝光人次 21,200</em>
        </div>
      </dd>
      <dt>投放开始时间 2019-09-17</dt>
      <dd>
        <div class="progress puted">
          <span>
            <b style="width:20%"></b>
          </span>
          <em>已投放5天</em>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class PutProgress extends ViewBase {}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
