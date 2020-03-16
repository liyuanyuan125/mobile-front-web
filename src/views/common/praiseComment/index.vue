<template>
  <div class="options-page">
    <ModuleTitle title="口碑评论" :appLink="appLink" />
    <div class="options-top">
      <div class="options-left">
        <span class="hot">
          好感度
          <span>?</span>
        </span>
        <div class="hot-degrees">{{favorable}}</div>
      </div>
      <div class="options-right">
        <div class="options-progress" v-for="(it, inedx) in publicPraise.appraiseList" :key="inedx">
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
          <span v-for="(it,index) in publicPraise.hotWordList" :key="index">{{it}}</span>
        </div>
      </div>
      <div class="hot-box">
        <div class="hot-box-left">
          <i class="ico-bad"></i>负面热词
        </div>
        <div class="hot-box-right">
          <span v-for="(it,index) in publicPraise.badWordList" :key="index">{{it}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Progress, Icon } from 'vant'
import ModuleTitle from '@/components/sentimentTitle'

const publicPraise = {
  appraiseList: [],
  hotWordList: [],
  badWordList: []
}
@Component({
  components: {
    Progress,
    Icon,
    ModuleTitle
  }
})
export default class PraiseComment extends Vue {
  @Prop({ required: true, default: () => publicPraise }) publicPraise?: any
  @Prop({ type: String }) favorable?: any

  appLink: string = ''
}
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
