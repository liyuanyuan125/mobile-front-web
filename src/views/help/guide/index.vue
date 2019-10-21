<template>
  <div class="guide">
    <div class="tab">
      <dl>
        <dd :class="{'active':tabIdx == 1}" @click="changeTab(1)">
          <h4>什么是映前广告?</h4>
        </dd>
        <dd :class="{'active':tabIdx == 2}" @click="changeTab(2)">
          <h4>映前广告如何投放?</h4>
        </dd>
        <dd :class="{'active':tabIdx == 3}" @click="changeTab(3)">
          <h4>如何查看报告?</h4>
        </dd>
      </dl>
    </div>
    <div class="box desc" ref="desc">
      <img src="./assets/desc.jpg" />
    </div>
    <div class="box step" ref="step">
      <div class="title">
        <img src="./assets/stepdesc.jpg" />
      </div>
      <div class="step01">
        <img src="./assets/step011.jpg" class="img01" />
      </div>
      <div class="step01">
        <img src="./assets/step012.jpg" class="img02" />
      </div>
      <div class="step01">
        <img src="./assets/step02.jpg" class="img03" />
      </div>
      <div class="step01">
        <img src="./assets/step03.jpg" class="img04" />
      </div>
    </div>
    <div class="box report" ref="report">
      <img src="./assets/reportimg.jpg" />
    </div>
    <div class="btnbox">
      <dl>
        <dd>
          <button>回首页</button>
        </dd>
        <dd>
          <button class="kf">在线客服</button>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Guide extends Vue {
  tabIdx: number = 1 // 切换签的位置
  scrollDis: number = 0 // 屏幕滚动的高度
  scrollStep: number = 0 // 如何投放位置
  scrollReport: number = 0 // 查看报告位置

  mounted() {
    document.documentElement.style.background = '#A5BEF8'
    window.addEventListener('scroll', this.getScroll)
    // 计算如何投放和查看报告的位置
    const step: any = this.$refs.step
    const report: any = this.$refs.report
    // const clientHeight: number = document.documentElement.clientHeight
    // const appHeight: any = document.getElementsByClassName('app')[0].scrollHeight
    // const diff = appHeight - clientHeight
    this.scrollStep = step.offsetTop
    this.scrollReport = report.offsetTop
    console.log('top', this.scrollReport)
  }

  destroyed() {
    window.removeEventListener('scroll', this.getScroll)
  }

  // 切换tab
  changeTab(val: number) {
    console.log(val)
    this.tabIdx = val
    switch (val) {
      case 1:
        document.documentElement.scrollTop = 0
        break
      case 2:
        document.documentElement.scrollTop = this.scrollStep
        break
      case 3:
        document.documentElement.scrollTop = this.scrollReport
        break
    }
  }

  // 监听滚动显示顶部导航
  getScroll() {
    const topNum =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    // console.log('scr', topNum)
    if (topNum > this.scrollStep) {
      this.tabIdx = 2
    } else {
      this.tabIdx = 1
    }
    if (topNum > this.scrollReport) {
      this.tabIdx = 3
    }
  }
}
</script>

<style lang="less" scoped>
@import 'less/main.less';
</style>