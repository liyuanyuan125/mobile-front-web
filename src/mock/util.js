import Mock from 'mockjs2'
import urlParse from 'url-parse'

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
  Mock.mock(regexp, method, ({ type, url, body,  }) => {
    const { pathname, query } = urlParse(url, true)
    // TODO: 通过 urlParse 取出的 query 中的值，都是字符串类型
    delete query._
    const params = method == 'get' ? query : JSON.parse(body || '{}')
    console.log(
      `%c=> ${type} %c${pathname}`,
      `color: #ee0`,
      `color: #f0f`,
      params
    )
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
