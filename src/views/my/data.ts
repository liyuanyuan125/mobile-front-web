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
            // 处理用户头像
            data.userAvatar = data.companyLogo ?
                imgFixed(data.companyLogo, 80, 80, 4) : require('../../assets/default.png')
            // 处理品牌图片
            // serveType
            // BRAND 全网品牌
            // SONG 单曲、
            // ALBUM 专辑
            // MOVIE 电影
            // TV 电视剧
            // KOL KOL/艺人
            // ALLEVENT 全网事件
            if (data.serveList && data.serveList.length) {
                for (const it of data.serveList) {
                    switch (it.serveType) {
                        case 'BRAND':
                            it.imgUrl = require('../../assets/sentiment/my-brand.png')
                            break
                        case 'SONG' || 'ALBUM':
                            it.imgUrl = require('../../assets/sentiment/my-music.png')
                            break
                        case 'MOVIE':
                            it.imgUrl = require('../../assets/sentiment/my-movie.png')
                            break
                        case 'TV':
                            it.imgUrl = require('../../assets/sentiment/my-tv.png')
                            break
                        case 'KOL':
                            it.imgUrl = require('../../assets/sentiment/my-actor.png')
                            break
                        case 'ALLEVENT':
                            it.imgUrl = require('../../assets/sentiment/my-eventMarketing.png')
                            break
                        default:
                            it.imgUrl = require('../../assets/sentiment/my-default.png')
                    }

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

