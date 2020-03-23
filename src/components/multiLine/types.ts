import { MapType } from '@/util/types'

export interface NameValue {
  name: string
  value: number
}

/**
 * 数据项
 */
export interface MultiLineItem {
  /** 数据系列名 */
  name: string

  /** 数据列表，若为百分比，则 41.8% 传 41.8 */
  data: number[]

  /**
   * 颜色值，任何符合 echarts 要求的颜色，推荐十六进制 web 颜色值，例如 #c808e8
   * 可选，若指定，则使用该值，否则使用默认的属性 color
   */
  color?: string
}

export interface MultiLineTooltipFormatTitleParam {
  list: any[]
}

export type MultiLineTooltipFormatTitle = (param: MultiLineTooltipFormatTitleParam) => string

export interface IdName {
  id: string
  name: string
}

export interface MultiLineEvent extends IdName {
  click?: (param: IdName) => any
}

export type MultiLineEvents = MapType<MultiLineEvent>
