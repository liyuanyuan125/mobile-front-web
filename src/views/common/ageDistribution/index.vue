<template>
  <div class="options-page">
    <!-- <div class="contrast-h3">
        <div>{{title}}</div>
        <router-link class="more" :to="href" >查看更多<Icon name="arrow" size="18" /></router-link>
    </div> -->
    <div class="contrast-top">
        <span @click="changeAge(ins)" v-for="(it, ins) in ageRangeList" :key="ins" :class="[ indexs == ins ? 'contrast-title active' : 'contrast-title']">
            {{it.ageType}}
        </span>
    </div>
    <div class="contrast-bottom">
         <div v-for="(it, index) in ageRangeList" v-if="indexs == index" :key="index">
            <div v-if="it.brandList && it.brandList.length > 0">
            <div class="contrast-progress" v-for="(item, ins) in it.brandList" :key="ins">
                <span>{{item.brandName}}</span>
                <div class="progress">
                    <Progress
                        :percentage="item.brandPercent"
                        color="#88aaf6"
                        stroke-width="10" 
                    />
                    <div class="contrast-message">
                        <div class="contrast-message-progress">{{item.brandPercent}}%</div>
                    </div>
                </div>
            </div>
            </div>
            <div v-else class="noList">
                暂无数据
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Progress, Icon } from 'vant'
import { AgeRangeList } from './type'

@Component({
    components: {
        Progress,
        Icon
    }
})
export default class Options extends Vue {
    /* 年龄分布数据 */
    @Prop({ required: true, default:  []}) ageRangeList?: AgeRangeList[]
    /* 跳转页面 */
    // @Prop({ required: true, default:  ({})}) href?: any
    /* 年龄分布标题 */
    // @Prop({ type: String, default: '年龄分布'}) title!: string

    indexs: any = 0
    changeAge(ins: number) {
        this.indexs = ins
    }

}
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
