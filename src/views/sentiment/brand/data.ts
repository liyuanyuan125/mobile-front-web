import {rivalreportDetail } from '@/api/brand'

export async function reportDetail(query: any) {
  const {code, data, msg} = await rivalreportDetail(query)

  const {genderList, rivalList} = data
  // 处理性别分布数据
  const sexData = (genderList || []).map((it: any) => {
    const format = Number((it.dataList[0].value / 100).toFixed(1))
    const rate1: number = it.dataList ? format : 0
    const rate2: number = 100 - rate1
    return {
      name: it.rivalName,
      rate1,
      rate2,
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


