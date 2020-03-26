import { getMyService } from '@/api/advertiser'
import { toast } from '@/util/toast'
import { imgFixed } from '@/fn/imgProxy'

/**
 * 获取全网事件分析详情
 */
export const myService = async (query: any) => {
    try {
        const res: any = await getMyService(query)
        if (res && res.code === 0) {
            const data = res.data
            if (data.serveList && data.serveList.length) {
                for (const it of data.serveList) {
                    it.imgUrl = imgFixed(it.serveIcon, 80, 80, 4)
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

