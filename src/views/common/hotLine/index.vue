<template>
   <div>
      <selectTime ref="reftimes"/>
      <hotLine :lineData="lineDatas"/>
      <platFormList :platformList="platformList" :params="params" />
   </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import hotLine from '@/components/hotLine/line.vue'
import platFormList from '@/components/hotLine/platform.vue'
import selectTime from '@/components/hotLine/selectTime.vue'

@Component({
  components: {
    hotLine,
    platFormList,
    selectTime
  }
})
export default class Main extends Vue {
  @Prop({ type: Object, default: () => []}) lineDatas!: any
  /** 平台热度list */
  @Prop({ type: Array, default: () => []}) platformList!: any
  /** 类型，id，天数， 开始/结束时间 五个参数 跳转更多二级页 */
  @Prop({ type: Object }) params!: any

  get startTime() {
    return (this.$refs.reftimes as any).beginDate
  }

  get endTime() {
    return (this.$refs.reftimes as any).endDate
  }
}

</script>

<style lang='less' scoped>
</style>
