declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface VarType {
  env: 'dev' | 'qas' | 'stg' | 'prd'
  baseUrl: string
  ajaxBaseUrl: string
}

declare const VAR: VarType

declare module 'vue-echarts' {
  const ECharts: any        // tslint:disable-line
  export default ECharts    // tslint:disable-line
}

declare module 'VConsole'

declare module 'css-in-js-utils' {
  /**
   * 将用 js 形式表示的样式，格式化成一行 css 样式，例如：
   * cssifyObject({
   *   padding: '6px',
   *   margin: '8px'
   * })
   * 结果为："padding:6px;margin:8px"
   * @param style js 样式对象
   */
  export function cssifyObject(style: object): string
}
