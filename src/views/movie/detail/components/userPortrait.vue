<template>
  <div class="userportrait">
    <h3>观影用户画像</h3>
    <h4>年龄占比</h4>
    <h4>性别占比</h4>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class UserPortrait extends ViewBase {}
</script>

<style lang="less" scoped>
@import '../less/index.less';
</style>
