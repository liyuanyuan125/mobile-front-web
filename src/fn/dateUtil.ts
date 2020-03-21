import moment from 'moment'
/**
 * @param date 发布时间根据需求处理为相应的显示
 * @param index 发布的多少天前，默认是10
 * 当天
 * 小于等于1分钟显示：刚刚
 * 大于1分钟小于1小时显示：XX分钟前；例如：12分钟前
 * 大于等于1小时小于24小时显示：XX小时前
 * 非当天
 * 大于24小时小于7天的显示：X天前；例如：2天前
 * 大于等于七天，当年的显示月和日；如“12-09”
 * 大于等于七天，非当年显示年月日，如“2017-12-09”
 * 接口返回的是0 不显示发布时间
 */

export function datetimeParse(date: any, index: number = 10) {
    const newDate = String(date).length < 13 ? date * 1000 : date
    const minute = 60 * 1000
    const hour = 60 * minute
    const day = 24 * hour
    const num = Date.now() - newDate
    const days = Math.floor(num / day)
    if (num < minute) {
        return Math.ceil(num / 1000) + '秒前'
    } else if (num < hour) {
        return Math.round(num / 60000) + '分钟前'
    } else if (num < day) {
        return Math.floor(num / hour) + '小时前'
    } else if (days <= index) {
        return days + '天前'
    } else {
        return moment(newDate).format('YYYY-MM-DD')
    }
}
/**
 * 时间
 */
export function formatByString(date: any, format = 'yyyy-MM-dd hh:mm:ss.uuu') {
    if (typeof date === 'string' || typeof date === 'number') {
        const time = Number(date)
        if (isNaN(time)) {
            throw new Error('错误的时间值' + date)
        }
        date = new Date(time)
    }
    const o: any = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        's+': date.getSeconds(),
        'u+': date.getMilliseconds(),
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
        if (o.hasOwnProperty(k)) {
            let pad = '00'
            if (k === 'u+') {
                pad = '000'
            }
            if (new RegExp('(' + k + ')').test(format)) {
                format = format
                    .replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (pad + o[k]).substr(('' + o[k]).length))
            }
        }
    }
    return format
}
