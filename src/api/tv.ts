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
 * https://yapi.aiads-dev.com/project/402/interface/api/10858
 * @param query  object
 */
export async function getTVDetailById(tvId: string) {
    const res = await get('/yuqing/tv/detail', { tvId })
    return res
}

/**
 * 获取电视剧详情页 - 获取热度分析
 * https://yapi.aiads-dev.com/project/402/interface/api/11178
 * @param query  object
 */
export async function getTVHeatAnalysis(query: any) {
    const res = await get('/yuqing/tv/heatAnalysis', query)
    return res
}

/**
 * 获取电视剧详情页 - 播放量监控
 * @param query  object
 */
export async function getTVPlayCount(query: any) {
    const res = await get('/yuqing/tv/getPlayCount', query)
    return res
}

/**
 * 获取电视剧详情页 - 竞品分析
 */
export async function getRivalListById(tvId: string) {
    const res = await get('/yuqing/tv/rivalAnalysis', { tvId })
    return res
}

/**
 * 获取电视剧详情页 - 营销事件
 */
export async function getEventListByIdAndType(query: EventItem) {
    const res = await get('/yuqing/common/eventAnalysis', query)
    return res
}

/**
 * 获取竞品报告详情页
 */
export async function getRivalReport(tvIdList: string) {
    const res = await get('/mock/402/yuqing/tv/rivalreport', { tvIdList })
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
 * 竞品报告详情页 - 获取指数趋势
 */
export async function getRivalPlatformTrend(query: PraiseItem) {
    const res = await get('/mock/402/yuqing/tv/getRivalExponent', query)
    return res
}

/**
 * 获取用户分析
 */
export async function getUserAnalysisById(tvId: string) {
    const res = await get('/yuqing/tv/getUserAnalysis', { tvId })
    return res
}



