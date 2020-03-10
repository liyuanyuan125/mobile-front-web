<template>
  <span
    v-bind="$attrs"
    v-on="$listeners"
    class="title">
      {{title}}
      <i :class="`iconfont icon-${type}`"></i>
    </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Title extends Vue {
  @Prop({ default: '' }) title!: string

  @Prop({ default: 'wenhao'}) type!: string

}
</script>

<style lang="less" scoped>
@import '../../assets/iconfont/iconfont.less';
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    width: 24px;
    color: #fff;
  }
}


</style>
