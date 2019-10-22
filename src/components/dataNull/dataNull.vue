<template>
  <TopBar :title="title" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { handleGoBack } from '@/util/native'
import TopBar from '@/components/topBar'

@Component({
  components: {
    TopBar
  }
})
export default class DataNull extends Vue {
  /**
   * 属性示例
   */
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: String, default: 'transparent' }) bgColor!: string
  @Prop({ type: String, default: '' }) styleline!: any // 自定义样式
  @Prop({ type: String, default: 'white' }) barColor: any // 黑或白

  // barColor:string = 'white'
  async goBack() {
    const objectData = {
      isCloseWindow: true,
      refreshWindow: true
    }
    const obj = { params: objectData }
    await handleGoBack(obj)
  }
}
</script>

<style scoped lang="less">
.topbar {
  height: 88px;
  line-height: 88px;
  position: relative;
}
.title {
  color: #fff;
  font-size: 32px;
  text-align: center;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 88px;
  overflow: hidden;
}
.reBack {
  width: 88px;
  height: 88px;
  position: absolute;
  left: 0;
  top: 0;
  &::after {
    content: '';
    width: 22px;
    height: 22px;
    border-left: 4px solid #fff;
    border-bottom: 4px solid #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
}
.black {
  .title {
    color: #1e386f;
  }
  .reBack {
    &::after {
      border-color: #1e386f;
    }
  }
}
</style>
