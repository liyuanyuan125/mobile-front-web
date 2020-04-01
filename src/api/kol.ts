import { get, post, put, del } from '@/fn/ajaxFix'


/**
 * 艺人详情页
 * @param query  object
 */
export async function getActorDetail(query: any) {
  const res = await get('/yuqing/actor/detail', query)
  // const res = await get('http://yapi.aiads-dev.com/mock/406/yuqing/actor/detail', query)
  return res
}

/**
 * 艺人详情页 - 获取热度分析数据
 * @param query  object
 */
export async function getList(query: any) {
  const res = await get('/yuqing/actor/people/heatAnalysis', query)
  // const res = await get('http://yapi.aiads-dev.com/mock/406/yuqing/actor/people/heatAnalysis', query)

  return res
}

/**
 * 艺人详情页 - 获取事件跟踪分析数据
 * @param query  object
 */
export async function getEventList(query: any) {
  const res = await get('/yuqing/common/eventAnalysis', query)
  return res
}

/**
 * 艺人详情页 - 获取竞争对手
 * @param query  object
 */
export async function getPkUser(query: any) {
  const res = await get('https://yapi.aiads-dev.com/mock/406/yuqing/actor/people/rivalAnalysis', query)
  // const res = await get('http://yapi.aiads-dev.com/mock/406/yuqing/actor/people/rivalAnalysis', query)

  return res
}



// 用户分析二级页面

export async function getPeople(query: any) {
  const res = await get('/yuqing/actor/people/userAnalysis', query)
  // const res = await get('http://yapi.aiads-dev.com/mock/406/yuqing/actor/people/userAnalysis', query)
  return res
}


/**
 * 艺人竞品分析对比 - 详情页
 * @param query  object
 */
export async function rivalanaly(query: any) {
  const res = await get('/yuqing/actor/people/rivalanaly', query)

  return res
}


/**
 * 艺人竞品分析对比 - 获取热度分析数据
 * @param query  object
 */
export async function rivalHeatAnalysis(query: any) {
  const res = await get('/yuqing/actor/actor/rivalHeatAnalysis', query)
  // const res = await get('http://yapi.aiads-dev.com/mock/406/yuqing/actor/actor/rivalHeatAnalysis', query)

  return res
}

/**
 * 艺人竞品分析对比 - 获取口碑评论数据
 * @param query  object
 */
export async function rivalPraise(query: any) {
  const res = await get('/yuqing/actor/actor/rivalPraise', query)
  // const res = await get('http://yapi.aiads-dev.com/mock/406/yuqing/actor/actor/rivalHeatAnalysis', query)

  return res
}







