import { TableColumn } from '@/components/table'

export interface NameValue {
  name: string
  value: number
}

export interface PlayPlatform extends NameValue {
  countShow: string
}

export interface DateValue {
  date: number | string
  value: number
}

export interface PlayData {
  name: string
  dataList: DateValue[]
}

export interface PlayEvent {
  id: number | string
  name: string
  date: number
}

/**
 * 数据结构参见 https://yapi.aiads-dev.com/project/404/interface/api/11283 中的 songMusicView
 */
export interface PlayView {
  platformList?: PlayPlatform[]
  dataGroup: Array<{
    name: string
    chart: PlayData[]
    table: {
      data: any[]
      columns: TableColumn[]
    }
  }>
  eventList?: PlayEvent[]
}

export interface PlayItem {
  label: string
  view: PlayView
}

export type PlayQuery = {
  startTime: number
  endTime: number
} | {
  days: number
}

export type PlayFetch = (query: PlayQuery) => PlayView | PlayItem[]
