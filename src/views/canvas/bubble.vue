<template>
  <div class="bubble-page">
    <BubbleCss :data="data">
      <template>
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
    </BubbleCss>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {BubbleCss, BubbleItem } from '@/components/bubble'

@Component({
  components: {
    BubbleCss
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
        font-family: DINAlternate-Bold,DINAlternate;
        font-weight: bold;
      }
      &:last-child {
        font-size: 26px;
        font-family: PingFangSC-Light,PingFang SC;
        font-weight: 300;
        color: #303030;
      }
    }
  }
}
</style>
