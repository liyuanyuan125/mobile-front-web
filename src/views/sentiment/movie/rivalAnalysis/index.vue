<template>
  <div class="page">
    <SentimentBar title="竞品分析详细报告" :titleShow="true" />
    <RivalList type="3" :rivalList="rivalList" v-if="rivalList.length" class="movierival" />
    <BasisList :basisList="basisList" v-if="basisList.length" />
    <marketContrast :fetch="fetch" :query="{movieIdList}" v-if="movieIdList" class="praisebox" />
    <div class="portrait">
      <moduleHeader title="受众画像" />
      <SexVs :data="vsData" class="genderbox" />
      <AgeDistribution :ageRangeList="ageRangeList" v-if="ageRangeList.length" class="agebox" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { movieRivalList, movieRivalPraise } from './data'
import SentimentBar from '@/views/common/sentimentBar/index.vue' // topbar
import RivalList from '@/views/common/rivalList/index.vue' // 竞品列表
import BasisList from './components/baseList.vue' // 基础信息
import marketContrast from '@/views/common/marketContrast/index.vue' // 口碑对比
import SexVs, { VsItem } from '@/views/common/sexVs' // 性别分布
import AgeDistribution from '@/views/common/ageDistribution/index.vue' // 年龄分布
import moduleHeader from '@/components/moduleHeader'

@Component({
  components: {
    SentimentBar,
    RivalList,
    BasisList,
    marketContrast,
    moduleHeader,
    SexVs,
    AgeDistribution
  }
})
export default class MovieRivalAnalysisPage extends ViewBase {
  movieIdList: any = ''
  rivalList: any = []
  basisList: any = []
  vsData: VsItem[] = []
  ageRangeList: any = []

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
    // 处理性别分布
    for (const el of res.genderList) {
      const rate1 = Number((el.dataList[0].value / 100).toFixed(1))
      const rate2 = 100 - rate1
      this.vsData.push({
        name: el.rivalName,
        rate1,
        rate2
      })
    }
    // 年龄分布
    this.ageRangeList = res.ageRangeList
  }

  // 获取口碑数据
  async getRivalPraise() {
    // const res: any = console.log('getRivalPraise', res)
  }

  // 调取口碑对比的接口
  fetch = async (query: any) => {
    const res: any = await movieRivalPraise(query)
    return res
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
.praisebox,
.portrait {
  padding: 50px 30px;
  border-top: 20px solid rgba(216, 216, 216, 0.2);
}
.genderbox {
  padding: 40px 0;
  border-bottom: 1px solid #d8d8d8;
}
.agebox {
  padding: 40px 0;
}
</style>
