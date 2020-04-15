<template>
  <div class="table-wrap">
    <table
      class="the-table"
      :class="{
        'table-border': showBorder
      }"
      ref="table"
    >
      <thead>
        <th
          v-for="{ name, title, className, width } in normalizeColumns"
          :key="name"
          :class="className"
          :style="{ width }"
          v-html="title"
        ></th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td
            v-for="col in normalizeColumns"
            :key="col.name"
            :class="col.className"
            :style="{ width: col.width }"
          >
            <div
              class="cell-inner"
              :class="col.lineClass"
              v-html="item[col.name] || htmlPlaceholder"
              v-if="col.html"
            ></div>
            <div
              class="cell-inner"
              :class="col.lineClass"
              v-else
            >{{item[col.name] || placeholder}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { TableColumn } from './types'
import { getLineClass } from '@/util/lines'

@Component
export default class TableBasic extends Vue {
  @Prop({ type: Array, default: () => [] }) data!: any[]

  @Prop({ type: Array, default: () => [] }) columns!: TableColumn[]

  @Prop({ type: String, default: '-' }) placeholder!: string

  @Prop({ type: Boolean, default: false }) showBorder!: boolean

  @Prop({ type: [String, Boolean], default: false }) fixed!: string | boolean

  prefixCls = 'jydata-table'

  // 从另外一个 table 同步过来的宽度，用于被父组件 Table 组件调用
  syncWidthList: number[] = []

  get normalizeColumns() {
    const result = this.columns.map((item, index) => ({
      title: '',
      align: 'center',
      html: false,
      ...item,
      width: ((width, widthList) => {
        const syncWidth = widthList[index]
        return syncWidth > 0
          ? `${syncWidth}px`
          : typeof width == 'number'
          ? `${width}em`
          : (width || 'auto')
      })(item.width, this.syncWidthList),
      className: this.alignCls(item),
      lineClass: getLineClass(item.lines)
    }))
    return result
  }

  get htmlPlaceholder() {
    const html = `<span class="html-placeholder">${this.placeholder}</span>`
    return html
  }

  alignCls(column: TableColumn) {
    return [
      `col-${column.name}`,
      `col-align-${column.align || 'center'}`,
      {
        [`${this.prefixCls}-hidden`]:
          (this.fixed === 'left' && column.fixed !== 'left')
          || (!this.fixed && column.fixed && column.fixed === 'left')
      }
    ]
  }

  getHeadCells() {
    const table = this.$refs.table as HTMLTableElement
    // 由于 table 的特殊性，取 thead 中的 cells 的宽度，就能代表各列的列宽
    const cells = [ ...table.tHead!.children ] as HTMLElement[]
    return cells
  }

  /**
   * 获取所有固定左列的总宽度，用于被父组件 Table 组件调用
   */
  public getFixedLeftColumnsWidth() {
    const cells = this.getHeadCells()
    const totalWidth = this.columns.reduce((sum, col, i) => {
      if (col.fixed == 'left') {
        const width = cells[i].offsetWidth
        sum += width
      }
      return sum
    }, 0)
    return totalWidth
  }

  /**
   * 与另外一个 table 同步固定左列的宽度，用于被父组件 Table 组件调用
   */
  public syncFixedLeftColumnsWidth(refTable: TableBasic) {
    const cells = refTable.getHeadCells()
    this.columns.forEach((col, i) => {
      if (col.fixed == 'left') {
        const width = cells[i].offsetWidth
        this.$set(this.syncWidthList, i, width)
      }
    })
  }
}
</script>

<style lang="less" scoped>
.table-wrap {
  overflow-y: auto;
}

.the-table {
  width: 100%;
  table-layout: fixed;

  .col-align-left {
    text-align: left;
    padding-left: 30px;
    padding-right: 24px;
  }

  .col-align-center {
    text-align: center;
  }

  .col-align-right {
    text-align: right;
    padding-left: 24px;
    padding-right: 30px;
  }

  tr {
    &:nth-child(2n) {
      background-color: #f9f9fb;
    }
  }

  th,
  td {
    padding: 28px 8px;
    line-height: 1.3;
  }

  th {
    font-size: 24px;
    font-weight: 400;
    background-color: #f9f9fb;
  }

  td {
    font-size: 26px;
  }
}

.table-border {
  border-collapse: collapse;
  th, td {
    border: 1px solid #e8e8e8;
  }
}

.jydata-table-hidden {
  // visibility: hidden 真机中配合多行省略，会出现bug，会把省略的文字放开再隐藏，很尴尬，单行省略没问题，暂定使用opacity
  // visibility: hidden;
  opacity: 0;
}
</style>
