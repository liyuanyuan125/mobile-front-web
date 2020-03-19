import { get, post, put, del } from '@/fn/ajax'
/**
 * 品牌详情页
 * @param query  object
 */
export async function brandList(query: any) {
  const res = await get('/yuqing/brand/detail', query)
  return res
}
/**
 * 品牌详情页 - 获取热度分析数据
 * @param query  object
 */
export async function getList(query: any) {
  const res = await get('/yuqing/brand/heatAnalysis', query)
  return res
}

/**
 * 竞品分析报告详情-获取热度分析
 * @param query  object
 */
export async function ivalHeatAnalysis(query: any) {
  const res = await get('/yuqing/brand/rivalHeatAnalysis', query)
  return res
}
