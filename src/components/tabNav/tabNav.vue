<template>
  <nav
    class="tab-nav"
    :class="{
      'tab-nav-normal': normal,
      'tab-nav-s': !normal
    }"
    ref="box"
  >
    <Tabs v-model="model" @click="handleClick">
      <Tab
        v-for="{ name, label } in list"
        :key="name"
        :title="label"
      />
    </Tabs>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

import { Tab, Tabs } from 'vant'

import { TabNavItem } from './types'

import scrollIntoView from 'scroll-into-view-if-needed'

@Component({
  components: {
    Tab,
    Tabs
  }
})
export default class TabNav extends Vue {
  @Prop({ type: Number, default: 0 }) value!: number

  @Prop({ type: Array, default: () => [] }) list!: TabNavItem[]

  /** normal 状态，默认情况下，展示 S 形的头部，设置为 normal 后，则使用普通的圆角矩形 */
  @Prop({ type: Boolean, default: false }) normal!: boolean

  model = 0

  handleClick(index: number) {
    const { name = '' } = this.list[index] || {}
    const nav = document.getElementById(name)
    nav && scrollIntoView(nav, {
      block: 'start',
      scrollMode: 'always',
      behavior: actions => {
        const canSmoothScroll = 'scrollBehavior' in document.body.style
        const box = this.$refs.box as HTMLElement
        const boxHeight = box.offsetHeight
        actions.forEach(({ el, top, left }) => {
          if (el.scroll && canSmoothScroll) {
            el.scroll({
              top: top - boxHeight,
              left,
              behavior: 'smooth'
            })
          } else {
            el.scrollTop = top
            el.scrollLeft = left
          }
        })
      },
    })
  }

  @Watch('value', { immediate: true })
  watchValue(value: number) {
    this.model = value
  }

  @Watch('model')
  watchModel(value: number) {
    this.$emit('input', value)
  }
}
</script>

<style lang="less" scoped>
.tab-nav {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #fff;
  margin-top: 130px;

  &::before {
    content: '';
    position: absolute;
    top: -120px;
    left: 0;
    width: 100%;
    height: 130px;
    background: url(./s.svg) no-repeat;
    background-size: cover;
  }

  /deep/ .van-tabs__wrap {
    height: 66px;
  }

  /deep/ .van-tab {
    color: #303030;
    font-size: 30px;
    font-weight: 500;
    padding: 10px 0 6px 0;
    flex-basis: 16.667% !important;
  }

  /deep/ .van-tab--active {
    color: #88aaf6;
  }

  /deep/ .van-tabs__line {
    background-color: #88aaf6;
  }

  /deep/ .van-hairline--top-bottom::after {
    border-top-color: transparent;
  }
}

.tab-nav-normal {
  margin-top: 65px;

  &::before {
    content: '';
    top: -55px;
    background: #fff;
    border-radius: 130px;
  }
}
</style>
