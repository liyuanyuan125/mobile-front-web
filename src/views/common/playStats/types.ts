export interface NameValue {
  name: string
  value: number
}

export interface PlayPlatform extends NameValue {
  countShow: string
}

export interface PlayDate {
  date: number
  value: number
  platformName: string
  eventName: string
  eventId: string
}

export interface PlayDaily {
  eventName: string
  eventId: string
  dateList: PlayDate[]
}

export interface PlayForm {
  date: number
  playCount: string
  markName?: string
  platformList: NameValue[]
}

/**
 * 数据结构参见 https://yapi.aiads-dev.com/project/404/interface/api/11283 中的 songMusicView
 */
export interface PlayView {
  platformList: PlayPlatform[]
  dailyPlay: PlayDaily
  dailyFormList: PlayForm[]
}

export interface PlayItem {
  label: string
  view: PlayView
}
