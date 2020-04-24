import {rivalreportDetail, rivalPraise } from '@/api/brand'
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


// 获取口碑评论对比 接口处理
export async function rivalPraiseList(query: any) {
  const res = await rivalPraise(query)
  const data = res.data || {}
  const goodList = (data.goodList || []).map((it: any) => {
    return {
      ...it,
      percent: (it.percent / 100).toFixed(1)
    }
  })
  const badList = (data.badList || []).map((it: any) => {
    return {
      ...it,
      percent: (it.percent / 100).toFixed(1)
    }
  })
  const neutralList = (data.neutralList || []).map((it: any) => {
    return {
      ...it,
      percent: (it.percent / 100).toFixed(1)
    }
  })
  res.data = {
    goodList,
    badList,
    neutralList
  }
  return res
}

