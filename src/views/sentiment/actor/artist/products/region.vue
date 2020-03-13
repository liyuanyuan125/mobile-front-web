<template>
  <div class='main'>
      <div class='title'>用户地域分布对比</div>
      <div class='but'>
        <Button class='fans' :class="{'chgbgc': regionPk == 1}" type="primary" @click='chgregionPk(1)'>城市分布</Button>
        <Button class='chg' :class="{'chgbgc': regionPk == 2}" type="primary" @click='chgregionPk(2)'>省份分布</Button>
      </div>
      <Table :tableTitle='tableTitle' :tableItem='tableItem' />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import ViewBase from '@/util/ViewBase'
import { toast } from '@/util/toast'
import { Button } from 'vant'
import Table from '../components/table.vue'



@Component({
  components: {
    Button,
    Table
  }
})
export default class KolPage extends ViewBase {

  tableTitle: any = [
    {
      key: 'yiren',
      value: '艺人'
    },
    {
      key: 'top1',
      value: 'TOP1'
    },
    {
      key: 'top2',
      value: 'TOP2'
    },
    {
      key: 'top3',
      value: 'TOP3'
    },
    {
      key: 'top4',
      value: 'TOP4'
    },
    {
      key: 'top5',
      value: 'TOP5'
    },
  ]
  tableItem: any = [
    {
      actorName: '111',
      dataList: [
        {
          name: '微博123',
          value: '12%'
        },
        {
          name: '微博',
          value: '12%'
        },
        {
          name: '微博',
          value: '12%'
        },
        {
          name: '微博',
          value: '12%'
        },
        {
          name: '微博',
          value: '12%'
        },
      ]
    },
    {
      actorName: '222',
      dataList: [
        {
          name: '微博',
          value: '12%'
        },
        {
          name: '微博',
          value: '12%'
        },
        {
          name: '微博',
          value: '12%'
        },
        {
          name: '微博',
          value: '12%'
        },
        {
          name: '微博',
          value: '12%'
        },
      ]
    },
    {
      actorName: '333',
      dataList: [
        {
          name: '微博',
          value: '12%'
        },
        {
          name: '微博',
          value: '12%'
        },
        {
          name: '微博',
          value: '12%'
        },
        {
          name: '微博',
          value: '12%'
        },
        {
          name: '',
          value: ''
        }
      ]
    },
  ]

  regionPk: any = 1
  // 切换平台热度对比
  chgregionPk(num: any) {
    this.regionPk = num
    this.$emit('chgregionPk', num)
  }

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
.but {
  margin-top: 30px;
  margin-bottom: 40px;
}
/deep/ .van-button--primary {
  width: 180px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  color: #303030;
  border-radius: 30px;
  border: 2px solid rgba(235, 235, 235, 1);
  font-size: 26px;
}
.chg {
  margin-left: 20px;
}
.chgbgc {
  background: #88aaf6;
  color: #fff;
}
</style>
