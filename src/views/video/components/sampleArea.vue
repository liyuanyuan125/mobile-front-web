<template>
  <!--广告片信息 -->
  <div class="videosample">
    <h4>广告小样</h4>
    <div class="videobox" @click="playVideo">
      <!-- <span class="info">{{sampleInfo.videoName}}</span> -->
      <span class="play" v-if="sampleInfo.videoCoverUrl.url"></span>
      <img :src="coverImg" v-if="sampleInfo.videoCoverUrl.url" />
      <img src="../assets/cover.png" v-if="!sampleInfo.videoCoverUrl.url" />
      <video :src="sampleInfo.videoUrl" ref="video"></video>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { imgProxy } from '@/fn/imgProxy'

@Component({
  components: {}
})
export default class SampleArea extends ViewBase {
  @Prop({ type: Object }) sampleInfo!: any

  coverImg: string = ''

  created() {
    // 处理封面图
    const coverUrl = this.sampleInfo.videoCoverUrl
    if (coverUrl.type == 'piaoshen') {
      this.coverImg = coverUrl.url ? imgProxy(coverUrl.url, 160, 210) : ''
    } else {
      this.coverImg = coverUrl.url
    }
  }

  playVideo() {
    const vid: any = this.$refs.video
    vid.play()
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
