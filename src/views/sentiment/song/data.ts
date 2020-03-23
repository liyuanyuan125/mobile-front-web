import {
  getDetail as apiGetDetail,
  getHotAnalysis as apiGetHotAnalysis,
  getPlayAnalysis as apiGetPlayAnalysis,
  getSimilarList as apiGetSimilarList
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
