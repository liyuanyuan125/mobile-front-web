<template>
  <div class='main'>
      <div class='title'>平台分布</div>
      <Table :tableTitle='tableTitle' :tableItem='tableItem' />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { toast } from '@/util/toast'
import Table from '../components/table.vue'


@Component({
  components: {
    Table
  }
})
export default class KolPage extends ViewBase {

}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  background: #fff;
}
.title {
  height: 34px;
  font-size: 34px;
  font-weight: 500;
  color: rgba(48, 48, 48, 1);
  line-height: 34px;
  margin-top: 48px;
}
.table {
  width: 100%;
  // height: 410px;
  background: #f5f4f7;
  border-radius: 10px;
  border: 2px solid rgba(232, 232, 232, 1);
  .titleul {
    height: 80px;
    li {
      height: 80px;
      background: #f5f4f7;
      width: 16.66%;
      // display: inline-flex;
      float: left;
      text-align: center;
      line-height: 80px;
      font-size: 24px;
      font-weight: 400;
      color: rgba(48, 48, 48, 1);
    }
    li + li {
      border-left: 1px solid rgba(216, 216, 216, 1);
    }
  }
  .table-item {
    height: 110px;
    line-height: 110px;
    .table-item-title {
      width: 16.66%;
      float: left;
      font-size: 26px;
      font-weight: 500;
      color: rgba(48, 48, 48, 1);
      text-align: center;
      line-height: 110px;
    }
    .table-item-ul {
      width: 83.34%;
      float: left;
      li {
        // padding-top: 2%;
        height: 100%;
        width: 20%;
        float: left;
        text-align: center;
        font-size: 24px;
        font-weight: 400;
        color: rgba(48, 48, 48, 1);
        border-left: 1px solid rgba(216, 216, 216, 1);
        .top {
          height: 55px;
          line-height: 70px;
        }
        .bottom {
          height: 55px;
          line-height: 55px;
        }
      }
    }
  }
}
</style>
