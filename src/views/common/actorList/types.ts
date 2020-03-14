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
