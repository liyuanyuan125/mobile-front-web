<template>
  <div class="bubble-page">
    <BubbleLeft :data="data">
      <template>
        <!-- 示例 -->
        <div slot="right">
          <div class="content">
            <p>1,342</p>
            <p>综合热度</p>
          </div>
          <div class="content">
            <p>129,145,000</p>
            <p>累计媒体物料</p>
          </div>
          <div class="content">
            <p>1,291,126,890</p>
            <p>累计互动数</p>
          </div>
        </div>
      </template>
    </BubbleLeft>
    <BubbleBottom :data="bubbleData"></BubbleBottom>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {BubbleLeft, BubbleBottom, BubbleItem, Title } from '@/components/bubble'

@Component({
  components: {
    BubbleLeft,
    BubbleBottom
  }
})
export default class CanvasPage extends Vue {
  data: BubbleItem[] = [{
    name: '微博',
    value: 32,
  }, {
    name: '百度',
    value: 16,
  }, {
    name: '头条',
    value: 9,
  }, {
    name: '粉丝',
    value: 13,
  }, {
    name: '腾讯',
    value: 22,
  }, {
    name: '腾讯',
    value: 4,
  }, {
    name: '其他',
    value: 8,
  }, {
    name: '抖音',
    value: 40,
  }, {
    name: '快手',
    value: 3,
  }]

  // type: 代表气泡从大到小的顺序
  // title: 气泡数据名称
  // value: 气泡对应的数据
  // trend: 数据增长或下降
  // big: 针对部分需求气泡变大， 例如：品牌详情的  90天累积互动
  // showdown: 是否展示下降数据，例如排名需要展示下降数据；不设置则 <= 0 都显示 '-'
  // renderTitle: 自定义title，可增加icon及功能
  bubbleData: any = [
    {type: '1', value: '235,454', trend: '123', renderTitle: (h: any) => {
      return h(Title, {
        props: {
          title: '近90天累计互动'
        },
        on: {
          click: this.demo
      }})
    }},
    {type: '2', title: '90天累计互动', value: '1,423', trend: '-356', big: true},
    {type: '3', title: '昨日销量排名', value: '234,234', trend: '-356', showdown: true},
    {type: '4', title: '好感度', value: 'B+'}
  ]

  demo() {
    // console.log('点击事件')
  }
}
</script>

<style lang="less" scoped>
.bubble-page {
  padding: 20px;
  .content {
    margin: 18px 0 40px 0;
    p {
      &:first-child {
        font-size: 46px;
        font-weight: bold;
      }
      &:last-child {
        font-size: 26px;
        font-weight: 300;
        color: #303030;
      }
    }
  }
}
</style>
