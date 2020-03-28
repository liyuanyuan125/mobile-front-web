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
      <LineGrap
        :lineData="lineDatas"
        v-if="lineDatas.xDate"
        class="wantchart"
        :formatterHtml="formatterHtml"
      />
    </div>
    <div v-if="platName.length" class="formlist">
      <dl>
        <dt>
          <ul>
            <li>日期</li>
            <li>{{platName[0]}}</li>
          </ul>
        </dt>
        <dd v-for="(it,i) in platData" :key="it.date + i">
          <ul>
            <li>
              <span class="date">{{it.date}}</span>
              <span class="week">
                {{it.day}}
                <i v-if="it.markName">{{it.markName}}</i>
              </span>
            </li>
            <li>{{it.value}}</li>
          </ul>
        </dd>
        <dd>
          <div class="playmore" @click="goLink">查看全部日期</div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import SelectDate from '@/components/selectDate'
import { devLog, devInfo } from '@/util/dev'
import LineGrap from '@/components/lineGraph'
import { roleNumber } from '@/fn/validateRules'
import moment from 'moment'
import { openAppLink, AppLink } from '@/util/native'

@Component({
  components: {
    SelectDate,
    LineGrap
  }
})
export default class PlayTrend extends ViewBase {
  @Prop({ type: Object }) dataTrend!: any
  @Prop({ type: Object }) link!: AppLink

  lineDatas: any = {}
  dates: any = {}
  weekDays = ['日', '一', '二', '三', '四', '五', '六']

  created() {
    this.formatDatas(this.dataTrend.playDataList[0])
  }

  // 获取平台名称
  get platName() {
    const list = this.dataTrend.dailyFormList
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
    const list = this.dataTrend.dailyFormList
    const dataList = []
    if (list && list.length) {
      for (const it of list) {
        dataList.push({
          date: moment(it.date).format('YYYY-MM-DD'),
          day: '周' + this.weekDays[moment(it.date).day()],
          value: it.platformList[0].platformValue,
          markName: it.markName
        })
      }
    }
    return dataList
  }

  // 处理数据
  formatDatas(data: any) {
    const list: any[] = data.dataList
    const xDate = (list || []).map((it: any) => it.date)
    const yDate = (list || []).map((it: any) => it.value)

    this.lineDatas = {
      xDate,
      yDate: [
        {
          data: yDate,
          name: data.platformName
        }
      ]
    }
  }

  // 处理chart 浮层 tooltip
  formatterHtml = (params: any, time: any) => {
    const day = this.weekDays[moment(time).day()]
    const date = moment(time).format('YYYY-MM-DD')
    const name = this.dataTrend.playDataList[0].platformName
    return `
           <div style="border:2px solid rgba(48,48,48,.1);border-radius:6px; padding:7px 10px;background-color:#fff">
             <p style="color:#47403B;font-size:13px;line-height:16px">${date} 周${day}</p>
             <div style="color:#303030;font-size:13px;line-height:16px;margin-top:8px;white-space:nowrap">
              <span style="display:inline-block;margin-right:3px;border-radius:12px;
              width:7px;height:7px;background-color:#88AAF6;"></span>
              ${name}
              <span style="color:#88AAF6;font-weight:bold; margin-left:35px">
                ${roleNumber(Math.abs(params.data))}
              </span>
             </div>
           </div>
          `
  }

  // applink 跳转
  goLink() {
    openAppLink(this.link)
  }

  @Watch('dates', { deep: true })
  watchDays(val: any) {
    // console.log('获取日期选择组件选中的时间', val, this.dates)
    // this.dates = val
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

.formlist {
  border: 1px solid rgba(242, 243, 246, 0.5);
  background: #f2f3f6;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 50px;
  dt {
    font-size: 26px;
    padding: 0 30px;
  }
  dd {
    padding: 0 30px;
    &:nth-child(even) {
      background: #fff;
    }
  }
  ul {
    display: flex;
  }
  li {
    height: 110px;
    width: 25%;
    flex: 1;
    align-items: flex-start;
    justify-content: center;
    display: flex;
    flex-direction: column;
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
  dd li {
    padding-top: 18px;
    padding-bottom: 18px;
    font-size: 26px;
    line-height: 36px;
  }
}
.playmore {
  line-height: 110px;
  text-align: center;
  font-size: 28px;
  color: #88aaf6;
}
</style>
