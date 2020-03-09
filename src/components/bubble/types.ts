/**
 * Bubble 数据项
 */
export interface BubbleItem {
  /** 气泡名称 */
  name: string
  /** 气泡数值 */
  value: number
}

/**
 * Bubble Bottom 数据项
 */
export interface BubbleBottomItem {
  /** 气泡id，对应四个气泡 */
  type: string
  /** 气泡名称 */
  title: string
  /** 气泡数值 */
  value: string | number
  /** 数值升降 */
  trend?: string | number
  /** 是否展示下降 */
  showdown?: boolean
  styles?: string
  rotate?: boolean
  width?: string
  big?: boolean
}
