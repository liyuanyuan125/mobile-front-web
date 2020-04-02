import { BubbleBottomItem } from './types'

/**
 * 规范化 Data
 * @param list 待规范化的 Data 列表
 */
export function normalizeData(list: BubbleBottomItem[]) {
  const emptys: BubbleBottomItem[]  = [
    {
      type: '5',
      title: '',
      value: '-1'
    }, {
      type: '6',
      title: '',
      value: '-1'
    }
  ]

  let result = list.map(it => {
    it.styles = 'display: flex; align-items: center;'
    if (!it.showdown) {
      if (it.trend === null || (it.trend !== undefined && it.trend <= 0)) {
        it.trend = '-'
        it.styles = 'line-height: 10px'
      }
    } else {
      if (it.trend == 0 || it.trend == null) {
        it.trend = '-'
        it.styles = 'line-height: 10px'
      } else if (it.trend < 0) {
        it.trend = Math.abs(Number(it.trend))
        it.rotate = true
      } else {
        it.trend = Number(it.trend)
      }
    }

    return it
  })

  result = [...result, ...emptys]

  return result
}

export function fillList(dataLength: number) {
  const empty = {
    name: '',
    value: -1
  }
  let fillItem
  switch (dataLength) {
    case 7:
      fillItem = new Array(2).fill(empty)
      break
    case 6:
      fillItem = new Array(2).fill(empty)
      break
    case 5:
      fillItem = new Array(2).fill(empty)
      break
    case 4:
      fillItem = new Array(3).fill(empty)
      break
    case 3:
      fillItem = new Array(4).fill(empty)
      break
    case 2:
      fillItem = new Array(4).fill(empty)
      break
    case 1:
      fillItem = new Array(4).fill(empty)
      break
    default:
      fillItem = new Array(1).fill(empty)
      break
  }
  return fillItem
}
