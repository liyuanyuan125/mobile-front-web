<template>
  <div class="jydata-table-wrapper">
    <div :class="[prefixCls + '-normal']">
      <table-basic
        :data="data"
        :columns="normalizeColumns"
        :placeholder="placeholder"
        :showBorder="showBorder"
        ref="tableNormal"
      ></table-basic>
    </div>
    <div :class="[prefixCls + '-fixed']" :style="fixedTableStyle" v-if="isLeftFixed">
      <table-basic
        fixed="left"
        :data="data"
        :columns="normalizeColumns"
        :placeholder="placeholder"
        :showBorder="showBorder"
        ref="tableFixed"
      ></table-basic>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import TableBasic from './table-basic.vue'
import { TableColumn } from './types'

@Component({
  components: {
    TableBasic
  }
})
export default class Table extends Vue {
  @Prop({ type: Array, default: () => [] }) data!: any[]

  @Prop({ type: Array, default: () => [] }) columns!: TableColumn[]

  @Prop({ type: String, default: '-' }) placeholder!: string

  @Prop({ type: Boolean, default: false }) showBorder!: boolean

  prefixCls = 'jydata-table'

  get normalizeColumns() {
    const left: TableColumn[] = []
    const right: TableColumn[] = []
    this.columns.forEach((column: TableColumn) => {
      column.width = column.width ? column.width : ''
      if (column.fixed && column.fixed === 'left') {
        left.push(column)
      } else {
        right.push(column)
      }
    })
    return [...left, ...right]
  }

  get isLeftFixed() {
    return this.columns.some(col => col.fixed && col.fixed === 'left')
  }

  fixedTableStyle = {}

  // get fixedTableStyle() {
  //   const style: any = {}
  //   let width = 0
  //   this.normalizeColumns.forEach((col: TableColumn) => {
  //     if (col.fixed && col.fixed === 'left') {
  //       width += Number(col.width)
  //     }
  //   })
  //   style.width = `${width}em`
  //   return style
  // }

  /**
   * 更新 UI，当表格内的内容发生变化时，可调用该函数，维持固定列效果
   * 针对含有固定列的表格，非固定列表格不需要调用
   */
  public updateUI() {
    this.$nextTick(() => {
      const tableNormal = this.$refs.tableNormal as TableBasic
      const tableFixed = this.$refs.tableFixed as TableBasic
      if (tableNormal && tableFixed) {
        const width = tableNormal.getFixedLeftColumnsWidth()
        const style = { width: `${width}px` }
        this.fixedTableStyle = style
        tableFixed.syncFixedLeftColumnsWidth(tableNormal)
      }
    })
  }

  mounted() {
    this.updateUI()
  }
}
</script>

<style lang="less" scoped>
.jydata-table-wrapper {
  position: relative;
  overflow: hidden;
  font-size: 24px;
}

.jydata-table-fixed {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #fff;
  box-shadow: 8px 0 24px 0 rgba(0, 0, 0, .08);
  /deep/ .table-wrap {
    overflow-x: hidden;
  }
}

</style>
