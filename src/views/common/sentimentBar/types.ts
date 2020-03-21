/**
 * 舆情顶部工具条数据
 */
export interface SentimentBarItem {

    /**
     * 是否显示关注
     */
    diggType?: 'movie' | 'brand' | 'actor' | 'song' | 'album' | 'tv'
    diggId?: string

    /**
     * 是否显示 pk 有值就会显示 pk
     */
    rivalIds?: any

}
