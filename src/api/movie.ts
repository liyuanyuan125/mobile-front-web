import { get, post, put, del } from '@/fn/ajax'

export interface EventItem {
    type: string,
    objectId: string
}
/**
 * 获取电影详情页
 * @param query  object
 */
export async function getMovieDetailById(movieId: string) {
    const res = await get('/mock/400/yuqing/movie/detail', { movieId })
    return res
}

/**
 * 详情页获取竞品分析
 */
export async function getRivalListById(movieId: string) {
    const res = await get('/mock/400/yuqing/movie/rivalAnalysis', { movieId })
    return res
}

/**
 * 详情页获取营销事件
 */
export async function getEventListByIdAndType(query: EventItem) {
    const res = await get('/yuqing/common/eventAnalysis', query)
    return res
}

/**
 * 获取竞品报告
 */
export async function getMovieRivalList(movieIdList: string) {
    const res = await get('/mock/400/yuqing/movie/rivalreport', { movieIdList })
    return res
}

/**
 * 获取用户分析
 */
export async function getUserAnalysisById(movieId: string) {
    const res = await get('/mock/400/yuqing/movie/useranalysis', { movieId })
    return res
}



