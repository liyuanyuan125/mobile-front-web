<template>
  <div class="viewpage" v-if="videoDetail">
    <StatusArea :statusInfo="videoDetail.adVideoStatusInfo" />
    <VideoInfoArea :videoInfo="videoDetail.videoInfo" />
    <SampleArea :sampleInfo="videoDetail.adSampleInfo" v-if="videoDetail.adSampleInfo.videoUrl" />
    <!-- <PayInfoArea /> -->
    <BaseInfoArea :baseInfo="videoDetail.adBaseInfo" />
    <!-- <button class="btncancel" @click="videoAlert('cancel')" v-if="videoCancel">取消</button> -->
    <button class="btncancel" @click="videoAlert('delete')" v-if="videoCanDel">删除广告片</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StatusArea from './components/statusArea.vue'
import VideoInfoArea from './components/videoInfoArea.vue'
import SampleArea from './components/sampleArea.vue'
import PayInfoArea from './components/payArea.vue'
import BaseInfoArea from './components/baseInfoArea.vue'
import { getVideoDetail, cancelVideoDetail, delVideoDetail } from '@/api/advertiser.ts'
import { toast } from '@/util/toast'
import { Dialog } from 'vant'
import { openAppLinkClient } from '@/util/native'

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
  videoId: string = ''
  videoDetail: any = null
  videoCanDel: boolean = true

  beforeMount() {
    const vid = this.$route.params.videoId
    this.videoId = vid
    this.getVideoDetail(vid)
  }

  // 获取报告详情  468 待转码和已完成不能删除
  async getVideoDetail(adVideoId: string) {
    try {
      const res: any = await getVideoDetail({ adVideoId })
      if (res.code === 0) {
        this.videoDetail = res.data
        this.videoCanDel = res.data.adVideoStatusInfo.hasCanDelete
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

  // 确认弹框
  videoAlert(type: string) {
    switch (type) {
      case 'delete':
        Dialog.confirm({
          message: '删除后不可恢复，是否继续？',
          showConfirmButton: true,
          confirmButtonText: '确认删除',
          showCancelButton: true,
          cancelButtonText: '暂不删除',
          className: 'videotip'
        })
          .then(() => {
            this.delVideo()
          })
          .catch(() => {
            console.log('点击了取消按钮噢')
          })
        break
      case 'cancel':
        Dialog.confirm({
          message: '取消后不可恢复，是否继续？',
          showConfirmButton: true,
          confirmButtonText: '确认取消',
          showCancelButton: true,
          cancelButtonText: '暂不取消',
          className: 'videotip'
        })
          .then(() => {
            this.cancleVideo()
          })
          .catch(() => {
            // console.log('点击了取消按钮噢')
          })
        break
    }
  }

  // 取消广告片
  async cancleVideo() {
    try {
      const res: any = await cancelVideoDetail({ adVideoId: this.videoId })
      if (res.code === 0) {
        toast('取消成功')
        this.videoCancel = false
        this.videoCanDel = true
        console(res)
      } else {
        toast(res.msg)
      }
    } catch (ex) {
      toast(ex)
    }
  }

  // 删除广告片
  async delVideo() {
    try {
      const res: any = await delVideoDetail({ adVideoId: this.videoId })
      if (res.code === 0) {
        toast('删除成功', 1500)
        setTimeout(async () => {
          const objectData = {
            isCloseWindow: true,
            refreshWindow: true
          }
          const obj = { params: objectData }
          await handleGoBack(obj)
        }, 1500)
        // console(res)
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
