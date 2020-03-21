/**
 * 主创人员
 */
export interface ActorItem {
    /**
     * 演员 ID
     */
    actorId: string
    /**
     * 演员名称
     */
    actorName: string,
    /**
     * 演员封面图
     * source=jydata||piaoshen
     */
    actorCover: {
        source: string,
        url: string
    },
    character: string

}

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
