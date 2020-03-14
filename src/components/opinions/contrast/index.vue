<template>
  <div class="demo-page">
    <div class="contrast-h3">
        <h3>口碑评论</h3>
    </div>
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
        Progress
    }
})
export default class Options extends Vue {
    @Prop({ required: true, default:  () => optionsList}) optionsList?: any
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
}
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
