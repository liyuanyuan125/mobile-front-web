import { get, post, put, del } from '@/fn/ajaxFix'
/**
 * 获取全网事件分析详情页
 * https://yapi.aiads-dev.com/project/408/interface/api/10968
 * @param query  object
 */
export async function getEventNetworkDetailById(eventId: string) {
    const res = await get('/yuqing/event/network/detail', { eventId })
    return res
}
