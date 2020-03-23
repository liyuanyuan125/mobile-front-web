import { get, post, put, del } from '@/fn/ajax'

/**
 * 品牌 - 平台二级页
 * @param query  object
 */
export async function brandPlatList(query: any) {
  const res = await get('/yuqing/brand/getPlaformHeat', query)
  return res
}

/**
 * 艺人 - 平台二级页
 * @param query  object
 */
export async function actorPlatList(query: any) {
  const res = await get('/yuqing/actor/actor/getPlaformHeat', query)
  return res
}

/**
 * 音乐 - 平台二级页
 * @param query  object
 */
export async function songPlatList(query: any) {
  const res = await get('/yuqing/song/platform/heat', query)
  return res
}

/**
 * 电视剧 - 平台二级页
 * @param query  object
 */
export async function tvPlatList(query: any) {
  const res = await get('/yuqing/tv/getPlaformHeat', query)
  return res
}

/**
 * 电影 - 平台二级页
 * @param query  object
 */
export async function moviePlatList(query: any) {
  const res = await get('/yuqing/movie/getPlaformHeat', query)
  return res
}

/**
 * 全网事件 - 平台二级页
 * @param query  object
 */
export async function eventPlatList(query: any) {
  const res = await get('/yuqing/event/network/event/getPlatform', query)
  return res
}

/**
 * 营销事件 - 平台二级页
 * @param query  object
 */
export async function marketPlatList(query: any) {
  const res = await get('/yuqing/market_event/market_event/platformList', query)
  return res
}













