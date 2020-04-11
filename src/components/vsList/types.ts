/**
 * VsList 数据项
 */
export interface VsItem {
  /** 项名 */
  name: string

  /** 对比项的百分比 1，58.8% 传 58.8 */
  rate1: number | null

  /** 对比项的百分比 1，58.8% 传 58.8 */
  rate2: number | null
}
