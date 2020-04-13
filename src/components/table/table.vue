<template>
  <div class="jydata-table-wrapper">
    <div :class="[prefixCls + '-normal']">
      <table-basic
        :data="data"
        :columns="normalizeColumns"
        :placeholder="placeholder"
        :showBorder="showBorder"
      ></table-basic>
    </div>
    <div :class="[prefixCls + '-fixed']" :style="fixedTableStyle" v-if="isLeftFixed">
      <table-basic
        fixed="left"
        :data="data"
        :columns="normalizeColumns"
        :placeholder="placeholder"
        :showBorder="showBorder"
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

  prefixCls: string = 'jydata-table'

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

  get fixedTableStyle() {
    const style: any = {}
    let width: number = 0
    this.normalizeColumns.forEach((col: TableColumn) => {
      if (col.fixed && col.fixed === 'left') {
        width += Number(col.width)
      }
    })
    style.width = `${width}em`
    return style
  }

  get htmlPlaceholder() {
    const html = `<span class="html-placeholder">${this.placeholder}</span>`
    return html
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
