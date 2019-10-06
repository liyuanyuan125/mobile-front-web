<template>
  <div class="download" ref="downloabox">
    <div class="logo">全网精准娱乐营销平台</div>
    <div class="desc">高效移动工作平台</div>
    <div class="btnbox">
      <button class="iosbtn">Ios下载</button>
      <button class="androidbtn">Android下载</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class DownloadCinema extends Vue {
  mounted() {
    const dw: any = this.$refs.downloabox
    dw.style.height = document.body.clientHeight + 'px'
  }
}
</script>

<style lang="less" scoped>
.download {
  height: 100%;
  background: url('./assets/bg.jpg') no-repeat center 0;
  background-size: 100% auto;
  padding-top: 1px;
}
.logo {
  background: url('./assets/logo.png') no-repeat center 0;
  background-size: cover;
  width: 420px;
  height: 218px;
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
  button {
    width: 408px;
    height: 88px;
    border: none;
    padding: 0;
    background: no-repeat 0 0;
    background-size: 100% auto;
    font-size: 0;
    line-height: 0;
    margin-bottom: 40px;
  }
  .iosbtn {
    background-image: url('./assets/iosbtn.png');
  }
  .androidbtn {
    background-image: url('./assets/androidbtn.png');
  }
}
</style>
