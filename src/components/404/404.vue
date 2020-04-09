<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { handleGoBack } from '@/util/native'

@Component({})
export default class TopBar extends Vue {
  /**
   * 属性示例
   * -10000 未登录
   * 10404  页面不存在
   * 10405  页面被禁用
   * 10403  无权限
   */
  @Prop({ type: String, default: '' }) code!: string

  created() {
    switch (this.code) {
      case '10404':
        break
      case '10405':
        break
      default:
    }
  }
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
