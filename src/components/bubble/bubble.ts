import { BubbleBottomItem } from './types'
import { realThousands } from '@/util/dealData'

/**
 * 规范化 Data
 * @param list 待规范化的 Data 列表
 */
export function normalizeData(list: BubbleBottomItem[]) {
  const lineHeight = 'line-height: 10px'
  const defaultAlign = 'display: flex; align-items: center;'
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
    it.styles = defaultAlign
    // 处理value
    if (it.value && (it.value.includes('万') || it.value.includes('亿'))) {
      it.unit = it.value.substr(-1)
      it.value = it.value.substr(0, it.value.length - 1)
    }

    // 处理trend
    if (!it.showdown) {
      if (it.type == '4') {
        it.trend = it.value == undefined || it.value == '' ? '-' : undefined
        it.styles = lineHeight
      } else {
        if (it.trend === null || it.trend === undefined || it.trend <= 0) {
          it.trend = '-'
          it.styles = lineHeight
        } else {
          const trend = Number(it.trend)
          it.trend = realThousands(trend)
        }
      }
    } else {
      if (it.trend == 0 || it.trend == null || it.trend == undefined) {
        it.trend = '-'
        it.styles = lineHeight
      } else if (it.trend < 0) {
        const trend =  Math.abs(Number(it.trend))
        it.trend = realThousands(trend)
        it.rotate = true
      } else {
        const trend = Number(it.trend)
        it.trend = realThousands(trend)
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
