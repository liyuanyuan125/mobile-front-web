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
 * 获取电影详情页
 * @param query  object
 */
export async function getMovieDetailById(movieId: string) {
    const res = await get('/yuqing/movie/detail', { movieId })
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
 * 获取电影详情页 - 获取想看趋势
 * https://yapi.aiads-dev.com/project/400/interface/api/10958
 * @param query  object
 */
export async function getMovieWantSee(query: any) {
    const res = await get('/yuqing/movie/wantsee', query)
    return res
}

/**
 * 获取电影详情页 - 获取竞品分析
 */
export async function getRivalListById(movieId: string) {
    const res = await get('/yuqing/movie/rivalAnalysis', { movieId })
    return res
}

/**
 * 获取电影详情页 - 获取营销事件
 */
export async function getEventListByIdAndType(query: EventItem) {
    const res = await get('/yuqing/common/eventAnalysis', query)
    return res
}

/**
 * 获取竞品报告详情页
 */
export async function getMovieRivalList(movieIdList: string) {
    const res = await get('/yuqing/movie/rivalreport', { movieIdList })
    return res
}

/**
 * 竞品报告详情页 - 口碑评论对比
 */
export async function getRivalPraise(query: PraiseItem) {
    const res = await get('/yuqing/movie/getRivalPraise', query)
    return res
}

/**
 * 竞品报告详情页 - 获取想看趋势
 */
export async function getRivalWantSeeTrend(query: PraiseItem) {
    const res = await get('/yuqing/movie/getRivalWantSee', query)
    return res
}

/**
 * 竞品报告详情页 - 平台指数趋势
 */
export async function getRivalPlatformTrend(query: PraiseItem) {
    const res = await get('/yuqing/movie/getRivalExponent', query)
    return res
}

/**
 * 获取用户分析
 */
export async function getUserAnalysisById(movieId: string) {
    const res = await get('/yuqing/movie/useranalysis', { movieId })
    return res
}



