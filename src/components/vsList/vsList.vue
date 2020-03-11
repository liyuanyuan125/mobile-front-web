<template>
  <ul class="vs-list">
    <li v-for="it in data" :key="it.name" class="vs-item">
      <label class="vs-name">{{ it.name }}</label>
      <div class="vs-bar">
        <div class="vs-percent">
          <span
            class="vs-percent-1"
            :style="{
              backgroundColor: colors[0],
              width: it.rate1 + '%'
            }"
          ></span>
          <span
            class="vs-percent-2"
            :style="{
              backgroundColor: colors[1],
              width: it.rate2 + '%'
            }"
          ></span>
        </div>
        <div class="vs-text">
          <span class="vs-text-1">
            <label>{{ labels[0] }}</label>
            <em :style="{ color: colors[0] }">{{ it.rate1 }}%</em>
          </span>
          <span class="vs-text-2">
            <em :style="{ color: colors[1] }">{{ it.rate2 }}%</em>
            <label>{{ labels[1] }}</label>
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import { VsItem } from './types'

@Component
export default class VsList extends Vue {
  @Prop({ type: Array, default: () => [] }) data!: VsItem[]

  @Prop({ type: Array, default: () => ['男', '女'] }) labels!: string[]

  @Prop({ type: Array, default: () => ['#7ca4ff', '#ff6262'] }) colors!: string[]
}
</script>

<style lang="less" scoped>
.vs-list {
  position: relative;
  width: 100%;
  font-size: 26px;
}
.vs-item {
  display: flex;
  margin-bottom: 20px;
}
.vs-name {
  width: 140px;
}
.vs-bar {
  position: relative;
  margin: 0 30px;
  flex: 1;
}
.vs-percent,
.vs-text {
  display: flex;
}
.vs-percent {
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
}
.vs-percent-1,
.vs-percent-2 {
  height: 20px;
}
.vs-percent-1 {
  transform: translateX(-3px);
}
.vs-percent-2 {
  transform: translateX(3px);
}
.vs-text {
  line-height: 60px;
}
.vs-text-1,
.vs-text-2 {
  flex: 1;
  em {
    font-size: 36px;
    font-weight: bold;
    font-family: DINAlternate-Bold, DINAlternate, monospace;
    position: relative;
    top: 2px;
  }
}
.vs-text-1 {
  transform: translateX(-3px);
  em {
    margin-left: 10px;
  }
}
.vs-text-2 {
  text-align: right;
  transform: translateX(3px);
  em {
    margin-right: 10px;
  }
}
</style>
