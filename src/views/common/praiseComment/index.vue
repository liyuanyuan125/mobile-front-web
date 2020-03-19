<template>
  <div class="options-page">
    <ModuleHeader title="口碑评论" :link="appLink" />
    <div class="options-top">
      <div class="options-left">
        <span class="hot" @click="showNote">
          好感度
          <span class="ico-question">?</span>
        </span>
        <div class="hot-degrees">{{favorable}}</div>
      </div>
      <div class="options-right">
        <div class="options-progress" v-for="(it, index) in praiseList" :key="it.raiseName + index">
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
          <i class="ico-hot"></i>全网热词
        </div>
        <div class="hot-box-right">
          <span
            v-for="(it,index) in publicPraise.hotWordList"
            :key="it+index"
            @click="wordLink(it,0)"
          >{{it}}</span>
        </div>
      </div>
      <div class="hot-box">
        <div class="hot-box-left">
          <i class="ico-bad"></i>负面热词
        </div>
        <div class="hot-box-right">
          <span
            v-for="(it,index) in publicPraise.badWordList"
            :key="it + index"
            @click="wordLink(it,3)"
          >{{it}}</span>
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

const publicPraise = {
  appraiseList: [],
  hotWordList: [],
  badWordList: []
}
@Component({
  components: {
    Progress,
    Icon,
    ModuleHeader
  }
})
export default class PraiseComment extends Vue {
  @Prop({ required: true, default: () => publicPraise }) publicPraise?: any
  @Prop({ type: String }) favorable?: any
  @Prop({ type: Object }) detail?: DetailItem

  appLink: AppLink = {
    page: 'praiseHotWordsList',
    // businessType: 0, // 业务类型 1=品牌 2=艺人 3=电影 4=电视剧 5=单曲 6=专辑
    businessObjectId: this.detail ? this.detail.id : 0 // 业务 id
  }
  businessType: any = 0
  praiseList: any[] = []

  mounted() {
    this.formatDetailType()
    console.log('appLink', this.appLink)
    // 处理数据
    const list = this.publicPraise.appraiseList
    if (list.length) {
      for (const item of list) {
        item.raisePercent = (item.raisePercent / 100).toFixed(1)
      }
    }
    this.praiseList = list
  }

  // 处理业务类型
  formatDetailType() {
    if (this.detail) {
      let businessType = 0
      switch (this.detail.type) {
        case 'brand':
          businessType = 1
          break
        case 'actor':
          businessType = 2
          break
        case 'movie':
          businessType = 3
          break
        case 'tv':
          businessType = 4
          break
        case 'song':
          businessType = 5
          break
        case 'album':
          businessType = 6
          break
      }
      this.businessType = businessType
      this.appLink = Object.assign({}, this.appLink, { businessType })
    }
  }

  // 热词 applink 跳转
  wordLink(word: string, markType: number) {
    const link: AppLink = {
      page: 'praiseHotWordsDetail',
      businessType: this.businessType,
      businessObjectId: this.detail ? this.detail.id : 0, // 业务 id
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
.alertwid {
  width: 90%;
}
</style>
