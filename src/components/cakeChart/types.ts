/**
 * sexItem 数据项 男女比例
 */
export interface ObjData {
  /** 名称 */
  name: string
  /** 数值 */
  value: number
}
/**
 * AnnularItem 数据项
 */
export interface DataItem {
  /** 名称 */
  data: ObjData[]
  /** 数值 */
  color?: any[],
  /** 左上角标题 */
  title: string,
  /** 是否显示中间的文本 */
  emphasisShow: boolean,
   /** 敏感度 */
  sesnsitivity?: string,
   /** 是否显示标题  */
  titleShow?: boolean,
  /** padding */
  titleMargin?: any[]|number,
   /** 标题位置 left center right */
  titleLeft?: string,
   /** 标题字体大小 */
  titleSize?: number,
   /** 标题字体粗细 */
  titleWeight?: string,
   /** legend显示几位小数 */
  legendtoFixed?: number
}
