import {
  getUserAnalysis as songGetUser
} from '@/api/song'
import {
  getUserAnalysis as albumGetUser
} from '@/api/album'
import { transformPercentField } from '@/util/dealData'

export async function getBasic(id: number, isAlbum: boolean) {
  const { data } = isAlbum
    ? await albumGetUser(id)
    : await songGetUser(id)
  const result = {
    sexData: data.genderList || [],
    ageData: transformPercentField(data.ageRangeList, { digits: 2 }) || [],
    areaData: transformPercentField(data.userRegionList, { digits: 2 }) || [],
  }
  return result
}
