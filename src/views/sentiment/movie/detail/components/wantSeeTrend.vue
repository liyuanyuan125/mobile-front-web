<template>
  <!--想看趋势 -->
  <div class="wantsee mod">
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
@import '../less/main.less';
.viewpage {
  background-color: #f2f3f6;
  padding-top: 113px;
  position: relative;
}
</style>
