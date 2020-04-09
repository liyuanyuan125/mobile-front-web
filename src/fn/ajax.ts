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
import { random } from '@/fn/string'
import signa from '@/fn/signature'


const ajaxBaseUrl = VAR.ajaxBaseUrl

const isAbsoluteUrl = (url: string) => /^[a-z][a-z0-9+.-]*:/.test(url)
const ua = navigator.userAgent
const isApp = ua.indexOf('JYDataCinema') > -1 || ua.indexOf('JYDataAdvertiser') > -1

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

// 从APP获取签名
const xhr = async (options: any) => {
  // 为防止接口并发时，传递了相同的callbackName,
  // 将 callbackName 改为动态，'getApiSignature' + 随机数 + 'CallBack'
  const callName = random('getApiSignature', 'CallBack')
  // 处理一下发送的数据 最终发给app的是 string
  const data = options.method === 'post' ? options.data : qs.stringify(options.params)
  const obj = {
    params: {
      apiUrl: options.baseURL + options.url,
      httpMethod: options.method,
      params: data,
      platform: 'h5'
    },
    callBackName: 'getApiSignature' + callName + 'CallBack'
  }
  const result: any = await getApiSignature(obj)
  const resultJSON = JSON.parse(result)
  return {
    'X-PS-Platform': 'h5',
    'X-PS-SendTS': resultJSON.data.timeStamp,
    'X-PS-Check': resultJSON.data.checkValue,
    'X-PS-CID': random('h5'),
    'X-PS-PackageName': 'com.jydata.monitor.advertiser'
  }
}



const request = async (url: string, opts: object) => {
  const isAbs = isAbsoluteUrl(url)
  const config: any = {
    // baseURL: isAbs ? '' : ajaxBaseUrl,
    baseURL: url.indexOf('mock') > -1 ? 'https://yapi.aiads-dev.com' : '//api.aiads-dev.com',
    url,
    withCredentials: true,
    ...opts,
  }
  let finalConfig = config
  let lastHeader = config.headers
  // 获取签名 在APP时，由APP生成签名 在非APP里，则用JS生成签名
  if (isApp) {
    const signature = await xhr(config)
    lastHeader = Object.assign({}, config.headers, signature)
  } else {
    const xhrClient = signa(config)
    lastHeader = Object.assign({}, config.headers, xhrClient)
  }
  finalConfig = Object.assign({}, config, { headers: lastHeader })

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
