<template>
  <!--想看趋势 -->
  <div class="wantsee">
    <div class="titbox">
      <h4>想看趋势</h4>
      <div>
        <div class="citysel" @click="selectCity">
          <span class="van-ellipsis">{{city.areaName}}</span>
        </div>
      </div>
      <div>
        <SelectDate v-model="dates" />
      </div>
    </div>
    <div v-if="!wantSeeCode">
      <LineGrap
        :lineData="lineDatas"
        v-if="lineDatas.xDate && lineDatas.xDate.length"
        :key="lineDatas.title"
        class="wantchart"
        :formatterHtml="formatterHtml"
      />
      <dataEmpty v-else />
    </div>
    <dataEmpty :code="basicCode" :retry="apiGetData" v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SelectDate from '@/components/selectDate'
import { handleCitySelect } from '@/util/native'
import { devLog, devInfo } from '@/util/dev'
import LineGrap from '@/components/lineGraph'
import moment from 'moment'
import { roleNumber } from '@/fn/validateRules'
import dataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    SelectDate,
    LineGrap,
    dataEmpty
  }
})
export default class WantSeeTrend extends ViewBase {
  @Prop({ type: Function, required: true })
  fetch!: (query?: any) => Promise<any>
  @Prop({ type: String }) query!: string

  lineDatas: any = {}
  city: any = {
    code: 'quanguo',
    areaName: '全国',
    type: 1
  }
  dates: any = {}
  // dataTrend: any = {}
  count: number = 7 // 日期筛选
  wantSeeCode: number = 0

  // 接口获取数据
  async apiGetData() {
    try {
      const res: any = await this.fetch({
        movieId: this.query,
        startTime: this.dates.startTime,
        endTime: this.dates.endTime,
        ...this.city
      })
      this.wantSeeCode = 0
      this.formatDatas(res.dailyGainList)
    } catch (ex) {
      const { code } = this.handleModuleError(ex)
      this.wantSeeCode = code
    }
  }

  // 监控ID变化
  @Watch('query', { deep: true })
  watchID(val: any) {
    this.apiGetData()
  }

  // 监控日期变化
  @Watch('dates', { deep: true })
  watchDays(val: any) {
    this.count = val.count
    this.apiGetData()
  }

  // 监控城市变化
  @Watch('city', { deep: true })
  watchCity(val: any) {
    this.apiGetData()
  }

  // 处理数据
  formatDatas(data: any[]) {
    if (data.length) {
      // 处理 X 轴日期
      const lastDate: any[] = []
      const nowDate = moment(new Date()).format('YYYY/MM/DD 00:00:00')
      const now = new Date(nowDate).getTime()
      for (let i = 1; i < this.count + 1; i++) {
        lastDate.unshift(now - i * 24 * 60 * 60 * 1000)
      }
      // 处理 Y 轴数据
      const lastValue = new Array(this.count).fill(null)
      const eventList = new Array(this.count).fill([])
      data.map((ite: any) => {
        const mapIndex = lastDate.indexOf(ite.date)
        lastValue[mapIndex] = ite.value
        eventList[mapIndex] = ite.eventList
      })

      this.lineDatas = {
        xDate: lastDate,
        eventList,
        yDate: [
          {
            data: lastValue,
            name: '想看数'
          }
        ]
      }
    } else {
      this.lineDatas = {}
    }
  }

  // 选择城市
  async selectCity() {
    const obj = {
      callBackName: 'handleCitySelectCallBack'
    }
    const result: any = await handleCitySelect(obj)
    const codeJson = JSON.parse(result)
    if (codeJson) {
      this.city = {
        code: codeJson.data.areaId,
        areaName: codeJson.data.areaName,
        type: codeJson.data.selectType
      }
    }
  }

  // 处理chart 浮层 tooltip
  formatterHtml = (params: any, time: any, eventList: any) => {
    const weekDays = ['日', '一', '二', '三', '四', '五', '六']
    const day = weekDays[moment(time).day()]
    const date = moment(time).format('YYYY-MM-DD')
    const eventHTML = []
    for (const event of eventList) {
      eventHTML.push(
        `<a class="van-ellipsis" href="/sentiment/eventMarketing/${event.eventId}?title=${event.eventName}">
        ${event.eventName}</a>`
      )
    }
    const eventLast = eventList.length
      ? `<div class="event">${eventHTML.join('')}</div>`
      : ''
    return `
           <div class="tiptool">
             <p class="name"><i class="dot"></i>${date} 周${day} </p>
             <p class="count">日增${roleNumber(Math.abs(params.data))}人想看</p>
             ${eventLast}
           </div>
          `
  }
}
</script>

<style lang="less" scoped>
.wantsee {
  position: relative;
  padding: 50px 30px;
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  .titbox {
    display: flex;
    padding-bottom: 30px;
    h4 {
      white-space: nowrap;
      font-size: 40px;
      line-height: 60px;
      flex: 1;
    }
    > div {
      text-align: right;
    }
  }
  .citysel {
    max-width: 210px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
    border: 2px solid #ebebeb;
    text-align: center;
    color: #303030;
    font-size: 14px;
    padding: 0 54px 0 20px;
    position: relative;
    margin-right: 30px;
    &::after {
      content: '';
      width: 0;
      height: 0;
      border-top: 10px solid #404d66;
      border-left: 8px solid #fff;
      border-right: 8px solid #fff;
      background-color: #404d66;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
    }
    span {
      width: 100%;
      display: block;
      font-size: 26px;
      line-height: 56px;
      color: rgba(48, 48, 48, 0.6);
    }
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
}
.wantchart {
  padding-bottom: 0;
  border-bottom: none;
}
/deep/ .tiptool {
  border: 4px solid rgba(48, 48, 48, 0.1);
  border-radius: 6px;
  padding: 20px 30px;
  background-color: #fff;
  .name {
    color: #47403b;
    font-size: 22px;
    line-height: 31px;
    position: relative;
    padding-left: 26px;
  }
  .count {
    color: #47403b;
    font-size: 22px;
    line-height: 31px;
    padding-left: 26px;
    margin-top: 3px;
  }
  .dot {
    background: #88aaf6;
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    left: 0;
    top: 8px;
  }
  .event {
    font-size: 22px;
    color: #88aaf6;
    line-height: 37px;
    padding-left: 26px;
    max-width: 400px;

    a {
      display: block;
      color: #88aaf6;
      text-decoration: underline;
      margin-top: 3px;
    }
  }
}
</style>
