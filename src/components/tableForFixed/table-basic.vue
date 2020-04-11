<template>
  <div class="table-wrap">
    <table
      class="the-table"
      :class="{
        'table-border': showBorder
      }"
    >
      <thead>
        <th
          v-for="column in finalColumns"
          :key="column.name"
          :class="alignCls(column)"
          :style="{ width: column.width + 'em' }"
          v-html="column.title"
        ></th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td
            v-for="col in finalColumns"
            :key="col.name"
            :class="alignCls(col)"
            :style="{ width: col.width + 'em' }"
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

  @Prop({ default: false }) fixed!: string | boolean

  prefixCls: string = 'jydata-table'

  get finalColumns() {
    const result = this.columns.map(item => ({
      title: '',
      align: 'center',
      html: false,
      ...item,
      width: typeof item.width == 'number' ? `${item.width}px` : (item.width || 'auto'),
      className: `col-${item.name} col-align-${item.align || 'center'}`,
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
  }

  .col-align-center {
    text-align: center;
  }

  .col-align-right {
    text-align: right;
    padding-right: 30px;
  }

  tr {
    &:nth-child(2n) {
      background-color: #f2f3f6;
    }
  }

  th,
  td {
    padding: 28px 4px;
    line-height: 1.3;
  }

  th {
    font-size: 24px;
    font-weight: 400;
    background-color: #f2f3f6;
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
  visibility: hidden;
}
</style>
