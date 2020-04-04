<template>
  <!--基本信息 -->
  <div class="viewpage">
    <div class="movieinfo">
      <div class="moviebox">
        <img :src="movieCover" :alt="baseInfo.tvName" class="img" />
        <h3 class="van-ellipsis">{{baseInfo.tvName}}</h3>
        <p>{{baseInfo.episodes}}{{!baseInfo.episodes ? '' : ' / '}}{{baseInfo.duration}}{{!baseInfo.duration ? '' : ' / '}}{{baseInfo.genreName}}</p>
        <p v-if="baseInfo.releaseDate">{{baseInfo.releaseDate}}</p>
        <p v-if="platformList.length">
          播放平台：
          <img v-for="(img,i) in platformList" :key="img.url+i" :src="img.logoUrl" />
        </p>
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

  // 数据概览
  get bubbleData() {
    let bubble: any[] = []
    if (this.overView) {
      bubble = [
        {
          type: '1',
          title: '累计媒体物料',
          value: this.overView.materialsCount,
          trend: this.overView.materialsTrend
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
          trend: this.overView.heatTrend || 0,
          showdown: true
        },
        { type: '4', title: '好感度', value: this.baseInfo.favorable }
      ]
    }
    return bubble
  }
  // 封面图
  get movieCover() {
    const url: any = this.baseInfo.coverUrl
      ? imgFixed(this.baseInfo.coverUrl, 180, 240)
      : ''
    return url
  }

  // 播放平台
  get platformList() {
    const list = this.baseInfo.platformLogoList || []
    const platList = []
    if (list.length) {
      for (const it of list) {
        it.logoUrl = it.url ? imgFixed(it.url, 40, 40, 4) : ''
      }
    }
    return list
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
      background: url('.././../../../../assets/moviedefault.png') no-repeat center;
      background-size: cover;
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
