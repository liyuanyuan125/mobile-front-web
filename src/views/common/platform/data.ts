import { get, post, put, del } from '@/fn/ajax'

/**
 * 品牌平台热度 更多
 * @param query  object
 */
export async function brandPlatList(query: any) {
  const res = await get('/yuqing/brand/getPlaformHeat', query)
  return res
}
