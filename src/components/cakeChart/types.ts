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
  sesnsitivity?: string
}
