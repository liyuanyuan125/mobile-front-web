<template>
  <div class="select-time">
    <div>{{title}}</div>
    <Select v-model="day" :list="dayList" class="day-list"/>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import moment from 'moment'
import Select from '@/components/select'

@Component({
  components: {
    Select
  }
})
export default class Main extends Vue {
  /** 日期范围列表，数字代表最近几天 */
  @Prop({ type: Array, default: () => [ 7, 15, 30, 60, 90 ] }) days!: number[]
  @Prop({ type: String, default: '热度分析' }) title!: string
  /* value */
  @Prop({ type: [ String, Number, Boolean ], default: '' }) value!: any

  day = 7

  get dayList() {
    const list = (this.days || []).map(value => ({ name: `最近${value}天`, value }))
    return list
  }
  @Watch('value', { immediate: true })
  watchValue(value: any) {
    this.day = value
  }

  @Watch('day')
  watchDay(value: any) {
    this.$emit('input', value)
  }
}
</script>

<style lang='less' scoped>
.select-time {
  display: flex;
  justify-content: space-between;
  justify-items: center;
  font-size: 40px;
}
</style>
