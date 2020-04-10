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
  getRivalPraise as albumGetPraise,
  IdListTime as AlbumIdListTime,
} from '@/api/album'
import { dot } from '@jydata/fe-util'
import { TableColumn } from '@/components/table'
import { groupBy, flatMap, uniq } from 'lodash'
import { PlayView } from './components/playStats'

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
  const { data } = await songGetReport(ids)

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

// 从所有 view 的 dateShowList 字段中，聚合出所有的日期
const dateShowDates = (view: RivalView[]) => {
  const result = flatMap(view, 'dateShowList').map(({ date }) => date as string)
  return uniq(result)
}

const dealPlayView = (view: RivalView[], isAlbum = false): PlayView => {
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

    const dates = dateShowDates(view)
    const dynamicColumns = dates.map(date => ({ name: date, title: date, width: '8em' }))
    const tableColumns: TableColumn[] = [
      { name: 'name', title: isAlbum ? '专辑名称' : '单曲名称', align: 'left', width: '8em' },
      { name: 'count', title: isAlbum ? '累计销量' : '累计播放', width: '7em' },
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

  return {
    dataGroup
  }
}

const songPlay = async (query: SongIdListTime) => {
  const { data: { rivalPlay, videoView } } = await songGetPlay(query)
  const result = []
  rivalPlay && result.push({ label: '单曲', view: dealPlayView(rivalPlay) })
  videoView && result.push({ label: '视频', view: dealPlayView(videoView) })
  return result
}

const albumPlay = async (query: AlbumIdListTime) => {
  const { data } = await albumGetSale(query)
  return dealPlayView(data, true)
}

export async function getPlay(ids: string, query: any, isAlbum: boolean) {
  const result = isAlbum
    ? await albumPlay({ albumIdList: ids, ...query })
    : await songPlay({ songIdList: ids, ...query })
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
