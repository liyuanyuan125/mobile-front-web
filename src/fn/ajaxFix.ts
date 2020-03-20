/**
 * 该组件用来纠正 ajax.ts 中，非 0 code 不
 * @author zhangpeng
 */
import event from './event'
import {
  get as ajaxGet,
  post as ajaxPost,
  put as ajaxPut,
  del as ajaxDel
} from './ajax'
import { AjaxResult } from '@/util/types'

const methodList = {
  get: ajaxGet,
  post: ajaxPost,
  put: ajaxPut,
  del: ajaxDel
}

const emit = (data: any) => {
  // 延迟发出 event，以便可以被阻止
  data.handled = false
  setTimeout(() => data.handled || event.emit(`ajax${data.code}`, data))
  return data
}

const request = async (
  method: 'get' | 'post' | 'put' | 'del',
  url: string,
  data: object = {},
  options: object = {}
): Promise<AjaxResult> => {
  const res = await methodList[method](url, data, options)
  if (res.code == 0) {
    return res
  }
  throw emit(res)
}

export function get(url: string, data: object = {}, options: object = {}) {
  return request('get', url, data, options)
}

export async function post(url: string, data: object = {}, options: object = {}) {
  return request('post', url, data, options)
}

export async function put(url: string, data: object = {}, options: object = {}) {
  return request('put', url, data, options)
}

export async function del(url: string, data: object = {}, options: object = {}) {
  return request('del', url, data, options)
}
