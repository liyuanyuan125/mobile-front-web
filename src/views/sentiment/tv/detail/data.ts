import {
    getTVDetailById,
    getEventListByIdAndType,
    getRivalListById,
    getTVHeatAnalysis,
    getTVPlayCount
} from '@/api/tv'
import { toast } from '@/util/toast'

/**
 * 获取电影详情页
 */
export const getTvDetail = async (tvId: string) => {
    try {
        const res: any = await getTVDetailById(tvId)
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
 * 获取电影详情页-热度分析
 */
export const getTvHeat = async (query: any) => {
    try {
        const res: any = await getTVHeatAnalysis(query)
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
 * 获取电影详情页-播放量监控
 */
export const getTvPlay = async (query: any) => {
    try {
        const res: any = await getTVPlayCount(query)
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
 * 获取电影营销事件列表
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
export const getRivalList = async (tvId: string) => {
    try {
        const res: any = await getRivalListById(tvId)
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
