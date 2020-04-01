<template>
  <div class="topbar" :style="{background:bgColor}">
    <span class="reBack" @click="goBack"></span>
    <h1 class="title van-ellipsis" v-show="titleShow || hasTitle">{{title}}</h1>
    <div class="tool" v-if="sidebar">
      <i class="ico-pk" v-if="sidebar.rivalIds" title="竞品分析" @click="goRivalAnalysis"></i>
      <i class="ico-digg" v-if="sidebar.diggType && sidebar.diggId" title="关注"></i>
    </div>
    <svg width="30px" height="30px" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30,89 C13.4314575,89 0,102.431458 0,119 L0,89 L30,89 Z"
        transform="translate(0, -89)"
        :fill="bgColor"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { setNavBarStatus, handleGoBack } from '@/util/native'
import { SentimentBarItem } from './types'
import { isJyApp } from '@/fn/ua'

@Component({})
export default class SentimentBar extends Vue {
  /**
   * 属性示例
   */
  @Prop({ type: String }) title!: string // 基本属性
  @Prop({ type: String, default: '#F2F3F6' }) bgColor?: string // 主要是通过颜色来设置 app 项部时间区的背景色
  @Prop({ type: Object }) sidebar?: SentimentBarItem // 基本属性
  @Prop({ type: Boolean, default: false }) titleShow?: boolean // 初始时是否显示标题 例如详情页默认不显示标题

  hasTitle: boolean = false

  mounted() {
    if (isJyApp()) {
      // 在 app 里执行隐藏native 导航
      this.hideNavBarStatus()
    }
    window.addEventListener('scroll', this.getScroll)
  }

  destroyed() {
    window.removeEventListener('scroll', this.getScroll)
  }

  // 监听滚动显示顶部导航的标题
  getScroll() {
    const topNum =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    this.hasTitle = topNum > 0 ? true : false
  }
  // 返回上一页
  async goBack() {
    const objectData = {
      // 关闭当前页面，当true时直接返回上个原生界面，如果是false时先执行webView的goBack操作，当goBack没有上一级时就执行返回上个界面
      isCloseWindow: false,
      // 返回上个原生界面时，并刷新上个原生页面
      refreshWindow: true
    }
    const obj = { params: objectData }
    await handleGoBack(obj)
  }

  // 隐藏原生顶部导航
  async hideNavBarStatus() {
    const objectData = {
      isShowNavBar: false,
      statusBarColor: this.bgColor
    }
    const obj = { params: objectData }
    await setNavBarStatus(obj)
  }

  // 去 Pk 页
  goRivalAnalysis() {
    if (this.sidebar && this.sidebar.rivalIds) {
      this.$router.push(this.sidebar.rivalIds)
    }
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
  z-index: 8888;
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
  padding: 0 180px;
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
