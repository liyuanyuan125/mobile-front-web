export interface AgeRangeList {
  /**
   * 年龄区间
   */
  appraiseList: string
  rivalList: RivalList
}

export interface RivalList {
  /**
   * 品牌名称
   */
  rivalName: string,
  /**
   * 品牌比例
   */
  rivalPercent: number
}


