<template>
  <div class="regsuccess" ref="successbox">
    <div class="flexone">
      <div class="bgbox">
        <div class="textbox">
          <h4>注册成功</h4>
          <p>
            完善信息,我们将为您推荐更适
            <br />合的广告投放方案.
          </p>
        </div>
      </div>
    </div>
    <div class="flexsec">
      <div>
        <button @click="goAppLink('minePage')">完善信息</button>
        <button class="holdon" @click="goAppLink('loginPage')">稍后再说</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { openAppLinkClient } from '@/util/native'
import { devLog, devInfo } from '@/util/dev'

@Component
export default class SuccessPage extends ViewBase {
  @Prop({ type: Function }) changePage!: (id: number) => Promise<boolean>
  mounted() {
    const exp: any = this.$refs.successbox
    exp.style.height = document.body.clientHeight + 'px'
  }

  // 去往列表页
  async goAppLink(type: string) {
    let applink = 'homePage'
    switch (type) {
      case 'homePage':
        applink = 'homePage'
        break
      case 'minePage':
        applink = 'companyDetail&isFromRegister=YES'
        break
    }
    devInfo('applink', applink)
    const objectData = {
      applinkData: 'jydataadvertiser://scheme?p=' + applink,
      originUrl: location.href
    }
    const obj = { params: objectData }
    await openAppLinkClient(obj)
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
