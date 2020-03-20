/**
 * 竞争对手
 */
export interface RivalItem {
    /**
     * 对手名称
     */
    rivalName: string,
    /**
     * 对手Id
     */
    rivalId: string,
    /**
     * 对手图片
     */
    coverUrl: any,
}

/**
 * 业务详情
 */
export interface DetailItem {
    /**
     * 只有电影和电视剧有演职人员
     */
    type: 'movie' | 'tv' | 'song' | 'album' | 'actor' | 'brand',
    /**
     *
     */
    // id: string
}

