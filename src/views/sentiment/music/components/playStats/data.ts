import { PlayData, PlayEvent } from './types'
import { formatValidDate } from '@/util/dealData'
import { arrayMap } from '@jydata/fe-util'
import { MultiLineItem, MultiLineEvents, MultiLineEventHandler } from '@/components/multiLine'
import { lastDayList } from '@/util/timeSpan'

// const colorMap: any = {
//   网易云音乐: '#ff6262',
//   QQ音乐: '#ff9833',
//   酷我音乐: '#ffce59',
//   酷狗音乐: '#88aaf6',
//   other: '#4cc8d0',
// }

const colorList = [
  '#88aaf6',
  '#4cc8d0',
  '#c76dd9',
  '#ff6262',
  '#ff9833',
  '#ffce59',
]
const colorCount = colorList.length

export function releaseDayList(day: number) {
  const result = []
  for (let i = 0; i < day; i++) {
    result.push(`发行${i == 0 ? '首' : i + 1}日`)
  }
  return result
}

// 暂时不用 autoColor，默认全部为 autoColor
export function dealDailyData(
  day: number,
  list: PlayData[],
  autoColor: boolean,
  isAlign: boolean
) {
  const dayList: any[] = isAlign ? releaseDayList(day) : lastDayList(day)
  const dateNames = dayList.map(it => ({
    key: isAlign ? it : formatValidDate(it),
    title: isAlign ? it : formatValidDate(it, { withWeek: true }),
  }))

  const result = list.map(({ name, dataList }, index) => {
    const dateList = (dataList || []).map(it => ({
      ...it,
      key: isAlign ? it.date : formatValidDate(it.date),
    }))
    const dateMap = arrayMap(dateList, 'key')
    const item: MultiLineItem = {
      name,
      data: dateNames.map(({ key, title }) => {
        const { value = null } = dateMap[key] || {}
        return {
          value,
          tooltipTitle: title,
        }
      }),
      color: colorList[index % colorCount],
      // color: autoColor ? colorList[index % colorCount] : (colorMap[name] || colorMap.other)
    }
    return item
  })
  return result
}

export function dealDailyEvents(list: PlayEvent[], clickHandler: MultiLineEventHandler) {
  const result = (list || [])
  .map(({ id, name, date }) => ({
    id,
    name,
    md: formatValidDate(date, { format: 'MM-DD' }),
  }))
  .reduce((map, { id, name, md }) => {
    map[md] = { id: id as string, name, click: clickHandler }
    return map
  }, {} as MultiLineEvents)
  return result
}
