<template>
  <!-- 状态区 -->
  <div class="statusarea">
    <i class="reBack" title="返回"></i>
    <b class="kefu" title="客服"></b>
    <h4 class="status" v-html="statusTit"></h4>
    <p class="desc">平台审核广告中…</p>
    <div class="but">
      <button>编辑</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class StatusArea extends ViewBase {
  @Prop({ type: Object }) statusInfo!: any

  statusTit = ''
  statusDesc: string = ''

  mounted() {
    this.formatStatus()
  }

  // 处理状态
  formatStatus() {
    const status = this.statusInfo.adStatus
    switch (status) {
      case 0:
        this.statusTit = '未知状态，请联系客服'
        break
      case 1:
        this.statusTit = '<i>2</i>待审批'
        this.statusDesc = '平台审核广告中…'
        break
      case 2:
        this.statusTit = '待支付'
        this.statusDesc = '平台审核广告中…'
        break
      case 3:
        this.statusTit = '待转码'
        this.statusDesc = '平台审核广告中…'
        break
      case 4:
        this.statusTit = '<i>2</i>已完成'
        this.statusDesc = '平台审核广告中…'
        break
      case 5:
        this.statusTit = '<i>3</i>未通过'
        this.statusDesc = '平台审核广告中…'
        break
      case 6:
        this.statusTit = '已取消'
        break
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
