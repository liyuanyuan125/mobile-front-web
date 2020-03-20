import { get, post, put, del } from '@/fn/ajax'


/**
 * 艺人详情页
 * @param query  object
 */
export async function getActorDetail(query: any) {
  const res = await get('http://yapi.aiads-dev.com/mock/406/yuqing/actor/detail', query)
  return res
}

/**
 * 艺人详情页 - 获取热度分析数据
 * @param query  object
 */
export async function getList(query: any) {
  const res = await get('/yuqing/actor/people/heatAnalysis', query)
  return res
}

/**
 * 艺人详情页 - 获取竞争对手
 * @param query  object
 */
export async function getPkUser(query: any) {
  const res = await get('http://yapi.aiads-dev.com/mock/406/yuqing/actor/people/rivalAnalysis', query)
  return res
}



// 用户分析二级页面

export async function getPeople(query: any) {
  const res = await get('http://yapi.aiads-dev.com/mock/406/yuqing/actor/people/userAnalysis', query)
  return res
}

