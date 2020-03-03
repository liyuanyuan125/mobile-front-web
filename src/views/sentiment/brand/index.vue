<template>
  <div class="content">
    <selectTime ref="reftimes"/>
    <LineGraph :lineData="list"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import LineGraph from '@/components/charts/hots/index.vue'
import selectTime from '@/components/charts/hots/selectTime.vue'
import tabs from '@/components/charts/hots/tabs.vue'

@Component({
  components: {
    LineGraph,
    selectTime,
    tabs
  }
})
export default class BrandPage extends ViewBase {

  // 热度分析
  hotTabs = [
    {key: 'zonghe', text: '综合热度'},
    {key: 'weibo', text: '微博指数'},
    {key: 'baidu', text: '百度指数'},
    {key: 'wechat', text: '微信指数'},
  ]
  hotTab = ''

  // 新闻资讯 12-21 对应的数据120 视频 12-21 对应数据220 依次...
  list = [
    ['product', '新闻资讯', '视频', '微博', '微信'],
    ['12-21', 120, 220, 150, 320],
    ['12-26', 132, 182, 232, 332],
    ['12-31', 101, 220, 159, 320],
    ['01-05', 134, 220, 190, 310],
    ['01-10', 90, 220, 250, 120],
    ['01-15', 230, 220, 180, 210],
    ['01-20', 210, 220, 140, 220],
  ]
}
</script>

<style lang="less" scoped>
.content {
  padding: 30px;
}
</style>
