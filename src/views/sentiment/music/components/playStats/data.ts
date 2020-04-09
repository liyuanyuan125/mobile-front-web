import { PlayDailyPlatform, PlayEvent, PlayForm } from './types'
import { formatValidDate } from '@/util/dealData'
import { arrayMap } from '@jydata/fe-util'
import { MultiLineItem, MultiLineEvents, MultiLineEventHandler } from '@/components/multiLine'
import { lastDayList } from '@/util/timeSpan'

const colorMap: any = {
  网易云音乐: '#ff6262',
  QQ音乐: '#ff9833',
  酷我音乐: '#ffce59',
  酷狗音乐: '#88aaf6',
  other: '#4cc8d0',
}

export function dealDailyData(day: number, list: PlayDailyPlatform[]) {
  const dayList = lastDayList(day)
  const dateNames = dayList.map(it => ({
    ymd: formatValidDate(it),
    ymdw: formatValidDate(it, { withWeek: true }),
  }))

  const result = list.map(({ platformName: name, dataList }) => {
    const dateList = (dataList || []).map(it => ({
      ...it,
      ymd: formatValidDate(it.date),
    }))
    const dateMap = arrayMap(dateList, 'ymd')
    const item: MultiLineItem = {
      name,
      data: dateNames.map(({ ymd, ymdw }) => {
        const { value = null } = dateMap[ymd] || {}
        return {
          value,
          tooltipTitle: ymdw,
        }
      }),
      color: colorMap[name] || colorMap.other
    }
    return item
  })
  return result
}

export function dealDailyEvents(list: PlayEvent[], clickHandler: MultiLineEventHandler) {
  const result = (list || [])
  .map(({ eventId: id, eventName: name, date }) => ({
    id: String(id),
    name,
    md: formatValidDate(date, { format: 'MM-DD' }),
  }))
  .reduce((map, { id, name, md }) => {
    map[md] = { id, name, click: clickHandler }
    return map
  }, {} as MultiLineEvents)
  return result
}
