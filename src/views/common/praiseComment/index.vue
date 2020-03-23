<template>
  <div class="options-page">
    <ModuleHeader title="口碑评论" :link="link" />
    <div class="options-top">
      <div class="options-left">
        <span class="hot" @click="showNote">
          好感度
          <span class="ico-question">?</span>
        </span>
        <div class="hot-degrees">{{favorable}}</div>
      </div>
      <div class="options-right">
        <div
          class="options-progress"
          v-for="(it, index) in appraiseList"
          :key="it.raiseName + index"
        >
          <span>{{it.raiseName}}</span>
          <div class="progress">
            <Progress :percentage="it.raisePercent" color="#88aaf6" stroke-width="5" />
          </div>
          <div class="progress-text">{{it.raisePercent}}%</div>
        </div>
      </div>
    </div>
    <div class="options-bottom">
      <div class="hot-box">
        <div class="hot-box-left">
          <p>
            <i class="ico-hot"></i>全网热词
          </p>
        </div>
        <div class="hot-box-right">
          <div>
            <span
              v-for="(it,index) in publicPraise.hotWordList"
              :key="it+index"
              class="van-ellipsis"
              @click="wordLink(it,0)"
            >{{it}}</span>
          </div>
        </div>
      </div>
      <div class="hot-box">
        <div class="hot-box-left">
          <p>
            <i class="ico-bad"></i>负面热词
          </p>
        </div>
        <div class="hot-box-right">
          <div>
            <span
              v-for="(it,index) in publicPraise.badWordList"
              :key="it + index"
              class="van-ellipsis"
              @click="wordLink(it,3)"
            >{{it}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Progress, Icon } from 'vant'
import ModuleHeader from '@/components/moduleHeader'
import { alert } from '@/util/toast'
import { openAppLink, AppLink } from '@/util/native'
import { DetailItem } from './types'

@Component({
  components: {
    Progress,
    Icon,
    ModuleHeader
  }
})
export default class PraiseComment extends Vue {
  @Prop({ required: true }) publicPraise?: any
  @Prop({ type: String }) favorable?: any
  @Prop({ type: Object }) link!: AppLink

  appLink: AppLink = this.link
  praiseList: any[] = []

  get appraiseList() {
    const list = this.publicPraise.appraiseList
    if (list && list.length) {
      for (const item of list) {
        item.raisePercent = (item.raisePercent / 100).toFixed(1)
      }
    }
    return list
  }

  // 热词 applink 跳转
  wordLink(word: string, markType: number) {
    const link: AppLink = {
      page: 'praiseHotWordsDetail',
      businessType: this.link.businessType, // 业务类型
      businessObjectId: this.link.businessObjectId, // 业务 id
      keyword: encodeURIComponent(word),
      markType
    }
    openAppLink(link)
  }

  // 显示说明
  showNote() {
    alert({
      title: '提示',
      message:
        '根据口碑评论的正负面及热词的热度计算出来的口碑评论好感度。好感度最高为A+，其次为A、A-、B+、B、B-、C+、C、C-',
      showConfirmButton: true,
      className: 'alertwid'
    })
  }
}
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
