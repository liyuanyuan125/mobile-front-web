/**
 * talkingData 高级事件统计方法
 * http://doc.talkingdata.com/posts/36
 * eventId 自定义事件ID 64个字符以内的中文、英文、数字、下划线，不要加空格或其他的转义字符
 * label 一个事件的子分类 64个字符以内的中文、英文、数字、下划线，不要加空格或其他的转义字符
 * params 事件的参数信息，描绘发生事件时的属性和场景。
 */
export function talkingdataHandle(eventId: string, label?: string, params: any = {}) {
    try {
        const win = window as any
        win.TDAPP && win.TDAPP.onEvent(eventId, label, params)
    } catch (ex) {
        // tslint:disable-next-line
        console.error(ex)
    }
}

// 只适用于详情页
export function talkingdataDetailHandle(businessType: number | string, label?: string, params: any = {}) {
    let eventId = '未知详情页'
    // 1=品牌 2=艺人 3=电影 4=电视剧 5=单曲 6=专辑 100=全网事件 101=营销事件
    switch (Number(businessType)) {
        case 1:
            eventId = '品牌详情页'
            break
        case 2:
            eventId = '艺人详情页'
            break
        case 3:
            eventId = '电影详情页'
            break
        case 4:
            eventId = '电视剧详情页'
            break
        case 5:
            eventId = '单曲详情页'
            break
        case 6:
            eventId = '专辑详情页'
            break
        case 100:
            eventId = '全网事件详情页'
            break
        case 101:
            eventId = '营销事件详情页'
            break
    }
    talkingdataHandle(eventId, label, params)
}
