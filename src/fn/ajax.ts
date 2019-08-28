/**
 * 所有的 ajax 请求，都要使用该组件进行
 * @author zhangpeng
 */

import axios from 'axios'
import event from './event'
import qs from 'querystring'
import tryParseJson from '@/fn/tryParseJson'
import { AjaxResult } from '@/util/types'
import { getApiSignature } from '@/util/native'


const ajaxBaseUrl = VAR.ajaxBaseUrl

const isAbsoluteUrl = (url: string) => /^[a-z][a-z0-9+.-]*:/.test(url)
const ua = navigator.userAgent
const isApp = ua.indexOf('JYDataCinema') > -1

const emit = (data: any) => {
  // 延迟发出 event，以便可以被阻止
  data.handled = false
  setTimeout(() => data.handled || event.emit(`ajax${data.code}`, data))
  return data
}

// 确保最终的数据，始终有值
const perfectData = ({ code, data, msg }: any = {}) => {
  return {
    code,
    data: data || {},
    msg: msg || '',
  } as AjaxResult
}

// 生成随机32位的字符串
const createRandom32 = () => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// 获取签名
const xhr = async (options: any) => {
  // 为防止接口并发时，传递了相同的callbackName,
  // 将 callbackName 改为动态，'getApiSignature' + 接口名（去除下划线） + 'CallBack'
  const urlArr = options.url.split('/')
  const callName = urlArr[urlArr.length - 1].replace(/_/g, '').replace(/-/g, '')
  const obj = {
    params: {
      apiUrl: options.baseURL,
      httpMethod: options.method,
      params: options.params,
      platform: 'h5'
    },
    apiName: 'getApiSignature',
    callBackName: 'getApiSignature' + callName + 'CallBack'
  }
  const result: any = await getApiSignature(obj)
  const resultJSON = JSON.parse(result)
  return {
    'X-PS-Platform': 'h5',
    'X-PS-SendTS': resultJSON.data.timeStamp,
    'X-PS-Check': resultJSON.data.checkValue,
    'X-PS-CID': createRandom32(),
  }
}

const request = async (url: string, opts: object) => {
  const isAbs = isAbsoluteUrl(url)

  const config = {
    baseURL: isAbs ? '' : ajaxBaseUrl,
    // baseURL: 'http://192.168.6.186:8039',
    url,
    withCredentials: true,
    ...opts,
  }
  let finalConfig = config
  // 处理一下非 app 报错的问题 临时
  if (isApp) {
    // 签名
    const signature = await xhr(config)
    finalConfig = Object.assign({}, config, signature)
  }

  let res: any
  try {
    res = await axios(finalConfig)
  } catch (ex) {
    if (ex && ex.response) {
      const { status, data: html } = ex.response
      const error: any = { code: status, data: { html }, msg: 'HTTP 错误' }
      // 对 500 进一步处理
      if (status == 500) {
        res = {
          data: tryParseJson(html, error)
        }
      } else {
        throw emit(error)
      }
    } else {
      // TODO: 加上超时自动重新请求逻辑
      const msg = ex && ex.message || '未知错误'
      const isTimeout = /timeout/.test(msg)
      throw emit({ code: isTimeout ? 880 : 810, data: { ex }, msg })
    }
  }

  const { data } = res
  if (data && data.code !== undefined) {
    const result = perfectData(data)
    // if (result.code == 0) {
    return result
    // } else {
    //   throw emit(result)
    // }
  } else {
    throw emit({ code: 800, data: { raw: data }, msg: '数据格式错误' })
  }
}

export async function get(url: string, data: object = {}, opts: object = {}) {
  return request(url, {
    method: 'get',
    params: {
      ...data,
      _: Date.now(),
    },
    ...opts,
  })
}

export async function post(url: string, data: object = {}, opts: object = {}) {
  return request(url, {
    method: 'post',
    data: qs.stringify({ ...data }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...opts,
  })
}

export async function put(url: string, data: object = {}, opts: object = {}) {
  return request(url, {
    method: 'put',
    data,
    ...opts,
  })
}

export async function del(url: string, data: object = {}, opts: object = {}) {
  return request(url, {
    method: 'delete',
    data,
    ...opts,
  })
}
