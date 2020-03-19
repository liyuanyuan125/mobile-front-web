<template>
  <div class="page">
    <SentimentBar title="竞品分析详细报告" :titleShow="true" />
    <RivalList :detail="detail" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { movieRivalList } from './data'
import SentimentBar from '@/views/common/sentimentBar/index.vue' // topbar
import RivalList from '@/views/common/rivalList/index.vue'
import { DetailItem } from '@/views/common/rivalList/types'

@Component({
  components: {
    SentimentBar,
    RivalList
  }
})
export default class MovieRivalAnalysisPage extends ViewBase {
  detail: DetailItem = {
    type: 'movie'
  }
  movieIdList: any = ''

  created() {
    this.movieIdList = this.$route.query.ids

    this.getData()
  }

  // 获取数据
  async getData() {
    const result: any = await movieRivalList(this.movieIdList)
  }
}
</script>

<style lang="less" scoped>
.page {
  color: #303030;
}
</style>
