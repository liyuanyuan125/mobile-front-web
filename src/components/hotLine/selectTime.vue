<template>
  <div class="line-title">
    <div>{{title}}</div>
    <select v-model="value" class="items">
      <option v-for="(item,index) in list" :key="item.key + index" :value="item.key">{{ item.text }}</option>
    </select>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import moment from 'moment'

@Component({})
export default class Main extends Vue {
  /* 展示天数 默认展示最近7天 */
  @Prop({ type: String, default: 'last_7_day' }) days!: string
  /* 标题name */
  @Prop({ type: String, default: '热度分析' }) title!: string
  /* 接口传参日期格式 */
  @Prop({ type: String, default: 'YYYYMMDD' }) timeFormat!: string
  /* tabs切换标题 默认不展示 */
  @Prop({ type: Array, default: () => [] }) tabList!: any

  value = this.days
  list = [
    { key: 'last_7_day', text: '最近7天' },
    { key: 'last_15_day', text: '最近15天' },
    { key: 'last_30_day', text: '最近30天' },
    { key: 'last_90_day', text: '最近90天' }
  ]
  // 接口传入数据
  get beginDate() {
    switch (this.value) {
      case 'last_7_day':
        return moment(new Date())
          .add(-7, 'days')
          .format(this.timeFormat)
      case 'last_15_day':
        return moment(new Date())
          .add(-15, 'days')
          .format(this.timeFormat)
      case 'last_30_day':
        return moment(new Date())
          .add(-30, 'days')
          .format(this.timeFormat)
      case 'last_60_day':
        return moment(new Date())
          .add(-60, 'days')
          .format(this.timeFormat)
      case 'last_90_day':
        return moment(new Date())
          .add(-90, 'days')
          .format(this.timeFormat)
    }
  }
  get endDate() {
    return moment(new Date()).format(this.timeFormat)
  }
}
</script>

<style lang='less' scoped>
.line-title {
  display: flex;
  justify-content: space-between;
  justify-items: center;
  font-size: 38px;
  padding: 0 30px;
}
.items {
  width: 200px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  border-radius: 30px;
  border: 2px solid rgba(235, 235, 235, 1);
  text-align: center;
  color: #303030;
  font-size: 14px;
  padding-left: 40px;
}
</style>
