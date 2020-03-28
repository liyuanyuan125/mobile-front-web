import { get, post, put, del } from '@/fn/ajax'

// 营销事件
export interface EventItem {
    type: string,
    objectId: string
}
// 竞品对比-口碑对比
export interface PraiseItem {
    movieIdList: string,
    stratTime: string,
    endTime: string
}
/**
 * 获取电视剧详情页
 * @param query  object
 */
export async function getTVDetailById(tvId: string) {
    const res = await get('/mock/402/yuqing/tv/detail', { tvId })
    return res
}

/**
 * 获取电影详情页 - 获取热度分析
 * @param query  object
 */
export async function getMovieHeatAnalysis(query: any) {
    const res = await get('/yuqing/movie/heatAanlysis', query)
    return res
}

/**
 * 获取电影详情页 - 竞品分析
 */
export async function getRivalListById(tvId: string) {
    const res = await get('/mock/402/yuqing/tv/rivalAnalysis', { tvId })
    return res
}

/**
 * 获取电影详情页 - 营销事件
 */
export async function getEventListByIdAndType(query: EventItem) {
    const res = await get('/mock/416/yuqing/common/eventAnalysis', query)
    return res
}

/**
 * 获取竞品报告详情页
 */
export async function getMovieRivalList(movieIdList: string) {
    const res = await get('/mock/400/yuqing/movie/rivalreport', { movieIdList })
    return res
}

/**
 * 竞品报告详情页 - 口碑评论对比
 */
export async function getRivalPraise(query: PraiseItem) {
    const res = await get('/mock/400/yuqing/movie/getRivalPraise', query)
    return res
}

/**
 * 竞品报告详情页 - 获取想看趋势
 */
export async function getRivalWantSeeTrend(query: PraiseItem) {
    const res = await get('/mock/400/yuqing/movie/getRivalWantSee', query)
    return res
}

/**
 * 获取用户分析
 */
export async function getUserAnalysisById(movieId: string) {
    const res = await get('/mock/400/yuqing/movie/useranalysis', { movieId })
    return res
}



