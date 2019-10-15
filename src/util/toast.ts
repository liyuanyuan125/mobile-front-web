
import { Toast, Dialog } from 'vant'
/**
 * toast 提示
 * @param message 提示语
 */
export function toast(message: string, duration = 1000) {
    Toast({
        message, duration
    })
}
/**
 * alert 提示
 * @param optionObj 信息对象
 */
export function alert(optionObj: any) {
    Dialog.alert(optionObj)
}
