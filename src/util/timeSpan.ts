import moment from 'moment'

const toIntDate = (m: moment.Moment) => parseInt(m.format('YYYYMMDD'), 10)

/**
 * 最近多少天
 * @param days 天数
 */
export function lastDays(days: number) {
  const result = [
    toIntDate(moment()),
    toIntDate(moment().subtract(days, 'days'))
  ]
  return result
}
