<template>
  <!--数据为空 -->
  <div class="datanull">
    <img src="@/assets/data-null.png" alt="暂无数据" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'

@Component({
  components: {}
})
export default class DataEmpty extends ViewBase {}
</script>

<style lang="less" scoped>
.datanull {
  text-align: center;
  padding: 80px 50px;
  img {
    width: 180px;
  }
}
</style>
