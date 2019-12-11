<template>
  <div class="regsuccess" ref="successbox">
    <div class="flexone">
      <div class="bgbox">
        <div class="textbox">
          <h4>注册成功</h4>
          <p v-if="!guestShow">
            完善信息,我们将为您推荐更适
            <br />合的广告投放方案.
          </p>
        </div>
      </div>
    </div>
    <div class="flexsec">
      <div>
        <button @click="goAppLink('companyInfoDetail')" v-if="!guestShow">完善信息</button>
        <button @click="goDownload" v-else>下载APP</button>
        <!-- <button class="holdon" @click="goAppLink('homePage')">稍后再说</button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { openAppLinkClient } from '@/util/native'
import { devLog, devInfo } from '@/util/dev'
import { isJyApp } from '@/fn/ua'

@Component
export default class SuccessPage extends ViewBase {
  @Prop({ type: Boolean }) guestShow!: boolean

  mounted() {
    const exp: any = this.$refs.successbox
    exp.style.height = document.documentElement.clientHeight + 'px'
  }

  // 去往列表页
  async goAppLink(type: string) {
    let applink = 'homePage'
    switch (type) {
      case 'homePage':
        applink = 'homePage'
        break
      case 'companyInfoDetail':
        applink = 'companyInfoDetail&isFromRegister=YES'
        break
    }
    // devInfo('applink', applink)
    const objectData = {
      applinkData: 'jydataadvertiser://scheme?p=' + applink,
      originUrl: location.href
    }
    const obj = { params: objectData }
    await openAppLinkClient(obj)
  }

  // 根据环境判断下载路径
  goDownload() {
    const ua = navigator.userAgent.toLowerCase()
    const bIsAndroid = ua.indexOf('android') > -1 ? true : false
    if (bIsAndroid) {
      location.href =
        'https://a.app.qq.com/o/simple.jsp?pkgname=com.jydata.monitor.advertiser'
    } else {
      location.href = 'https://itunes.apple.com/cn/app/id1478240682?mt=8'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
