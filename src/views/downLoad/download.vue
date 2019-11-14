<template>
  <div class="download" ref="downloabox">
    <div class="btnbox">
      <a class="iosbtn" @click="wxDownload">立即下载</a>
      <!-- <a class="androidbtn" @click="wxDownload">Android下载</a> -->
      <p>目前仅支持 iOS 和 Android</p>
    </div>
    <div class="sharetip" v-show="isShowWX" @click="closeWX"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class DownloadCinema extends Vue {
  isShowWX: boolean = false
  dlUrl: string = ''

  mounted() {
    document.title = '鲸鱼数据'
    document.documentElement.style.backgroundColor = '#A5BEF8'
    const dw: any = this.$refs.downloabox
    dw.style.height = document.documentElement.clientHeight + 'px'

    // const bIsApple =
    //   ua.indexOf('ipad') > 0 || ua.indexOf('iphone') || ua.indexOf('mac os')
    //     ? true
    //     : false
  }

  wxDownload() {
    const ua = navigator.userAgent.toLowerCase()
    const isWeixin = ua.indexOf('micromessenger') > -1
    const bIsAndroid = ua.indexOf('android') > -1 ? true : false
    if (bIsAndroid) {
      if (isWeixin) {
        this.isShowWX = true
      } else {
        location.href =
          'https://aiads-file.oss-cn-beijing.aliyuncs.com/APK/JYdata_V1.1.apk'
      }
    } else {
      location.href = 'https://itunes.apple.com/cn/app/id1478240682?mt=8'
    }
  }

  closeWX() {
    this.isShowWX = !this.isShowWX
  }
}
</script>

<style lang="less" scoped>
.download {
  height: 100%;
  background: url('./assets/adbg.jpg') no-repeat center 0 #a5bef8;
  background-size: 100% auto;
  padding-top: 1px;
}

.btnbox {
  text-align: center;
  position: absolute;
  top: 950px;
  left: 0;
  width: 100%;
  a {
    width: 340px;
    height: 100px;
    background: #fff;
    font-size: 34px;
    line-height: 100px;
    text-align: center;
    display: inline-block;
    border-radius: 50px;
    color: #1e386f;
    box-shadow: 0 4px 20px rgba(43, 69, 128, 0.3);
  }
  p {
    margin-top: 30px;
    color: #1e386f;
    font-size: 24px;
    line-height: 33px;
  }
}
.sharetip {
  background: url('./assets/share.png') no-repeat right 0 rgba(0, 0, 0, 0.8);
  background-size: 100% auto;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 11;
}
</style>
