<template>
  <!--广告片信息 -->
  <div class="videoinfo">
    <dl>
      <dt>{{videoInfo.adName}}</dt>
      <dd v-for="item in videoInfo.AttributeList" :key="item.keyName" v-show="item.value">
        <i>{{item.keyName}}</i>
        <em>{{keyName.value}}</em>
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
export default class VideoInfoArea extends ViewBase {
  @Prop({ type: Object }) videoInfo!: any

  mounted() {
    // todo
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
