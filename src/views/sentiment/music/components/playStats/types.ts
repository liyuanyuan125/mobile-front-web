export interface NameValue {
  name: string
  value: number
}

export interface PlayPlatform extends NameValue {
  countShow: string
}

export interface DateValue {
  date: number
  value: number
}

export interface PlayDailyPlatform {
  platformName: string
  dataList: DateValue[]
}

export interface PlayEvent {
  date: number
  eventName: string
  eventId: number
}

// export interface PlayDate {
//   date: number
//   value: number
//   platformName: string
//   eventName: string
//   eventId: string
// }

// export interface PlayDaily {
//   eventName: string
//   eventId: string
//   dateList: PlayDate[]
// }

export interface PlayForm {
  date: number
  playCount?: string  // 单曲才存在，播放量
  saleCount?: string  // 专辑才存在，销售量
  markName?: string
  platformList: NameValue[]
}

/**
 * 数据结构参见 https://yapi.aiads-dev.com/project/404/interface/api/11283 中的 songMusicView
 */
export interface PlayView {
  platformList: PlayPlatform[]
  dailyPlatformList: PlayDailyPlatform[]
  dailyEventList: PlayEvent[]
  // dailyPlay: PlayDaily
  dailyFormList: PlayForm[]
}

export interface PlayItem {
  label: string
  view: PlayView
}

export interface PlayQuery {
  startTime: number
  endTime: number
}

export type PlayFetch = (query: PlayQuery) => PlayView | PlayItem[]