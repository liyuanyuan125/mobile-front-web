import { get, post, put, del } from '@/fn/ajaxFix'
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
 * 品牌 - 用户分析二级页
 * @param query  object
 */
export async function useranalysis(query: any) {
  const res = await get('/yuqing/brand/useranalysis', query)
  return res
}


/**
 * 竞品分析报告详情页
 * @param query  object
 */
export async function rivalreportDetail(query: any) {
  const res = await get('/yuqing/brand/rivalreport', query)
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

/**
 * 竞品分析报告详情-获取口碑评论对比
 * @param query  object
 */
export async function rivalPraise(query: any) {
  const res = await get('/yuqing/brand/rivalPraise', query)
  return res
}
