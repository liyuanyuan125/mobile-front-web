<template>
  <nav
    class="tab-nav"
    :class="{
      'tab-nav-normal': normal,
      'tab-nav-hide-header': hideHeader,
      [`tab-nav-count-${list.length}`]: true
    }"
    :style="style"
  >
    <Tabs
      v-model="model"
      @click="handleClick"
      v-if="list && list.length > 0"
    >
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
import { scrollIntoView } from './util'
import { watchScroll } from '@/util/scroll'

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

  /** 去掉头部的装饰 */
  @Prop({ type: Boolean, default: false }) hideHeader!: boolean

  /**
   * 吸顶 top，默认 0，750 设计稿宽度下的像素数，最终在内部按照 top / 750 * 100 转换成 vw
   * 并且，为了保持更好的兼容性，当该 prop 为 0 时，不输出 style，从而可以通过 .class 样式控制 top
   */
  @Prop({ type: Number, default: 0 }) top!: number

  /** 触顶调节量，默认 30 */
  @Prop({ type: Number, default: 30 }) topThreshold!: number

  /** 离底调节量，默认 50 */
  @Prop({ type: Number, default: 50 }) bottomThreshold!: number

  model = 0

  get style() {
    if (this.top > 0) {
      const vw = +(this.top / 750 * 100).toFixed(5)
      return { top: `${vw}vw` }
    }
    // 为了保持更好的兼容性，对于 0，不输出任何 inline style，
    // 以免通过 .class 样式控制的 top 会因为优先级的原因失效
    return null
  }

  clickedScroll = false

  clickedTimer = 0

  // 不做成 get children() 是因为涉及 dom 节点，在 vue 中「易失」
  getChildren() {
    const ids = this.list.map(it => it.name)
    const elList = ids.map(id => document.getElementById(id))
    return elList
  }

  handleClick(index: number) {
    const { name = '' } = this.list[index] || {}
    const nav = document.getElementById(name)
    if (nav) {
      this.clickedScroll = true
      clearTimeout(this.clickedTimer)
      scrollIntoView(nav, this.$el as HTMLElement)
      .then(() => {
        this.clickedTimer = setTimeout(() => this.clickedScroll = false, 200) as any
      })
    }
    this.model = index
  }

  getScrollIndex() {
    const line = this.$el.getBoundingClientRect().bottom + this.topThreshold
    const bottomLine = window.innerHeight + this.bottomThreshold

    const children = this.getChildren()
    const count = children.length

    for (let index = 0; index < count; index++) {
      const el = children[index]
      if (el != null) {
        const top = el.getBoundingClientRect().top
        if (top > line) {
          // 对最后一个进行优化
          if (index == count - 1) {
            // 判断最后一个是否已离底
            const last = children[count - 1]!
            const lastBottom = last.getBoundingClientRect().bottom
            if (lastBottom < bottomLine) {
              return count - 1
            }
          }
          return index == 0 ? 0 : index - 1
        }
      }
    }

    return count - 1
  }

  private updateUIInner() {
    if (!this.clickedScroll) {
      const index = this.getScrollIndex()
      this.model = index
    }
  }

  public updateUI() {
    this.$nextTick(this.updateUIInner)
  }

  mounted() {
    watchScroll().then(() => {
      this.updateUIInner()
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
  z-index: 888;
  transform: translate3d(0, 0, 0);

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
    height: 72px;
  }

  /deep/ .van-tab {
    color: #303030;
    font-size: 30px;
    font-weight: 500;
    padding: 14px 0 2px 0;
    flex-basis: 16.66666% !important;
  }

  /deep/ .van-tab--active {
    color: #88aaf6;
  }

  /deep/ .van-tabs__line {
    height: 4px;
    background-color: #88aaf6;
  }

  /deep/ .van-hairline--top-bottom::after {
    border-top-color: transparent;
  }
}

.tab-nav-normal {
  margin-top: 0;
  background-color: transparent;

  &::before {
    display: none;
  }

  /deep/ .van-tabs__wrap {
    height: 100px;
    overflow: visible;
  }

  /deep/ .van-tabs__nav {
    border-radius: 60px 60px 0 0;
    padding-bottom: 2px;
  }

  /deep/ .van-tab {
    padding: 30px 0 6px 0;
  }

  /deep/ .van-tabs__line {
    bottom: 0;
  }
}

.tab-nav-hide-header {
  margin-top: 0;
  &::before {
    display: none;
  }
}

.tab-nav-count-3 {
  /deep/ .van-tab {
    flex-basis: 33.33333% !important;
  }
}

.tab-nav-count-4 {
  /deep/ .van-tab {
    flex-basis: 25% !important;
  }
}

.tab-nav-count-5 {
  /deep/ .van-tab {
    flex-basis: 20% !important;
  }
}
</style>
