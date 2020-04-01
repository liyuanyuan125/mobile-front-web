<template>
  <div class="multi-table">
    <div class="multi-tabs">
      <Button
        v-for="({ title }, index) in list"
        :key="index"
        :type="index == currentIndex ? 'primary' : 'default'"
        @click="currentIndex = index"
      >{{title}}</Button>
    </div>
    <div class="table-wrap">
      <Table
        :data="list[currentIndex].data"
        :columns="columns"
        :placeholder="placeholder"
        showBorder
        class="table"
        v-if="list[currentIndex]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Button } from 'vant'
import Table, { TableColumn } from '../table'
import { MultiTableItem } from './types'

@Component({
  components: {
    Button,
    Table
  }
})
export default class MultiTable extends Vue {
  @Prop({ type: Array, default: () => [] }) list!: MultiTableItem[]

  @Prop({ type: Array, default: () => [] }) columns!: TableColumn[]

  @Prop({ type: String, default: '--' }) placeholder!: string

  currentIndex = 0
}
</script>

<style lang="less" scoped>
.multi-tabs {
  /deep/ .van-button {
    height: 60px;
    padding: 0 25px;
    border-radius: 30px;
    margin: 0 20px 20px 0;
  }

  /deep/ .van-button--primary {
    border-color: #88aaf6;
    background-color: #88aaf6;
  }
}

.table-wrap {
  margin-top: 20px;
}

.table {
  border-radius: 10px;
}
</style>
