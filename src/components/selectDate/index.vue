<template>
  <div class="selectdate">
    <select v-model="value">
      <option v-for="(item,index) in list" :key="item.key + index" :value="item.key">{{ item.text }}</option>
    </select>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import moment from 'moment'

@Component({})
export default class SelectDate extends Vue {
  /* 展示天数 默认展示最近7天 */
  @Prop({ type: String, default: 'last_7_day' }) days!: string
  /* 接口传参日期格式 */
  @Prop({ type: String, default: 'YYYYMMDD' }) timeFormat!: string

  value = this.days
  list = [
    { key: 'last_7_day', text: '最近7天' },
    { key: 'last_15_day', text: '最近15天' },
    { key: 'last_30_day', text: '最近30天' },
    { key: 'last_60_day', text: '最近30天' },
    { key: 'last_90_day', text: '最近90天' }
  ]
  created() {
    this.$emit('input', {
      startTime: this.beginDate(this.days),
      endTime: this.endDate()
    })
  }

  // 接口传入数据
  beginDate(val: string) {
    switch (val) {
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
  endDate() {
    return moment(new Date()).format(this.timeFormat)
  }

  @Watch('value')
  watchdays(val: any) {
    this.$emit('input', {
      startTime: this.beginDate(val),
      endTime: this.endDate()
    })
  }
}
</script>

<style lang='less' scoped>
.selectdate {
  width: 200px;
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
  border: 2px solid #ebebeb;
  text-align: center;
  color: #303030;
  font-size: 14px;
  padding: 0 54px 0 24px;
  position: relative;
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-top: 10px solid #404d66;
    border-left: 8px solid #fff;
    border-right: 8px solid #fff;
    background-color: #404d66;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }

  select {
    width: 200px;
    height: 56px;
    line-height: 56px;
    background: transparent;
    font-size: 26px;
    color: rgba(48, 48, 48, 0.6);
  }
}
</style>
