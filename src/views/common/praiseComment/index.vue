<template>
  <div class="options-page">
    <ModuleHeader title="口碑评论" :link="show ? link : null" @click.native="talkingData" />
    <div v-if="show">
      <div class="options-top">
        <div class="options-left">
          <span class="hot" @click="showNote">
            好感度
            <Icon name="question-o" size="16" color="#303030" />
          </span>
          <div class="hot-degrees">{{favorable? favorable : '-'}}</div>
        </div>
        <div class="options-right">
          <div
            class="options-progress"
            v-for="(it, index) in ((appraiseList || []).length > 0 ? appraiseList : noappraiseList)"
            :key="it.raiseName + index"
          >
            <span>{{it.raiseName}}</span>
            <div class="progress">
              <Progress :percentage="it.raisePercent || 0" color="#88aaf6" stroke-width="5" />
            </div>
            <div class="progress-text" v-if="it.raisePercent">{{it.raisePercent}}%</div>
            <div class="progress-text" v-else>-</div>
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
            <div v-if="hotWordList.length > 0">
              <span
                v-for="(it,index) in hotWordList.slice(0,4)"
                :key="it+index"
                class="van-ellipsis"
                @click="wordLink(it,0)"
              >{{it}}</span>
            </div>
            <div v-else class="nomore">
              <span>-</span>
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
            <div v-if="badWordList.length > 0">
              <span
                v-for="(it,index) in badWordList.slice(0,4)"
                :key="it + index"
                class="van-ellipsis"
                @click="wordLink(it,3)"
              >{{it}}</span>
            </div>
            <div v-else class="nomore">
              <span>-</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <dataEmpty v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Progress, Icon } from 'vant'
import ModuleHeader from '@/components/moduleHeader'
import { alert } from '@/util/toast'
import { openAppLink, AppLink } from '@/util/native'
import { DetailItem } from './types'
import dataEmpty from '@/views/common/dataEmpty/index.vue'
import { talkingdataDetailHandle } from '@/util/TDEvent'

@Component({
  components: {
    Progress,
    Icon,
    ModuleHeader,
    dataEmpty
  }
})
export default class PraiseComment extends Vue {
  @Prop({ required: true }) publicPraise?: any
  @Prop({ type: String }) favorable?: any
  @Prop({ type: Object }) link!: AppLink // app 热词link

  praiseList: any[] = []
  noappraiseList = [
    { raiseName: '正面评价', raisePercent: 0 },
    { raiseName: '中性评价', raisePercent: 0 },
    { raiseName: '负面评价', raisePercent: 0 }
  ]

  get hotWordList() {
    return this.publicPraise ? this.publicPraise.hotWordList || [] : []
  }

  get badWordList() {
    return this.publicPraise ? this.publicPraise.badWordList || [] : []
  }

  get appraiseList() {
    const list = this.publicPraise && (this.publicPraise.appraiseList || [])
    if (list && list.length) {
      for (const item of list) {
        item.raisePercent = item.raisePercent ? (item.raisePercent / 100).toFixed(2) : 0
      }
    }
    return list
  }

  get show() {
    return (
      this.favorable ||
      (this.publicPraise &&
        (this.appraiseList.length > 0 ||
          this.badWordList.length > 0 ||
          this.hotWordList.length > 0))
    )
  }

  // talkingdata 埋点统计
  talkingData() {
    if (this.show) {
      talkingdataDetailHandle(
        this.link.businessType || this.link.eventType,
        '口碑评论_查看更多'
      )
    }
  }

  // 热词 applink 跳转
  wordLink(word: string, markType: number) {
    if (markType === 3) {
      talkingdataDetailHandle(
        this.link.businessType || this.link.eventType,
        '口碑评论_点击负面热词'
      )
    } else {
      talkingdataDetailHandle(
        this.link.businessType || this.link.eventType,
        '口碑评论_点击全网热词'
      )
    }
    let link: AppLink = {
      page: 'praiseHotWordsDetail',
      businessType: this.link.businessType, // 业务类型
      businessObjectId: this.link.businessObjectId, // 业务 id
      keyword: word,
      markType
    }
    if (
      this.link.eventType &&
      (this.link.eventType === 100 || this.link.eventType === 101)
    ) {
      link = {
        page: 'eventPraiseHotWordsDetail',
        eventType: this.link.eventType, // 业务类型
        eventId: this.link.eventId, // 业务 id
        keyword: word,
        markType
      }
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
.nomore {
  font-size: 28px;
  line-height: 18px;
  text-align: center;
  font-weight: 800;
}
</style>
