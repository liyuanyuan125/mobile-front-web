<template>
  <div class="header-info">
    <div class="header">
      <img :src="coverImg"  alt="" class="img" />
      <div>
        <p class="brand-name">{{brandInfo.brandName}}</p>
        <p v-if="brandInfo.rankingName && !brandInfo.rankingId " class="event-name">{{brandInfo.rankingName}}</p>
        <p v-if="brandInfo.rankingName && brandInfo.rankingId">
          <router-link :to="{name: 'sentimenteventmarketing', params: {eventId: brandInfo.rankingId}}" class="event-name flex-box">
            <i>{{brandInfo.rankingName}}</i>
            <Icon name="arrow" size="13" class="icon-arrow" />
          </router-link> 
        </p>
      </div>
    </div>
    <div class="bubble">
      <BubbleBottom :data="bubbleDataList" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { toast } from '@/util/toast'
import { Icon } from 'vant'
import {BubbleLeft, BubbleBottom, BubbleItem, Title } from '@/components/bubble'
import { imgFixed } from '@/fn/imgProxy'

@Component({
  components: {
    BubbleBottom,
    Icon
  }
})
export default class Main extends Vue {
  /** 品牌基数信息 */
  @Prop({ type: Object}) brandInfo!: any
  /** 气泡数据信息 */
  @Prop({ type: Object}) bubbleData!: any

  // 处理 piaoshen http格式 url

  get coverImg() {
    if (this.brandInfo.brandLogo) {
      return imgFixed(this.brandInfo.brandLogo, 210, 210)
    }
  }

  get bubbleDataList() {
    return [
      {
        type: '1',
        value: this.bubbleData.materialsCount,
        title: '90天累计物料',
        trend: this.bubbleData.materialsTrend
      },
      {
        type: '2',
        value: this.bubbleData.interactCount,
        trend: this.bubbleData.interactTrend,
        big: true,
        renderTitle: (h: any) => {
          return h(Title, {
            props: {
              title: '90天累计互动'
            },
            on: {
              click: this.demo
            }
          })
      }},
      {
        type: '3',
        title: '综合热度',
        value: this.bubbleData.heatCount,
        trend: this.bubbleData.heatTrend,
        showdown: true,
        big: true,
      },
      {
        type: '4',
        title: '好感度',
        value: this.brandInfo.favorable
      }
    ]
  }
  demo() {
    toast('近90天内，物料新增的点赞、评论、转发、阅读或播放的累计之和')
  }
}

</script>

<style lang='less' scoped>
.header-info {
  position: relative;
  padding-top: 100px;
}
.header {
  position: relative;
  display: flex;
  padding: 0 40px 0;
  .img {
    border-radius: 10px;
    width: 210px;
    height: 210px;
    margin-right: 30px;
  }
  .brand-name {
    font-size: 40px;
    color: #303030;
    min-height: 116px;
  }
  .event-name {
    border-radius: 26px;
    background: #fff;
    padding: 6px 20px;
    font-size: 26px;
    color: #7ca4ff;
    display: flex;
    align-items: center;
    .icon-arrow {
      padding-left: 10px;
    }
  }
}
.bubble {
  padding: 0 30px;
  margin-top: -43px;
  position: relative;
  z-index: 12;
  height: 400px;
  overflow: hidden;
}
</style>
