<template>
  <!--播放量监控 -->
  <div class="playtrend">
    <div class="titbox">
      <h4>播放量监控</h4>
      <div>
        <SelectDate v-model="dates" />
      </div>
    </div>

    <div>
      <trendLines
        :lineData="lineDatas"
        v-if="(response.dailyFormList || []).length"
        class="wantchart"
        :colors="colors"
        :isGrad="true"
      />
      <dataEmpty v-else />
    </div>
    <div class="daily-form" v-if="platName.length && platData.length ">
      <div class="daily-table-wrap">
        <table class="daily-table">
          <thead>
            <th class="col-date">日期</th>
            <th v-for="(name,ind) in platName" :key="name + ind" class="col-cell">{{name}}</th>
          </thead>
          <tbody>
            <tr v-for="(it,i) in platData" :key="it.date + i">
              <td class="col-date">
                <span class="date">{{it.date}}</span>
                <span class="week">
                  {{it.day}}
                  <i v-if="it.markName">{{it.markName}}</i>
                </span>
              </td>
              <td
                v-for="(plat,index) in it.value"
                :key="plat.platformName + index"
                class="col-cell"
              >{{plat.platformValue || '-'}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <a class="daily-form-more" @click="goLink">查看全部日期</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SelectDate from '@/components/selectDate'
import { devLog, devInfo } from '@/util/dev'
import trendLines from '@/components/trendLine'
import { roleNumber } from '@/fn/validateRules'
import moment from 'moment'
import dataEmpty from '@/views/common/dataEmpty/index.vue'
import { openAppLink, AppLink } from '@/util/native'
import { lastDays } from '@/util/timeSpan'

@Component({
  components: {
    SelectDate,
    trendLines,
    dataEmpty
  }
})
export default class PlayTrend extends ViewBase {
  @Prop({ type: Function, required: true })
  fetch!: (query?: any) => Promise<any>
  @Prop({ type: String }) query!: string
  @Prop({ type: Object }) link!: AppLink

  lineDatas: any = {}
  dates = {
    startTime: lastDays(7)[0],
    endTime: lastDays(7)[1]
  }
  colors: any[] = [
    '#88AAF6',
    '#79DDC5',
    // '#8DC3FF',
    '#5B72FF',
    '#9577FF',
    '#DD77FF',
    '#FF777B',
    '#FFC077'
  ]
  weekDays = ['日', '一', '二', '三', '四', '五', '六']
  response: any = {}

  // 接口获取数据
  async apiGetData() {
    try {
      const res: any = await this.fetch({
        tvId: this.query,
        ...this.dates
      })
      //   console.log('data', data)
      this.response = res
      this.formatDatas(this.response.playDataList)
    } catch (ex) {
      // toast(ex)
    }
  }

  // 获取平台名称
  get platName() {
    const list = this.response.dailyFormList
    const nameList = []
    if (list && list.length) {
      for (const it of list[0].platformList) {
        nameList.push(it.platformName)
      }
    }
    return nameList
  }

  // 处平理数据
  get platData() {
    const list = this.response.dailyFormList
    const dataList = []
    if (list && list.length) {
      for (const it of list) {
        dataList.push({
          date: moment(it.date).format('YYYY-MM-DD'),
          day: '周' + this.weekDays[moment(it.date).day()],
          value: it.platformList,
          markName: it.markName
        })
      }
    }
    return dataList
  }

  // 处理数据
  formatDatas(dataObj: any[]) {
    let xDate: any = []
    const yDate = (dataObj || []).map((it: any) => {
      const { platformName, dataList } = it
      xDate = (dataList || []).map((ite: any) => ite.date)
      return {
        name: platformName,
        list: (dataList || []).map((ite: any) => ite.value)
      }
    })
    this.lineDatas = {
      title: '',
      xDate,
      yDate
    }
  }

  // applink 跳转
  goLink() {
    openAppLink(this.link)
  }

  @Watch('dates', { deep: true })
  watchDays(val: any) {
    this.apiGetData()
  }
}
</script>

<style lang="less" scoped>
.playtrend {
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

.daily-form {
  margin-top: 60px;
  background: rgba(242, 243, 246, 0.5);
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
  .date {
    display: block;
    font-size: 24px;
  }
  .week {
    display: block;
    i {
      color: #ff6262;
    }
  }
}

.daily-form-more {
  border-top: 2px solid rgba(242, 243, 246, 1);
  display: block;
  height: 110px;
  line-height: 110px;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
  color: #88aaf6;
}
</style>
