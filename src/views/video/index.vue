<template>
  <div class="viewpage">
    <StatusArea />
    <VideoInfoArea />
    <SampleArea />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StatusArea from './components/statusArea.vue'
import VideoInfoArea from './components/videoInfoArea.vue'
import SampleArea from './components/sampleArea.vue'

import { getVideoDetail } from '@/api/advertiser.ts'
import { toast } from '@/util/toast'

@Component({
  components: {
    StatusArea,
    VideoInfoArea,
    SampleArea
  }
})
export default class ResultReport extends Vue {
  adId: string = ''
  orderDetail: any = {}

  beforeMount() {
    const vid = this.$route.params.adId
    this.adId = vid
    this.getVideoDetail(vid)
  }

  // 获取报告详情 563、516、515、424 468
  async getVideoDetail(adId: string) {
    try {
      const res: any = await getVideoDetail({ adId })
      if (res.code === 0) {
        this.orderDetail = res.data
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
