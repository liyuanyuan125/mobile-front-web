import { getUserAnalysisById } from '@/api/movie'

/** */
export const userAnalysisData = async (movieId: string) => {
    const { data } = await getUserAnalysisById(movieId)
    if (data.userRegionList && data.userRegionList.length) {
        for (const it of data.userRegionList) {
            it.value = (it.value / 100).toFixed(2)
        }
    }
    if (data.moviePrefer && data.moviePrefer.length) {
        for (const it of data.moviePrefer) {
            it.value = (it.value / 100).toFixed(2)
        }
    }
    return data
}
