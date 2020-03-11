<template>
  <div class="bubble-warper-bottom">
    <div class="mask"></div>
    <div class="bubble-content">
      <div class="bubbles">
        <div :class="['bubble-info-bottom-'+ item.type, item.big ? 'bubble-info-bottom-big' : '']" :key="index" v-for="(item, index) in dataList">
          <template>
            <span v-if="!item.renderTitle">{{ item.title || '' }}</span>
            <render-title v-else :render="item.renderTitle" :index="index"></render-title>
          </template>
          <span>{{item.value != -1 ? item.value : ''}}</span>
          <span v-if="item.trend" :style="item.styles">
            <i 
              v-if="item.trend != '-'"
              class="iconfont icon-increase normal"
              :class="item.rotate ? 'rotate' : ''"/>{{item.trend}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator'
import { BubbleBottomItem } from './types'
import { fillList, normalizeData } from './bubble'
import { cloneDeep } from 'lodash'
import renderTitle from './renderTitle'

@Component({
  components: {
    renderTitle
  }
})
export default class Bubble extends Vue {
  @Prop({ type: Array, default: () => [] }) data!: BubbleBottomItem[]

  get dataList() {
    const dataList = normalizeData(this.data)
    return dataList
  }
}
</script>

<style lang="less" scoped>
@import './bubble.less';
@import '../../assets/iconfont/iconfont.less';
.bubble-warper-bottom {
  position: relative;
  width: 100%;
  height: 397px;
  .mask,.bubble-content {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .mask {
    z-index: 1;
    background: #f2f3f6;
    opacity: .5;
  }
  .bubble-content {
    z-index: 2;
    .bubbles {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .bubbleBottom-loop(6);
    .bubble-info-bottom-big {
      width: 220px;
      height: 220px;
      transform: translateX(-11px);
    }
    .normal {
      font-size: 13px;
      color: #fff;
    }
    .rotate {
      display: inline-block;
      transform: rotate(180deg);
    }
  }
}

</style>
