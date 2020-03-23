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
 * 品牌详情页 - 事件分析数据
 * @param query  object
 */
export async function eventAnalysisList(query: any) {
  const res = await get('/yuqing/common/eventAnalysis', query)
  return res
}

/**
 * 品牌详情页 - 竞品分析
 * @param query  object
 */
export async function brandAnalysisList(query: any) {
  const res = await get('/yuqing/brand/rivalAnalysis', query)
  return res
}






/**
 * 竞品分析报告详情-获取热度分析
 * @param query  object
 */
export async function rivalHeatAnalysis(query: any) {
  const res = await get('/yuqing/brand/rivalHeatAnalysis', query)
  return res
}
