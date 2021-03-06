<template>
  <div class="options-page">
    <Time v-model="days" :title="title" />
    <div class="contrast-top">
      <span
        @click="changeAge(ins)"
        v-for="(it, ins) in list"
        :key="ins"
        :class="[ indexs == ins ? 'contrast-title active' : 'contrast-title']"
      >{{it}}</span>
    </div>
    <div class="contrast-bottom">
      <div v-if="(optionsMessage || []).length > 0">
        <div class="contrast-progress" v-for="(item, ins) in optionsMessage" :key="ins">
          <span>{{item.rivalName}}</span>
          <div class="progress">
            <Progress :percentage="(item.percent || 0) " color="#88aaf6" stroke-width="10" />
            <div class="contrast-message">
              <div class="contrast-message-progress">
                <span v-if="item.percent" style="fontFamily: 'DIN Alternate'">{{item.percent}}%</span>
                <span v-else style="fontFamily: 'DIN Alternate'">-</span>
              </div>
              <div class="contrast-message-text" v-if="(item.hotWordList || []).length > 0">
                <span>热词</span>
                <span
                  class="van-ellipsis"
                  @click="wordLink(it, item.rivalId)"
                  :key="ins"
                  v-for="(it, ins) in item.hotWordList"
                >{{it}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="noList">
        <dataEmpty />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Progress, ContactEdit } from 'vant'
import moment from 'moment'
import Time from './time.vue'
import { FetchResult, FetchData } from './type'
import { toast } from '@/util/toast'
import dataEmpty from '@/views/common/dataEmpty/index.vue'
import { openAppLink, AppLink } from '@/util/native'
import { isEqual } from 'lodash'

const list = ['负面评论', '正面评论', '中性评论']
const optionsList = {
  goodList: [],
  badList: [],
  neutralList: []
}
@Component({
  components: {
    Progress,
    Time,
    dataEmpty
  }
})
export default class MarketContrast extends Vue {
  /* 查询请求 */
  @Prop({ type: Function, required: true })
  fetch!: (query?: any) => Promise<FetchResult>
  /* 查询条件 */
  @Prop({ type: Object, default: () => ({}) }) query!: object

  /* 标题name */
  @Prop({ type: String, default: '口碑评论对比' }) title!: string

  /* 接口传参日期格式 */
  @Prop({ type: String, default: 'YYYYMMDD' }) timeFormat!: string

  @Prop({ type: Number }) businessType!: number

  optionsList: any = optionsList
  days = 'last_7_day'

  // 接口传入数据
  get startTime() {
    switch (this.days) {
      case 'last_7_day':
        return moment(new Date())
          .add(-7, 'days')
          .format(this.timeFormat)
      case 'last_15_day':
        return moment(new Date())
          .add(-15, 'days')
          .format(this.timeFormat)
      case 'last_30_day':
        return moment(new Date())
          .add(-30, 'days')
          .format(this.timeFormat)
      case 'last_60_day':
        return moment(new Date())
          .add(-60, 'days')
          .format(this.timeFormat)
      case 'last_90_day':
        return moment(new Date())
          .add(-90, 'days')
          .format(this.timeFormat)
    }
  }
  get endTime() {
    return moment(new Date()).format(this.timeFormat)
  }

  indexs: any = 0
  list: any = list

  optionsMessage = this.optionsList.goodList || []

  changeAge(ins: number) {
    if (ins == 0) {
      this.optionsMessage = this.optionsList.badList || []
    } else if (ins == 1) {
      this.optionsMessage = this.optionsList.goodList || []
    } else {
      this.optionsMessage = this.optionsList.neutralList || []
    }
    this.indexs = ins
  }

  @Watch('optionsList', { deep: true })
  watchOptionsList(val: any) {
    this.indexs = 0
    this.optionsMessage = val ? val.badList : []
  }

  // 热词 applink 跳转
  wordLink(word: string, id: string) {
    let type = 0
    switch (this.indexs) {
      case 0:
        // 负面
        type = 3
        break
      case 1:
        // 正面
        type = 1
        break
      case 2:
        // 中性
        type = 2
        break
      default:
        // 全部
        type = 0
    }
    const link: AppLink = {
      page: 'praiseHotWordsDetail',
      businessType: this.businessType, // 业务类型
      businessObjectId: id, // 业务 id
      keyword: word,
      markType: type,
      startTime: this.startTime,
      endTime: this.endTime
    }
    openAppLink(link)
  }

  async uplist() {
    const { data } = await this.fetch({
      ...this.query,
      startTime: this.startTime,
      endTime: this.endTime
    })
    this.optionsList = data
  }

  @Watch('query', { deep: true })
  watchquery(val: any, old: any) {
    if (!isEqual(val, old)) {
      this.uplist()
    }
  }

  @Watch('days', { immediate: true })
  watchdays(val: any, old: any) {
    this.uplist()
  }
}
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
