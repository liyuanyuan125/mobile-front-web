<template>
  <div class="content">

    <div class="header">
      <img :src="brandInfo.brandLogo.url" class="img" />
      <div>
        <p class="brand-name">{{brandInfo.brandName}}</p>
        <p v-if="brandInfo.rankingName && !brandInfo.rankingId " class="event-name">{{brandInfo.rankingName}}</p>
        <p v-if="brandInfo.rankingName && brandInfo.rankingId">
          <router-link to="" class="event-name flex-box">
            <i>{{brandInfo.rankingName}}</i>
            <van-icon name="arrow" size="13" class="icon-arrow" />
          </router-link> 
        </p>
      </div>
    </div>

    <div class="dubble"> 
      <BubbleBottom :data="bubbleData" />
    </div>
        <Hots />
        <Wow />
        <User />
        <Event />
        <Competing /> 
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { Tab, Tabs, Icon } from 'vant'
import Hots from './components/hots.vue'
import Wow from './components/wow.vue'
import User from './components/users.vue'
import Event from './components/event.vue'
import Competing from './components/competing.vue'
import { toast } from '@/util/toast'
import {BubbleLeft, BubbleBottom, BubbleItem, Title } from '@/components/bubble'

@Component({
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    BubbleBottom,
    Hots,
    Wow,
    User,
    Event,
    Competing
  }
})
export default class BrandPage extends ViewBase {

  bubbleData: any = [
    {type: '1', value: '235,454', trend: '123', renderTitle: (h: any) => {
      return h(Title, {
        props: {
          title: '90天累计互动'
        },
        on: {
          click: this.demo
      }})
    }},
    {type: '2', title: '90天累计互动', value: '1,423', trend: '-356', big: true},
    {type: '3', title: '昨日销量排名', value: '234,234', trend: '-356', showdown: true},
    {type: '4', title: '好感度', value: 'B+'}
  ]

  brandInfo = {
    brandName: '梅赛德斯-奔驰',
    brandId: 1,
    brandLogo: {
      source: '',
      url: '//aiads-file.oss-cn-beijing.aliyuncs.com/IMAGE/MISC/blrhmtpe2o7g008ukpig.jpg'
    },
    rankingId: '', // 有值则加热搜事件链接
    rankingName: '#奔驰大G开进故宫', // 有值则显示模块，无则不显示模块
  }

  demo() {
    toast('近90天内，物料新增的点赞、评论、转发、阅读或播放的累计之和')
  }
}
</script>

<style lang="less" scoped>
@import '~@/views/sentiment/brand/less/lib.less';
@import './less/com.less';

/deep/ .van-tab__pane {
  display: block;
}
.content {
  background: #f2f3f6;
  /deep/ .van-tabs__wrap {
    height: 55px;
    border-bottom: solid 1px fade(@c-divider, 0.5);
    .van-tab {
      font-size: 30px;
      padding: 0;
      color: @c-text;
      flex: 1;
    }
    .van-tab--active {
      color: #7ca4ff;
    }
    .van-tabs__line {
      background-color: #88aaf6;
    }
  }
}
.header {
  display: flex;
  padding: 20px 40px 0;
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
    .icon-arrow {
      padding-left: 10px;
    }
  }
}
.dubble {
  margin-top: -40px;
  background: url('./images/bg2.png') no-repeat left bottom;
  background-size: 100% 220px;
}
/deep/ .bubble-warper-bottom {
  .mask {
    opacity: 0;
  }
}
.bg-header {
  width: 100%;
  height: 120px;
}
.line-height {
  height: 50px;
  width: 100%;
  background: #fff;
}
</style>
