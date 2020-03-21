import { getMovieRivalList } from '@/api/movie'
import { toast } from '@/util/toast'

/** */
export const movieRivalList = async (movieIdList: string) => {
    try {
        const res: any = await getMovieRivalList(movieIdList)
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
