import { get, post, put, del } from '@/fn/ajax'

/**
 * 品牌详情页 - 获取热度分析数据
 * @param query  object
 */
export async function getList(query: any) {
  const res = await get('/yuqing/brand/heatAnalysis', query)
  return res
}
