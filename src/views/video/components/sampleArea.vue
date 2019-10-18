<template>
  <!--广告片信息 -->
  <div class="videosample">
    <h4>广告小样</h4>
    <div class="videobox">
      <!-- <span class="info">{{sampleInfo.videoName}}</span> -->
      <span class="play" v-if="sampleInfo.videoCoverUrl.url" @click="playVideo"></span>
      <img :src="coverImg" v-if="sampleInfo.videoCoverUrl.url" @click="playVideo" />
      <img src="../assets/cover.png" v-if="!sampleInfo.videoCoverUrl.url" @click="playVideo" />
      <video :src="'https:' + sampleInfo.videoUrl" ref="video" controls></video>
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
    vid.style.zIndex = 3
    vid.style.opacity = 1
    vid.play()
    if (vid.ended) {
      vid.style.zIndex = 1
      vid.style.opacity = 0
    }
    vid.addEventListener('ended', () => {
      vid.style.zIndex = 1
      vid.style.opacity = 0
    })
    if (vid.pause) {
      vid.style.zIndex = 1
      vid.style.opacity = 0
    }
    vid.addEventListener('pause', () => {
      vid.style.zIndex = 1
      vid.style.opacity = 0
    })
  }
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
