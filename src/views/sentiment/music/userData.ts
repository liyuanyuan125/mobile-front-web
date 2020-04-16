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
    ageData: transformPercentField(data.ageRangeList),
    areaData: transformPercentField(data.userRegionList)
  }
  return result
}
