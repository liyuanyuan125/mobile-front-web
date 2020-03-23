import { getMovieRivalList, getRivalPraise, PraiseItem } from '@/api/movie'
import { toast } from '@/util/toast'

/**
 * 获取竞品详情
 */
export const movieRivalList = async (movieIdList: string) => {
    try {
        const res: any = await getMovieRivalList(movieIdList)
        if (res && res.code === 0) {
            return res.data
        } else {
            toast(res.msg)
        }
    } catch (ex) {
        // toast(ex)
        // 注意这里重新 throw
        throw ex
    }
}


/**
 * 获取竞品详情-口碑对比
 */
export const movieRivalPraise = async (query: any) => {
    try {
        const res: any = await getRivalPraise(query)
        if (res && res.code === 0) {
            return res.data
        } else {
            toast(res.msg)
        }
    } catch (ex) {
        // toast(ex)
        // 注意这里重新 throw
        throw ex
    }
}
