import { get, post, put, del } from '@/fn/ajax'

/**
 * 获取验证码
 * @param query  object
 */
export async function getSmsCode(query: any) {
    const res = await post('/customer/accounts/get_sms_code', query)
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

/**
 * 自动登录&是否登录
 * @param query  object
 */
export async function autoLogin(query: any) {
    const res = await post('/customer/accounts/auto_login', query)
    return res
}

/**
 * 根据密文获取客户信息
 * @param query  object
 */
export async function getGuestInfo(query: any) {
    const res = await get('/customer/accounts/crm_c/', query)
    return res
}

