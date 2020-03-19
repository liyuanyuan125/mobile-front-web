import { get, post, put, del } from '@/fn/ajax'
/**
 * 获取电影详情页
 * @param query  object
 */
export async function getMovieDetailById(movieId: string) {
    const res = await get('/yuqing/movie/detail', { movieId })
    return res
}

/**
 * 获取竞品报告
 */
export async function getMovieRivalList(movieIdList: string) {
    const res = await get('/yuqing/movie/rivalreport', { movieIdList })
    return res
}
