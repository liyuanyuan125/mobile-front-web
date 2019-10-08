<template>
  <!--广告片信息 -->
  <div class="videosample">
    <h4>广告小样</h4>
    <div>
      <img />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class SampleArea extends ViewBase {
  @Prop({ type: Object }) progress!: any

  mounted() {
    // todo
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
