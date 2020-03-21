import { get, post, put, del } from '@/fn/ajaxFix'

/**
 * 获取单曲信息
 * @param id 单曲 id
 */
export function getDetail(id: number) {
  return get('/yuqing/song/detail', { songId: id })
}
