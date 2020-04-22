import { Dialog } from 'vant'
import router from '../router'

/**
 * 显示错误信息
 * @param message 错误信息
 */
export function showError(message: string) {
  Dialog.alert({ title: '出错了', message })
}

/**
 * 显示警告信息
 * @param message 警告信息
 */
export function showWarning(message: string) {
  Dialog.alert({ title: '提示', message })
}

/**
 * 将错误格式化成字符串
 * @param ex 错误对象
 */
export function formatError(ex: any = {}) {
  const msg = ex.code || ex.msg ? `${ex.code} ${ex.msg}` : String(ex)
  return msg
}

/**
 * 统一处理 ajax catch 异常
 * @param ex 错误对象
 */
export function handleError(ex: any = {}) {
  if (ex) {
    const msg = formatError(ex)
    showError(msg)
    // tslint:disable-next-line
    console.error(msg)
  }
}

/**
 * 统一处理 ajax catch 异常，不再 alert，只 log
 * @param ex 错误对象
 */
export function logError(ex: any = {}) {
  if (ex) {
    const msg = formatError(ex)
    // tslint:disable-next-line
    console.error(msg)
  }
}

/**
 * 显示错误页面
 * @param code 错误码
 */
export function gotoErrorPage(code = 404) {
  router.replace({
    name: 'error',
    params: { code: String(code) }
  })
}

const prefectResult = (ex: any = null) => {
  const { code = 0, data = null, msg = '' } = ex || {}
  return {
    code: code as number,
    data,
    msg: msg as string
  }
}

/**
 * 处理模块错误，返回格式化后的结果
 * @param ex 异常
 */
export function handleModuleError(ex: any = null) {
  logError(ex)
  const result = prefectResult(ex)
  return result
}

const gotoCodeList = [
  // 无权限
  403,
  10403,
  // 不存在
  404,
  10404,
  // 已禁用
  10405,
]

/**
 * 处理页面错误，返回格式化后的结果
 * @param ex 异常
 */
export function handlePageError(ex: any = null) {
  logError(ex)
  const result = prefectResult(ex)
  const code = result.code
  if (gotoCodeList.includes(code)) {
    gotoErrorPage(code)
  }
  return result
}
