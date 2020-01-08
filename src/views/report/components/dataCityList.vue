<template>
  <div class="datatrendlist citylist">
    <div class="tit">
      <h3>城市分布占比 | {{cityList.length}}家</h3>
      <span>图片最多展示30个</span>
    </div>
    <dl>
      <dt>
        <span>城市</span>
        <span>曝光人次</span>
        <span>曝光场次</span>
        <span>支出金额(元)</span>
      </dt>
      <dd v-for="(item,index) in cityList" :key="item.cityName + index">
        <span>{{item.cityName}}</span>
        <span>{{item.showPerson}}</span>
        <span>{{item.showScene}}</span>
        <span>{{item.showCost}}</span>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class DataCityList extends ViewBase {
  @Prop({ type: Array }) cityList!: any
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
