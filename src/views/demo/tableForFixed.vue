<template>
  <div class="table-page">
    <Table
      :data="basicData"
      :columns="basicColumns"
      :showBorder="true"
      class="rank-table"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Table, { TableColumn } from '@/components/table'

@Component({
  components: {
    Table
  }
})
export default class TableForFixedPage extends Vue {
  basicData: any = [
    {
      rivalName: '奔驰阿克苏极乐空间逢狼时刻大姐夫雷克萨建档立卡加上了可单机爱上了打开房间里抠唆劲',
      companyName: '汽车',
      releaseDate: 20200401,
      totalSaleCount: 123,
      totalInteractCount: 567,
      favorable: 'B+',
      musicCount: 2,
      musicPlayCount: 45,
      musicInteractCount: 12
    }, {
      rivalName: '奔驰',
      companyName: '汽车',
      releaseDate: 20200401,
      totalSaleCount: 123,
      totalInteractCount: 567,
      favorable: 'B+',
      musicCount: 2,
      musicPlayCount: 45,
      musicInteractCount: 12
    }, {
      rivalName: '奔驰',
      companyName: '汽车',
      releaseDate: 20200401,
      totalSaleCount: 123,
      totalInteractCount: 567,
      favorable: 'B+',
      musicCount: 2,
      musicPlayCount: 45,
      musicInteractCount: 12
    }, {
      rivalName: '奔驰',
      companyName: '汽车',
      releaseDate: 20200401,
      totalSaleCount: 123,
      totalInteractCount: 567,
      favorable: 'B+',
      musicCount: 2,
      musicPlayCount: 45,
      musicInteractCount: 12
    }
  ]

  get basicColumns() {
    const list: TableColumn[] = [
      { name: 'rivalName', title: '专辑名称', width: 8.5, align: 'left', lines: 2, fixed: 'left' },
      { name: 'releaseDate', title: '发行时间', width: 7 },
      { name: 'companyName', title: '唱片公司', width: 6 },
      { name: 'totalSaleCount', title: '累计销售量', width: 6 },
      { name: 'totalInteractCount', title: '累计互动量', width: 6 },
      { name: 'favorable', title: '好感度', width: 4 },
      { name: 'musicCount', title: '专辑内歌曲量', width: 7 },
      { name: 'musicPlayCount', title: '歌曲累计播放量', width: 8 },
      { name: 'musicInteractCount', title: '歌曲累计互动量', width: 8 }
    ]
    return list
  }
}
</script>

<style lang='less' scoped>
.table-page {
  padding: 20px;
  .content {
    margin: 18px 0 40px 0;
    p {
      &:first-child {
        font-size: 46px;
        font-weight: bold;
      }
      &:last-child {
        font-size: 26px;
        font-weight: 300;
        color: #303030;
      }
    }
  }
}
</style>
