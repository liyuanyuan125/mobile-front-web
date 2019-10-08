<template>
  <!--价格信息 -->
  <div class="payinfo">
    <dl>
      <dd>
        <i>数字转制费</i>
        <em>¥ 15,000.00</em>
      </dd>
      <dd>
        <i>综合折扣</i>
        <em>-¥ 7,500.00</em>
      </dd>
      <dt>
        合计：
        <b>¥ 7,500.00</b>
      </dt>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class PayInfoArea extends ViewBase {
  @Prop({ type: Object }) progress!: any

  mounted() {
    // todo
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
