<template>
  <div class="demo-page">
    <Time v-model='days' />
    <div class="contrast-top">
        <span @click="changeAge(ins)" v-for="(it, ins) in list" :key="ins" :class="[ indexs == ins ? 'contrast-title active' : 'contrast-title']">
            {{it}}
        </span>
    </div>
    <div class="contrast-bottom">
        <div v-if="optionsMessage.length > 0">
            <div class="contrast-progress" v-for="(item, ins) in optionsMessage" :key="ins">
                <span>{{item.rivalName}}</span>
                <div class="progress">
                    <Progress
                        :percentage="item.percent"
                        color="#88aaf6"
                        stroke-width="10" 
                    />
                    <div class="contrast-message">
                        <div class="contrast-message-progress">{{item.percent}}%</div>
                        <div class="contrast-message-text">
                            <span :key="ins" v-for="(it, ins) in item.hotWordList">{{it}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="noList">
            暂无数据
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Progress } from 'vant'
import moment from 'moment'
import Time from './time.vue'
const list = [
    '正面评论',
    '中性评论',
    '负面评论'
]
const optionsList = {
    goodList: [],
    badList: [],
    neutralList: []
}
@Component({
    components: {
        Progress,
        Time
    }
})
export default class Options extends Vue {
    @Prop({ required: true, default: () => optionsList}) optionsList?: any
    /* 开始时间 结束时间 */
    @Prop({ type: Object, default: () => ({}) }) value!: any
    /* 展示天数 默认展示最近7天 */
    @Prop({ type: String, default: 'last_7_day'}) days!: string
    /* 接口传参日期格式 */
    @Prop({type: String, default: 'YYYYMMDD'}) timeFormat!: string

    // 接口传入数据
    get startTime() {
        switch (this.days) {
        case 'last_7_day':
            return moment(new Date()).add(-7, 'days').format(this.timeFormat)
        case 'last_15_day':
            return moment(new Date()).add(-15, 'days').format(this.timeFormat)
        case 'last_30_day':
            return moment(new Date()).add(-30, 'days').format(this.timeFormat)
        case 'last_90_day':
            return moment(new Date()).add(-90, 'days').format(this.timeFormat)
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
            this.optionsMessage = this.optionsList.goodList || []
        } else if (ins == 1) {
            this.optionsMessage = this.optionsList.neutralList || []
        } else {
            this.optionsMessage = this.optionsList.badList || []
        }
        this.indexs = ins
    }

    @Watch('optionsList', {deep: true})
    watchOptionsList(val: any) {
        this.indexs = 0
        this.optionsMessage = val.goodList
    }

    @Watch('days', { immediate: true})
    watchdays(val: any) {
        this.$emit('input', {
            startTime: this.startTime,
            endTime: this.endTime
        })
    }
}
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
