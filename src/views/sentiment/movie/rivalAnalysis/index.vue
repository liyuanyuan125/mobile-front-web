<template>
  <div class="page">
    <SentimentBar :attribute="topbar" />
    <div>竞品分析报告</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar/index.vue'

@Component({
  components: {}
})
export default class MovieRivalAnalysisPage extends ViewBase {
  topbar = {
    title: '竞品分析详细报告'
  }
}
</script>

<style lang="less" scoped>
.page {
  color: #303030;
}
</style>
