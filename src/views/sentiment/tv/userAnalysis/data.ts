import { getUserAnalysisById } from '@/api/tv'
import { toast } from '@/util/toast'

/**
 * 获取电视剧用户分析
 * @param tvId
 */
export const userAnalysisData = async (tvId: string) => {
    const { data } = await getUserAnalysisById(tvId)
    return data
}
