import moment from 'moment'

const toIntDate = (m: moment.Moment) => parseInt(m.format('YYYYMMDD'), 10)

/**
 * 最近多少天
 * @param num 天数
 */
export function lastDays(num: number) {
  const result = [
    toIntDate(moment().subtract(num, 'days')),
    toIntDate(moment())
  ]
  return result
}

/**
 * 最近多少天，日期列表
 * @param num 天数
 */
export function lastDayList(num: number) {
  const result = []
  for (let i = num - 1; i >= 0; i--) {
    const date = toIntDate(moment().subtract(i, 'days'))
    result.push(date)
  }
  return result
}
