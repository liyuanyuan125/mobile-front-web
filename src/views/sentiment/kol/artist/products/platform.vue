<template>
  <div class='main'>
      <div class='title'>平台分布</div>
      <table class="table_default1" >
      <tr>
        <th>序号</th>
        <th v-for="th in tableTh" >
          {{th.title}}
        </th>
      </tr>
      <tr v-for="(tr,index) in dataList">
        <td>{{index+1}}</td>
        <td v-for="td in tr" >
          {{td}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { toast } from '@/util/toast'

@Component({
  components: {
  }
})
export default class KolPage extends ViewBase {


tableTh: any = [
  {
    title: '公司名称',
  },
  {
    title: '公司名称1',
  },
  {
    title: '公司名称2',
  }
]
dataList: any = [
  {
    c1: '度娘2',
    c2: '123123123'
  },
  {
    c1: '度娘2',
    c2: '123123123'
  },
  {
    c1: '度娘2',
    c2: '123123123'
  }
]

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
</style>
