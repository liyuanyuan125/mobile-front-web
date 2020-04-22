<template>
  <!--指数趋势 -->
  <div class="wantsee">
    <div class="titbox">
      <h4>指数趋势</h4>
      <div>
        <SelectDate v-model="dates" />
      </div>
    </div>
    <div v-if="response.length">
      <div class="tabbox">
        <Button
          class="chg"
          v-for="(item) in tabList"
          :key="item.key + item.name"
          :class="{'chgbgc': tabIndex === item.key}"
          type="primary"
          @click="changeTab(item.key)"
        >{{item.name}}</Button>
      </div>
      <div>
        <trendLines :lineData="lineDatas" :colors="colors" v-if="lineDatas.xDate" />
        <dataEmpty v-else />
      </div>
    </div>
    <dataEmpty v-else />
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
import { Button } from 'vant'
import dataEmpty from '@/views/common/dataEmpty/index.vue'
import { formatCharts } from '@/fn/handleChart'

@Component({
  components: {
    Button,
    trendLines,
    SelectDate,
    dataEmpty
  }
})
export default class PlatformTrend extends ViewBase {
  /* 查询请求 */
  @Prop({ type: Function, required: true })
  fetch!: (query?: any) => Promise<any>
  /* 查询条件 */
  @Prop({ type: String }) query!: string

  tabList: any = []
  colors: any[] = [
    '#79DDC5',
    '#8DC3FF',
    '#5B72FF',
    '#9577FF',
    '#DD77FF',
    '#FF777B',
    '#FFC077'
  ]
  tabIndex: number = 1
  lineDatas: any = {}
  dates: any = {}
  response: any[] = []
  count: number = 7 // 筛选的天数

  @Watch('dates', { deep: true })
  watchDays(val: any) {
    this.count = val.count
    this.tabIndex = 1
    this.uplist()
  }

  @Watch('query', { deep: true })
  watchQuery(val: any) {
    this.uplist()
  }

  @Watch('tabIndex', { deep: true })
  watchTabIndex(val: number) {
    this.formatDatas(this.response[this.tabIndex - 1].dataList)
  }

  // 综合热度数据处理 title，xdata，ydata
  formatDatas(dataObj: any[]) {
    if (dataObj.length) {
      const newValue = formatCharts(dataObj, this.count)
      this.lineDatas = newValue
    } else {
      this.lineDatas = {}
    }
  }

  // tab 切换
  changeTab(id: number) {
    if (this.tabIndex !== id) {
      this.tabIndex = id
    }
  }

  async uplist() {
    try {
      const { data } = await this.fetch({
        movieIdList: this.query,
        startTime: this.dates.startTime,
        endTime: this.dates.endTime
      })
      // 处理平台名称
      let index: number = 0
      const navList: any[] = []
      for (const it of data) {
        index += 1
        navList.push({
          key: index,
          name: it.platformName
        })
      }
      this.tabList = navList
      this.response = data
      this.formatDatas(data[0].dataList)
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
}
.wantchart {
  padding-bottom: 0;
  border-bottom: none;
}
/deep/ .van-button--primary {
  height: 60px;
  background: rgba(255, 255, 255, 1);
  color: #303030;
  border-radius: 30px;
  border: 2px solid rgba(235, 235, 235, 1);
  font-size: 26px;
  padding: 0 26px;
}
.chg {
  margin-right: 20px;
  margin-top: 35px;
}

.chgbgc {
  background: #88aaf6;
  color: #fff;
}
</style>
