<template>
  <div class="header-info">
    <div class="header">
      <!-- <van-loading color="#1989fa" size="30" /> -->
      <van-image
        fit="cover"
        :src="coverImg"
        class="img"
        :class="{'errorImg': !coverImg}"
        :error-icon="defaultImg"
      ></van-image>
      <div>
        <p class="brand-name">{{brandInfo.brandName}}</p>
        <p
          v-if="brandInfo.rankingName && !brandInfo.rankingId "
          class="event-name"
        >{{brandInfo.rankingName}}</p>
        <p v-if="brandInfo.rankingName && brandInfo.rankingId" @click="talkingData('头部事件点击')">
          <router-link
            :to="{
             name: 'sentimenteventmarketing', 
             params: {eventId: brandInfo.rankingId},
             query: { title: brandInfo.rankingName },
            }"
            class="event-name flex-box"
          >
            <i>{{brandInfo.rankingName}}</i>
            <Icon name="arrow" size="13" class="icon-arrow" />
          </router-link>
        </p>
      </div>
    </div>
    <div class="bubble">
      <BubbleBottom :data="bubbleDataList" @click.native="talkingData('互动量说明')" />
    </div>
    <div class="curve">
      <div class="curvetop"></div>
      <div class="curvebot"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
// import { toast } from '@/util/toast'
import { alert } from '@/util/toast'
import { Icon, Image, Loading } from 'vant'
import { BubbleLeft, BubbleBottom, BubbleItem, Title } from '@/components/bubble'
import { imgFixed } from '@/fn/imgProxy'
import { talkingdataHandle } from '@/util/TDEvent'

@Component({
  components: {
    BubbleBottom,
    Icon,
    [Image.name]: Image,
    [Loading.name]: Loading
  }
})
export default class Main extends Vue {
  /** 品牌基数信息 */
  @Prop({ type: Object }) brandInfo!: any
  /** 气泡数据信息 */
  @Prop({ type: Object }) bubbleData!: any

  // 默认图
  defaultImg = require('./assets/default.png')

  get coverImg() {
    if (this.brandInfo.brandLogo) {
      return imgFixed(this.brandInfo.brandLogo, 210, 210)
    }
    return ''
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
        }
      },
      {
        type: '3',
        title: '综合热度',
        value: this.bubbleData.heatCount,
        trend: this.bubbleData.heatTrend,
        showdown: true,
        renderTitle: (h: any) => {
          return h(Title, {
            props: {
              title: '综合热度'
            },
            on: {
              click: this.handleHeat
            }
          })
        },
        big: true
      },
      {
        type: '4',
        title: '好感度',
        value: this.brandInfo.favorable
      }
    ]
  }
  demo() {
    alert({
      // title: '提示',
      message: '近90天内，物料新增的点赞、评论、转发、阅读或播放的累计之和',
      showConfirmButton: true,
      className: 'alertwid'
    })
  }
  handleHeat() {
    alert({
      // title: '提示',
      message:
        '热度值是根据百度、微博、微信三大指数综合计算。热度指数值每日更新2次，分别为12:00和17:30',
      showConfirmButton: true,
      className: 'alertwid'
    })
  }

  talkingData(label: string) {
    talkingdataHandle('品牌详情页', label)
  }
}
</script>

<style lang='less' scoped>
/deep/ .van-image__error {
  img {
    width: 100%;
    height: 100%;
  }
}
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
    overflow: hidden;
  }
  .errorImg {
    border: solid 1px #d4d4d4;
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
  margin-top: -30px;
  position: relative;
  z-index: 12;
  height: 415px;
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
