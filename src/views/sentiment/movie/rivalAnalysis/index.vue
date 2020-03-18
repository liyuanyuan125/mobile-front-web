<template>
  <div class="page">
    <SentimentBar title="竞品分析详细报告" :titleShow="true" />
    <div class="rivallist">竞品分析报告</div>
  </div>
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
export default class MovieRivalAnalysisPage extends ViewBase {}
</script>

<style lang="less" scoped>
.page {
  color: #303030;
}
</style>
