import {
  getRivalReport as songGetRivalReport,
  getRivalHeat as songGetRivalHeat,
  getRivalPlay as songGetRivalPlay,
  getRivalPraise as songGetRivalPraise,
  IdListTime as SongIdListTime,
} from '@/api/song'
import {
  getRivalReport as albumGetRivalReport,
  getRivalPraise as albumGetRivalPraise,
  IdListTime as AlbumIdListTime,
} from '@/api/album'
import { dot } from '@jydata/fe-util'
import { TableColumn } from '@/components/table'

const toPercent = (list: any[], percentKey = 'value') => {
  const result = (list || []).map(it => ({ ...it, [percentKey]: it[percentKey] / 100 }))
  return result
}

const commonBasic = (data: any) => {
  const rivalList = data.rivalList || []
  const basisDataList = data.basisDataList || []
  const ageRangeList = data.ageRangeList || []

  const result = {
    rivalList,

    basisDataList,

    ageRangeList,

    sexData: ((list: any[]) => {
      const ret = list.map(({ rivalName, dataList }) => ({
        name: rivalName,
        rate1: dataList[0].value / 100,
        rate2: dataList[1].value / 100,
      }))
      return ret
    })(data.genderList || []),

    areaList: (({ cityList, provinceList }: any) => {
      const ret = [
        { title: '城市分布', list: cityList },
        { title: '省份分布', list: provinceList },
      ]
      .map(({ title, list }) => {
        const titem = {
          title,
          data: (list as any[] || []).map(({ rivalName, dataList }) => {
            const dlist = (dataList as any[] || [])
              .map(({ name, value }) => `${name}<br><i>${value / 100}%</i>`)
            const ditem = {
              name: rivalName,
              top1: dlist[0],
              top2: dlist[1],
              top3: dlist[2],
              top4: dlist[3],
              top5: dlist[4],
            }
            return ditem
          })
        }
        return titem
      })
      return ret
    })(data.userRegion || {})
  }

  return result
}

const songBasic = async (ids: string) => {
  const { data } = await songGetRivalReport(ids)

  const result = {
    ...commonBasic(data),

    rankTable: ((list: any[]) => {
      const columns: TableColumn[] = [
        { name: 'name', title: '单曲', width: '9em', align: 'left' },
        { name: 'count', title: '上榜数量', width: '5em' },
        { name: 'best', title: '最高排名', width: '5em' },
        { name: 'type', title: '上榜类型', width: '5em' },
      ]
      if (list.length > 0) {
        const platList = list[0].platformList as any[] || []
        platList.forEach(
          ({ platformName: name, platformNotice: title }) => {
            columns.push({ name, title: `${name}<br>${title}`, width: '9em' })
          }
        )
      }
      const body = (list || []).map(item => {
        const row: any = {
          name: item.rivalName,
          count: item.rankCount,
          best: item.rankBest,
          type: item.rankType,
        }
        const platList = item.platformList as any[] || []
        platList.forEach(
          ({ platformName: name, platformValue: value }) => {
            row[name] = value
          }
        )
        return row
      })
      const ret = { columns, data: body }
      return ret
    })(data.rankAnalysis || []),
  }

  return result
}

const albumBasic = async (ids: string) => {
  const { data } = await albumGetRivalReport(ids)

  const result = {
    ...commonBasic(data),
  }

  return result
}

export async function getBasic(ids: string, isAlbum: boolean) {
  const result = isAlbum
    ? await albumBasic(ids)
    : await songBasic(ids)
  return result
}

export async function getRivalHeat(query: SongIdListTime) {
  const { data } = await songGetRivalHeat(query)
  const overAllHeat = data.overAllHeat || []
  const interactList = dot(data, 'platform.interactList') || []
  const materialList = dot(data, 'platform.materialList') || []
  const result = {
    overAllHeat,
    interactList,
    materialList,
  }
  return result
}

export async function getRivalPlay(query: SongIdListTime) {
  const { data } = await songGetRivalPlay(query)
  const result = {
    ...data
  }
  return result
}

export async function getRivalPraise(ids: string, query: any, isAlbum: boolean) {
  const ret = isAlbum
    ? await albumGetRivalPraise({ albumIdList: ids, ...query })
    : await songGetRivalPraise({ songIdList: ids, ...query })
  const data = ret.data || {}
  ret.data = {
    goodList: toPercent(data.goodList, 'percent'),
    badList: toPercent(data.badList, 'percent'),
    neutralList: toPercent(data.neutralList, 'percent'),
  }
  return ret
}
