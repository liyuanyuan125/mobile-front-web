import { get, post, put, del } from '@/fn/ajaxFix'

/**
 * 获取单曲信息
 * https://yapi.aiads-dev.com/project/404/interface/api/10878
 * @param id 单曲 id
 */
export function getDetail(id: number) {
  return get('/yuqing/song/detail', { songId: id })
}

/**
 * 获取热度分析
 * https://yapi.aiads-dev.com/project/404/interface/api/11173
 * @param query 查询
 */
export function getHotAnalysis(query: any) {
  return get('/yuqing/song/heat/analysis', query)
}

/**
 * 获取播放量分析
 * https://yapi.aiads-dev.com/project/404/interface/api/11283
 * @param query 查询
 */
export function getPlayAnalysis(query: any) {
  return get('/yuqing/song/play/analysis', query)
}

/**
 * 获取相似歌曲
 * https://yapi.aiads-dev.com/project/404/interface/api/11228
 * @param query 查询
 */
export function getSimilarList(query: any) {
  return get('/yuqing/song/rival/list', query)
}