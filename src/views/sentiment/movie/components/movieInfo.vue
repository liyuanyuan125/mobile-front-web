<template>
  <!--基本信息 -->
  <div class="viewpage">
    <div class="movieinfo">
      <div class="moviebox">
        <!-- <img :src="coverImg" :alt="baseInfo.movieNameCn" class="img" /> -->
        <img src="@/assets/person-default.png" :alt="baseInfo.movieNameCn" class="img" />
        <h3>{{baseInfo.movieNameCn}}</h3>
        <h5>{{baseInfo.movieNameEn}}</h5>
        <p>{{baseInfo.duration}}{{!baseInfo.duration || !baseInfo.genreName ? '' : ' - '}}{{baseInfo.genreName}}</p>
        <p>{{baseInfo.releaseDate}}</p>
      </div>
    </div>
    <BubbleBottom :data="bubbleData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { BubbleBottom } from '@/components/bubble'

@Component({
  components: {
    BubbleBottom
  }
})
export default class BaseInfoArea extends ViewBase {
  @Prop({ type: Object }) baseInfo!: any
  @Prop({ type: Object }) overView!: any

  bubbleData: any = []
  mounted() {
    // 处理概览数据
    this.bubbleData = [
      {
        type: '1',
        title: '累计媒体物料',
        value: this.overView.materialsCount,
        trend: this.overView.materialsCount
      },
      {
        type: '2',
        title: '累计评论数',
        value: this.overView.commentCount,
        trend: this.overView.commnetTrend
      },
      {
        type: '3',
        title: '行业实时热度',
        value: this.overView.heatRanking,
        trend: this.overView.heatTrend,
        showdown: true
      },
      { type: '4', title: '好感度', value: this.baseInfo.favorable }
    ]
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
.viewpage {
  background-color: #f7f7f9;
  padding-top: 130px;
}
</style>
