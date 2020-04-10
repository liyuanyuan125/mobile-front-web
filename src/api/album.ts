import { get, post, put, del } from '@/fn/ajaxFix'

export interface IdTime {
  albumId: number
  startTime: number
  endTime: number
}

export interface IdListTime {
  albumIdList: string
  startTime: number
  endTime: number
}

export interface IdListDays {
  albumIdList: string
  days: number
}

/**
 * 1.专辑详情页
 * https://yapi.aiads-dev.com/project/404/interface/api/10908
 * @param id 专辑 id
 */
export function getDetail(id: number) {
  return get('/yuqing/music/album/detail', { albumId: id })
}

/**
 * 1.1专辑详情页-获取销售量分析数据
 * https://yapi.aiads-dev.com/project/404/interface/api/11243
 * @param query 查询
 */
export function getSaleAnalysis(query: IdTime) {
  return get('/yuqing/music/album/sale/analysis', query)
}

/**
 * 1.2专辑详情页-获取竞品对手
 * https://yapi.aiads-dev.com/project/404/interface/api/11233
 * @param id 专辑 id
 */
export function getRivalList(id: number) {
  return get('/yuqing/music/album/rival/list', { albumId: id })
}

/**
 * 2.3用户分析二级页
 * https://yapi.aiads-dev.com/project/404/interface/api/11018
 * @param id 专辑 id
 */
export function getUserAnalysis(id: number) {
  return get('/yuqing/music/album/user/analysis', { albumId: id })
}

/**
 * 2.4竞品分析报告详情
 * https://yapi.aiads-dev.com/project/404/interface/api/11393
 * @param ids 专辑 id 列表
 */
export function getRivalReport(ids: string) {
  return get('/yuqing/music/album/rival/analysis', { albumIdList: ids })
}

/**
 * 2.4.1竞品分析报告详情-获取销量对比
 * https://yapi.aiads-dev.com/project/404/interface/api/11608
 * @param query 查询参数
 */
export function getRivalSale(query: IdListTime) {
  return get('/yuqing/music/album/rival/analysis/sale', query)
}

/**
 * 2.4.1竞品分析报告详情-获取销量对比-对齐发行时间
 * https://yapi.aiads-dev.com/project/404/interface/api/11648
 * @param query 查询参数
 */
export function getRivalSaleAlign(query: IdListDays) {
  return get('/yuqing/music/album/rival/analysis/sale/align-release', query)
}

/**
 * 2.4.2竞品分析报告详情-获取口碑评论对比
 * https://yapi.aiads-dev.com/project/404/interface/api/11613
 * @param query 查询参数
 */
export function getRivalPraise(query: IdListTime) {
  return get('/yuqing/music/album/rival/keywords', query)
}

/**
 * TODO: 获取事件列表
 * @param query 查询参数
 */
export function getEventList(query: any) {
  return get('/mock/416/yuqing/common/eventAnalysis', query)
}
