<template>
  <div class="options-page">
    <div class="options-h3">
        <div>{{title}}</div>
    </div>
    <div class="options-top">
        <div>
            <span class="hot">{{hotQuery.text}}
                <img width="16px" height="16px" style="vertical-align: middle" src="../images/question.png" alt="" srcset="">
            </span>
            <div class="hot-degrees">{{hotQuery.value}}</div>
        </div>
        <div class="options-right">
            <div class="options-progress" v-for="(it, inedx) in publicPraise.appraiseList" :key="inedx">
                <span>{{it.raiseName}}
                </span>
                <div class="progress">
                    <Progress
                        :percentage="it.raisePercent"
                        color="#88aaf6"
                        stroke-width="5" 
                    />
                </div>
                <div class="progress-text"> {{it.raisePercent}}%</div>
            </div>
        </div>
    </div>
    <div class="options-bottom">
        <div class="hot-box">
            <div class="hot-box-left">
                <img width="13px" height="16px" src="../images/hot.png" alt="" srcset="">
                全网热词
            </div>
            <div class="hot-box-right">
                <span v-for="(it,index) in publicPraise.hotWordList" :key="index">{{it}}</span>
            </div>
        </div>
        <div class="hot-box">
            <div class="hot-box-left">
                <img width="13px" height="16px" src="../images/bad.png" alt="" srcset="">
                负面热词
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

const publicPraise = {
    appraiseList: [],
    hotWordList: [],
    badWordList: []
}
@Component({
    components: {
        Progress,
        Icon
    }
})
export default class Options extends Vue {
    @Prop({ required: true, default:  () => publicPraise}) publicPraise?: any
    @Prop({ required: true, default:  () => ({ text: '', value: ''})}) hotQuery?: any
    /* 标题name */
    @Prop({ type: String, default: '口碑评论'}) title!: string
}
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
