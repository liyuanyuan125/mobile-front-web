import { Vue, Component } from 'vue-property-decorator'
import { Dialog } from 'vant'

const ignoreCodes = { 401: 1, 403: 1 }

/**
 * 本系统所有页面、组件的基类
 */
@Component
export default class ViewBase extends Vue {
  /**
   * 显示错误信息
   * @param message 错误信息
   */
  showError(message: string) {
    Dialog.alert({ title: '出错了', message })
  }

  /**
   * 显示警告信息
   * @param message 警告信息
   */
  showWaring(message: string) {
    Dialog.alert({ title: '提示', message })
  }

  /**
   * 将错误格式化成字符串
   * @param ex 错误对象
   */
  formatError(ex: any = {}) {
    const msg = ex.code || ex.msg ? `${ex.code} ${ex.msg}` : String(ex)
    return msg
  }

  /**
   * 统一处理 ajax catch 异常
   * @param ex 错误对象
   */
  handleError(ex: any = {}) {
    if (ex && !(ex.code in ignoreCodes)) {
      const msg = this.formatError(ex)
      this.showError(msg)
      // tslint:disable-next-line
      console.error(msg)
    }
  }
}
