<template>
  <div class="bubble-warper">
    <div class="mask"></div>
    <div class="bubble-content">
      <div class="bubbles">
        <div :class="className" :key="index" v-for="(item, index) in dataList">
          <span>{{item.name || ''}}</span>
          <span>{{item.value != -1 ? item.value + '%' : ''}}</span>
        </div>
      </div>
      <div class="content-text">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { BubbleItem } from './types'
import { fillList } from './bubble'
import { cloneDeep } from 'lodash'

@Component({
  components: {
  }
})
export default class Bubble extends Vue {
  @Prop({ type: Array, default: () => [] }) data!: BubbleItem[]

  get className() {
    const num = this.data.length > 7 ? 7 : this.data.length
    return `bubble-info${num}`
  }

  get dataList() {
    const dataLength = this.data.length
    let resultArray = cloneDeep(this.data)

    resultArray = resultArray.sort((a, b) => {
      return b.value - a.value
    })

    if (dataLength > 7) {
      resultArray = resultArray.splice(0, 7)
    }

    const fillItem: BubbleItem[] = fillList(resultArray.length)
    resultArray = [...resultArray, ...fillItem]
    return resultArray
  }
}
</script>

<style lang="less" scoped>
@import './bubble.less';
.bubble-warper {
  position: relative;
  width: 100%;
  height: 493px;
  .mask,.bubble-content {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .mask {
    z-index: 1;
    background: #f2f3f6;
    opacity: 0;
  }
  .bubble-content {
    z-index: 2;
    .bubbles {
      position: absolute;
      width: 391px;
      height: 493px;
    }
    .bubble-info7 {
      .bubble-base();
      .bubble7-loop(9);
    }
    .bubble-info6 {
      .bubble-base();
      .bubble6-loop(8);
    }
    .bubble-info5 {
      .bubble-base();
      .bubble5-loop(7);
    }
    .bubble-info4 {
      .bubble-base();
      .bubble4-loop(7);
    }
    .bubble-info3 {
      .bubble-base();
      .bubble3-loop(7);
    }
    .bubble-info2 {
      .bubble-base();
      .bubble2-loop(6);
    }
    .bubble-info1 {
      .bubble-base();
      .bubble1-loop(5);
    }
    .content-text {
      position: absolute;
      width: 280px;
      height: 493px;
      right: 0;
    }
  }
}

</style>
