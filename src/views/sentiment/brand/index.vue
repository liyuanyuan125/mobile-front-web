<template>
  <div class="content">
    <h2 style="height: 200px; border: solid 1px red">xxxxxx</h2>

    <van-tabs
      v-model="active"
      line-height="2"
      line-width="30"
      :border="false"
      sticky scrollspy>
      <van-tab title="热度" name="a">
        <Hots />
        <Wow />
        <User />
        <Event />
        <Competing />
      </van-tab>
      <van-tab title="口碑" name="b"></van-tab>
      <van-tab title="用户" name="c">内容 3</van-tab>
      <van-tab title="事件" name="d">内容 4</van-tab>
      <van-tab title='竞品' name="e">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { Tab, Tabs } from 'vant'
import Hots from './components/hots.vue'
import Wow from './components/wow.vue'
import User from './components/users.vue'
import Event from './components/event.vue'
import Competing from './components/competing.vue'

@Component({
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Hots,
    Wow,
    User,
    Event,
    Competing
  }
})
export default class BrandPage extends ViewBase {
  active = 'a'
  active1 = 1
}
</script>

<style lang="less" scoped>
@import '~@/less/lib.less';

/deep/ .van-tab__pane {
  display: block;
}
.content {
  background: #F2F3F6;
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
</style>
