import { get, post, put, del } from '@/fn/ajax'

/**
 * 营销事件详情
 * https://yapi.aiads-dev.com/project/410/interface/api/11023
 * @param query  object
 */
export async function eventDetail(query: any) {
  const res = await get('/mock/410/yuqing/market_event/event/marketing/detail', query)
  return res
}
