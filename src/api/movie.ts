import { get, post, put, del } from '@/fn/ajax'
/**
 * 获取电影详情页
 * @param query  object
 */
export async function getReportCinemaList(movieId: string) {
    const res = await get('/yuqing/movie/detail', { movieId })
    return res
}
