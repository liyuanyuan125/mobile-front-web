import { get, post, put, del } from '@/fn/ajax'

/**
 * 品牌详情页
 * @param query  object
 */
export async function getList(query: any) {
  const res = await get('/yuqing/brand/detail', query)
  return res
}
