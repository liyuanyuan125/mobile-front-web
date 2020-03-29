import { getUserAnalysisById } from '@/api/movie'
import { toast } from '@/util/toast'

/**
 * 获取电视剧用户分析
 * @param tvId
 */
export const userAnalysisData = async (tvId: string) => {
    try {
        const res: any = await getUserAnalysisById(tvId)
        if (res && res.code === 0) {
            const data = res.data
            if (data.ageRangeList && data.ageRangeList.length) {
                for (const it of data.ageRangeList) {
                    it.value = (it.value / 100).toFixed(1)
                }
            }
            if (data.userRegionList && data.userRegionList.length) {
                let inx: number = 0
                for (const it of data.userRegionList) {
                    inx += 1
                    it.value = (it.value / 100).toFixed(1)
                    it.name = inx + '.' + it.name
                }
            }
            if (data.consumePrefer && data.consumePrefer.length) {
                for (const it of data.consumePrefer) {
                    it.value = (it.value / 100).toFixed(1)
                }
            }
            if (data.moviePrefer && data.moviePrefer.length) {
                for (const it of data.moviePrefer) {
                    it.value = (it.value / 100).toFixed(1)
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
