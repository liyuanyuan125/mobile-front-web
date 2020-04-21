<template>
  <div class="options-page">
    <moduleHeader title="年龄分布" tag="h4" class="module-header" />
    <div class="contrast-top">
      <span
        @click="changeAge(ins)"
        v-for="(it, ins) in ageList"
        :key="ins"
        :class="[ indexs == ins ? 'contrast-title active' : 'contrast-title']"
      >{{it.ageType}}</span>
    </div>
    <div class="contrast-bottom">
      <div v-for="(it, index) in ageList" :key="index">
        <div v-if="indexs == index">
          <div v-if="it.rivalList && (it.rivalList || []).length > 0">
            <div class="contrast-progress" v-for="(item, ins) in it.rivalList" :key="ins">
              <span>
                <label class="van-multi-ellipsis--l2">{{item.rivalName}}</label>
              </span>
              <div class="progress">
                <Progress :percentage="item.rivalPercent" color="#88aaf6" stroke-width="10" />
                <div class="contrast-message">
                  <div class="contrast-message-progress" style="fontFamily: 'DIN Alternate'">
                    <span v-if="item.rivalPercent">{{item.rivalPercent}}%</span>
                    <span v-else style="color:#8f8f8f; font-weight: normal">暂无数据</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="noList">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Progress, Icon } from 'vant'
import { AgeRangeList } from './type'
import moduleHeader from '@/components/moduleHeader'

@Component({
  components: {
    Progress,
    Icon,
    moduleHeader
  }
})
export default class Options extends Vue {
  /* 年龄分布数据 */
  @Prop({ required: true, default: [] }) ageRangeList?: AgeRangeList[]
  /* 跳转页面 */
  // @Prop({ required: true, default:  ({})}) href?: any
  /* 年龄分布标题 */
  // @Prop({ type: String, default: '年龄分布'}) title!: string

  indexs: any = 0
  changeAge(ins: number) {
    this.indexs = ins
  }

  get ageList() {
    const list: any = this.ageRangeList
    if (list && list.length) {
      for (const it of list) {
        for (const el of it.rivalList) {
          const per = el.rivalPercent ? el.rivalPercent : 0
          el.rivalPercent = per > 10000 ? 100 : (el.rivalPercent / 100).toFixed(1)
        }
      }
    }
    return list
  }
}
</script>

<style lang="less" scoped>
@import url(./index.less);
.module-header {
  padding-bottom: 30px;
}
</style>
