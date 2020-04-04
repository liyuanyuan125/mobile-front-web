<template>
  <section class="play-stats">
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

    <section class="total-stats">
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
      :title="isAlbum ? '分日销量' : '分日播放量'"
      tag="h4"
      class="daily-header"
    />

    <MultiLine
      :names="dailyNames"
      :data="dailyData"
      :events="dailyEvents"
      smooth
      class="daily-chart"
    />

    <section class="daily-form">
      <div class="daily-table-wrap">
        <table class="daily-table">
          <thead>
            <th class="col-date">日期</th>
            <th class="col-count">当日{{isAlbum ? '销量' : '播放量'}}</th>
            <th
              v-for="name in dailyFormNames"
              :key="name"
              class="col-cell"
            >{{name}}</th>
          </thead>
          <tbody>
            <tr v-for="item in dailyFormList" :key="item.date">
              <td class="col-date" v-html="item.dateText"></td>
              <td class="col-count">{{item.count}}</td>
              <td
                v-for="sub in item.platformList"
                :key="sub.name"
                class="col-cell"
              >{{sub.value || placeholder}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <a class="daily-form-more">查看全部日期</a>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ModuleHeader from '@/components/moduleHeader'
import { RawLocation } from 'vue-router'
import { Tabs, Tab, Progress } from 'vant'
import { lastDays } from '@/util/timeSpan'
import Select from '@/components/select'
import MultiLine, { MultiLineItem, MultiLineEvents } from '@/components/multiLine'
import { toMoment } from '@/util/dealData'

import { PlayFetch, PlayItem, PlayView } from './types'

const weekDays = [ '日', '一', '二', '三', '四', '五', '六' ]

@Component({
  components: {
    ModuleHeader,
    Tabs,
    Tab,
    Progress,
    Select,
    MultiLine,
  }
})
export default class PlayStats extends Vue {
  @Prop({ type: Function, required: true }) fetch!: PlayFetch

  @Prop({ type: Boolean, default: false }) isAlbum!: boolean

  /** 日期范围列表，数字代表最近几天 */
  @Prop({ type: Array, default: () => [ 7, 15, 30, 60, 90 ] }) days!: number[]

  @Prop({ type: String, default: '--' }) placeholder!: string

  day = 7

  viewIndex = 0

  viewList: PlayItem[] = []

  get dayList() {
    const list = this.days.map(value => ({ name: `最近${value}天`, value }))
    return list
  }

  get platformList() {
    const viewItem = this.viewList[this.viewIndex]
    if (viewItem == null) {
      return []
    }
    const list = viewItem.view.platformList.map(item => ({
      ...item,
      percent: item.value / 100
    }))
    return list
  }

  dailyColors = [
    '#ff6262',
    '#ff9833',
    '#ffce59',
    '#88aaf6',
    '#4cc8d0',
  ]

  get dailyNames() {
    return [ '12-02', '12-03', '12-04', '12-05', '12-06', '12-07' ]
  }

  // TODO:
  get dailyData() {
    const list: MultiLineItem[] = [
      { name: '网易云音乐', data: [ 7500, 7800, 6800, 5800, 3800, 8888 ], color: '#ff6262' },
      { name: 'QQ音乐', data: [ 6500, 8800, 3800, 4800, 6800, 2888 ], color: '#ff9833' },
      { name: '酷我音乐', data: [ 1500, 9800, 2800, 3800, 9800, 3888 ], color: '#ffce59' },
    ]
    return list
  }

  get dailyEvents() {
    const events: MultiLineEvents = {
      '12-03': {
        id: 'xxxx',
        name: '最适合跨年看得电影，曝终胜多负少是反倒伤',
        click: ({ id }) => {
          // console.log(`----> event ${id}`)
          // debugger
        }
      }
    }
    return events
  }

  get dailyFormList() {
    const viewItem = this.viewList[this.viewIndex]
    if (viewItem == null) {
      return []
    }
    const list = viewItem.view.dailyFormList.map(item => {
      const m = toMoment(item.date)
      const ymd = m.format('YYYY-MM-DD')
      const wi = m.day()
      const day = weekDays[wi]
      const mark = item.markName ? `<em>${item.markName}</em>` : ''
      return {
        ...item,
        count: (this.isAlbum ? item.saleCount : item.playCount) || this.placeholder,
        dateText: `<i>${ymd}</i><br>周${day}${mark}`
      }
    })
    return list
  }

  get dailyFormNames() {
    const list = this.dailyFormList
    if (list.length == 0) {
      return []
    }
    const names = list[0].platformList.map(it => it.name)
    return names
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
}

.daily-table {
  width: 100%;
  table-layout: fixed;

  .col-date {
    width: 210px;
    text-align: left;
    padding-left: 30px;
    /deep/ i {
      font-size: 24px;
    }
    /deep/ em {
      margin-left: 3px;
      color: #ff6262;
    }
  }
  .col-count {
    width: 150px;
  }
  .col-cell {
    width: 180px;
  }

  tr {
    &:nth-child(2n + 1) {
      background-color: #fff;
    }
  }

  th,
  td {
    padding: 40px 0;
    text-align: right;
    &:last-child {
      width: 180px + 64;
      padding-right: 64px;
    }
  }

  th {
    font-size: 24px;
    font-weight: 400;
  }

  td {
    font-size: 26px;
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
