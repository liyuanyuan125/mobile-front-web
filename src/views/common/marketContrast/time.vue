<template>
  <div class="title">
    <div>{{title}}</div>
    <div class="selectdate">
      <Select v-model="days" :list="list" >
      </Select>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Select from '@/components/select'
@Component({
  components: {
    Select
  }
})
export default class Main extends Vue {
  /* 展示天数 默认展示最近7天 */
  @Prop({ type: String, default: 'last_7_day'}) value!: string
  /* 标题name */
  @Prop({ type: String, default: ''}) title!: string

  days = this.value
  list = [
    {value: 'last_7_day', name: '最近7天'},
    {value: 'last_15_day', name: '最近15天'},
    {value: 'last_30_day', name: '最近30天'},
    {value: 'last_60_day', name: '最近60天'},
    {value: 'last_90_day', name: '最近90天'},
  ]

  @Watch('days')
  watchdays(val: any) {
      this.$emit('input', val)
  }
}

</script>

<style lang='less' scoped>
.title {
  display: flex;
  justify-content: space-between;
  justify-items: center;
  margin-bottom: 40px;
  > div {
    font-size: 40px;
    font-weight: 400;
  }
}
</style>
