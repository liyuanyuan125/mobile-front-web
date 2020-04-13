<template>
  <div class="page">
    <SentimentBar title="竞品分析详细报告" :titleShow="true" />
    <RivalList
      type="4"
      :rivalList="rivalList"
      v-if="rivalList.length"
      class="movierival"
      @setRival="changeIds"
    />

    <BasisList :basisList="basisList" v-if="basisList.length" />
    <PlatformTrend :fetch="platformFetch" :query="tvIdList" v-if="tvIdList" />
    <marketContrast
      :fetch="praiseFetch"
      :query="{tvIdList}"
      v-if="tvIdList"
      class="praisebox"
      :businessType="4"
    />
    <div class="portrait">
      <moduleHeader title="受众画像" />
      <SexVs :data="vsData" class="genderbox" />
      <AgeDistribution :ageRangeList="ageRangeList" class="agebox" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { keyBy, groupBy } from 'lodash'
import { tvRivalList, tvRivalPraise, tvRivalPlatform } from './data'
import SentimentBar from '@/views/common/sentimentBar/index.vue' // topbar
import RivalList from '@/views/common/rivalList/index.vue' // 竞品列表
import BasisList from './components/baseList.vue' // 基础信息
import PlatformTrend from './components/platformTrend.vue'
import marketContrast from '@/views/common/marketContrast/index.vue' // 口碑对比
import SexVs, { VsItem } from '@/views/common/sexVs' // 性别分布
import AgeDistribution from '@/views/common/ageDistribution/index.vue' // 年龄分布
import moduleHeader from '@/components/moduleHeader'

@Component({
  components: {
    SentimentBar,
    RivalList,
    BasisList,
    PlatformTrend,
    marketContrast,
    moduleHeader,
    SexVs,
    AgeDistribution
  }
})
export default class TVRivalAnalysisPage extends ViewBase {
  tvIdList: any = ''
  rivalList: any = []
  basisList: any = []
  vsData: VsItem[] = []
  ageRangeList: any = []

  created() {
    this.tvIdList = this.$route.query.ids
    this.init()
  }
  init() {
    this.getRivalData()
  }

  // 获取数据
  async getRivalData() {
    const res: any = await tvRivalList(this.tvIdList)
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
  }

  // 调取口碑对比的接口
  praiseFetch = async (query: any) => {
    const res: any = await tvRivalPraise(query)
    return res
  }

  // 调取想看趋势
  platformFetch = async (query: any) => {
    const res: any = await tvRivalPlatform(query)
    return res
  }

  // 设置竞品对手
  changeIds(ids: string) {
    this.tvIdList = ids
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
</style>
