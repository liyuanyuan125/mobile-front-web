import {
    getMovieDetailById,
    getMovieHeatAnalysis,
    getEventListByIdAndType,
    getRivalListById,
    getMovieWantSee
} from '@/api/movie'
import { toast } from '@/util/toast'

/**
 * 获取电影详情页
 */
export const getMovieDetail = async (movieId: string) => {
    try {
        const res: any = await getMovieDetailById(movieId)
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
 * 热度分析
 */
export const getMovieHeat = async (query: any) => {
    try {
        const res: any = await getMovieHeatAnalysis(query)
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
 * 热度分析
 */
export const getMovieWantSeeTrend = async (query: any) => {
    try {
        const res: any = await getMovieWantSee(query)
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
 * 营销事件列表
 */
export const getEventList = async (query: any) => {
    try {
        const res: any = await getEventListByIdAndType(query)
        if (res && res.code === 0) {
            return res.data
        } else {
            return null
        }
    } catch (ex) {
        // toast(ex)
        // 注意这里重新 throw
        throw ex
    }
}

/**
 * 获取竞品对手
 */
export const getRivalList = async (movieId: string) => {
    try {
        const res: any = await getRivalListById(movieId)
        if (res && res.code === 0) {
            return res.data
        } else {
            return null
        }
    } catch (ex) {
        // toast(ex)
        // 注意这里重新 throw
        throw ex
    }
}
