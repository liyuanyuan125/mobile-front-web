<template>
  <div class="datatrendlist">
    <div class="tit">
      <h3>覆盖影片 | {{count}}部</h3>
      <span>图片最多展示30部</span>
    </div>
    <dl>
      <dt>
        <span>影片名称</span>
        <span>曝光人次</span>
        <span>曝光场次</span>
        <span>支出金额(元)</span>
      </dt>
      <dd v-for="(item,index) in movieList" :key="item.movieId +''+index">
        <span>{{item.movieName}}</span>
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
export default class DataMovieList extends ViewBase {
  @Prop({ type: Array }) movieList!: any
  @Prop({ type: String }) count!: string
}
</script>

<style lang="less" scoped>
@import '../less/main.less';
</style>
