<template>
  <div class="demo-page">
    <section class="header">
      <figure class="header-fig">
        <img src="https://randomuser.me/api/portraits/women/60.jpg">
      </figure>
      <div class="header-main">
        <h1 class="header-title">向死而生</h1>
        <div class="header-bar">Lana Del Rey</div>
        <div class="header-bar">单曲 / 2019-10-15发行 / 多平台</div>
        <div class="header-bar">热搜 NO.8 <a>#Lana Delrey</a></div>
      </div>
    </section>

    <TabNav
      :list ="list"
    />

    <!-- <TabNav
      :list ="list"
      normal
    /> -->

    <section class="pane" id="hot">
      <h3 class="pane-head">热度分析</h3>
      <div class="pane-body">
        <div class="sub-pane">
          <h4 class="sub-pane-head">综合热度</h4>
          <div class="sub-pane-body"></div>
        </div>
        <div class="sub-pane">
          <h4 class="sub-pane-head">平台热度</h4>
          <div class="sub-pane-body"></div>
        </div>
      </div>
    </section>

    <section class="pane">
      <h3 class="pane-head">播放量分析</h3>
      <div class="pane-body"></div>
    </section>

    <section class="pane">
      <h3 class="pane-head">榜单表现</h3>
      <div class="pane-body"></div>
    </section>

    <section class="pane" id="praise">
      <h3 class="pane-head">口碑评论</h3>
      <div class="pane-body"></div>
    </section>

    <section class="pane" id="user">
      <h3 class="pane-head">用户分析</h3>
      <div class="pane-body"></div>
    </section>

    <section class="pane" id="event">
      <h3 class="pane-head">营销事件</h3>
      <div class="pane-body"></div>
    </section>

    <section class="pane">
      <h3 class="pane-head">音乐人分析</h3>
      <div class="pane-body"></div>
    </section>

    <section class="pane" id="part">
      <h3 class="pane-head">相似歌曲</h3>
      <div class="pane-body"></div>
    </section>

    <section class="pane" id="work">
      <h3 class="pane-head">作品</h3>
      <div class="pane-body"></div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TabNav, { TabNavItem } from '@/components/tabNav'

@Component({
  components: {
    TabNav
  }
})
export default class extends Vue {
  list: TabNavItem[] = [
    { name: 'hot', label: '热度' },
    { name: 'praise', label: '口碑' },
    { name: 'user', label: '用户' },
    { name: 'event', label: '事件' },
    { name: 'part', label: '竞品' },
    { name: 'work', label: '作品' },
  ]
}
</script>

<style lang="less" scoped>
.demo-page {
  background-color: #f2f3f6;
  padding-bottom: 1588px;
}

.header {
  display: flex;
  height: 300px;
  background-color: #f2f3f6;
  padding: 40px;
}

.header-fig {
  width: 200px;
  height: 200px;
  min-width: 200px;
  min-height: 200px;
  border-radius: 100%;
  border: 15px solid #303030;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}

.header-main {
  margin-left: 30px;
}

.header-title {
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 10px;
}

.header-bar {
  font-size: 26px;
  font-weight: 300;
  line-height: 1.7;
}

.pane {
  padding: 30px;
  min-height: 200px;
  background-color: #fff;
  margin-bottom: 20px;
}

.pane-head {
  font-size: 40px;
  font-weight: 500;
}

.sub-pane {
  min-height: 88px;
  border-top: 1px solid #d8d8d8;
  padding-top: 30px;
  &:first-child {
    border-top: 0;
  }
}

.sub-pane-head {
  font-size: 34px;
  font-weight: 500;
}

.sub-pane-body {
  min-height: 188px;
}
</style>
