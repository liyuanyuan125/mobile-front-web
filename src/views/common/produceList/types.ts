/**
 * 业务详情
 */
export interface DetailItem {
    /**
     * 只有电影和电视剧有演职人员
     */
    type: 'movie' | 'tv',
    /**
     * movieId | tvId
     */
    id: string
}
