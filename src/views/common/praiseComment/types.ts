/**
 * 业务详情
 */
export interface DetailItem {
    /**
     * 只有电影和电视剧有演职人员
     */
    type: 'movie' | 'tv' | 'brand' | 'actor' | 'song' | 'album',
    /**
     * 业务 id
     */
    id: string
    /**
     * 开始时间
     */
    startTime?: string
    /**
     * 结束时间
     */
    endTime?: string
}
