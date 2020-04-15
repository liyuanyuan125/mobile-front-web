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
    portrait: {
      sexData: data.genderList || [],
      ageData: transformPercentField(data.ageRangeList)
    },
    area: transformPercentField(data.userRegionList)
  }
  return result
}
