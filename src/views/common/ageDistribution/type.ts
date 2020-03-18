export interface AgeRangeList {
  /**
   * 年龄区间
   */
  appraiseList: string
  brandList: BrandList
}

export interface BrandList {
  /**
   * 品牌名称
   */
  brandName: string,
  /**
   * 品牌比例
   */
  brandPercent: number
}


