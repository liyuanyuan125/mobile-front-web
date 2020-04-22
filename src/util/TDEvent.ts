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
        win.TDAPP.onEvent(eventId, label, params)
    } catch (ex) {
        // tslint:disable-next-line
        console.error(ex)
    }
}
