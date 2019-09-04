/// 与 app 交互的所有方法集中放在这里
import { registerHandler, callNative } from './bridge'
import md5 from 'md5'
import { devLog, devInfo } from './dev'

// 参数加密秘钥，仅用于 dev 环境
const apiSecretKey = '123456789'

const sortValByKey = (obj: any) => Object.keys(obj).sort().map(it => obj[it])

// dev 环境参数加密的模拟实现，根据实际情况进行修改
const devAuthParam = (param: any) => {
  const data = param || {}
  data.user_id = 6
  const vals = sortValByKey(data)
  const token = md5(vals.join('|') + '|' + apiSecretKey)
  data.token = token
  return data
}

/**
 * 对参数进行加密
 * @param param 参数
 */
export async function authParam(param: any) {
  if (VAR.env == 'dev') {
    return devAuthParam(param)
  }
  devInfo(`--**-- call authParam with param: ${JSON.stringify(param)} --**-- `)
  const data = await callNative('authParam', param)
  devInfo(`--**-- receive data from autoParam: ${JSON.stringify(data)} --**-- `)
}

/**
 * 测试调用 native 功能
 * @param name 名字
 */
export async function sayHi(name: string) {
  const data = await callNative('sayHi', name)
  devInfo(`[sayHi] native return data:`, data)
  return data
}

/**
 * 测试注册函数
 */
export function registerCallMeInJs() {
  registerHandler('callMeInJs', param => {
    devInfo(`[callMeInJs] param:`, param)
    return 'U are right'
  })
}

/**
 * 上传图片
 * @param  obj app需要的内部参数
 */
export async function handleUploadImage(obj: any) {
  const data = await callNative('handleUploadImage', obj)
  devInfo(`[sayHi] native return data:`, data)
  return data
}

/**
 * 获取 api 校验签名
 * @param  obj app需要的内部参数
 */
export async function getApiSignature(obj: any) {
  // devInfo(`getApiSignature`, obj)
  const data = await callNative('getApiSignature', obj)
  devInfo(`[sayHi] native return data:`, data)
  return data
}
/**
 * 返回上一页或关闭webview
 * @param  obj app需要的内部参数
 */
export async function handleGoBack(obj: any) {
  const data = await callNative('handleGoBack', obj)
  devInfo(`[sayHi] native return data:`, data)
  return data
}

/**
 * 设置原生导航栏
 * @param  obj app需要的内部参数
 */
export async function setNavBarStatus(obj: any) {
  const data = await callNative('setNavBarStatus', obj)
  devInfo(`[sayHi] native return data:`, data)
  return data
}

/**
 * 打开h5指定页面
 * @param  obj app需要的内部参数
 */
export async function openAppLinkClient(obj: any) {
  const data = await callNative('openAppLinkClient', obj)
  devInfo(`[sayHi] native return data:`, data)
  return data
}

