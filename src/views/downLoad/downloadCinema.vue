<template>
  <div class="download" ref="downloabox">
    <div class="logo">全网精准娱乐营销平台</div>
    <div class="desc">高效移动工作平台</div>
    <div class="btnbox">
      <a class="iosbtn" href="https://itunes.apple.com/cn/app/id1477971483?mt=8">iPhone版下载</a>
      <a class="androidbtn" @click="wxDownload">Android下载</a>
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

  mounted() {
    document.title = '鲸鱼数据影城版'
    const dw: any = this.$refs.downloabox
    dw.style.height = document.body.clientHeight + 'px'
  }

  wxDownload() {
    const ua = navigator.userAgent
    const isWeixin = /MicroMessenger/gi.test(ua)
    if (isWeixin) {
      this.isShowWX = true
    } else {
      location.href =
        'https://aiads-file.oss-cn-beijing.aliyuncs.com/VIDEO/MISC/JYdata_yc_V1.0.apk'
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
  background: url('./assets/bg.jpg') no-repeat center 0;
  background-size: cover;
  padding-top: 1px;
}
.logo {
  background: url('./assets/logo.png') no-repeat center 0;
  background-size: 100% auto;
  width: 390px;
  height: 280px;
  margin: 140px auto 0;
  font-size: 0;
  line-height: 0;
}
.desc {
  background: url('./assets/desc.png') no-repeat center 0;
  background-size: 100% auto;
  width: 296px;
  height: 117px;
  margin: 100px auto 0;
  font-size: 0;
  line-height: 0;
}
.btnbox {
  margin-top: 40px;
  text-align: center;
  a {
    width: 408px;
    height: 88px;
    border: none;
    padding: 0;
    background: no-repeat 0 0;
    background-size: 100% auto;
    font-size: 0;
    line-height: 0;
    margin-bottom: 40px;
    display: inline-block;
  }
  .iosbtn {
    background-image: url('./assets/iosbtn.png');
  }
  .androidbtn {
    background-image: url('./assets/androidbtn.png');
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
