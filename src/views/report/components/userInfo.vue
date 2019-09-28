<template>
  <div class="userinfo">
    <div class="userbox">
      <img
        src="https://picagent.piaoshen.com/picture/cut_picture?uri=http%3A%2F%2Fpiaoshen.oss-cn-beijing.aliyuncs.com%2Fimages%2Fmisc%2F2019%2F01%2F23%2F190123144644818451.fileName&width=200&height=200&clipType=4"
        alt="用户名称"
        class="img"
      />
      <h3>小小的愿望</h3>
      <p>新店开业推广广告 | 30S</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class UserInfo extends ViewBase {}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
