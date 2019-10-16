<template>
  <!--其他基本信息 -->
  <div class="baseinfo">
    <dl>
      <dd
        v-for="(item,index) in baseInfo.attributeList"
        :key="item.keyName+index"
        v-show="item.value"
      >
        <i>{{item.keyName}}</i>
        <em>{{item.value}}</em>
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
  @Prop({ type: Object }) baseInfo!: any

  mounted() {
    // todo
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
