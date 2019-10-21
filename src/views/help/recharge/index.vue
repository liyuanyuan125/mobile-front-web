<template>
  <div class="recharge" ref="recharge">
    <ul>
      <li>您可以通过支付宝在线付款、线下汇款2种方式，向您的鲸鱼账户余额中充值。</li>
      <li>如您通过支付宝在线付款进行充值，付款成功后您的账户余额立即增加。</li>
      <li>如您通过线下汇款进行充值，鲸鱼平台对您的汇款信息审核通过后，您的账户余额立即增加。</li>
      <li>如您的账户余额有剩余资金，可以用于下次广告计划单的消费，鲸鱼平台保障您的资金安全；您也可以通过在线客服申请提现。</li>
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
  }
}
</script>

<style lang="less" scoped>
@import 'less/main.less';
</style>