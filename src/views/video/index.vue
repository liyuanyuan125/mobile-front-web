<template>
  <div class="viewpage" v-if="videoDetail">
    <StatusArea :statusInfo="videoDetail.adVideoStatusInfo" />
    <VideoInfoArea :videoInfo="videoDetail.videoInfo" />
    <SampleArea :sampleInfo="videoDetail.adSampleInfo" v-if="videoDetail.adSampleInfo.videoUrl" />
    <!-- <PayInfoArea /> -->
    <BaseInfoArea :baseInfo="videoDetail.adBaseInfo" />
    <button class="btncancel" v-if="videoCancle">取消</button>
    <button class="btncancel" v-if="videoCanDel && !videoCancle">删除广告片</button>
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
  videoCancle: boolean = true
  videoCanDel: boolean = false

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
        switch (res.data.adVideoStatusInfo.adVideoStatus) {
          case 3:
            // result ="待转码"
            this.videoCancle = false
            break
          case 4:
            // result = '已完成'
            this.videoCancle = false
            break
          case 6:
            // result = '已取消'
            this.videoCancle = false
            this.videoCanDel = true
            break
        }
        // case 0:result = "未知"
        // case 1:result = "待审批"
        // case 2: result ="待支付"
        // case 3: result ="待转码"
        // case 4: result ="已完成"
        // case 5: result ="未通过"
        // case 6: result ="已取消"
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
