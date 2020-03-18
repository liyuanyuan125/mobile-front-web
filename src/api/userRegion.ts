import { get } from '@/fn/ajax'

export interface RegionItem {
    source: string,
    url: string
}
/**
 * 获取电影详情页
 * @param query  object
 */
export async function getReportCinemaList(query: RegionItem) {
    const res = await get('yuqing/brand/regional', query)
    return res
}
