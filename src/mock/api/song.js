import { mockGet, mockPost, mockPut, mockDel } from '../util'

mockGet('/yuqing/song/detail', ({ songId }) => {
  // throw { code: 500, msg: '999' }
  return {
    userId: 4,
    songId,
    username: 'admin',
    token: 'f91d0a88-6fa8-42d8-8c41-9d46b77cf645',
    pages: [],
    perms: []
  }
})

