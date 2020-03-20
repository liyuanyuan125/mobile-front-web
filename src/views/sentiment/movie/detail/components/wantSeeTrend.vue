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
        <SelectDate @selectDate="getSelectDate" />
      </div>
    </div>
    <div class="tabbox">
      <ul>
        <li
          v-for="item in tabList"
          :class="tabIndex===item.id ? 'cur' : ''"
          :key="item.key"
          @click="changeTab(item.id)"
        >{{item.name}}</li>
      </ul>
    </div>
    <div>
      <dubline
        :lineData="lineDatas"
        v-if="lineDatas.xDate.length"
        :key="lineDatas.title"
        class="wantchart"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import hotLine from '@/components/hotLine/line.vue'
import SelectDate from '@/components/selectDate'
import { handleCitySelect } from '@/util/native'
import { devLog, devInfo } from '@/util/dev'
import { dubline } from '@/components/hotLine'

@Component({
  components: {
    hotLine,
    SelectDate,
    dubline
  }
})
export default class WantSeeTrend extends ViewBase {
  @Prop({ type: Object }) dataTrend!: any

  tabList: any = [
    {
      id: 1,
      key: 'totalGainList',
      name: '累计'
    },
    {
      id: 2,
      key: 'dailyGainList',
      name: '日增'
    }
  ]
  tabIndex: number = 1
  lineDatas: any = {}
  city: any = {
    areaId: 'quanguo',
    areaName: '全国',
    selectType: 1
  }

  created() {
    const date: any = this.$refs.selDate
    this.formatDatas(this.dataTrend.totalGainList)
  }

  @Watch('tabIndex', { deep: true })
  watchTabIndex(val: number) {
    if (val === 1) {
      this.formatDatas(this.dataTrend.totalGainList)
    } else if (val === 2) {
      this.formatDatas(this.dataTrend.dailyGainList)
    }
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
          name: '营销事件'
        }
      ]
    }
  }

  // tab 切换
  changeTab(id: number) {
    if (this.tabIndex !== id) {
      this.tabIndex = id
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
    // devLog('选择城市', codeJson)
  }

  // 获取日期选择组件选中的时间
  getSelectDate(data: any) {
    // console.log(data)
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
</style>
