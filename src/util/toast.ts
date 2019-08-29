
import { Toast } from 'vant'
/**
 * toast 提示
 * @param message 提示语
 */
export function toast(message: string, duration = 1000) {
    Toast({
        message, duration
    })
}
