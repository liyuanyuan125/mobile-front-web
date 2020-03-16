export interface FetchResult {
  code: number
  data: FetchData
  msg: string
}

export interface FetchData {
  goodList: any[]
  badList: any[],
  neutralList: any[]
}
