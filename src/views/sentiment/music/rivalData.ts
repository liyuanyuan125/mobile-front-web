import {
  getRivalReport as songGetReport,
  getRivalHeat as songGetHeat,
  getRivalPlay as songGetPlay,
  getRivalPraise as songGetPraise,
  IdListTime as SongIdListTime,
} from '@/api/song'
import {
  getRivalReport as albumGetReport,
  getRivalSale as albumGetSale,
  getRivalSaleAlign as albumGetSaleAlign,
  getRivalPraise as albumGetPraise,
  IdListTime as AlbumIdListTime,
  IdListDays as AlbumIdListDays,
} from '@/api/album'
import { dot } from '@jydata/fe-util'
import { TableColumn } from '@/components/table'
import { keyBy, groupBy } from 'lodash'
import { PlayView, PlayQuery } from './components/playStats'

const toPercent = (list: any[], percentKey = 'value') => {
  const result = (list || []).map(it => ({
    ...it,
    [percentKey]: +(it[percentKey] / 100).toFixed(1)
  }))
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
      const ret = list.map(({ rivalName, dataList }) => {
        const dataMap = keyBy(dataList, 'name')
        const man = dataMap.男
        const woman = dataMap.女
        return {
          name: rivalName,
          rate1: man && +(man.value / 100).toFixed(1),
          rate2: woman && +(woman.value / 100).toFixed(1),
        }
      })
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
              .map(({ name, value }) => `
                <div class="van-ellipsis">${name}</div>
                <i>${value != null ? (value / 100).toFixed(1) + '%' : '-'}</i>
              `.trim())
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
  const { data } = await songGetReport(ids)

  const result = {
    ...commonBasic(data),

    rankTable: ((list: any[]) => {
      const columns: TableColumn[] = [
        { name: 'name', title: '单曲', width: 9, align: 'left', lines: 2, fixed: 'left' },
        { name: 'count', title: '上榜数量', width: 5 },
        { name: 'best', title: '最高排名', width: 5 },
        { name: 'type', title: '上榜类型', width: 5 },
      ]
      if (list.length > 0) {
        const platList = list[0].platformList as any[] || []
        platList.forEach(
          ({ platformName: name, platformNotice: title }) => {
            columns.push({ name, title: `${name}<br>${title}`, width: 9 })
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
  const { data } = await albumGetReport(ids)

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

export async function getHeat(query: SongIdListTime) {
  const { data } = await songGetHeat(query)
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

interface RivalView {
  platformName: string
  rivalName: string
  playCountShow: string
  dataList: Array<{ date: number, value: number }>
  dateShowList: Array<{ date: string, value: string }>
}

const dealPlayView = (
  view: RivalView[],
  dayNames: string[],
  isAlbum = false
): PlayView => {
  const group = groupBy(view, 'platformName')

  const dataGroup = Object.entries(group).map(([ name, list ]) => {
    const chart = list.map(({ rivalName, dataList }) => ({
      name: rivalName,
      dataList: dataList || []
    }))

    const tableData = list.map(({ rivalName, playCountShow, dateShowList }) => ({
      name: rivalName,
      count: playCountShow,
      ...(dateShowList || []).reduce((map, { date, value }) => {
        map[date] = value
        return map
      }, {} as any)
    }))

    const dynamicColumns = dayNames.map(date => ({ name: date, title: date, width: 8 }))
    const tableColumns: TableColumn[] = [
      { name: 'name', title: isAlbum ? '专辑名称' : '单曲名称', align: 'left', width: 8, lines: 2, fixed: 'left' },
      { name: 'count', title: isAlbum ? '累计销量' : '累计播放', width: 7 },
      ...dynamicColumns,
    ]

    return {
      name,
      chart,
      table: {
        data: tableData,
        columns: tableColumns
      }
    }
  })
  .sort(a => a.name == '全部' ? -1 : 0)

  return {
    dataGroup
  }
}

const songPlay = async (query: SongIdListTime, dayNames: string[]) => {
  const { data: { rivalPlay, videoView } } = await songGetPlay(query)
  const result = []
  rivalPlay && result.push({ label: '单曲', view: dealPlayView(rivalPlay, dayNames) })
  videoView && result.push({ label: '视频', view: dealPlayView(videoView, dayNames) })
  return result
}

const albumPlay = async (query: AlbumIdListTime, dayNames: string[]) => {
  const { data } = await albumGetSale(query)
  return dealPlayView(data, dayNames, true)
}

const albumPlayAlign = async (query: AlbumIdListDays, dayNames: string[]) => {
  const { data } = await albumGetSaleAlign(query)
  return dealPlayView(data, dayNames, true)
}

export async function getPlay(
  ids: string,
  { startTime, endTime, days, isAlign, dayNames }: PlayQuery,
  isAlbum: boolean
) {
  const result = isAlbum
    ? isAlign
    ? await albumPlayAlign({ albumIdList: ids, days }, dayNames)
    : await albumPlay({ albumIdList: ids, startTime, endTime }, dayNames)
    : await songPlay({ songIdList: ids, startTime, endTime }, dayNames)
  return result
}

export async function getPraise(ids: string, query: any, isAlbum: boolean) {
  const ret = isAlbum
    ? await albumGetPraise({ albumIdList: ids, ...query })
    : await songGetPraise({ songIdList: ids, ...query })
  const data = ret.data || {}
  ret.data = {
    goodList: toPercent(data.goodList, 'percent'),
    badList: toPercent(data.badList, 'percent'),
    neutralList: toPercent(data.neutralList, 'percent'),
  }
  return ret
}
