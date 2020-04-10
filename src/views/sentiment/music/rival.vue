<template>
  <main
    class="main-page"
    :class="isAlbum ? 'main-page-album' : 'main-page-song'"
  >
    <SentimentBar title="竞品分析详细报告" titleShow/>

    <RivalList
      :type="isAlbum ? '6' : '5'"
      :rivalList="rivalList"
      class="rival-list"
    />

    <TabNav :list="navList" class="tab-nav" normal/>

    <section class="pane pane-basic" id="basic">
      <ModuleHeader title="基础数据"/>
      <Table
        :data="basisDataList"
        :columns="basicColumns"
        class="basic-table"
      />
    </section>

    <section class="pane pane-heat" id="hot" v-if="!isAlbum">
      <ModuleHeader title="热度分析"/>
      <HeatContrast
        lineTitle="综合热度对比"
        :colors="['#88aaf6', '#4cc8d0', '#c965dd']"
        :overAllHeat="heatContrastData.overAllHeat"
        :interactList="heatContrastData.interactList"
        :materialList="heatContrastData.materialList"
        :tabs="[
          { key: 0, text: '新增微博数' },
          { key: 1, text: '新增互动数' },
        ]"
        v-if="heatContrastData"
      />
    </section>

    <section class="pane pane-play" id="play">
      <ModuleHeader :title="isAlbum ? '销量对比' : '播放量对比'"/>
      <PlayStats
        :fetch="playFetch"
        :isAlbum="isAlbum"
        :alignMode="isAlbum"
        autoColor
        class="play-stats"
      />
    </section>

    <section class="pane pane-rank" v-if="!isAlbum">
      <ModuleHeader title="榜单表现对比"/>
      <Table
        :data="rankTable.data"
        :columns="rankTable.columns"
        class="rank-table"
        v-if="rankTable"
      />
    </section>

    <section class="pane pane-praise" id="praise">
      <MarketContrast :fetch="praiseFetch"/>
    </section>

    <section class="pane pane-user" id="user">
      <ModuleHeader title="用户对比"/>

      <Age :ageRangeList="ageRangeList" class="age-range"/>

      <div class="van-hairline--top"></div>

      <ModuleHeader title="性别分布" tag="h4" class="vs-header"/>

      <VsList :data="sexData" class="vs-chart"/>

      <div class="van-hairline--top"></div>

      <ModuleHeader title="用户地域分布对比" tag="h4" class="area-header"/>

      <MultiTable
        :list="areaList"
        :columns="areaColumns"
        class="area-table"
      />
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import RivalList from '@/views/common/rivalList/index.vue'
import TabNav, { TabNavItem } from '@/components/tabNav'
import ModuleHeader from '@/components/moduleHeader'
import Table, { TableColumn } from '@/components/table'
import HeatContrast from '@/views/common/heatContrast/index.vue'
import PlayStats, { PlayQuery } from './components/playStats'
import MarketContrast from '@/views/common/marketContrast/index.vue'
import Age from '@/views/common/ageDistribution/index.vue'
import VsList, { VsItem } from '@/components/vsList'
import MultiTable, { MultiTableItem } from '@/components/multiTable'
import { getBasic, getHeat, getPlay, getPraise } from './rivalData'
import { lastDays } from '@/util/timeSpan'

@Component({
  components: {
    SentimentBar,
    RivalList,
    TabNav,
    ModuleHeader,
    Table,
    HeatContrast,
    PlayStats,
    MarketContrast,
    Age,
    VsList,
    MultiTable,
  }
})
export default class extends ViewBase {
  @Prop({ type: Boolean, default: false }) isAlbum!: boolean

  get ids() {
    const { ids = '' } = this.$route.query
    return ids as string
  }

  rivalList: any[] = []

  get navList(): TabNavItem[] {
    const list = [
      { name: 'basic', label: '基础数据' },
      this.isAlbum
        ? { name: 'play', label: '销量' }
        : { name: 'hot', label: '热度' },
      { name: 'praise', label: '口碑' },
      { name: 'user', label: '用户' },
    ]
    return list
  }

  basisDataList: any[] = []

  get basicColumns() {
    const isAlbum = this.isAlbum
    const list: TableColumn[] = [
      { name: 'rivalName', title: isAlbum ? '专辑名称' : '单曲', width: '8.5em', align: 'left' },
      { name: 'releaseDate', title: '发行时间', width: '7em' },
      { name: 'companyName', title: '唱片公司', width: '6em' },
    ]
    if (isAlbum) {
      list.push(
        { name: 'totalSaleCount', title: '累计销售量', width: '6em' },
        { name: 'totalInteractCount', title: '累计互动量', width: '6em' },
        { name: 'favorable', title: '好看度', width: '4em' },
        { name: 'musicCount', title: '专辑内歌曲量', width: '7em' },
        { name: 'musicPlayCount', title: '歌曲累计播放量', width: '8em' },
        { name: 'musicInteractCount', title: '歌曲累计互动量', width: '8em' },
      )
    } else {
      list.push(
        { name: 'playCount', title: '累计播放量', width: '6em' },
        { name: 'interactCount', title: '累计互动量', width: '6em' },
        { name: 'favorable', title: '好看度', width: '4em' },
      )
    }
    return list
  }

  // 热度分析数据
  heatContrastData: any = null

  rankTable: any = null

  // 年龄分布数据
  ageRangeList = []

  // 性别分布
  sexData: VsItem[] = []

  areaList = []

  areaColumns: TableColumn[] = [
    { name: 'name', title: '单曲', align: 'left' },
    { name: 'top1', title: 'TOP1', html: true },
    { name: 'top2', title: 'TOP2', html: true },
    { name: 'top3', title: 'TOP3', html: true },
    { name: 'top4', title: 'TOP4', html: true },
    { name: 'top5', title: 'TOP5', html: true },
  ]

  created() {
    this.init()
  }

  async init() {
    try {
      this.getBasic()
      this.getHeat()
    } catch (ex) {
      this.handleError(ex)
    }
  }

  async getBasic() {
    const {
      rivalList,
      basisDataList,
      rankTable,
      ageRangeList,
      sexData,
      areaList
    } = await getBasic(this.ids, this.isAlbum) as any
    this.rivalList = rivalList
    this.basisDataList = basisDataList
    this.rankTable = rankTable
    this.ageRangeList = ageRangeList
    this.sexData = sexData
    this.areaList = areaList
  }

  async getHeat() {
    const heatContrastData = await getHeat({
      songIdList: this.ids,
      startTime: 20200212,
      endTime: 20200330,
    })
    this.heatContrastData = heatContrastData
  }

  async playFetch(query: PlayQuery) {
    try {
      const data = await getPlay(this.ids, query, this.isAlbum)
      return data
    } catch (ex) {
      this.handleError(ex)
    }
  }

  praiseFetch(query: any) {
    return getPraise(this.ids, query, this.isAlbum)
  }
}
</script>

<style lang="less" scoped>
.main-page {
  padding-top: 1px;
  background-color: #f2f3f6;
}

.tab-nav {
  top: 88px;
  /deep/ .van-tabs__nav {
    padding-left: 90px;
    padding-right: 90px;
  }
  /deep/ .van-tab {
    flex-basis: auto !important;
  }
}

.pane {
  padding: 50px 30px 30px;
  background-color: #fff;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.pane-heat {
  padding: 50px 0 30px;
  /deep/ .module-header {
    padding: 0 0 20px 30px;
  }
}

.basic-table,
.rank-table {
  margin: 30px -30px -30px;
}

.play-stats {
  margin-top: -52px;
}

.age-range {
  padding: 40px 0 1px;
}

.vs-chart {
  padding-bottom: 20px;
}

.vs-header,
.area-header {
  padding: 50px 0 40px;
}

.area-table {
  /deep/ .col-align-left {
    padding: 28px 16px;
  }
}

.pane-user {
  padding-bottom: 50px;
}
</style>
