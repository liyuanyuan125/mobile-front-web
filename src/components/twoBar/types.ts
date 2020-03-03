/**
 * TwoBar 数据项
 */
export interface TwoBarItem {
  /** 项名 */
  name: string
  /** 百分比，41.8% 传 41.8 */
  rate: number
  /** 颜色值，任何符合 echarts 要求的颜色，推荐十六进制 web 颜色值，例如 #c808e8 */
  color: string
}
