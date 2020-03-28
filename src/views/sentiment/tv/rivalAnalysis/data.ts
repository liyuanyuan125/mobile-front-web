import { getRivalReport, getRivalPraise, PraiseItem, getRivalPlatformTrend } from '@/api/tv'
import { toast } from '@/util/toast'
import { imgFixed } from '@/fn/imgProxy'

/**
 * 获取竞品详情
 */
export const tvRivalList = async (movieIdList: string) => {
    try {
        const res: any = await getRivalReport(movieIdList)
        if (res && res.code === 0) {
            // const data = res.data
            // if (data.rivalList && data.rivalList.length) {
            //     for (const it of data.rivalList) {
            //         it.coverImg = imgFixed(it.coverUrl, 150, 195)
            //     }
            // }
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


/**
 * 获取竞品详情-口碑对比
 */
export const tvRivalPraise = async (query: any) => {
    // console.log('data', query)
    try {
        const res: any = await getRivalPraise(query)
        if (res && res.code === 0) {
            const data = res.data
            if (data.goodList && data.goodList.length) {
                for (const el of data.goodList) {
                    el.percent = (el.percent / 100).toFixed(1)
                }
            }
            if (data.neutralList && data.neutralList.length) {
                for (const el of data.neutralList) {
                    el.percent = (el.percent / 100).toFixed(1)
                }
            }
            if (data.badList && data.badList.length) {
                for (const el of data.badList) {
                    el.percent = (el.percent / 100).toFixed(1)
                }
            }
            return res
        } else {
            toast(res.msg)
        }
    } catch (ex) {
        // toast(ex)
        // 注意这里重新 throw
        throw ex
    }
}

/**
 * 获取竞品详情-指数趋势
 */
export const tvRivalPlatform = async (query: any) => {
    // console.log('data', query)
    try {
        const res: any = await getRivalPlatformTrend(query)
        if (res && res.code === 0) {

            return res
        } else {
            toast(res.msg)
        }
    } catch (ex) {
        // toast(ex)
        // 注意这里重新 throw
        throw ex
    }
}
