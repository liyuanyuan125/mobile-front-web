/**
 * 表格列
 */
export interface TableColumn {
  /** 列名 */
  name: string
  /** 标题 */
  title?: string
  /** 对齐方式，默认 center */
  align?: 'left' | 'center' | 'right'
  /** 宽度，指定数字，则单位为 px，默认为 auto */
  width?: number | string
  /** 是否为 html 渲染模式 */
  html?: boolean
  /** 文字行控制 */
  lines?: 1 | 2 | 3
  /** fixed 位置 */
  fixed?: string
}
