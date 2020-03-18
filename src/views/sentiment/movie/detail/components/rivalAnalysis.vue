<template>
  <!--竞品分析 -->
  <div class="rival mod">
    <ModuleTitle title="同档期影片分析" :appLink="appLink" />
    <dl>
      <dd v-for="(item,index) in list" :key="item.rivalId + index">
        <div class="rivalbox">
          <img :src="item.rivalCover.url" :alt="item.rivalName" class="img" />
          <h4>{{item.rivalName}}</h4>
          <div class="params">
            <div class="flex">
              <p class="tit">热度</p>
              <strong>{{item.heatCount}}</strong>
              <p
                class="trend"
                v-if="item.heatTrend"
                :style="{color:item.heatTrend > 0 ? '#FF6262': '#88AAF6'}"
              >{{item.heatTrend > 0 ? '高'+item.heatTrend : '低' + item.heatTrend}}</p>
            </div>
            <div class="flex">
              <p class="tit">新增物料</p>
              <strong>{{item.materialsAdd}}</strong>
              <p
                class="trend"
                v-if="item.materialsTrend"
                :style="{color:item.materialsTrend > 0 ? '#FF6262': '#88AAF6'}"
              >{{item.materialsTrend > 0 ? '高'+item.materialsTrend : '低' + item.materialsTrend}}</p>
            </div>
          </div>
          <div class="eventbox" v-if="item.eventName">
            <span class="tit">{{item.eventName}}</span>
            <span class="date" v-if="item.eventCreatTime">{{item.eventCreatTime}}</span>
          </div>
        </div>
      </dd>
    </dl>
    <div class="golink">
      <router-link :to="{path:'/sentiment/movie/rivalAnalysis',query:{ids:rivalIds}}">查看详细报告</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import ModuleTitle from '@/components/sentimentTitle'
import moment from 'moment'

@Component({
  components: {
    ModuleTitle
  }
})
export default class RivalAnalysis extends ViewBase {
  @Prop({ type: Array }) rivalList!: any[]

  get list() {
    let list = []
    for (const item of this.rivalList) {
      item.eventCreatTime = moment(item.eventCreatTime).format('YYYY-MM-DD')
    }
    list = this.rivalList
    return list
  }

  get rivalIds() {
    const rivalIds: string[] = []
    for (const item of this.rivalList) {
      rivalIds.push(item.rivalId)
    }
    return rivalIds.join(',')
  }

  appLink: string = ''
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
