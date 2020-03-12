/**
 * TwoBar 数据项
 */
export interface VerticalBarItem {
  /** 项名 */
  name: string

  /** 数值，若为百分比，则 41.8% 传 41.8 */
  value: number

  /**
   * 颜色值，任何符合 echarts 要求的颜色，推荐十六进制 web 颜色值，例如 #c808e8
   * 可选，若指定，则使用该值，否则使用默认的属性 color
   */
  color?: string

  /**
   * 高亮的颜色值，同 color，可选，若指定，则使用该值，否则使用默认的属性 hiColor
   */
  hiColor?: string
}
