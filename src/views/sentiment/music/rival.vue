<template>
  <main
    class="main-page"
    :class="isAlbum ? 'main-page-album' : 'main-page-song'"
  >
    <SentimentBar title="竞品分析详细报告" titleShow />

    <section class="rival-wrap">
      <RivalList
        :type="isAlbum ? '6' : '5'"
        :rivalList="rivalList"
        class="rival-list"
        @setRival="changeIds"
        v-if="rivalList && rivalList.length"
      />
    </section>

    <TabNav :list="navList" class="tab-nav" normal />

    <section class="pane pane-basic" id="basic">
      <ModuleHeader title="基础数据" />
      <Table
        :data="basisData"
        :columns="basicColumns"
        class="basic-table"
        v-if="basisData"
      />
      <DataEmpty :code="basicCode" :retry="getBasic" v-if="basisEmpty" />
    </section>

    <section class="pane pane-heat" id="hot" v-if="isSong">
      <SelectTime v-model="heatDay" class="select-time" />
      <HeatContrast
        lineTitle="综合热度对比"
        :colors="['#88aaf6', '#4cc8d0', '#c965dd']"
        :overAllHeat="heatData.overAllHeat"
        :interactList="heatData.interactList"
        :materialList="heatData.materialList"
        :tabs="[
          { key: 0, text: '新增物料数' },
          { key: 1, text: '新增互动数' },
        ]"
        :daysNum="heatDay"
        v-if="heatData"
      />
      <DataEmpty :code="heatCode" :retry="getHeat" v-if="heatEmpty" />
    </section>

    <section class="pane pane-play" id="play">
      <ModuleHeader :title="isAlbum ? '销量对比' : '播放量对比'" />
      <PlayStats
        :id="ids"
        :fetch="playFetch"
        :isAlbum="isAlbum"
        :alignMode="isAlbum"
        autoColor
        class="play-stats"
        v-if="playCode == 0"
      />
      <DataEmpty :code="playCode" :retry="playFetch" v-if="playCode > 0" />
    </section>

    <section class="pane pane-rank" v-if="isSong && rankTable">
      <ModuleHeader title="榜单表现对比"/>
      <Table
        :data="rankTable.data"
        :columns="rankTable.columns"
        class="rank-table"
      />
    </section>

    <section class="pane pane-praise" id="praise">
      <MarketContrast
        :fetch="praiseFetch"
        :businessType="isAlbum ? 6 : 5"
        :query="{ ids }"
        v-if="praiseCode == 0"
      />
      <DataEmpty :code="praiseCode" :retry="praiseFetch" v-if="praiseCode > 0" />
    </section>

    <section class="pane pane-user" id="user">
      <ModuleHeader title="用户对比" />

      <Age
        :ageRangeList="ageRangeList"
        class="age-range"
        v-if="!ageRangeEmpty"
      />

      <template v-if="!sexEmpty">
        <div class="van-hairline--top" v-if="!ageRangeEmpty"></div>

        <ModuleHeader title="性别分布" tag="h4" class="vs-header"/>

        <VsList :data="sexData" empty="暂无性别数据" class="vs-chart"/>
      </template>

      <template v-if="!areaEmpty">
        <div class="van-hairline--top" v-if="!ageRangeEmpty || !sexEmpty"></div>

        <ModuleHeader title="用户地域分布对比" tag="h4" class="area-header" />

        <MultiTable
          :list="areaList"
          :columns="areaColumns"
          class="area-table"
        />
      </template>

      <DataEmpty v-if="ageRangeEmpty && sexEmpty && areaEmpty" />
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
import { selectTime as SelectTime } from '@/components/hotLine'
import HeatContrast from '@/views/common/heatContrast/index.vue'
import PlayStats, { PlayQuery } from './components/playStats'
import MarketContrast from '@/views/common/marketContrast/index.vue'
import Age from '@/views/common/ageDistribution/index.vue'
import VsList, { VsItem } from '@/components/vsList'
import MultiTable, { MultiTableItem } from '@/components/multiTable'
import { getBasic, getHeat, getPlay, getPraise } from './rivalData'
import { lastDays } from '@/util/timeSpan'
import Avatar from '@/components/avatar'
import DataEmpty from '@/views/common/dataEmpty/index.vue'
import { isEmpty } from 'lodash'

@Component({
  components: {
    SentimentBar,
    RivalList,
    TabNav,
    ModuleHeader,
    Table,
    SelectTime,
    HeatContrast,
    PlayStats,
    MarketContrast,
    Age,
    VsList,
    MultiTable,
    Avatar,
    DataEmpty,
  }
})
export default class extends ViewBase {
  @Prop({ type: Boolean, default: false }) isAlbum!: boolean

  get isSong() {
    return !this.isAlbum
  }

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

  ids = ''

  rivalList: any[] = []

  basisData: any[] | null = null

  basisEmpty = false

  basicCode = 0

  get basicColumns() {
    const isAlbum = this.isAlbum
    const list: TableColumn[] = [
      { name: 'rivalName', title: isAlbum ? '专辑名称' : '单曲', width: 9, align: 'left', lines: 2, fixed: 'left' },
      { name: 'releaseDate', title: '发行时间', width: 8 },
      { name: 'companyName', title: '唱片公司', width: 6 },
    ]
    if (isAlbum) {
      list.push(
        { name: 'totalSaleCount', title: '累计销售量', width: 6 },
        { name: 'totalInteractCount', title: '累计互动量', width: 6 },
        { name: 'favorable', title: '好感度', width: 4 },
        { name: 'musicCount', title: '专辑内歌曲量', width: 7 },
        { name: 'musicPlayCount', title: '歌曲累计播放量', width: 8 },
        { name: 'musicInteractCount', title: '歌曲累计互动量', width: 8 },
      )
    } else {
      list.push(
        { name: 'playCount', title: '累计播放量', width: 6 },
        { name: 'interactCount', title: '累计互动量', width: 6 },
        { name: 'favorable', title: '好感度', width: 4 },
      )
    }
    return list
  }

  // 热度分析天数
  heatDay = 7

  heatCode = 0

  // 单曲：热度分析数据
  heatData: any = null

  heatEmpty = false

  playCode = 0

  praiseCode = 0

  rankTable: any = null

  // 年龄分布数据
  ageRangeList = []

  // 性别分布
  sexData: VsItem[] = []

  areaList = []

  areaColumns: TableColumn[] = [
    { name: 'name', title: '单曲', align: 'left', lines: 2 },
    { name: 'top1', title: 'TOP1', html: true },
    { name: 'top2', title: 'TOP2', html: true },
    { name: 'top3', title: 'TOP3', html: true },
    { name: 'top4', title: 'TOP4', html: true },
    { name: 'top5', title: 'TOP5', html: true },
  ]

  get ageRangeEmpty() {
    return isEmpty(this.ageRangeList)
  }

  get sexEmpty() {
    return isEmpty(this.sexData)
  }

  get areaEmpty() {
    return isEmpty(this.areaList)
  }

  changeIds(ids: string) {
    this.init(ids)
  }

  created() {
    this.init()
  }

  reset() {
    this.rivalList = []
    this.basisData = null
    this.basisEmpty = false
    this.heatDay = 7
    this.heatData = null
    this.heatEmpty = false
    this.rankTable = null
    this.ageRangeList = []
    this.sexData = []
    this.areaList = []
  }

  async init(ids = '') {
    this.ids = ids || this.$route.query.ids as string
    this.reset()
    this.getBasic()
    const isSong = this.isSong
    isSong && this.getHeat()
  }

  async getBasic() {
    try {
      const {
        rivalList,
        basisData,
        basisEmpty,
        rankTable,
        ageRangeList,
        sexData,
        areaList
      } = await getBasic(this.ids, this.isAlbum) as any
      this.rivalList = rivalList
      this.basisData = basisData
      this.basisEmpty = basisEmpty
      this.rankTable = rankTable
      this.ageRangeList = ageRangeList
      this.sexData = sexData
      this.areaList = areaList
      this.basicCode = 0
    } catch (ex) {
      const { code } = this.handlePageError(ex)
      this.basicCode = code
      this.basisEmpty = true
    }
  }

  async getHeat() {
    try {
      const [ startTime, endTime ] = lastDays(this.heatDay)
      const { heatData, allEmpty } = await getHeat({
        songIdList: this.ids,
        startTime,
        endTime,
      })
      this.heatData = heatData
      this.heatEmpty = allEmpty
      this.heatCode = 0
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.heatCode = code
      this.heatData = null
      this.heatEmpty = true
    }
  }

  async playFetch(query: PlayQuery) {
    try {
      const data = await getPlay(query, this.isAlbum)
      this.playCode = 0
      return data
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.playCode = code
    }
  }

  async praiseFetch(query: any) {
    try {
      const data = await getPraise(query, this.isAlbum)
      this.praiseCode = 0
      return data
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.praiseCode = code
    }
  }

  @Watch('$route.query.ids')
  watchId(ids: string) {
    this.init(ids)
  }

  @Watch('heatDay')
  watchHeatDay() {
    this.getHeat()
  }
}
</script>

<style lang="less" scoped>
.main-page {
  padding-top: 1px;
  background-color: #f2f3f6;
}

.rival-wrap {
  min-height: 88px;
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
  .select-time {
    padding: 0 30px 10px;
  }
  /deep/ .platform-title {
    font-weight: 400;
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
