<template>
  <section
    class="play-stats"
    :class="{ 'play-stats-align': alignMode }"
  >
    <div class="align-control" v-if="alignMode">
      <label>对齐发行时间</label>
      <van-switch v-model="isAlign" class="align-switch"/>
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

    <DataEmpty v-if="allEmpty"/>

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
          <div class="total-name van-multi-ellipsis--l2">{{name}}</div>
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
      v-if="chartTitle && dailyData"
    />

    <ul
      class="group-list"
      v-if="showGroupName && dailyData"
    >
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
      :showLegend="showLegend"
      smooth
      class="daily-chart"
      v-if="dailyData"
    />

    <section
      class="daily-form"
      v-if="table"
    >
      <Table
        :data="table.data"
        :columns="table.columns"
        class="daily-table-wrap"
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
import { Tabs, Tab, Progress, Button, Switch } from 'vant'
import { lastDays, lastDayList } from '@/util/timeSpan'
import Select from '@/components/select'
import MultiLine, { MultiLineItem, MultiLineEvents } from '@/components/multiLine'
import { toMoment, intDate } from '@/util/dealData'
import { PlayFetch, PlayItem, PlayView } from './types'
import { releaseDayList, dealDailyData, dealDailyEvents } from './data'
import { openAppLink, AppLink } from '@/util/native'
import Table from '@/components/table'
import DataEmpty from '@/views/common/dataEmpty/index.vue'
import { isEmpty } from 'lodash'

@Component({
  components: {
    ModuleHeader,
    Tabs,
    Tab,
    Progress,
    Button,
    [Switch.name]: Switch,
    Select,
    MultiLine,
    Table,
    DataEmpty,
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
  @Prop({ type: Boolean, default: false }) alignMode!: boolean

  /** 是否显示图例 */
  @Prop({ type: Boolean, default: false }) showLegend!: boolean

  day = 7

  viewIndex = 0

  viewList: PlayItem[] = []

  groupIndex = 0

  isAlign = false

  get currentView() {
    const viewItem = this.viewList[this.viewIndex]
    return viewItem && viewItem.view
  }

  get dayList() {
    const isAlign = this.isAlign
    const list = this.days.map(value => ({
      name: isAlign ? `发行${value}天` : `最近${value}天`,
      value
    }))
    return list
  }

  get allEmpty() {
    return this.platformList == null
      && this.dailyData == null
      && this.table == null
  }

  get platformList() {
    const currentView = this.currentView
    if (currentView == null || isEmpty(currentView.platformList)) {
      return null
    }
    const list = currentView.platformList!.map(item => ({
      ...item,
      percent: +((item.value || 0) / 100).toFixed(1)
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

  // 是否显示 group，当 group 个数大于 1 个，或者，虽然只有一个，但不为空
  get showGroupName() {
    const names = this.groupNames
    const show = names.length > 1 || (names.length == 1 && !isEmpty(names[0]))
    return show
  }

  get dailyNames() {
    return this.getDayList('MM-DD')
  }

  get dailyData() {
    const currentView = this.currentView
    if (currentView == null || isEmpty(currentView.dataGroup)) {
      return null
    }
    const { chart } = currentView.dataGroup[this.groupIndex]
    if (isEmpty(chart)) {
      return null
    }
    const list = dealDailyData(this.day, chart, this.isAlign, this.autoColor)
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

  get legendOptions() {
    const options = {
      // show: true,
      left: 0,
      bottom: -10,
      padding: [60, 0, 0, 0],
    }
    return options
  }

  get table() {
    const currentView = this.currentView
    if (currentView == null || isEmpty(currentView.dataGroup)) {
      return null
    }
    const { table } = currentView.dataGroup[this.groupIndex]
    if (isEmpty(table.data)) {
      return null
    }
    return table
  }

  getDayList(format = 'YYYY-MM-DD') {
    const day = this.day
    const names = this.isAlign
      ? releaseDayList(day)
      : lastDayList(day).map(it => String(intDate(it, format)))
    return names
  }

  mounted() {
    this.fetchData()
  }

  async fetchData() {
    const [ startTime, endTime ] = lastDays(this.day)
    const query = {
      startTime,
      endTime,
      days: this.day,
      isAlign: this.isAlign,
      dayNames: this.getDayList(),
    }
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

  @Watch('isAlign')
  watchIsAlign() {
    this.fetchData()
  }
}
</script>

<style lang="less" scoped>
@color: #88aaf6;

.play-stats {
  position: relative;
  padding: 90px 0 20px;
}

.play-stats-align {
  .day-list {
    top: 78px;
  }
}

.align-control {
  font-size: 34px;
  line-height: 34px;
  label {
    vertical-align: top;
    margin-right: 14px;
  }
}

.align-switch {
  /deep/ &.van-switch--on {
    background-color: @color;
  }
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
    background-color: @color;
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
  width: 140px;
  margin-left: 18px;
}

.total-progress {
  width: 200px;
  height: 10px;
  margin-left: 28px;
}

.total-show {
  width: 120px;
  font-size: 24px;
  text-align: right;
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
    border-color: @color;
    background-color: @color;
  }
}

.daily-chart {
  margin-top: 52px;
}

.daily-form {
  margin-top: 50px;
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
  color: @color;
}
</style>
