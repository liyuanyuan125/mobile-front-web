import { get, post, put, del } from '@/fn/ajaxFix'

/**
 * 营销事件详情
 * https://yapi.aiads-dev.com/project/410/interface/api/11023
 * @param query  object
 */
export async function eventDetail(query: any) {
  const res = await get('/yuqing/market_event/event/marketing/detail', query)
  return res
}
