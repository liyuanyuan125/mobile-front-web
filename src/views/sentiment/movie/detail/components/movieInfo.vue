<template>
  <!--基本信息 -->
  <div class="viewpage">
    <div class="movieinfo">
      <div class="moviebox">
        <img :src="movieCover" :alt="baseInfo.movieNameCn" class="img" v-if="movieCover" />
        <img src="@/assets/moviedefault.png" :alt="baseInfo.movieNameCn" class="img" v-else />
        <h3 class="van-ellipsis">{{baseInfo.movieNameCn}}</h3>
        <h5 class="van-ellipsis">{{baseInfo.movieNameEn}}</h5>
        <p
          class="van-ellipsis"
        >{{baseInfo.duration}}{{!baseInfo.duration || !baseInfo.genreName ? '' : ' - '}}{{baseInfo.genreName}}</p>
        <p class="van-ellipsis">{{baseInfo.releaseDate}}</p>
      </div>
    </div>
    <div class="bubble">
      <BubbleBottom :data="bubbleData" @click.native="talkingData('互动量说明')" />
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
import { BubbleBottom, Title } from '@/components/bubble'
import { imgFixed } from '@/fn/imgProxy'
import { alert } from '@/util/toast'
import { talkingdataHandle } from '@/util/TDEvent'

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
    bubble = [
      {
        type: '1',
        title: '累计媒体物料',
        value: this.overView ? this.overView.materialsCount : null,
        trend: this.overView ? this.overView.materialsTrend : null
      },
      {
        type: '2',
        title: '累计评论数',
        value: this.overView ? this.overView.commentCount : null,
        trend: this.overView ? this.overView.commentTrend : null
      },
      {
        type: '3',
        value: this.overView ? this.overView.heatCount : null,
        trend: this.overView ? this.overView.heatTrend : null,
        showdown: true,
        renderTitle: (h: any) => {
          return h(Title, {
            props: {
              title: `实时热度`
            },
            on: {
              click: this.showNote
            }
          })
        }
      },
      { type: '4', title: '好感度', value: this.baseInfo.favorable }
    ]
    return bubble
  }

  // 封面图
  get movieCover() {
    const url: any = this.baseInfo.coverUrl
      ? imgFixed(this.baseInfo.coverUrl, 180, 240)
      : ''
    return url
  }

  talkingData(label: string) {
    talkingdataHandle('电影详情页', label)
  }

  // 显示说明
  showNote() {
    alert({
      title: '',
      message:
        '热度值是根据百度、微博、微信三大指数综合计算。热度指数值每日更新2次，分别为12:00和17:30',
      showConfirmButton: true,
      className: 'alertwid'
    })
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
