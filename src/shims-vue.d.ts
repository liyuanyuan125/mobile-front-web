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
