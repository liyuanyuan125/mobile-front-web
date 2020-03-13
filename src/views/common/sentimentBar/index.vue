<template>
  <div :class="topbarClass" :style="attribute.cusStyle">
    <span class="reBack" @click="goBack"></span>
    <h1 :class="['title']" :v-show="isFixed">{{attribute.title}}</h1>
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
  @Prop({ type: Object, default: {} }) attribute!: SentimentBarItem //基本属性
  @Prop({ type: Boolean, default: false }) isFixed!: boolean //是否吸顶

  topbarClass: string = 'topbar'

  created() {
    // 判断 topbar class
    if (this.isFixed) {
      this.topbarClass = 'topbar fixed'
    }
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
      statusBarColor: this.attribute.bgColor || '#F7F7F9'
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
  position: relative;
  background-color: #f7f7f9;
  border-radius: 0 0 44px 0;
}
.fixed {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 0;
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
