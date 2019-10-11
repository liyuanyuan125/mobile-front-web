import { get, post, put, del } from '@/fn/ajax'

/**
 * 获取报告详情
 * @param query  object
 */
export async function getReportDetail(query: any) {
    const res = await get('/xadvert/plan/report', query)
    return res
}

/**
 * 获取广告片详情页
 * @param query  object
 */
export async function getVideoDetail(query: any) {
    const res = await get('/xadvert/videos/info', query)
    return res
}

/**
 * 获取电影详情页
 * @param query  object
 */
export async function getMovieDetail(query: any) {
    const res = await get('/movie/detail', query)
    return res
}

/**
 * 获取影院详情页
 * @param query  object
 */
export async function getCinemaDetail(query: any) {
    const res = await get('/cinema/detail', query)
    return res
}

/**
 * 填写基本资料 = 注册
 * @param query  object
 */
export async function submitApplicationInfo(query: any) {
    const res = await post('/customer/accounts/register', query)
    return res
}

