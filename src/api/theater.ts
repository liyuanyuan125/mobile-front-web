import { get , post , put , del } from '@/fn/ajax'

// 获取验证码
export async function getCode(query: any) {
  const res = await post('/customer/accounts/register_get_sms_code' , query)
  return res
}

// 校验验证码
export async function verifyCode(query: any) {
  const res = await post('/customer/accounts/register_verify_sms_code' , query)
  return res
}

// 修改密码
export async function setPwd(query: any) {
  const res = await post('/account/set_password' , query)
  return res
}


