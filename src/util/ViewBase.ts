import { Vue, Component } from 'vue-property-decorator'
import {
  showError,
  showWarning,
  formatError,
  handleError,
  logError,
  gotoErrorPage,
  handleModuleError,
  handlePageError
} from '@/util/error'

/**
 * 本系统所有页面、组件的基类
 */
@Component
export default class ViewBase extends Vue {
  /**
   * 显示错误信息
   * @param message 错误信息
   */
  showError = showError

  /**
   * 显示警告信息
   * @param message 警告信息
   */
  showWarning = showWarning

  /**
   * 将错误格式化成字符串
   * @param ex 错误对象
   */
  formatError = formatError

  /**
   * 统一处理 ajax catch 异常
   * @param ex 错误对象
   */
  handleError = handleError

  /**
   * 统一处理 ajax catch 异常，不再 alert，只 log
   * @param ex 错误对象
   */
  logError = logError

  /**
   * 显示错误页面
   * @param code 错误码
   */
  gotoErrorPage = gotoErrorPage

  /**
   * 处理模块错误，返回格式化后的结果
   * @param ex 异常
   */
  handleModuleError = handleModuleError

  /**
   * 处理页面错误，返回格式化后的结果
   * @param ex 异常
   */
  handlePageError = handlePageError
}
