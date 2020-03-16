<template>
  <div class="options-page">
    <div class="options-h3">
        <div>{{title}}</div>
        <router-link class="more" :to="href" ><Icon name="arrow" size="18" /></router-link>
    </div>
    <div class="options-top">
        <div>
            <span class="hot">{{hotQuery.text}}
                <img width="16px" height="16px" style="vertical-align: middle" src="@/assets/options/question.png" alt="" srcset="">
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
                <img width="13px" height="16px" src="@/assets/options//hot.png" alt="" srcset="">
                全网热词
            </div>
            <div class="hot-box-right">
                <span v-for="(it,index) in publicPraise.hotWordList" :key="index">{{it}}</span>
            </div>
        </div>
        <div class="hot-box">
            <div class="hot-box-left">
                <img width="13px" height="16px" src="@/assets/options//bad.png" alt="" srcset="">
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
import { PublicPraise } from './type'

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
    /* 口碑评论数据 */
    @Prop({ required: true, default:  () => publicPraise}) publicPraise?: PublicPraise[]
    /* 好感度 */
    @Prop({ required: true, default:  () => ({ text: '', value: ''})}) hotQuery?: any
    /* 跳转页面 */
    @Prop({ required: true, default:  ({})}) href?: any
    /* 标题name */
    @Prop({ type: String, default: '口碑评论'}) title!: string
}
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
