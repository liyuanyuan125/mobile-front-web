<template>
  <!--想看趋势 -->
  <div class="wantsee">
    <div class="titbox">
      <h4>想看趋势</h4>
      <div>
        <SelectDate v-model="dates" />
      </div>
    </div>
    <div>
      <trendLines
        :lineData="lineDatas"
        :colors="colors"
        v-if="lineDatas.yDate && lineDatas.yDate.length"
      />
      <dataEmpty v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SelectDate from '@/components/selectDate'
import { devLog, devInfo } from '@/util/dev'
import trendLines from '@/components/trendLine'
import { toast } from '@/util/toast'
import moment from 'moment'
import dataEmpty from '@/views/common/dataEmpty/index.vue'

@Component({
  components: {
    trendLines,
    SelectDate,
    dataEmpty
  }
})
export default class WantSeeTrend extends ViewBase {
  /* 查询请求 */
  @Prop({ type: Function, required: true })
  fetch!: (query?: any) => Promise<any>
  /* 查询条件 */
  @Prop({ type: String }) query!: string

  colors: any[] = [
    '#79DDC5',
    '#8DC3FF',
    '#5B72FF',
    '#9577FF',
    '#DD77FF',
    '#FF777B',
    '#FFC077'
  ]
  lineDatas: any = {}
  dates: any = {}
  response: any = {
    totalDataList: [],
    newDataList: []
  }
  count: number = 7

  @Watch('dates', { deep: true })
  watchDays(val: any) {
    this.count = val.count
    this.uplist()
  }

  @Watch('query', { deep: true })
  watchQuery(val: any) {
    this.uplist()
  }

  // 综合热度数据处理 title，xdata，ydata
  formatDatas(dataObj: any[]) {
    // this.formatData(dataObj,this.count)
    // 处理日期
    const lastDate: any[] = []
    const nowDate = moment(new Date()).format('YYYY-MM-DD 00:00:00')
    const now = new Date(nowDate).getTime()
    for (var i = 0; i < this.count; i++) {
      lastDate.unshift(now - i * 24 * 60 * 60 * 1000)
    }
    // 处理数据
    const lastValue = (dataObj || []).map((it: any) => {
      const { rivalName, data } = it
      const yVal = new Array(this.count).fill(null)
      data.map((ite: any) => {
        const mapIndex = lastDate.indexOf(ite.date)
        yVal[mapIndex] = ite.value
      })
      return {
        name: rivalName,
        list: yVal
      }
    })

    this.lineDatas = {
      title: '',
      xDate: lastDate,
      yDate: lastValue
    }
  }

  async uplist() {
    try {
      const { data } = await this.fetch({
        movieIdList: this.query,
        ...this.dates
      })
      this.response = data
      this.formatDatas(this.response.newDataList)
    } catch (ex) {
      toast(ex)
    }
  }
}
</script>

<style lang="less" scoped>
.wantsee {
  position: relative;
  padding: 50px 30px;
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  margin-top: 1px;
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
</style>
