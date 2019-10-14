<template>
  <div class="viewpage" v-if="videoDetail">
    <StatusArea :statusInfo="videoDetail.adVideoStatusInfo" />
    <VideoInfoArea :videoInfo="videoDetail.videoInfo" />
    <SampleArea />
    <PayInfoArea />
    <BaseInfoArea />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StatusArea from './components/statusArea.vue'
import VideoInfoArea from './components/videoInfoArea.vue'
import SampleArea from './components/sampleArea.vue'
import PayInfoArea from './components/payArea.vue'
import BaseInfoArea from './components/baseInfoArea.vue'
import { getVideoDetail } from '@/api/advertiser.ts'
import { toast } from '@/util/toast'

@Component({
  components: {
    StatusArea,
    VideoInfoArea,
    SampleArea,
    PayInfoArea,
    BaseInfoArea
  }
})
export default class ResultReport extends Vue {
  adId: string = ''
  videoDetail: any = null

  beforeMount() {
    const vid = this.$route.params.adId
    this.adId = vid
    this.getVideoDetail(vid)
  }

  // 获取报告详情  468
  async getVideoDetail(adVideoId: string) {
    try {
      const res: any = await getVideoDetail({ adVideoId })
      if (res.code === 0) {
        this.videoDetail = res.data
      } else {
        toast(res.msg)
      }
    } catch (ex) {
      toast(ex)
    }
  }
}
</script>

<style lang="less" scoped>
@import 'less/main.less';
</style>
