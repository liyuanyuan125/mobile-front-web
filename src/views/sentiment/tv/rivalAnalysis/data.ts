import { getRivalReport, getRivalPraise, PraiseItem, getRivalPlatformTrend } from '@/api/tv'
import { toast } from '@/util/toast'
import { imgFixed } from '@/fn/imgProxy'

/**
 * 获取竞品详情
 */
export const tvRivalList = async (movieIdList: string) => {
    const { data } = await getRivalReport(movieIdList)
    return data
}


/**
 * 获取竞品详情-口碑对比
 */
export const tvRivalPraise = async (query: any) => {
    const { data } = await getRivalPraise(query)
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
    return data
}

/**
 * 获取竞品详情-指数趋势
 */
export const tvRivalPlatform = async (query: any) => {
    const { data } = await getRivalPlatformTrend(query)
    return data
}
