<template>
  <section class="play-stats">
    <div class="align-control" v-if="showAlign">
      <label>对齐</label>
    </div>

    <Select v-model="day" :list="dayList" class="day-list"/>

    <Tabs
      v-model="viewIndex"
      type="card"
      class="play-nav"
      v-if="viewList.length > 1"
    >
      <Tab
        v-for="{ label } in viewList"
        :key="label"
        :title="label"
      />
    </Tabs>

    <section class="total-stats" v-if="platformList">
      <ModuleHeader
        title="累计分布"
        tag="h4"
        class="total-header"
      />
      <ul class="total-list">
        <li
          v-for="({ name, countShow, percent }, index) in platformList"
          :key="name"
          class="total-item"
        >
          <i class="total-no">{{index + 1}}</i>
          <em class="total-name">{{name}}</em>
          <Progress
            :percentage="percent"
            :show-pivot="false"
            color="rgba(48, 48, 48, .8)"
            track-color="#d0d1d2"
            class="total-progress"
          />
          <em class="total-show">{{countShow}}</em>
          <i class="total-percent">({{percent}}%)</i>
        </li>
      </ul>
    </section>

    <ModuleHeader
      :title="chartTitle"
      tag="h4"
      class="daily-header"
      v-if="chartTitle"
    />

    <ul class="group-list" v-if="groupNames.length > 1">
      <li
        v-for="(name, index) in groupNames"
        :key="name"
        class="group-item"
      >
        <Button
          :type="index == groupIndex ? 'info' : 'default'"
          class="group-button"
          @click="groupIndex = index"
        >{{name}}</Button>
      </li>
    </ul>

    <MultiLine
      :names="dailyNames"
      :data="dailyData"
      :events="dailyEvents"
      smooth
      class="daily-chart"
    />

    <section class="daily-form">
      <Table
        :data="table.data"
        :columns="table.columns"
        class="daily-table-wrap"
        v-if="table"
      />
      <a
        class="daily-form-more"
        @click="handleFormMore"
        v-if="moreDateLink"
      >查看全部日期</a>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ModuleHeader from '@/components/moduleHeader'
import { RawLocation } from 'vue-router'
import { Tabs, Tab, Progress, Button } from 'vant'
import { lastDays, lastDayList } from '@/util/timeSpan'
import Select from '@/components/select'
import MultiLine, { MultiLineItem, MultiLineEvents } from '@/components/multiLine'
import { toMoment, intDate } from '@/util/dealData'
import { PlayFetch, PlayItem, PlayView } from './types'
import { dealDailyData, dealDailyEvents } from './data'
import { openAppLink, AppLink } from '@/util/native'
import Table from '@/components/table'
import { isEmpty } from 'lodash'

@Component({
  components: {
    ModuleHeader,
    Tabs,
    Tab,
    Progress,
    Button,
    Select,
    MultiLine,
    Table,
  }
})
export default class PlayStats extends Vue {
  @Prop({ type: Function, required: true }) fetch!: PlayFetch

  @Prop({ type: Boolean, default: false }) isAlbum!: boolean

  /** 日期范围列表，数字代表最近几天 */
  @Prop({ type: Array, default: () => [ 7, 15, 30, 60, 90 ] }) days!: number[]

  @Prop({ type: String }) chartTitle!: string

  @Prop({ type: Object }) moreDateLink!: AppLink

  /** 自动着色模式 */
  @Prop({ type: Boolean, default: false }) autoColor!: boolean

  /** 销售对比：显示对齐发行时间 */
  @Prop({ type: Boolean, default: false }) showAlign!: boolean

  day = 7

  viewIndex = 0

  viewList: PlayItem[] = []

  groupIndex = 0

  get currentView() {
    const viewItem = this.viewList[this.viewIndex]
    return viewItem && viewItem.view
  }

  get dayList() {
    const list = this.days.map(value => ({ name: `最近${value}天`, value }))
    return list
  }

  get platformList() {
    const currentView = this.currentView
    if (currentView == null || currentView.platformList == null) {
      return null
    }
    const list = currentView.platformList.map(item => ({
      ...item,
      percent: item.value / 100
    }))
    return list
  }

  get groupNames() {
    const currentView = this.currentView
    if (currentView == null || isEmpty(currentView.dataGroup)) {
      return []
    }
    const names = currentView.dataGroup.map(it => it.name)
    return names
  }

  get dailyNames() {
    const list = lastDayList(this.day)
    const names = list.map(it => intDate(it, 'MM-DD') as string)
    return names
  }

  get dailyData() {
    const currentView = this.currentView
    if (currentView == null || isEmpty(currentView.dataGroup)) {
      return []
    }
    const { chart } = currentView.dataGroup[this.groupIndex]
    const list = dealDailyData(this.day, chart, this.autoColor)
    return list
  }

  get dailyEvents() {
    const currentView = this.currentView
    if (currentView == null) {
      return {}
    }
    const eventList = currentView.eventList || []
    const list = dealDailyEvents(eventList, ({ id, name }) => {
      this.$router.push({
        name: 'sentimenteventmarketing',
        params: { eventId: id },
        query: { title: name },
      })
    })
    return list
  }

  get table() {
    const currentView = this.currentView
    if (currentView == null || isEmpty(currentView.dataGroup)) {
      return null
    }
    const { table } = currentView.dataGroup[this.groupIndex]
    return table
  }

  mounted() {
    this.fetchData()
  }

  async fetchData() {
    const [ startTime, endTime ] = lastDays(this.day)
    const query = { startTime, endTime }
    const view = await this.fetch(query)
    const list = Array.isArray(view) ? view : [ { label: '', view } ]
    this.viewList = list
  }

  handleFormMore() {
    openAppLink(this.moreDateLink)
  }

  @Watch('day')
  watchDay() {
    this.fetchData()
  }
}
</script>

<style lang="less" scoped>
.play-stats {
  position: relative;
  padding: 90px 0 20px;
}

.day-list {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 8;
}

.play-nav {
  text-align: center;

  /deep/ .van-tabs__wrap {
    height: 60px;
  }

  /deep/ .van-tabs__nav {
    display: inline-flex;
    height: 60px;
    border: 2px solid #ebebeb;
    border-radius: 60px;
    overflow: hidden;
  }

  /deep/ .van-tab {
    min-width: 140px;
    color: rgba(48, 48, 48, .6);
    font-size: 26px;
    line-height: 58px;
    border-right: 0;
  }

  /deep/ .van-tab.van-tab--active {
    color: #fff;
    background-color: #88aaf6;
    font-weight: 400;
  }
}

.total-stats {
  padding: 30px;
  background-color: rgba(242, 243, 246, .5);
  border-radius: 10px;
  margin-top: 10px;
}

.play-nav ~ .total-stats {
  margin-top: 40px;
}

.total-item {
  display: flex;
  font-size: 26px;
  font-weight: 500;
  align-items: center;
  margin-top: 30px;

  &:first-child {
    .total-no {
      background-color: #ff6262;
    }
  }

  &:nth-of-type(2) {
    .total-no {
      background-color: #ffa247;
    }
  }
}

.total-no {
  display: inline-block;
  width: 36px;
  height: 36px;
  color: #fff;
  background-color: #d0d1d2;
  border-radius: 8px;
  text-align: center;
}

.total-name {
  flex: 1;
  margin-left: 18px;
}

.total-progress {
  width: 216px;
  height: 10px;
  margin-left: 28px;
}

.total-show {
  margin-left: 28px;
  font-size: 24px;
}

.total-percent {
  color: rgba(48, 48, 48, .4);
  margin-left: 8px;
  font-size: 24px;
}

.daily-header {
  margin-top: 40px;
}

.group-list {
  display: flex;
  flex-wrap: wrap;
  margin: 30px -9px 0;
  ~ .daily-chart {
    margin-top: 10px;
  }
}

.group-item {
  width: 25%;
  padding: 10px;
}

.group-button {
  width: 100%;
  height: 60px;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 26px;
  border-radius: 30px;
  /deep/ &.van-button--info {
    border-color: #88aaf6;
    background-color: #88aaf6;
  }
}

.daily-chart {
  margin-top: 52px;
}

.daily-form {
  margin-top: 60px;
  background: rgba(242, 243, 246, .5);
  border-radius: 10px;
  border: 2px solid rgba(242, 243, 246, 1);
}

.daily-table-wrap {
  overflow-y: auto;
  /deep/ thead {
    th {
      background-color: #f9f9fa;
    }
  }
  /deep/ tr {
    &:nth-child(2n) {
      background-color: #f9f9fa;
    }
    &:nth-child(2n + 1) {
      background-color: #fff;
    }
    i {
      font-size: 24px;
    }
    em {
      margin-left: 3px;
      color: #ff6262;
    }
  }
}

.daily-form-more {
  display: block;
  height: 110px;
  line-height: 110px;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
  color: #88aaf6;
}
</style>
