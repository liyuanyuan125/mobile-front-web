
import router from '../router'
import { openAppLink, AppLink } from '@/util/native'
import qs from 'querystring'
import { isJyAdvIos } from './ua'
/**
 * 在 app 里通过 applink打开 H5页面
 */
export function openWebPage(path: string, query?: any) {
    const origin = location.origin
    const arr = query ? Object.keys(query) : []
    const qus = arr.length == 0 ? '' : '?' + qs.stringify(query)
    if (isJyAdvIos()) {
        // 如果是在 ios 则 applink 里打开二级页
        const href = (origin + path + qus).replace(/\s+/g, '')
        const link: AppLink = {
            page: 'h5Page',
            url: encodeURIComponent(href)
        }
        openAppLink(link)
    } else {
        router.push({
            path,
            query
        })
    }

}
