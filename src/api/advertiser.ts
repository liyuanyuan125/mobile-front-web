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
    const res = await get('/xadvert/video/info', query)
    return res
}

/**
 * 取消广告片
 * @param query  object
 */
export async function cancelVideoDetail(query: any) {
    const res = await post('/xadvert/video/cancel', query)
    return res
}

/**
 * 删除广告片
 * @param query  object
 */
export async function delVideoDetail(query: any) {
    const res = await post('/xadvert/video/delete', query)
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
 *
 * 获取未登录的影院详情页
 * @param query  object
 */
export async function getCinemaDetail(query: any) {
    const res = await get('/cinema/detail', query)
    return res
}

/**
 * 获取登录后的影院详情页
 * @param query  object
 */
export async function getCinemaDetailLogined(query: any) {
    const res = await get('/cinema/loginDetail', query)
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

/**
 * 获取下载页的用户手机验证码
 * @param query  object
 */
export async function getDLSmsCode(query: any) {
    const res = await post('/xadvert/downloads/send_sms', query)
    return res
}

/**
 * 验证下载页用户手机验证码
 * @param query  object
 */
export async function checkDLSmsCode(query: any) {
    const res = await post('/xadvert/downloads/check_sms', query)
    return res
}

/**
 * 提交下载页用户手机验证三
 * @param query  object
 */
export async function submitDLSmsCode(query: any) {
    const res = await post('/xadvert/downloads/log', query)
    return res
}
