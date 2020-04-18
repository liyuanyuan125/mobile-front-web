import {
    getTVDetailById,
    getEventListByIdAndType,
    getRivalListById,
    getTVHeatAnalysis,
    getTVPlayCount
} from '@/api/tv'

/**
 * 获取电影详情页
 */
export const getTvDetail = async (tvId: string) => {
    const { data } = await getTVDetailById(tvId)
    return data
}

/**
 * 获取电影详情页-热度分析
 */
export const getTvHeat = async (query: any) => {
    const { data } = await getTVHeatAnalysis(query)
    return data
}

/**
 * 获取电影详情页-播放量监控
 */
export const getTvPlay = async (query: any) => {
    const { data } = await getTVPlayCount(query)
    return data
}

/**
 * 获取电影营销事件列表
 */
export const getEventList = async (query: any) => {
    const { data } = await getEventListByIdAndType(query)
    return data
}

/**
 * 获取竞品对手
 */
export const getRivalList = async (tvId: string) => {
    const { data } = await getRivalListById(tvId)
    if (data instanceof Array) {
        return data
    } else {
        return []
    }
}
