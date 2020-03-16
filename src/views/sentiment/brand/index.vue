<template>
  <div class="content">
    <SentimentBar :attribute="topbar" />
    <brandInfoArea :brandInfo="brandInfo" :bubbleData="bubbleData"/>
    <Hots :id="id" />
    <User />
        <!-- <Event />
        <Competing />  -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { toast } from '@/util/toast'
import { getList } from './data'
import SentimentBar from '@/views/common/sentimentBar/index.vue'
import brandInfoArea from './components/brandInfo.vue'

import Hots from './components/hots.vue'
import User from './components/users.vue'
import Event from './components/event.vue'
import Competing from './components/competing.vue'



@Component({
  components: {
    SentimentBar,
    brandInfoArea,
    Hots,
    User,
    Event,
    Competing
  }
})
export default class BrandPage extends ViewBase {
  @Prop({ type: Number, default: 0}) id!: number

  topbar = {
    title: '流浪地球',
    diggShow: true,
    pkShow: true
  }

  bubbleData: any = {}
  brandInfo: any = {}

  // brandInfo = {
  //   brandName: '梅赛德斯-奔驰',
  //   brandId: 1,
  //   brandLogo: {
  //     url: 'http://piaoshen.oss-cn-beijing.aliyuncs.com/images/movie/2019/05/06/190506000002357372.jpg',
  //     source: 'piaoshen'
  //   },
  //   rankingId: '', // 有值则加热搜事件链接
  //   rankingName: '#奔驰大G开进故宫', // 有值则显示模块，无则不显示模块
  // }

  mounted() {
    this.brandDetail()
  }

  async brandDetail() {
    const brandId = this.id
    try {
      const { data: {
        brandInfo,
        brandOverView,
        publicPraise, // 口碑
        userAnalysis // 用户分析
      } } = await getList({brandId})

      this.brandInfo = brandInfo // 头部基础信息
      this.bubbleData = brandOverView // 气泡数据

    } catch (ex) {
      toast(ex)
    }
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
