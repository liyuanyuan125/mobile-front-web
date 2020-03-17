<template>
  <!--影片票房 -->
  <div class="boxoffice mod">
    <ModuleTitle title="影片票房" :appLink="appLink" />
    <div class="bfstatis">
      <div>
        <strong>6.42亿</strong>
        <p>累计票房</p>
      </div>
      <div>
        <strong>1,232.3亿</strong>
        <p>总人次</p>
      </div>
      <div>
        <strong>6.42亿</strong>
        <p>首日票房</p>
      </div>
      <div>
        <strong>6.42亿</strong>
        <p>首周票房</p>
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

    <div class="others">
      <div class="inner">
        <div class="bfbox">
          <div class="tit">
            <strong>城市票房</strong>
            <span>3155.3万</span>
          </div>
          <p>TOP 1 北京</p>
        </div>
        <div class="bfbox">
          <div class="tit">
            <strong>影投票房</strong>
            <span>3155.3万</span>
          </div>
          <p>TOP 1 万达电影院线</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import ModuleTitle from '@/components/sentimentTitle'

@Component({
  components: {
    ModuleTitle
  }
})
export default class BoxOffice extends ViewBase {
  @Prop({ type: Object }) dataTrend!: any

  appLink: string = ''
  tabList: any = [
    {
      id: 1,
      key: 'totalGainList',
      name: '日票房'
    },
    {
      id: 2,
      key: 'dailyGainList',
      name: '日排片'
    }
  ]
  tabIndex: number = 1
  xDate: any = []
  yDate: any = []
  eventList: any = []

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
