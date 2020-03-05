<template>
  <van-tabs v-model="active">
    <van-tab 
      type="card"
      v-for="item in hotTabs"
      :value="item.key"
      :key="item.key" 
      :title="item.text"
    />
  </van-tabs>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Tab, Tabs } from 'vant'

@Component({
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  }
})
export default class Main extends Vue {
  @Prop({ type: Array, default: () => []}) list!: any

  active = ''
  hotTabs = [
    {key: 'zonghe', text: '综合热度'},
    {key: 'weibo', text: '微博指数'},
    {key: 'baidu', text: '百度指数'},
    {key: 'wechat', text: '微信指数'},
  ]
}

</script>

<style lang='less' scoped>
.tabs-item {
  font-size: 26px;
  display: flex;
  span {
    flex: 1;
    margin-right: 20px;
    text-align: center;
    line-height: 58px;
    background:rgba(255,255,255,1);
    border-radius: 30px;
    border: 2px solid rgba(235,235,235,1);
    &.active {
      background: #88AAF6;
      color: #fff;
    }
  }
}
</style>
