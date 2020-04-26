<template>
  <div class="page">
    <SentimentBar title="竞品分析详细报告" :titleShow="true" />
    <RivalList
      type="3"
      :rivalList="rivalList"
      v-if="rivalList.length && !basicCode"
      class="movierival"
      @setRival="changeIds"
    />
    <BasisList :basisList="basisList" v-if="basisList.length && !basicCode" />
    <DataEmpty :code="basicCode" :retry="getRivalData" class="empty" v-if="basicCode > 0" />

    <WantSeeTrend :fetch="wantSeeFetch" :query="movieIdList" v-if="!wantSeeCode" />
    <DataEmpty :code="wantSeeCode" :retry="wantSeeFetch" class="empty" v-if="wantSeeCode > 0" />

    <PlatformTrend :fetch="platformTrendFetch" :query="movieIdList" v-if="!platformCode" />
    <DataEmpty
      :code="platformCode"
      :retry="platformTrendFetch"
      class="empty"
      v-if="platformCode > 0"
    />

    <marketContrast
      :fetch="praiseFetch"
      :query="{movieIdList}"
      v-if="!praiseCode"
      class="praisebox"
      :businessType="3"
    />
    <DataEmpty :code="praiseCode" :retry="praiseFetch" class="empty" v-if="praiseCode > 0" />

    <div class="portrait">
      <ModuleHeader title="受众画像" />

      <ModuleHeader title="性别分布" tag="h4" class="vs-header" />
      <VsList :data="vsData" class="genderbox" v-if="vsData.length" />
      <DataEmpty v-else />

      <ModuleHeader title="年龄分布" tag="h4" class="vs-header" v-if="!ageRangeList.length" />
      <AgeDistribution :ageRangeList="ageRangeList" v-if="ageRangeList.length" class="agebox" />
      <DataEmpty v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { keyBy, groupBy } from 'lodash'
import {
  movieRivalList,
  movieRivalPraise,
  movieRivalWantSee,
  movieRivalplatform
} from './data'
import SentimentBar from '@/views/common/sentimentBar/index.vue' // topbar
import RivalList from '@/views/common/rivalList/index.vue' // 竞品列表
import BasisList from './components/baseList.vue' // 基础信息
import WantSeeTrend from './components/wantSeeTrend.vue'
import PlatformTrend from './components/platformTrend.vue'
import marketContrast from '@/views/common/marketContrast/index.vue' // 口碑对比
import VsList, { VsItem } from '@/components/vsList'
import AgeDistribution from '@/views/common/ageDistribution/index.vue' // 年龄分布
import ModuleHeader from '@/components/moduleHeader'
import DataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    DataEmpty,
    SentimentBar,
    RivalList,
    BasisList,
    WantSeeTrend,
    PlatformTrend,
    marketContrast,
    ModuleHeader,
    VsList,
    AgeDistribution
  }
})
export default class MovieRivalAnalysisPage extends ViewBase {
  movieIdList: any = ''
  rivalList: any = []
  basisList: any = []
  vsData: VsItem[] = []
  ageRangeList: any = []
  basicCode: number = 0
  praiseCode: number = 0
  wantSeeCode: number = 0
  platformCode: number = 0

  created() {
    this.movieIdList = this.$route.query.ids
    this.init()
  }
  init() {
    this.getRivalData()
  }

  // 获取数据
  async getRivalData() {
    try {
      const res: any = await movieRivalList(this.movieIdList)
      this.basicCode = 0
      this.rivalList = res.rivalList
      this.basisList = res.basisDataList
      // 处理性别分布
      this.vsData = ((list: any[]) => {
        const ret = list.map(({ rivalName, dataList }) => {
          const dataMap = keyBy(dataList, 'name')
          const man = dataMap.男
          const woman = dataMap.女
          return {
            name: rivalName,
            rate1: man && +(man.value / 100).toFixed(1),
            rate2: woman && +(woman.value / 100).toFixed(1)
          }
        })
        return ret
      })(res.genderList || [])
      // 年龄分布
      this.ageRangeList = res.ageRangeList
    } catch (ex) {
      const { code } = this.handlePageError(ex)
      this.basicCode = code
    }
  }

  // 调取口碑对比的接口
  async praiseFetch(query: any) {
    try {
      const data = await movieRivalPraise(query)
      this.praiseCode = 0
      return { data }
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.praiseCode = code
    }
  }

  // 调取想看趋势
  async wantSeeFetch(query: any) {
    try {
      const res: any = await movieRivalWantSee(query)
      this.wantSeeCode = 0
      return res
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.wantSeeCode = code
    }
  }

  // 调取平台指数趋势
  async platformTrendFetch(query: any) {
    try {
      const res: any = await movieRivalplatform(query)
      this.platformCode = 0
      return res
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.platformCode = code
    }
  }

  // 设置竞品对手
  changeIds(ids: string) {
    this.movieIdList = ids
    this.init()
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
.vs-header {
  margin-top: 30px;
}
</style>
