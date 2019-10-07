<template>
  <!--广告片信息 -->
  <div class="videoinfo">
    <dl>
      <dt>2019款Wey Beta ONE的新车发布影院广告</dt>
      <dd>
        <i>广告规格</i>
        <em>01: 30</em>
      </dd>
      <dd>
        <i>广告规格</i>
        <em>www.anyoneyunpan.com</em>
      </dd>
      <dd>
        <i>广告规格</i>
        <em>01: 30</em>
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
  @Prop({ type: Object }) progress!: any

  mounted() {
    // todo
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
