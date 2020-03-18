<template>
  <!--想看趋势 -->
  <div class="wantsee">
    <div class="titbox">
      <h4>想看趋势</h4>
      <div>
        <div class="citysel">
          <span>全国</span>
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
      <!-- <hotLine /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import hotLine from '@/components/hotLine/line.vue'
import SelectDate from '@/components/selectDate'

@Component({
  components: {
    hotLine,
    SelectDate
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
  xDate: any = []
  yDate: any = []
  eventList: any = []

  mounted() {
    const date: any = this.$refs.selDate
    // console.log('date', date)
  }

  // 处理 trend 数据
  formatChartData() {
    return {
      xDate: this.xDate, // 格式 ['20201212', '20121122', '20121122','20121122','20121122','20121122','20121122']
      eventList: this.eventList,
      yDate: [
        {
          data: this.yDate, // 格式 [333,33333,303333333,33333,333,33333,303333333]
          name: '热点'
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
    width: 160px;
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
      font-weight: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
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
</style>
