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
    const { data } = await getMovieDetailById(movieId)
    return data
}

/**
 * 热度分析
 */
export const getMovieHeat = async (query: any) => {
    const { data } = await getMovieHeatAnalysis(query)
    return data
}

/**
 * 热度分析
 */
export const getMovieWantSeeTrend = async (query: any) => {
    const { data } = await getMovieWantSee(query)
    return data
}


/**
 * 营销事件列表
 */
export const getEventList = async (query: any) => {
    const { data } = await getEventListByIdAndType(query)
    return data
}

/**
 * 获取竞品对手
 */
export const getRivalList = async (movieId: string) => {
    const { data } = await getRivalListById(movieId)
    return data
}
