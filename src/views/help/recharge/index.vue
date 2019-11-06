<template>
  <div class="recharge" ref="recharge">
    <ul>
      <li>鲸鱼平台账户充值服务系鲸鱼平台为方便客户支付广告计划而提供的一种简单、便捷的支付方式。客户向鲸鱼平台的账户进行充值，在后续的广告计划投放过程中快速实现广告计划的支付。</li>
      <li>客户完成转账操作后，请务必在充值环节中提交转账信息，否则鲸鱼平台无法将您转账的款项与账户余额匹配。正常情况下，鲸鱼平台确认收到转账金额后，客户的账户余额会实时到账，如因网络等问题发生迟延，则24小时内到账。</li>
      <li>客户完成账户充值后，可通过“个人中心”查看充值记录及账户金额。</li>
      <li>客户充值成功后，不用向鲸鱼平台索票。后续客户使用账户余额消费后，鲸鱼平台再开具发票。</li>
      <li>客户账户余额的交易记录均以鲸鱼平台系统记录的数据为准。如客户对相应记录数据有任何疑义，应在服务发生后三日内向鲸鱼平台客服提出，否则应视为无疑义。</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Privacy extends Vue {
  mounted() {
    const rec: any = this.$refs.recharge
    rec.style.height = document.body.clientHeight + 'px'
    document.title = '充值规则'
  }
}
</script>

<style lang="less" scoped>
@import 'less/main.less';
</style>