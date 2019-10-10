<template>
  <div>
    <div class="putprogress">
      <!-- <button class="addbudget">追加费用</button> -->
      <dl ref="progress">
        <dt>
          总金额
          <strong>￥{{progress.totalAmount}}</strong>
          {{progress.totalAmountUnit}}
        </dt>
        <dd>
          <div class="progress expend">
            <span>
              <b :style="{width:progress.paidAmountPercent+'%'}"></b>
            </span>
            <em ref="paidAmount">
              已支出
              <strong>￥{{progress.paidAmount}}</strong>
              {{progress.paidAmountUnit}}
            </em>
          </div>
        </dd>
        <dt>
          总曝光人次
          <strong>{{progress.totalViewCount}}</strong>
          {{progress.totalViewCountUnit}}
        </dt>
        <dd>
          <div class="progress exposure">
            <span>
              <b :style="{width:progress.viewCountPercent+'%'}"></b>
            </span>
            <em ref="viewCount">
              已曝光人次
              <strong>{{progress.viewCount}}</strong>
              {{progress.viewCountUnit}}
            </em>
          </div>
        </dd>
        <dt>
          <div class="col">
            <b>
              投放开始时间
              <strong>{{progress.putStartDate}}</strong>
            </b>
            <span>预估结束时间 {{progress.putEndDate}}</span>
          </div>
        </dt>
        <dd>
          <div class="progress puted">
            <span>
              <b :style="{width:progress.putDaysPercent+'%'}"></b>
            </span>
            <em ref="putDays">
              已投放
              <strong>{{progress.putDays}}</strong>天
            </em>
          </div>
        </dd>
      </dl>
    </div>
    <div class="statistics">
      <div class="tit">
        <h3>曝光明细</h3>
        <span title="查看" @click="goList"></span>
      </div>
      <dl>
        <dd>
          <p>
            <b>{{progress.viewCount}}</b>
          </p>
          <p class="desc">已曝光人次{{progress.viewCountUnit ? `(${progress.viewCountUnit})` : ''}}</p>
        </dd>
        <dd>
          <p>
            <b>{{progress.viewScene}}</b>
          </p>
          <p class="desc">已曝光场次{{progress.viewSceneUnit ? `(${progress.viewSceneUnit})` : ''}}</p>
        </dd>
        <dd>
          <p>
            <b>{{progress.paidAmount}}</b>
          </p>
          <p class="desc">已支出金额{{progress.paidAmountUnit ? `(${progress.paidAmountUnit})` : ''}}</p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { openAppLinkClient } from '@/util/native'

@Component({
  components: {}
})
export default class PutProgress extends ViewBase {
  @Prop({ type: Object }) progress!: any
  @Prop({ type: String }) orderId!: string

  mounted() {
    const progress: any = this.$refs.progress
    const proWidth = progress.clientWidth
    this.getPaidPer(proWidth)
    this.getViewPersonPer(proWidth)
    this.getPutDaysPer(proWidth)
  }

  // 计算已支出标签的位置
  getPaidPer(width: number) {
    const paidAmount: any = this.$refs.paidAmount
    const wid = paidAmount.clientWidth
    const widPer = (wid / width) * 100
    const apiWid = this.progress.paidAmountPercent
    // 标签内容不固定，动态获取标签的宽度，再算出百分比，
    // 和API返回的比较，动态获取的大就为0，API返回的大用API的
    if (widPer > apiWid) {
      paidAmount.style.left = 0
    } else {
      paidAmount.style.right = 100 - apiWid + '%'
    }
  }

  // 计算已曝光标签的位置
  getViewPersonPer(width: number) {
    const viewCount: any = this.$refs.viewCount
    const wid = viewCount.clientWidth
    const widPer = (wid / width) * 100
    const apiWid = this.progress.viewCountPercent
    // 标签内容不固定，动态获取标签的宽度，和API返回的比较，动态获取的大就为0，API返回的大用API的
    if (widPer > apiWid) {
      viewCount.style.left = 0
    } else {
      viewCount.style.right = 100 - apiWid + '%'
    }
  }

  // 计算已曝光天数标签的位置
  getPutDaysPer(width: number) {
    const putDays: any = this.$refs.putDays
    const wid = putDays.clientWidth
    const widPer = (wid / width) * 100
    const apiWid = this.progress.putDaysPercent
    // 标签内容不固定，动态获取标签的宽度，和API返回的比较，动态获取的大就为0，API返回的大用API的
    if (widPer > apiWid) {
      putDays.style.left = 0
    } else {
      putDays.style.right = 100 - apiWid + '%'
    }
  }

  // 去往列表页
  async goList(page: string) {
    const applink = 'reportRelateDateList'
    const objectData = {
      applinkData:
        'jydataadvertiser://scheme?p=' + applink + '&orderId=' + this.orderId,
      originUrl: location.href
    }
    const obj = { params: objectData }
    await openAppLinkClient(obj)
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
