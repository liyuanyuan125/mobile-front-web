<template>
  <div class="topbar" :style="attribute.cusStyle">
    <span class="reBack" @click="goBack"></span>
    <h1 :class="['title']" v-show="titleShow">{{attribute.title}}</h1>
    <div class="tool">
      <i class="ico-pk"></i>
      <i class="ico-digg"></i>
    </div>
    <svg width="30px" height="30px" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30,89 C13.4314575,89 0,102.431458 0,119 L0,89 L30,89 Z"
        transform="translate(0, -89)"
        fill="#F2F3F6"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { setNavBarStatus, handleGoBack } from '@/util/native'
import { SentimentBarItem } from './types'

@Component({})
export default class SentimentBar extends Vue {
  /**
   * 属性示例
   */
  @Prop({ type: Object, default: {} }) attribute!: SentimentBarItem // 基本属性
  @Prop({ type: Boolean, default: false }) titleShow!: boolean // 是否显示标题

  topbarClass: string = 'topbar'

  mounted() {
    // todo
  }

  // 返回上一页
  async goBack() {
    const objectData = {
      isCloseWindow: true,
      refreshWindow: true
    }
    const obj = { params: objectData }
    await handleGoBack(obj)
  }

  // 隐藏原生顶部导航
  async hideNavBarStatus() {
    const objectData = {
      isShowNavBar: false,
      statusBarColor: this.attribute.bgColor || '#F2F3F6'
    }
    const obj = { params: objectData }
    await setNavBarStatus(obj)
  }
}
</script>

<style scoped lang="less">
.topbar {
  height: 88px;
  line-height: 88px;
  background-color: #f2f3f6;
  border-radius: 0 0 44px 0;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 20;
  svg {
    position: absolute;
    left: 0;
    top: 88px;
  }
}
.tool {
  height: 88px;
  position: absolute;
  right: 5px;
  top: 0;
  i {
    width: 88px;
    height: 88px;
    display: inline-block;
    vertical-align: baseline;
    background: no-repeat center center;
    background-size: 100%;
  }
  .ico-digg {
    background-image: url('../../../assets/sentiment/bar-digg.png');
  }
  .ico-pk {
    background-image: url('../../../assets/sentiment/bar-pk.png');
  }
}
.title {
  color: #303030;
  font-size: 32px;
  text-align: center;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 88px;
  overflow: hidden;
}
.reBack {
  width: 88px;
  height: 88px;
  position: absolute;
  left: 0;
  top: 0;
  &::after {
    content: '';
    width: 22px;
    height: 22px;
    border-left: 4px solid #303030;
    border-bottom: 4px solid #303030;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
}
</style>
