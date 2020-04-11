<template>
  <!--数据为空 -->
  <div class="datanull">
    <img src="@/assets/sentiment/event-null.png" :alt="text"/>
    <p>{{text}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class DataEmpty extends ViewBase {
  @Prop({ type: String, default: '暂无数据' }) text!: string
}
</script>

<style lang="less" scoped>
.datanull {
  text-align: center;
  padding: 80px 50px;
  img {
    width: 268px;
  }
  p {
    text-align: center;
    font-size: 30px;
    line-height: 50px;
    margin-top: 15px;
    color: #8f8f8f;
  }
}
</style>
