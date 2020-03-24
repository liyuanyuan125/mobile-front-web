import { getEventNetworkDetailById } from '@/api/event'
import { toast } from '@/util/toast'

/**
 * 获取全网事件分析详情
 */
export const eventDetail = async (eventId: string) => {
    try {
        const res: any = await getEventNetworkDetailById(eventId)
        if (res && res.code === 0) {
            const data = res.data
            if (data.eventOverView.paltformList) {
                for (const it of data.eventOverView.paltformList) {
                    it.name = it.platformName
                    it.value = (it.platformPrecent / 100).toFixed(1)
                    delete it.platformName
                    delete it.platformPrecent
                }
            }
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

