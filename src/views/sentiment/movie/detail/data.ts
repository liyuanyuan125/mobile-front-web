import { getMovieDetailById } from '@/api/movie'
import { toast } from '@/util/toast'

/** */
export const movieDetail = async (movieId: string) => {
    try {
        const res: any = await getMovieDetailById(movieId)
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
