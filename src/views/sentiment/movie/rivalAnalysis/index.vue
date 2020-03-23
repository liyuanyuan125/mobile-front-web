<template>
  <div class="page">
    <SentimentBar title="竞品分析详细报告" :titleShow="true" />
    <RivalList type="3" :rivalList="rivalList" v-if="rivalList.length" class="movierival" />
    <BasisList :basisList="basisList" v-if="basisList.length" />
    <!-- <marketContrast :fetch="fetch" :query="{movieIdList}" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { movieRivalList, movieRivalPraise } from './data'
import SentimentBar from '@/views/common/sentimentBar/index.vue' // topbar
import RivalList from '@/views/common/rivalList/index.vue'
import BasisList from './components/baseList.vue'
import marketContrast from '@/views/common/marketContrast/index.vue'
import { DetailItem } from '@/views/common/rivalList/types'

@Component({
  components: {
    SentimentBar,
    RivalList,
    BasisList,
    marketContrast
  }
})
export default class MovieRivalAnalysisPage extends ViewBase {
  movieIdList: any = ''
  rivalList: any = []
  basisList: any = []

  created() {
    this.movieIdList = this.$route.query.ids

    this.getRivalData()
    this.getRivalPraise()
  }

  // 获取数据
  async getRivalData() {
    const res: any = await movieRivalList(this.movieIdList)
    this.rivalList = res.rivalList
    this.basisList = res.basisDataList
  }

  // 获取口碑数据
  async getRivalPraise() {
    // const res: any = console.log('getRivalPraise', res)
  }
  fetch = async (query: any) => {
    console.log('this.movieIdList', this.movieIdList)
    // query: 查询参数
    return await movieRivalPraise({
      movieIdList: this.movieIdList
    })
  }
}
</script>

<style lang="less" scoped>
.page {
  color: #303030;
}
.movierival {
  padding-bottom: 60px;
  background: #f2f3f6;
}
</style>
