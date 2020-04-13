import {
  getUserAnalysis as songGetUserAnalysis
} from '@/api/song'
import {
  getUserAnalysis as albumGetUserAnalysis
} from '@/api/album'

const toPercent = (list: any[], percentKey = 'value') => {
  const result = (list || []).map(it => ({
    ...it,
    [percentKey]: +(it[percentKey] / 100).toFixed(1)
  }))
  return result
}

export async function getBasic(id: number, isAlbum: boolean) {
  const { data } = isAlbum
    ? await albumGetUserAnalysis(id)
    : await songGetUserAnalysis(id)
  const result = {
    portrait: {
      sexData: data.genderList || [],
      ageData: toPercent(data.ageRangeList)
    },
    area: toPercent(data.userRegionList)
  }
  return result
}
