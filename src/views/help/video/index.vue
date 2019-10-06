<template>
  <div class="explain" ref="explain">
    <dl>
      <dd>
        <i class="upload"></i>
        <h4>上传视频要求</h4>
        <p>我们支持以下几种视频格式的转码：MP4/MOV/AVI/MPG；为了您的广告在影院大屏更好地呈现，我们建议视频尺寸为1920*1080</p>
      </dd>
      <dd>
        <i class="length"></i>
        <h4>视频时长与广告规格</h4>
        <p>目前平台的广告规格有15S/30S/45S/60S，确保您上传的视频时长小于等于该规格，如您上传的广告时长为15.6S，其对应规格将为30S</p>
      </dd>
      <dd>
        <i class="format"></i>
        <h4>影院广告格式</h4>
        <p>DCP文件是影院仅支持的视频文件格式，我们提供第三方转码服务。您也可自行转码</p>
      </dd>
      <dd>
        <i class="change"></i>
        <h4>广告片转码费</h4>
        <p>视频转码计费标准：30秒以内¥3,000；30-60秒¥4,000</p>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Videoexplain extends Vue {
  mounted() {
    const exp: any = this.$refs.explain
    exp.style.height = document.body.clientHeight + 'px'
  }

  // 获取报告数据 563、516、515、424
}
</script>

<style lang="less" scoped>
@import 'less/main.less';
</style>