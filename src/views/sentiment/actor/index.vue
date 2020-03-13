<template>
  <div class="content">
    <div class="header">
      <div class='left'>
        <div>
          <img :src="kolInfo.kolLogo.url" class="img" />
        </div>
      </div>
      <div class='right'>
        <p class="kol-name">{{kolInfo.actorName}}</p>
        <p v-if="kolInfo.rankingName && !kolInfo.rankingId " class="event-name">
            <span>
              <i class='hid'>{{kolInfo.rankingNum}}&nbsp;</i>
              <i class='bor'>{{kolInfo.rankingName}}</i>
            </span>
        </p>
        <p v-if="kolInfo.rankingName && kolInfo.rankingId">
          <router-link to="" class="event-name flex-box">
            <span>
              <i class='hid'>{{kolInfo.rankingNum}}&nbsp;</i>
              <i class='bor'>{{kolInfo.rankingName}}</i>
            </span>
            <Icon name="arrow" size="13" class="icon-arrow" />
          </router-link> 
        </p>
      </div>
    </div>

    <div class="dubble"> 
      <BubbleBottom :data="bubbleData" />
    </div>
    <!-- 热度分析 -->
    <Hots />
    <!-- 口碑评论 -->
    <!-- 待更换 -->
    <Public />
    <!-- 用户分析 -->
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
import Public from './components/public.vue'
import User from './components/users.vue'
import Event from './components/event.vue'
import Competing from './components/competing.vue'
import { toast } from '@/util/toast'
import {BubbleLeft, BubbleBottom, BubbleItem, Title } from '@/components/bubble'

@Component({
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Icon,
    BubbleBottom,
    Hots,
    Public,
    User,
    Event,
    Competing
  }
})
export default class KolPage extends ViewBase {

  bubbleData: any = [
    {type: '1', value: '235,454', trend: '123',  renderTitle: (h: any) => {
      return h(Title, {
        props: {
          title: `近90日新增互动`
        },
        on: {
          click: this.demo
      }})
    }},
    {type: '2', title: '全网粉丝数', value: '1,423', trend: '-6', showdown: true},
    {type: '3', title: '实时热度', value: '234,234', trend: '-256', showdown: true},
    {type: '4', title: '好感度', value: 'B+'}
  ]

  kolInfo = {
    actorName: '玄彬',
    actorId: 1,
    kolLogo: {
      source: '',
      url: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg'
    },
    rankingId: '', // 有值则加热搜事件链接
    rankingNum: '热搜No.8',
    rankingName: '#1111111111111', // 有值则显示模块，无则不显示模块
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
  .left {
    width: 33%;
    div {
      width: 172px;
      height: 172px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        // max-width: 172px;
        // min-height: 130px;
        object-fit: contain;
        background-color: #fff;
      }
    }
  }
  .right {
    width: 65%;
  }
  .kol-name {
    font-size: 40px;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
    margin-top: 30px;
  }
  .event-name {
    margin-top: 12px;
    font-size: 26px;
    font-weight: 300;
    color: rgba(136, 170, 246, 1);
    span {
      .hid {
        color: rgba(48, 48, 48, 1);
      }
      .bor {
        text-decoration: underline;
        // border-bottom: 1px solid rgba(136, 170, 246, 1);
      }
    }
    .icon-arrow {
      padding-left: 10px;
    }
  }
}
.dubble {
  margin-top: -40px;
  background: url('./images/bg2.png') no-repeat left bottom;
  background-size: 100% 120px;
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
