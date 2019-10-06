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
 * 校验验证码
 * @param query  object
 */
export async function verifySmsCode(query: any) {
    const res = await post('/customer/accounts/verify_sms_code', query)
    return res
}

/**
 * 找回密码时重新设置密码
 * @param query  object
 */
export async function modifyPassWord(query: any) {
    const res = await post('/customer/accounts/change_password', query)
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

