import { get, post, put, del } from '@/fn/ajax'

/**
 * 营销事件详情
 * @param query  object
 */
export async function eventDetail(query: any) {
  const res = await get('/yuqing/market_event/event/marketing/detail', query)
  return res
}
