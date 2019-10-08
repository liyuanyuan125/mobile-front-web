<template>
  <!--其他基本信息 -->
  <div class="payinfo">
    <dl>
      <dd>
        <i>广告片编号</i>
        <em>432432423423423</em>
      </dd>
      <dd>
        <i>创建时间</i>
        <em>2019-08-12 17:53:00</em>
      </dd>
      <dd>
        <i>创建时间</i>
        <em>2019-08-12 17:53:00</em>
      </dd>
      <dd>
        <i>创建时间</i>
        <em>2019-08-12 17:53:00</em>
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
export default class BaseInfoArea extends ViewBase {
  @Prop({ type: Object }) progress!: any

  mounted() {
    // todo
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
