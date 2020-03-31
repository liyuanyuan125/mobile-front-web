import {
  getDetail as apiGetDetail,
  getHotAnalysis as apiGetHotAnalysis,
  getPlayAnalysis as apiGetPlayAnalysis,
  getSimilarList as apiGetSimilarList,
  getUserAnalysis as apiGetUserAnalysis,
  getRivalReport as apiGetRivalReport,
  getRivalHeat as apiGetRivalHeat,
  getRivalPlay as apiGetRivalPlay,
  getRivalPraise as apiGetRivalPraise,
  getEventList as apiGetEventList,
} from '@/api/song'
import { dot } from '@jydata/fe-util'
import { TableColumn } from '@/components/table'

const toPercent = (list: any[], percentKey = 'value') => {
  const result = (list || []).map(it => ({ ...it, [percentKey]: it[percentKey] / 100 }))
  return result
}

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

export async function getRivalReport(ids: string) {
  const { data } = await apiGetRivalReport(ids)
  const result = {
    ...data,

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

export async function getRivalHeat(query: any) {
  const { data } = await apiGetRivalHeat(query)
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

export async function getRivalPlay(query: any) {
  const { data } = await apiGetRivalPlay(query)
  const result = {
    ...data
  }
  return result
}

export async function getRivalPraise(query: any) {
  const ret = await apiGetRivalPraise(query)
  const data = ret.data || {}
  ret.data = {
    goodList: toPercent(data.goodList, 'percent'),
    badList: toPercent(data.badList, 'percent'),
    neutralList: toPercent(data.neutralList, 'percent'),
  }
  return ret
}

export async function getEventList(query: any) {
  const { data } = await apiGetEventList(query)
  return data
}
