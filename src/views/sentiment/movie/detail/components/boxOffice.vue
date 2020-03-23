<template>
  <!--影片票房 -->
  <div class="boxoffice mod">
    <ModuleHeader title="影片票房" :link="appLink" />
    <div v-if="boxoffice">
      <div class="bfstatis">
        <div>
          <strong>{{boxoffice.totalBoxOffice}}</strong>
          <p>累计票房</p>
        </div>
        <div>
          <strong>{{boxoffice.totalPerson}}</strong>
          <p>总人次</p>
        </div>
        <div>
          <strong>{{boxoffice.firstDayBoxOffice}}</strong>
          <p>首日票房</p>
        </div>
        <div>
          <strong>{{boxoffice.firstWeekBoxOffice}}</strong>
          <p>首周票房</p>
        </div>
      </div>
      <div class="tabbox">
        <ul>
          <li
            v-for="item in tabList"
            :class="tabIndex===item.id ? 'cur' : ''"
            :key="item.key"
            @click="() => tabIndex = item.id"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="chartbox">
        <dubline :lineData="linedata" v-if="linedata.xDate" class="wantchart" />
      </div>
      <div class="others">
        <div class="inner">
          <div class="bfbox" @click="goLink(2)">
            <div class="tit">
              <strong>城市票房</strong>
              <span>{{boxoffice.cityBoxOffice}}</span>
            </div>
            <p>TOP 1 {{boxoffice.cityBoxOfficeTop}}</p>
          </div>
          <div class="bfbox" @click="goLink(3)">
            <div class="tit">
              <strong>影投票房</strong>
              <span>{{boxoffice.companyBoxOffice}}</span>
            </div>
            <p>TOP 1 {{boxoffice.companyBoxOfficeTop}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="datanull">
      <img src="@/assets/data-null.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { dubline } from '@/components/hotLine'
import ModuleHeader from '@/components/moduleHeader'
import { openAppLink, AppLink } from '@/util/native'

@Component({
  components: {
    ModuleHeader,
    dubline
  }
})
export default class BoxOffice extends ViewBase {
  @Prop({ type: Object }) boxoffice!: any
  @Prop({ type: Object }) link!: any

  appLink: any = this.link
  tabList: any = [
    {
      id: 1,
      key: 'boxOfficeList',
      name: '日票房'
    },
    {
      id: 2,
      key: 'scheduleList',
      name: '日排片'
    }
  ]
  tabIndex: number = 1
  xDate: any = []
  yDate: any = []
  eventList: any = []
  linedata: any = {}

  created() {
    if (this.boxoffice) {
      this.formatDatas(this.boxoffice.boxOfficeList)
    }
  }

  @Watch('boxoffice', { deep: true })
  watchBoxOffice() {
    if (this.boxoffice) {
      this.formatDatas(this.boxoffice.boxOfficeList)
    }
  }

  @Watch('tabIndex', { deep: true })
  watchTabIndex(val: number) {
    if (val === 1) {
      this.formatDatas(this.boxoffice.boxOfficeList)
    } else if (val === 2) {
      this.formatDatas(this.boxoffice.scheduleList)
    }
  }

  // 处理数据
  formatDatas(data: any[]) {
    if (data && data.length) {
      const xDate = (data || []).map((it: any) => it.name)
      const yDate = (data || []).map((it: any) => it.value)
      const eventList = (data || []).map((it: any) => it.eventList)
      this.linedata = {
        xDate,
        eventList,
        yDate: [
          {
            data: yDate
          }
        ]
      }
    }
  }

  // 去往原生页
  goLink(type: number) {
    this.appLink.boxOfficeType = type ? type : 1
    openAppLink(this.appLink)
  }
}
</script>

<style lang="less" scoped>
.chartbox {
  padding: 0 30px;
}
.wantchart {
  border-bottom: 0;
  padding-bottom: 0;
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
.boxoffice {
  padding: 50px 0;
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  .module-header {
    padding: 0 30px;
  }
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
  margin-top: 30px;
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
.datanull {
  text-align: center;
  padding: 50px;
  img {
    width: 180px;
  }
}
</style>
