<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RivalItem } from './types'
import { isJyApp } from '@/fn/ua'

@Component({})
export default class RivalList extends Vue {
  /**
   * 属性示例
   */
  @Prop({ type: String }) title!: string // 基本属性

  hasTitle: boolean = false

  mounted() {
    if (isJyApp()) {
      // 在 app 里执行隐藏native 导航
      //   this.hideNavBarStatus()
    }
  }
}
</script>

<style scoped lang="less">
.rivalpage {
  dl {
  }
  dd {
    width: 25%;
  }
}
</style>
