export interface PublicPraise {
  /**
   * 评论数组
   */
  raisePercent: RaisePercent[]
  /**
   * 全网热词
   */
  hotWordList: string[]
  /**
   * 负面热词
   */
  badWordList: string[]
}

export interface RaisePercent {
  /**
   * 评价百分比
   */
  raisePercent: number
  /**
   * 评价名称
   */
  raiseName: string
}
