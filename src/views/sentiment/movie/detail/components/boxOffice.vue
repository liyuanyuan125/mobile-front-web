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
.boxoffice {
  padding: 50px 0;
  .others {
    padding-right: 30px;
    .inner {
      display: flex;
    }
    .bfbox {
      flex: 1;
      margin-left: 30px;
      border: 2px solid #f2f3f6;
      border-radius: 10px;
      padding: 35px 30px;
    }
    .tit {
      display: flex;
    }
    strong {
      font-size: 32px;
      line-height: 45px;
    }
    span {
      flex: 1;
      font-size: 30px;
      color: #88aaf6;
      text-align: right;
    }
    p {
      font-size: 26px;
      color: rgba(48, 48, 48, 0.4);
      line-height: 30px;
      margin-top: 10px;
    }
  }
}
.bfstatis {
  background-color: #f8f9fa;
  position: relative;
  padding: 40px 0;
  display: flex;
  > div {
    flex: 1;
    text-align: center;
    position: relative;
    &::after {
      content: '';
      background-color: rgba(216, 216, 216, 0.6);
      width: 1px;
      height: 50px;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -25px;
    }
  }
  div:first-child {
    border-right: 2px solid #cfd1d9;
    &::after {
      display: none;
    }
    &::before {
      content: '';
      background-color: #f8f9fa;
      width: 6px;
      height: 6px;
      border-left: 2px solid #cfd1d9;
      border-top: 2px solid #cfd1d9;
      transform: rotate(-45deg);
      position: absolute;
      right: -4px;
      top: 50%;
      margin-top: -3px;
    }
  }
  div:last-child {
    &::after {
      display: none;
    }
  }
  strong {
    display: block;
    font-size: 32px;
    line-height: 50px;
  }
  p {
    font-size: 24px;
    line-height: 26px;
    color: rgba(48, 48, 48, 0.6);
    margin-top: 8px;
  }
}
</style>
