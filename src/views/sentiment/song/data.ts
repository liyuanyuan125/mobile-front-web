import {
  getDetail as apiGetDetail,
  getHotAnalysis as apiGetHotAnalysis,
  getPlayAnalysis as apiGetPlayAnalysis,
  getSimilarList as apiGetSimilarList,
  getUserAnalysis as apiGetUserAnalysis
} from '@/api/song'

export async function getDetail(id: number) {
  const { data } = await apiGetDetail(id)
  return data
}

export async function getHotAnalysis(query: any) {
  const { data } = await apiGetHotAnalysis(query)
  return data
}

export async function getPlayAnalysis(query: any) {
  const { data } = await apiGetPlayAnalysis(query)
  return data
}

export async function getSimilarList(query: any) {
  const { data } = await apiGetSimilarList(query)
  return data as any[]
}

const toPercent = (list: any[]) => {
  const result = (list || []).map(it => ({ ...it, value: it.value / 100 }))
  return result
}

export async function getUserAnalysis(id: number) {
  const { data } = await apiGetUserAnalysis(id)
  const result = {
    userAnalysis: {
      sexData: data.genderList,
      ageData: toPercent(data.ageRangeList)
    },
    userRegionList: toPercent(data.userRegionList)
  }
  return result
}
