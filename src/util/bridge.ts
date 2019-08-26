import { devError } from '@/util/dev'

const win = window as any

// iOS 要求必须为全局变量
const jsBridge = win.jsBridge = {} as any

const init = () => {
  const postMsg = win.webkit
    && win.webkit.messageHandlers
    && win.webkit.messageHandlers.nativeEventHandler
    && win.webkit.messageHandlers.nativeEventHandler.postMessage
  const androidMethods = win.jydata && typeof win.jydata === 'object'
    ? win.jydata
    : {}
  const isIOS = postMsg != null
  return { postMsg, isIOS, androidMethods }
}

type BridgeHandler = (param: any) => any

const makeCallback = (handler: BridgeHandler) => {
  return (res: string) => {
    const json = JSON.parse(res)
    // TODO: 进行其他一些公用操作
    const data = handler(json)
    // TODO: 返回值是否有意义？是否符合格式
    return JSON.stringify({ data })
  }
}

/**
 * 向 native 注册方法，供 native 调用
 * @param name 方法名，名字会被注册成全局函数，所以请注意不要与现有的函数重名
 * @param handler 调用函数
 */
export function registerHandler(name: string, handler: BridgeHandler) {
  if (name in win && !(name in jsBridge)) {
    devError(`window.${name} 已存在，请不要覆盖 window 现有属性`)
  }

  // 安卓的方案？TODO: android 不需要处理？？
  win[name] = handler
  // iOS 的方案
  jsBridge[name] = makeCallback(handler)
}

/**
 * 判断名为 name 的 handler 是否存在
 * @param name 方法名
 */
export function hasHandler(name: string) {
  return name in win && name in jsBridge
}

/**
 * 清除 native 注册的方法
 * @param name 方法名
 */
export function clearHandler(name: string) {
  delete win[name]
  delete jsBridge[name]
}

/**
 * 调用 native 方法
 * @param name native 方法名
 * @param data 传递给 native 方法的参数
 */
export async function callNative(name: string, data: any = {}) {
  return new Promise((resolve, reject) => {
    const { postMsg, isIOS, androidMethods } = init()
    // const token = Math.random().toString(36).slice(2) + Date.now()
    const callData: any = {
      callBackMethod: data.callBackName,
      data: data.params,
      methodName: data.apiName
    }
    const postJson = JSON.stringify(callData)
    const callbackName = data.callBackName

    // 自动注册回调
    registerHandler(callbackName, param => {
      clearHandler(callbackName)
      // success:只代表和App通信是否成功 0=成功，1=失败 data:代表业务码 0=成功（通用） 其他的业码根据业务自定
      const { success = 0, code = 0 } = param || {}
      // 特定的错误处理
      if (success !== 0) {
        return reject(new Error(`method ${name} is not exists`))
      }
      // TODO: 根据 success 判断是否成功？
      success === 0 ? resolve(param) : reject(param)
    })

    try {
      if (isIOS) {
        win.webkit.messageHandlers.nativeEventHandler.postMessage(postJson)
      } else {
        const method = androidMethods[name]
        if (method == null) {
          return reject(new Error(`method ${name} is not exists`))
        }
        // const postJson = JSON.stringify(callData)s
        method(postJson)
      }
    } catch (ex) {
      reject(ex)
    }
  })
}
