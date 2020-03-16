<template>
  <div class="title">
    <div>{{title}}</div>
    <select v-model="days" class="items" >
      <option v-for="(item, index) in list" :key="index"  :value="item.key">{{ item.text }}</option>
    </select>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Main extends Vue {
  /* 展示天数 默认展示最近7天 */
  @Prop({ type: String, default: 'last_7_day'}) value!: string
  /* 标题name */
  @Prop({ type: String, default: ''}) title!: string

  days = this.value
  list = [
    {key: 'last_7_day', text: '最近7天'},
    {key: 'last_15_day', text: '最近15天'},
    {key: 'last_30_day', text: '最近30天'},
    {key: 'last_90_day', text: '最近90天'},
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
  font-weight: bold;
  > div {
    font-size: 40px;
  }
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
