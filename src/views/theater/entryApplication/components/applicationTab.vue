<template>
  <div class="infoTab">
    <ul>
      <li
        v-for="(item,index) in tabData"
        :key="index"
        :class="{active:tabIndex == index+1}"
        @click="$emit('changeTabIndex',index+1)"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component
export default class ApplicationTab extends ViewBase {
  @Prop({ type: Number, default: 1 }) tabIndex!: number
  tabData: any = ['企业申请', '个人申请']
}
</script>

<style lang="less" scoped>
// @import '~@/views/theater/components/less/common.less';
.infoTab {
  background-color: #dfeaf8;
  width: 100%;
  text-align: center;
  border-radius: 10px;
  ul {
    display: flex;
    position: relative;
    &:after {
      content: '';
      background-color: #afbed4;
      width: 2px;
      height: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  li {
    flex: 1;
    // width: 50%;
    line-height: 80px;
    font-size: 26px;
    color: #899ab3;
    &.active {
      color: #404d66;
      font-weight: bold;
    }
  }
}
</style>
