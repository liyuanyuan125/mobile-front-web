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
    <div>
      <LineGrap
        :lineData="lineDatas"
        v-if="lineDatas.xDate.length"
        :key="lineDatas.title"
        class="wantchart"
        :formatterHtml="formatterHtml"
      />
    </div>
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

@Component({
  components: {
    SelectDate,
    LineGrap
  }
})
export default class WantSeeTrend extends ViewBase {
  @Prop({ type: Object }) dataTrend!: any

  lineDatas: any = {}
  city: any = {
    areaId: 'quanguo',
    areaName: '全国',
    selectType: 1
  }
  dates: any = {}

  created() {
    this.formatDatas(this.dataTrend.dailyGainList)
  }

  @Watch('dates', { deep: true })
  watchDays(val: any) {
    // console.log('获取日期选择组件选中的时间', val, this.dates)
    // this.dates = val
  }

  // 处理数据
  formatDatas(data: any[]) {
    const xDate = (data || []).map((it: any) => it.date)
    const yDate = (data || []).map((it: any) => it.value)
    const eventList = (data || []).map((it: any) => it.eventList)

    this.lineDatas = {
      xDate,
      eventList,
      yDate: [
        {
          data: yDate,
          name: '想看数'
        }
      ]
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
      this.city = codeJson.data
    }
  }

  // 处理chart 浮层 tooltip
  formatterHtml = (params: any, time: any) => {
    const weekDays = ['日', '一', '二', '三', '四', '五', '六']
    const day = weekDays[moment(time).day()]
    const date = moment(time).format('YYYY-MM-DD')
    return `
           <div class="tiptool">
             <p  class="name">
             <i class="dot"></i>
             ${date} 周${day} 日增${roleNumber(Math.abs(params.data))}人想看</p>
             <div class="event">最适合跨年看得电影，曝终极预告片</div>
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
  }
  .dot {
    background: #88aaf6;
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-right: 10px;
    vertical-align: middle;
    position: relative;
    margin-top: -5px;
  }
  .event {
    font-size: 22px;
    color: #88aaf6;
    line-height: 37px;
    padding-left: 26px;
    margin-top: 10px;
    white-space: nowrap;
    text-decoration: underline;
  }
}
</style>
