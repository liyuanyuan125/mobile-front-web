<template>
  <!--竞品分析 -->
  <div class="rival mod">
    <ModuleHeader title="同档期影片分析" />
    <div v-if="list.length">
      <dl>
        <dd v-for="(item,index) in list" :key="item.rivalId + index">
          <div class="rivalbox">
            <img :src="item.rivalCover.url" :alt="item.rivalName" class="img" v-if="item.coverImg" />
            <img src="@/assets/moviedefault.png" :alt="baseInfo.movieNameCn" class="img" v-else />
            <h4 class="van-ellipsis">{{item.rivalName}}</h4>
            <div class="params">
              <div class="flex">
                <p class="tit">热度</p>
                <strong style="font-family: DIN Alternate;">{{item.heatCount}}</strong>
                <p
                  class="trend"
                  v-if="item.heatTrend"
                  :style="{color:item.heatTrend > 0 ? '#FF6262': '#88AAF6'}"
                >{{item.heatTrend > 0 ? '高'+item.heatTrendShow : '低' + item.heatTrendShow}}</p>
              </div>
              <div class="flex">
                <p class="tit">新增物料</p>
                <strong style="font-family: DIN Alternate;">{{item.materialsAdd}}</strong>
                <p
                  class="trend"
                  v-if="item.materialsTrend"
                  :style="{color:item.materialsTrend > 0 ? '#FF6262': '#88AAF6'}"
                >{{item.materialsTrend > 0 ? '高' + item.materialsTrendShow : '低' + item.materialsTrendShow}}</p>
              </div>
            </div>
            <div class="eventbox" v-if="item.eventName">
              <span class="tit van-ellipsis">{{item.eventName}}</span>
              <span class="date" v-if="item.eventCreatTime">{{item.eventCreatTime}}</span>
            </div>
          </div>
        </dd>
      </dl>
      <div class="golink">
        <router-link :to="{path:'/sentiment/movie/rivalAnalysis',query:{ids:rivalIds}}">查看详细报告</router-link>
      </div>
    </div>
    <dataEmpty v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import ModuleHeader from '@/components/moduleHeader'
import moment from 'moment'
import dataEmpty from '@/views/common/dataEmpty/index.vue'
import { imgFixed } from '@/fn/imgProxy'
import { roleNumber } from '@/fn/validateRules'

@Component({
  components: {
    ModuleHeader,
    dataEmpty
  }
})
export default class RivalAnalysis extends ViewBase {
  @Prop({ type: Array }) rivalList!: any[]

  get list() {
    const list = this.rivalList
    for (const item of this.rivalList) {
      item.eventCreatTime = moment(item.eventCreatTime).format('YYYY-MM-DD')
      item.coverImg = imgFixed(item.rivalCover, 200, 260)
      item.heatTrendShow = roleNumber(Math.abs(item.heatTrend))
      item.materialsTrendShow = roleNumber(Math.abs(item.materialsTrend))
    }
    return list
  }

  get rivalIds() {
    const rivalIds: string[] = []
    for (const item of this.rivalList) {
      rivalIds.push(item.rivalId)
    }
    return rivalIds.join(',')
  }
}
</script>

<style lang="less" scoped>
.rival {
  padding: 50px 0;
  border-top: 20px solid rgba(216, 216, 216, 0.2);
  dl {
    padding: 30px 30px 0;
  }
  dd {
    margin-top: 40px;
    &:first-child {
      margin-top: 10px;
    }
  }
  .golink {
    padding-top: 50px;
    text-align: center;
    a {
      color: #88aaf6;
      font-size: 28px;
      border: 2px solid #88aaf6;
      width: 400px;
      line-height: 86px;
      display: inline-block;
      border-radius: 45px;
    }
  }
}
.module-header {
  padding: 0 30px;
}
.rivalbox {
  position: relative;
  min-height: 260px;
  padding-left: 240px;
  .img {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 260px;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  h4 {
    font-size: 36px;
    font-weight: normal;
    line-height: 1.3;
  }
  .params {
    display: flex;
    margin-top: 20px;
    .flex {
      width: 50%;
      line-height: 1;
    }
    .tit {
      font-size: 26px;
      color: rgba(48, 48, 48, 0.4);
    }
    strong {
      display: block;
      font-size: 46px;
      margin-top: 10px;
    }
    .trend {
      font-size: 26px;
      margin-top: 10px;
    }
  }
  .eventbox {
    display: flex;
    background-color: #f8f9fa;
    line-height: 60px;
    padding: 0 20px;
    margin-top: 26px;
    span {
      white-space: nowrap;
    }
    span.tit {
      font-size: 26px;
      color: rgba(48, 48, 48, 0.8);
      flex: 1;
    }
    span.date {
      text-align: right;
      font-size: 22px;
      color: rgba(48, 48, 48, 0.4);
    }
  }
}
</style>
