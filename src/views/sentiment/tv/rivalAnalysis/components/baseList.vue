<template>
  <!--基础数据 -->
  <div class="baseinfo">
    <h3>基础信息</h3>
    <dl>
      <dt>
        <ul>
          <li>电视剧</li>
          <li>累计播放量</li>
        </ul>
      </dt>
      <dd v-for="(item,i) in basisList" :key="item.rivalName + i">
        <ul>
          <li>{{item.rivalName}}</li>
          <li>{{item.totalPlayCount}}</li>
        </ul>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class BasisList extends ViewBase {
  @Prop({ type: Array }) basisList!: any
}
</script>

<style lang="less" scoped>
.baseinfo {
  background: #fff;
  border-radius: 60px 60px 0 0;
  position: relative;
  z-index: 5;
  margin-top: -60px;
  h3 {
    font-size: 40px;
    line-height: 56px;
    padding: 50px 30px 30px;
  }
  dt {
    background: #f2f3f6;
    font-size: 26px;
    padding: 0 30px;
  }
  dd {
    padding: 0 30px;
    &:nth-child(odd) {
      background: rgba(242, 243, 246, 0.5);
    }
  }
  ul {
    display: flex;
  }
  li {
    width: 25%;
    min-height: 110px;
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    box-sizing: border-box;
    &:first-child {
      justify-content: flex-start;
      flex: 1;
    }
  }
  dd li {
    padding-top: 18px;
    padding-bottom: 18px;
    font-size: 26px;
    line-height: 36px;
  }
}
</style>
