<template>
  <!--影片票房 -->
  <div class="boxoffice mod">
    <ModuleHeader title="影片票房" :link="boxoffice ? link : null" @click.native="talkingData" />
    <div v-if="boxoffice">
      <div class="bfstatis">
        <div>
          <strong
            style="fontFamily: 'DIN Alternate'"
          >{{boxoffice.totalBoxOffice ? boxoffice.totalBoxOffice : '-'}}</strong>
          <p>累计票房</p>
        </div>
        <div>
          <strong
            style="fontFamily: 'DIN Alternate'"
          >{{boxoffice.totalPerson ? boxoffice.totalPerson : '-'}}</strong>
          <p>总人次</p>
        </div>
        <div>
          <strong
            style="fontFamily: 'DIN Alternate'"
          >{{boxoffice.firstDayBoxOffice ? boxoffice.firstDayBoxOffice : '-'}}</strong>
          <p>首日票房</p>
        </div>
        <div>
          <strong
            style="fontFamily: 'DIN Alternate'"
          >{{boxoffice.firstWeekBoxOffice ? boxoffice.firstWeekBoxOffice : '-'}}</strong>
          <p>首周票房</p>
        </div>
      </div>
      <div class="tabbox">
        <ul>
          <li
            v-for="item in tabList"
            :class="tabIndex===item.id ? 'cur' : ''"
            :key="item.key"
            @click="() => tabIndex = item.id"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="chartbox">
        <LineGrap
          :lineData="linedata"
          v-if="linedata.xDate"
          class="wantchart"
          :formatterHtml="formatterHtml"
        />
        <dataEmpty v-else />
      </div>
      <div class="others">
        <div class="inner">
          <div class="bfbox" @click="goLink(2)">
            <div class="tit">
              <strong>城市票房</strong>
              <span
                style="fontFamily: 'DIN Alternate'"
              >{{boxoffice.cityBoxOffice ? boxoffice.cityBoxOffice : '-'}}</span>
            </div>
            <p
              class="van-ellipsis"
            >TOP 1 {{boxoffice.cityBoxOfficeTop ? boxoffice.cityBoxOfficeTop : '-'}}</p>
          </div>
        </div>
        <div class="inner">
          <div class="bfbox" @click="goLink(3)">
            <div class="tit">
              <strong>影投票房</strong>
              <span
                style="fontFamily: 'DIN Alternate'"
              >{{boxoffice.companyBoxOffice ? boxoffice.companyBoxOffice : '-'}}</span>
              <!-- <span style="fontFamily: 'DIN Alternate'">3,213.4万</span> -->
            </div>
            <p
              class="van-ellipsis"
            >TOP 1 {{boxoffice.companyBoxOfficeTop ? boxoffice.companyBoxOfficeTop : '-'}}</p>
          </div>
        </div>
      </div>
    </div>
    <dataEmpty v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import LineGrap from '@/components/lineGraph'
import ModuleHeader from '@/components/moduleHeader'
import { openAppLink, AppLink } from '@/util/native'
import { roleNumber } from '@/fn/validateRules'
import moment from 'moment'
import dataEmpty from '@/views/common/dataEmpty/index.vue'
import { talkingdataDetailHandle } from '@/util/TDEvent'

@Component({
  components: {
    ModuleHeader,
    LineGrap,
    dataEmpty
  }
})
export default class BoxOffice extends ViewBase {
  @Prop({ type: Object }) boxoffice!: any
  @Prop({ type: Object }) link!: any

  tabList: any = [
    {
      id: 1,
      key: 'boxOfficeList',
      name: '日票房'
    },
    {
      id: 2,
      key: 'scheduleList',
      name: '日排片'
    }
  ]
  tabIndex: number = 1
  xDate: any = []
  yDate: any = []
  eventList: any = []
  linedata: any = {}

  created() {
    if (this.boxoffice) {
      this.formatDatas(this.boxoffice.boxOfficeList)
    }
  }

  @Watch('boxoffice', { deep: true })
  watchBoxOffice() {
    if (this.boxoffice) {
      this.formatDatas(this.boxoffice.boxOfficeList)
    }
  }

  @Watch('tabIndex', { deep: true })
  watchTabIndex(val: number) {
    if (val === 1) {
      this.formatDatas(this.boxoffice.boxOfficeList)
    } else if (val === 2) {
      this.formatDatas(this.boxoffice.scheduleList)
    }
  }

  // talkingData
  talkingData() {
    if (this.boxoffice) {
      talkingdataDetailHandle(3, '影片票房_查看更多')
    }
  }

  // 处理数据
  formatDatas(data: any[]) {
    if (data && data.length) {
      const xDate = (data || []).map((it: any) => it.name)
      const yDate = (data || []).map((it: any) => it.value)
      const eventList = (data || []).map((it: any) => it.eventList)

      this.linedata = {
        xDate,
        eventList,
        yDate: [
          {
            data: yDate
          }
        ]
      }
    }
  }

  // 去往原生页
  goLink(type: number) {
    const link: AppLink = {
      page: 'movieBoxOffice',
      boxOfficeType: type,
      movieId: this.link.movieId
    }
    openAppLink(link)
  }

  // 处理chart 浮层 tooltip
  formatterHtml = (params: any, time: any) => {
    const weekDays = ['日', '一', '二', '三', '四', '五', '六']
    const day = weekDays[moment(time).day()]
    const date = moment(time).format('YYYY-MM-DD')
    return `
           <div style="border:2px solid rgba(48,48,48,.1);border-radius:6px; padding:7px 10px;background-color:#fff">
             <p style="color:#47403B;font-size:14px;line-height:16px">${date} 周${day}</p>
             <div style="color:#88AAF6;font-weight:bold;font-size:14px;line-height:16px;margin-top:5px">${roleNumber(
               Math.abs(params.data)
             )}</div>
           </div>
          `
  }
}
</script>

<style lang="less" scoped>
.chartbox {
  padding: 0 30px;
}
.wantchart {
  border-bottom: 0;
  padding-bottom: 0;
}
.tabbox {
  text-align: center;
  margin-top: 40px;

  ul {
    display: inline-block;
  }
  li {
    display: inline-block;
    padding: 0 40px;
    font-size: 26px;
    line-height: 58px;
    color: rgba(48, 48, 48, 0.6);
    border: 2px solid #ebebeb;
    position: relative;
    margin-left: -2px;
    &:first-child {
      border-radius: 30px 0 0 30px;
    }
    &:last-child {
      border-radius: 0 30px 30px 0;
    }
    &.cur {
      background-color: #88aaf6;
      color: #fff;
      border-color: #88aaf6;
    }
  }
}
.boxoffice {
  padding: 50px 0;
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  .module-header {
    padding: 0 30px;
  }
  .others {
    padding-right: 30px;
    display: flex;
    .inner {
      // display: flex;
      width: 50%;
    }
    .bfbox {
      flex: 1;
      margin-left: 30px;
      border: 2px solid #f2f3f6;
      border-radius: 10px;
      padding: 35px 30px;
    }
    .tit {
      display: flex;
    }
    strong {
      font-size: 32px;
      line-height: 45px;
    }
    span {
      flex: 1;
      font-size: 30px;
      color: #88aaf6;
      text-align: right;
      white-space: nowrap;
    }
    p {
      font-size: 26px;
      color: rgba(48, 48, 48, 0.4);
      line-height: 30px;
      margin-top: 10px;
    }
  }
}
.bfstatis {
  background-color: #f8f9fa;
  position: relative;
  padding: 40px 0;
  display: flex;
  margin-top: 30px;
  > div {
    flex: 1;
    text-align: center;
    position: relative;
    &::after {
      content: '';
      background-color: rgba(216, 216, 216, 0.6);
      width: 1px;
      height: 50px;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -25px;
    }
  }
  div:first-child {
    border-right: 2px solid #cfd1d9;
    &::after {
      display: none;
    }
    &::before {
      content: '';
      background-color: #f8f9fa;
      width: 6px;
      height: 6px;
      border-left: 2px solid #cfd1d9;
      border-top: 2px solid #cfd1d9;
      transform: rotate(-45deg);
      position: absolute;
      right: -5px;
      top: 50%;
      margin-top: -3px;
    }
  }
  div:last-child {
    &::after {
      display: none;
    }
  }
  strong {
    display: block;
    font-size: 32px;
    line-height: 50px;
  }
  p {
    font-size: 24px;
    line-height: 26px;
    color: rgba(48, 48, 48, 0.6);
    margin-top: 8px;
  }
}
</style>
