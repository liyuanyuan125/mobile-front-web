import Mock from 'mockjs2'
import queryString from 'query-string'

const builder = (data, code = 200, msg = '') => {
  const resp = {
    code: code == 200 ? 0 : code,
    data,
    msg,
    _status: 200,
  }
  return resp
}

const mockRequest = (method, regexpOrString, api = null) => {
  const regexp = typeof regexpOrString === 'string'
    ? new RegExp(`${regexpOrString}[^/]*$`, 'i')
    : regexpOrString
  Mock.mock(regexp, method, options => {
    const params = method == 'get'
      ? (() => {
        // TODO: 通过 parseUrl 取出的值，都是字符串类型
        const { query } = queryString.parseUrl(options.url)
        delete query._
        return query
      })()
      : JSON.parse(options.body || '{}')
    try {
      const result = api ? api(params || {}) : {}
      return builder(result || {})
    } catch (ex) {
      if (ex.code) {
        return builder(ex.data || {}, ex.code, ex.msg || '')
      } else {
        console.error(ex)
        return builder({}, 500)
      }
    }
  })
}

export const mockGet = mockRequest.bind(null, 'get')

export const mockPost = mockRequest.bind(null, 'post')

export const mockPut = mockRequest.bind(null, 'put')

export const mockDel = mockRequest.bind(null, 'delete')
