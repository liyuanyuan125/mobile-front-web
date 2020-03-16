<template>
  <div class='main'>
      <div class='title'>性别分布</div>
      <table></table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { toast } from '@/util/toast'

@Component({
  components: {
  }
})
export default class KolPage extends ViewBase {


}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  background: #fff;
}
.title {
  height: 34px;
  font-size: 34px;
  font-weight: 500;
  color: rgba(48, 48, 48, 1);
  line-height: 34px;
  margin-top: 48px;
}
</style>
