<template>
  <h3 @click="jumpLink">
    {{title}}
    <van-icon name="arrow" size="20" color="#c8c6c4" />
  </h3>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Icon } from 'vant'
import { openAppLinkClient } from '@/util/native'

@Component({
  components: {
    [Icon.name]: Icon
  }
})
export default class ModuleTitle extends Vue {
  /**
   * 属性示例
   */
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: String }) appLink!: string //applink 参数跳 app
  @Prop({ type: String, default: '' }) href!: any // 自定义样式 页面跳转

  mounted() {
    console.log('applink', this.appLink)
  }

  // 跳转
  jumpLink() {
    if (this.appLink) {
      this.openNativePage()
    } else if (this.href) {
      this.$router.push({ path: this.href })
    } else {
      // 暂定跳首页
      this.$router.push({ path: '/' })
    }
  }

  // 跳原生页面
  async openNativePage() {
    const objectData = {
      applinkData: 'jydataadvertiser://scheme?' + this.appLink,
      originUrl: location.href
    }
    const obj = { params: objectData }
    await openAppLinkClient(obj)
  }
}
</script>

<style scoped lang="less">
h3 {
  font-size: 40px;
  line-height: 40px;
  padding: 0 0 30px 30px;
  font-weight: normal;
  position: relative;
  i {
    position: absolute;
    right: 30px;
    top: 0;
  }
}
</style>
