<template>
  <div>
    <div class="putprogress">
      <!-- <button class="addbudget">追加费用</button> -->
      <dl>
        <dt>总金额 ￥{{progress.totalAmount}} {{progress.totalAmountUnit}}</dt>
        <dd>
          <div class="progress expend">
            <span>
              <b style=" width:40%"></b>
            </span>
            <em>已支出 ￥{{progress.paidAmount}} {{progress.paidAmountUnit}}</em>
          </div>
        </dd>
        <dt>总曝光人次 {{progress.totalViewCount}} {{progress.totalViewCountUnit}}</dt>
        <dd>
          <div class="progress exposure">
            <span>
              <b style="width:70%"></b>
            </span>
            <em>已曝光人次 {{progress.viewCount}}{{progress.viewCountUnit}}</em>
          </div>
        </dd>
        <dt>
          <div class="col">
            <b>投放开始时间 {{progress.putStartDate}}</b>
            <span>预估结束时间 {{progress.putEndDate}}</span>
          </div>
        </dt>
        <dd>
          <div class="progress puted">
            <span>
              <b style="width:20%"></b>
            </span>
            <em>已投放{{progress.putDays}}天</em>
          </div>
        </dd>
      </dl>
    </div>
    <div class="statistics">
      <dl>
        <dd>
          <p>
            <b>{{progress.viewCount}}</b>
          </p>
          <p class="desc">已曝光人次 {{progress.viewCountUnit ? `（${progress.viewCountUnit}）` : ''}}</p>
        </dd>
        <dd>
          <p>
            <b>{{progress.viewScene}}</b>
          </p>
          <p class="desc">已曝光场次 {{progress.viewSceneUnit ? `（${progress.viewSceneUnit}）` : ''}}</p>
        </dd>
        <dd>
          <p>
            <b>{{progress.paidAmount}}</b>
          </p>
          <p class="desc">已支出金额 {{progress.paidAmountUnit ? `（${progress.paidAmountUnit}）` : ''}}</p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class PutProgress extends ViewBase {
  @Prop({ type: Object }) progress!: any

  mounted() {
    // todo
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
