import { mockGet, mockPost, mockPut, mockDel } from '../../util'

mockGet('/demo/no/perm', () => {
  throw { code: 403 }
})
