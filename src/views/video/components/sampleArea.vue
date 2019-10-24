<template>
  <!--广告片信息 -->
  <div class="videosample">
    <h4>广告小样</h4>
    <div class="videobox">
      <!-- <span class="info">{{sampleInfo.videoName}}</span> -->
      <span class="play" v-if="sampleInfo.videoCoverUrl.url" @click="playVideo"></span>
      <img :src="coverImg" v-if="sampleInfo.videoCoverUrl.url" @click="playVideo" />
      <img src="../assets/cover.png" v-if="!sampleInfo.videoCoverUrl.url" @click="playVideo" />
      <video :src="sampleInfo.videoUrl" ref="video" controls></video>
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
      // 将图片裁切成16：9
      const img = this.imgLoad(coverUrl.url)
      if (img) {
        const imgWid = img.width
        const imgHig = img.height

        if (imgWid > imgHig) {
          // 横图，width > height
          const newWid = (imgHig * 16) / 9
        } else {
          // 竖图 width < height
        }
        console.log('imgWid', imgWid, imgHig)

        this.coverImg =
          coverUrl.url +
          '?x-oss-process=image/resize,m_fill,h_' +
          imgHig +
          ',w_' +
          imgWid
      }
    }
  }

  imgLoad(url: string) {
    const img = new Image()
    img.src = url
    if (img.complete) {
      return {
        width: img.width || 0,
        height: img.height || 0
      }
    } else {
      img.onload = () => {
        return {
          width: img.width || 0,
          height: img.height || 0
        }
        img.onload = null
      }
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
