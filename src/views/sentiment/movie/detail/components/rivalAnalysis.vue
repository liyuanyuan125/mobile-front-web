<template>
  <!--竞品分析 -->
  <div class="rival mod">
    <ModuleTitle title="同档期影片分析" :appLink="appLink" />
    <dl>
      <dd v-for="(item,index) in rivalList" :key="item.rivalId + index">
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
          <div class="eventbox">
            <span class="tit">232</span>
            <span class="date">2020-01-02</span>
          </div>
        </div>
      </dd>
    </dl>
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
export default class RivalAnalysis extends ViewBase {
  @Prop({ type: Array }) rivalList!: any[]

  appLink: string = ''
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
