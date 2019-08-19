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
