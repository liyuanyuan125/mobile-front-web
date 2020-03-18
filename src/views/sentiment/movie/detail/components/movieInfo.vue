<template>
  <!--基本信息 -->
  <div class="viewpage">
    <div class="movieinfo">
      <div class="moviebox">
        <img :src="movieCover" :alt="baseInfo.movieNameCn" class="img" v-if="movieCover" />
        <img src="@/assets/person-default.png" :alt="baseInfo.movieNameCn" class="img" v-else />
        <h3>{{baseInfo.movieNameCn}}</h3>
        <h5>{{baseInfo.movieNameEn}}</h5>
        <p>{{baseInfo.duration}}{{!baseInfo.duration || !baseInfo.genreName ? '' : ' - '}}{{baseInfo.genreName}}</p>
        <p>{{baseInfo.releaseDate}}</p>
      </div>
    </div>
    <div class="bubble">
      <BubbleBottom :data="bubbleData" />
    </div>
    <div class="curve">
      <div class="curvetop"></div>
      <div class="curvebot"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { BubbleBottom } from '@/components/bubble'
import { imgFixed } from '@/fn/imgProxy'

@Component({
  components: {
    BubbleBottom
  }
})
export default class BaseInfoArea extends ViewBase {
  @Prop({ type: Object }) baseInfo!: any
  @Prop({ type: Object }) overView!: any

  bubbleData: any = []
  movieCover: string = ''

  mounted() {
    // 处理封面图
    if (this.baseInfo.coverUrl && this.baseInfo.coverUrl.url) {
      const imgUrl: any = imgFixed(this.baseInfo.coverUrl, 180, 240)
      this.movieCover = imgUrl
    }
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
.viewpage {
  background-color: #f2f3f6;
  padding-top: 113px;
  position: relative;
}
.movieinfo {
  padding: 0 30px;
  position: relative;
  z-index: 2;

  .moviebox {
    position: relative;
    padding: 0 30px 0 210px;
    font-size: 26px;
    line-height: 37px;
    min-height: 240px;
    color: #303030;

    .img {
      position: absolute;
      left: 0;
      top: 0;
      width: 180px;
      height: 240px;
      border-radius: 10px;
      border: 1px solid #d4d4d4;
    }

    h3 {
      font-size: 40px;
      line-height: 56px;
      font-weight: normal;
    }

    h5 {
      word-break: break-all;
      word-wrap: wrap;
      margin-top: 6px;
      line-height: 31px;
      font-weight: normal;
      opacity: 0.3;
    }

    p {
      margin-top: 12px;
      opacity: 0.7;
    }
  }
}
.bubble {
  padding: 0 30px;
  margin-top: -43px;
  position: relative;
  z-index: 12;
  height: 370px;
  overflow: hidden;
}
.curve {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
}
.curvetop {
  background: #fff;
  &::before {
    content: '';
    display: block;
    background-color: #f2f3f6;
    height: 60px;
    border-radius: 0 0 60px 0;
  }
}
.curvebot {
  background: #f2f3f6;
  &::before {
    content: '';
    display: block;
    background-color: #fff;
    height: 60px;
    border-radius: 60px 0 0 0;
  }
}
</style>
