<template>
  <div class="submit">
    <div class="bg">
      <em :class="show == '1' ? 'check' : 'ready'"></em>
    </div>
    <div class="text">
      <div class="mid">{{show == '1' ? '账号申请已提交，请等待审核人员审核通过.' : '您已开通鲸娱帐号,如需开通广告商平台帐号请与工作人员联系.'}}</div>
      <div class="tip">
        <p>联系客服</p>
        <p>QQ: 1728252212</p>
        <p>电话: 13718668880</p>
        <p>邮箱: webcpy@163.com</p>
      </div>
      <button @click="goBackApp">确定</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { setNavBarStatus, handleGoBack } from '@/util/native'

@Component
export default class SubmitPage extends Vue {
  show: any = ''

  created() {
    this.show = this.$route.query.show
    this.hideNativeNavBar()
  }

  // 隐藏原生导航栏
  async hideNativeNavBar() {
    const obj = {
      params: {
        isShowNavBar: false, // 是否显示导航栏
        isWebViewOnScreenTop: true // 否从屏幕顶部开始布局
      }
    }
    await setNavBarStatus(obj)
  }

  // 返回登录页 (关闭 webview)
  async goBackApp() {
    const obj = {
      params: {
        isCloseWindow: true,
        refreshWindow: false
      }
    }
    await handleGoBack(obj)
  }
}
</script>

<style lang="less" scoped>
@import 'less/common.less';
</style>
