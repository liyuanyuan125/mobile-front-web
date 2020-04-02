import { get } from '@/fn/ajax'
import { toast } from '@/util/toast'

/**
 * 获取品牌用户地域分布
 * https://yapi.aiads-dev.com/project/412/interface/api/10988
 * * type 1=省 2=城市
 * objType 1=用户地域分布  2=高消费偏好地区
 * @param query  object
 */
export async function getBrandRegion(query: any) {
    const res = await get('/yuqing/brand/regional', query)
    return res
}
/**
 * 获取艺人用户地域分布
 * https://yapi.aiads-dev.com/project/406/interface/api/11368
 * @param query  object
 */
export async function getActorRegion(query: any) {
    const res = await get('/yuqing/actor/actor/regional', query)
    return res
}

/**
 * 获取单曲用户地域分布
 * https://yapi.aiads-dev.com/project/404/interface/api/11438
 * @param query  object
 */
export async function getSongRegion(query: any) {
    const res = await get('/yuqing/music/song/user/regional', query)
    return res
}

/**
 * 获取单曲用户地域分布
 * https://yapi.aiads-dev.com/project/404/interface/api/11403
 * @param query  object
 */
export async function getAlbumRegion(query: any) {
    const res = await get('/yuqing/music/album/user/analysis/region', query)
    return res
}


/**
 *
 * @param src 来源，对应下列：
 * 1 品牌
 * 2 艺人
 * 3 电影
 * 4 剧集
 * 5 音乐-单曲
 * 6 音乐-专辑
 * @param query 请求的对象
 */

export const regionList = async (src: number, query: any) => {
    try {
        let res: any
        switch (src) {
            case 1:
                // 品牌
                query.brandId = query.id ? query.id : query.brandId
                delete query.id
                res = await getBrandRegion(query)
                break
            case 2:
                // 艺人
                query.actorId = query.id ? query.id : query.actorId
                delete query.id
                res = await getActorRegion(query)
                break
            case 5:
                // 单曲
                query.songId = query.id ? query.id : query.songId
                delete query.id
                res = await getSongRegion(query)
                break
            case 6:
                // 专辑
                query.albumId = query.id ? query.id : query.albumId
                delete query.id
                res = await getAlbumRegion(query)
                break
        }
        if (res && res.code === 0) {
            return res.data
        } else {
            toast(res.msg)
        }
    } catch (ex) {
        toast(ex)
        // 注意这里重新 throw
        throw ex
    }
}
