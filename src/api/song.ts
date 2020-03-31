import { get, post, put, del } from '@/fn/ajaxFix'

/**
 * 1.单曲详情页
 * https://yapi.aiads-dev.com/project/404/interface/api/10878
 * @param id 单曲 id
 */
export function getDetail(id: number) {
  return get('/yuqing/music/song/detail', { songId: id })
}

/**
 * 1.1单曲详情页-获取热度分析数据
 * https://yapi.aiads-dev.com/project/404/interface/api/11173
 * @param query 查询
 */
export function getHotAnalysis(query: any) {
  return get('/yuqing/music/song/heat/analysis', query)
}

/**
 * 1.2单曲详情页-获取竞品对手
 * https://yapi.aiads-dev.com/project/404/interface/api/11228
 * @param query 查询
 */
export function getSimilarList(query: any) {
  return get('/yuqing/music/song/rival/list', query)
}

/**
 * 1.3单曲详情页-获取播放量分析
 * https://yapi.aiads-dev.com/project/404/interface/api/11283
 * @param query 查询
 */
export function getPlayAnalysis(query: any) {
  return get('/yuqing/music/song/play/analysis', query)
}

/**
 * 2.5单曲用户分析二级页
 * https://yapi.aiads-dev.com/project/404/interface/api/11013
 * @param id 单曲 Id
 */
export function getUserAnalysis(id: number) {
  return get('/yuqing/music/song/user/analysis', { songId: id })
}

/**
 * 2.6竞品分析报告详情
 * https://yapi.aiads-dev.com/project/404/interface/api/11433
 * @param ids 单曲 id 列表
 */
export function getRivalReport(ids: string) {
  return get('/yuqing/music/song/rival/report', { songIdList: ids })
}

/**
 * 2.6.1竞品分析报告详情-获取热度分析
 * https://yapi.aiads-dev.com/project/404/interface/api/11618
 * @param query 查询参数
 */
export function getRivalHeat(query: any) {
  return get('/yuqing/music/song/rival/heat/analysis', query)
}

/**
 * 2.6.2竞品分析报告详情-获取播放量对比
 * https://yapi.aiads-dev.com/project/404/interface/api/11623
 * @param query 查询参数
 */
export function getRivalPlay(query: any) {
  return get('/yuqing/music/song/rival/play/analysis', query)
}

/**
 * 2.6.3竞品分析报告详情-获取口碑评论对比
 * https://yapi.aiads-dev.com/project/404/interface/api/11628
 * @param query 查询参数
 */
export function getRivalPraise(query: any) {
  return get('/yuqing/music/song/rival/praise', query)
}

/**
 * TODO: 获取事件列表
 * @param query 查询参数
 */
export function getEventList(query: any) {
  return get('/mock/416/yuqing/common/eventAnalysis', query)
}
