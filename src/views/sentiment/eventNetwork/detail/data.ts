import { getEventNetworkDetailById } from '@/api/event'
import { toast } from '@/util/toast'

/**
 * 获取全网事件分析详情
 */
export const movieDetail = async (movieId: string) => {
    try {
        const res: any = await getEventNetworkDetailById(movieId)
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

