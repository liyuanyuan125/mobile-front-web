import {rivalreportDetail } from '@/api/brand'
import { keyBy } from 'lodash'
import { getPercentFieldValue } from '@/util/dealData'

export async function reportDetail(query: any) {
  const {code, data, msg} = await rivalreportDetail(query)

  const {genderList} = data
  // 处理性别分布数据
  const sexData = (genderList || []).map(({rivalName, dataList}: any) => {
    const dataMap = keyBy(dataList, 'name')
    const man = dataMap.男
    const woman = dataMap.女
    return {
      name: rivalName,
      rate1: getPercentFieldValue(man),
      rate2: getPercentFieldValue(woman),
    }
  })

  return {
    code,
    data: {
      ...data,
      sexData
    },
    msg
  }
}


