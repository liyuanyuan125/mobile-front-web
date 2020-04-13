<template>
  <section class="user-area-module">
    <ModuleHeader title="用户地域分布" class="module-header"/>

    <ChinaMap
      :data="data"
      :colorRange="colorRange"
      class="china-map"
    />

    <div class="legend">
      <div class="legend-title">关注的用户量占比</div>
      <div class="legend-bar">
        <em class="legend-high">高</em>
        <ul class="legend-list">
          <li
            v-for="color in colorRange.slice().reverse()"
            :key="color"
            class="legend-item"
            :style="{ backgroundColor: color }"
          >
          </li>
        </ul>
        <em class="legend-low">低</em>
      </div>
    </div>

    <div class="van-hairline--top hairline"></div>

    <ModuleHeader
      title="TOP5 省份"
      tag="h4"
      moreText="查看更多"
      :link="moreLink"
      class="top-5-header"
    />

    <ol class="top-5" :class="{ 'top-5-less': top5.length < 5 }">
      <li v-for="it in top5" :key="it">{{it}}</li>
    </ol>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ModuleHeader from '@/components/moduleHeader'
import ChinaMap, { ChinaMapItem } from '@/components/chinaMap'
import { RawLocation } from 'vue-router'

@Component({
  components: {
    ModuleHeader,
    ChinaMap
  }
})
export default class UserArea extends Vue {
  /** 数据 */
  @Prop({ type: Array, default: () => [] }) data!: ChinaMapItem[]

  /** 颜色列表，从浅色到深色变化，最小包含 2 种颜色 */
  @Prop({
    type: Array,
    default: () => [ '#f1f5ff', '#d7e2ff', '#a3bdfd', '#598cfe', '#4763c6' ]
  }) colorRange!: string[]

  /** 查看更多链接 */
  @Prop({ type: [ String, Object ], default: '' }) moreLink!: RawLocation

  get top5() {
    const list = this.data
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
      .map(it => it.name)
    return list
  }
}
</script>

<style lang="less" scoped>
.user-area-module {
  background-color: #fff;
  padding: 60px 30px 50px;
}

.module-header {
  position: relative;
  z-index: 8;
}

.china-map {
  position: relative;
  width: 750px;
  height: 750px;
  margin: -90px 0 0 -30px;
}

.legend {
  position: relative;
  font-size: 18px;
  line-height: 42px;
  margin-top: -146px;
  pointer-events: none;
}

.legend-list {
  display: inline-block;
  margin-right: 10px;
}

.legend-item {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  margin-left: 10px;
}

.hairline {
  margin-top: 32px;
}

.top-5-header {
  padding-top: 42px;
}

.top-5 {
  display: flex;
  list-style: inside decimal;
  justify-content: space-between;
  font-size: 30px;
  font-family: PingFangSC-Light, PingFang SC, serif;
  font-weight: 300;
  padding-top: 20px;
}

.top-5-less {
  justify-content: flex-start;
  li {
    margin-right: 30px;
  }
}
</style>
