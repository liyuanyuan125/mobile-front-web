<template>
  <!-- 用户地域分布 -->
  <SentimentBar title="查看更多奔驰用户地域分布" :titleShow="true" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar/index.vue'

@Component({
  components: {
    SentimentBar
  }
})
export default class UserRegion extends ViewBase {}
</script>

<style lang="less" scoped>
</style>
