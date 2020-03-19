import { get } from '@/fn/ajax'

/**
 * type 1=省 2=城市
 * objType 1=用户地域分布  2=高消费偏好地区
 */
export interface BrandItem {
    brandId: string,
    pageIndex: number,
    type: string,
    objType: string
}
/**
 * 获取电影详情页
 * @param query  object
 */
export async function getBrandRegion(query: BrandItem) {
    const res = await get('yuqing/brand/regional', query)
    return res
}
