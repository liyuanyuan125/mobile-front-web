import { get, post, put, del } from '@/fn/ajax'

/**
 * 艺人详情页 - 获取热度分析数据
 * @param query  object
 */
export async function getList(query: any) {
  const res = await get('/yuqing/actor/people/heatAnalysis', query)
  return res
}
