import {
    getBrandRegion
} from '@/api/userRegion'
import { toast } from '@/util/toast'


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
