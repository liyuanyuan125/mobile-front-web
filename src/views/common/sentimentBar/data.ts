import { get, post, put, del } from '@/fn/ajax'

/**
 * 当前业务主体是否被关注
 * 业务类型 1 品牌 2 艺人 3 电影 4 剧集  5 音乐-单曲 6 音乐-专辑
 * https://yapi.aiads-dev.com/project/420/interface/api/11833
 * @param query  object
 */
export async function hasDigg(query: any) {
    const res = await get('/yuqing/user/hasLike', query)
    return res
}


/**
 * 关注业务主体
 * 1=关注 2=取消关注
 * https://yapi.aiads-dev.com/project/420/interface/api/11593
 * @param query  object
 */
export async function diggSubject(query: any) {
    const res = await post('/yuqing/user/like', query)
    return res
}
