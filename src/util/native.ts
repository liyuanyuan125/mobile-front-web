/// 与 app 交互的所有方法集中放在这里
import { registerHandler, callNative } from './bridge'
import md5 from 'md5'
import { devLog, devInfo } from './dev'
import qs from 'querystring'
import { objectClean } from '@jydata/fe-util'

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

/**
 * AppLink 对象，必须含有 page
 */
export interface AppLink {
  /** 页面地址 */
  page: string
  /** 其他查询参数 */
  [key: string]: any
}

/**
 * 格式化 appLink
 * @param link AppLink 对象
 */
export function formatAppLink(link: AppLink): string
/**
 * 格式化 appLink
 * @param page 页面地址
 * @param query 页面参数
 */
export function formatAppLink(page: string, query?: object): string
export function formatAppLink(p: string | AppLink, query: object = {}) {
  const param = typeof p === 'string'
    ? { p, ...query }
    : objectClean({ p: p.page, ...p, page: undefined }, [ undefined ])
  const link = qs.stringify(param)
  return link
}

/**
 * 打开 APP 指定页面
 * @param link AppLink 对象
 */
export async function openAppLink(link: AppLink): Promise<any>
/**
 * 打开 APP 指定页面
 * @param page 页面地址
 * @param query 页面参数
 */
export async function openAppLink(page: string, query?: object): Promise<any>
export async function openAppLink(p: string | AppLink, query: object = {}) {
  const link = formatAppLink(p as any, query)
  const params = {
    applinkData: 'jydataadvertiser://scheme?' + link,
    originUrl: location.href
  }
  const data = await openAppLinkClient({ params })
  return data
}

/**
 * 拨打电话
 * @param  obj app需要的内部参数
 */
export async function handleDialTel(obj: any) {
  const data = await callNative('handleDialTel', obj)
  devInfo(`[sayHi] native return data:`, data)
  return data
}

/**
 * 获取原生网络状态
 * @param  obj app需要的内部参数
 */
export async function getNativeNetStatus(obj: any) {
  const data = await callNative('getNativeNetStatus', obj)
  devInfo(`[sayHi] native return data:`, data)
  return data
}

/**
 * 显示原生分享框
 * @param  obj app需要的内部参数
 */
export async function showShare(obj: any) {
  const data = await callNative('showShare', obj)
  devInfo(`[sayHi] native return data:`, data)
  return data
}

/**
 * 显示原生视频播放器
 * @param  obj app需要的内部参数
 */
export async function showVideoPlayer(obj: any) {
  const data = await callNative('showVideoPlayer', obj)
  devInfo(`[sayHi] native return data:`, data)
  return data
}

/**
 * 显示原生图片浏览
 * @param  obj app需要的内部参数
 */
export async function showImageBrowser(obj: any) {
  const data = await callNative('showImageBrowser', obj)
  devInfo(`[sayHi] native return data:`, data)
  return data
}

/**
 * h5登录后通知APP
 * @param  obj app需要的内部参数
 */
export async function userHasLoginInH5(obj: any) {
  const data = await callNative('userHasLoginInH5', obj)
  devInfo(`[sayHi] native return data:`, data)
  return data
}

/**
 * 截图
 * @param  obj app需要的内部参数
 */
export async function startCaptureImage(obj: any) {
  const data = await callNative('startCaptureImage', obj)
  devInfo(`[sayHi] native return data:`, data)
  return data
}

