import {
  getDetail as songGetDetail,
  getHeatAnalysis as songGetHeatAnalysis,
  getPlayAnalysis as songPlayAnalysis,
  getEventList as songGetEventList,
  getRivalList as songGetRivalList,
  IdTime as SongIdTime,
} from '@/api/song'
import {
  getDetail as albumGetDetail,
  getSaleAnalysis as albumSaleAnalysis,
  getEventList as albumGetEventList,
  getRivalList as albumGetRivalList,
  IdTime as AlbumIdTime,
} from '@/api/album'
import { arrayMap } from '@jydata/fe-util'
import { readableNumber, formatValidDate } from '@/util/dealData'
import { PlayView, PlayQuery } from './components/playStats'
import { TableColumn } from '@/components/table'
import { uniq, flatMap, compact, isEmpty } from 'lodash'
import { toMoment } from '@/util/dealData'
import { imgFixed } from '@/fn/imgProxy'

const commonBasic = (data: any) => {
  const publicPraise = data.publicPraise || {}
  const userAnalysis = data.userAnalysis || {}
  const singerList = data.singerAnalysisList || data.singerList || []

  const result = {
    publicPraise: {
      appraiseList: publicPraise.appraiseList || [],
      hotWordList: publicPraise.hotWordList || [],
      badWordList: publicPraise.badWordList || [],
    },

    userAnalysis: {
      genderList: userAnalysis.genderList || [],
      ageRangeList: userAnalysis.ageRangeList || [],
    },

    singerList: (singerList as any[]).map(it => ({
      ...it,
      avatar: imgFixed(it.singerCover, 150, 150, 4),
      heatTrendText: it.heatTrend && readableNumber(Math.abs(it.heatTrend), '') || ''
    })),
  }

  return result
}

const songBasic = async (id: number) => {
  const { data } = await songGetDetail(id)
  const info = data.songInfo || {}
  const releaseDate = info.releaseDate || ''
  const platform = info.releasePlatform || ''
  const overview = data.songOverView || {}
  const rankAnalysis = data.rankAnalysis || {}
  const platformList = rankAnalysis.platformList || []

  const {
    publicPraise,
    userAnalysis,
    singerList,
  } = commonBasic(data)

  const result = {
    // 基础信息
    basic: {
      cover: imgFixed(info.songCover, 200, 200, 4),
      name: info.songName || '',
      singer: info.songSinger || '',
      release: compact(['单曲', releaseDate, platform]).join(' / '),
      rankingNum: info.rankingNum || '',
      rankingName: info.rankingName || '',
      rankingId: info.rankingId || 0,
    },

    // 基础信息弹出窗
    popupData: data.basisDataList || [],

    // 气泡
    bubbleData: [
      {
        type: 1,
        title: '累计播放量',
        value: overview.playCount || '-',
        trend: overview.playTrend || 0,
      },
      {
        type: 2,
        title: '累计互动量',
        value: overview.interactCount || '-',
        trend: overview.interactTrend || 0,
      },
      {
        type: 3,
        title: '综合热度',
        value: overview.heatCount || '-',
        trend: overview.heatTrend || 0,
      },
      {
        type: 4,
        title: '好感度',
        value: info.favorable || '-',
      },
    ],

    // 单曲：榜单表现
    rankAnalysis: {
      rankCount: rankAnalysis.rankCount || '',
      rankBest: rankAnalysis.rankBest || '',
      rankType: rankAnalysis.rankType || '',
    },

    // rankAnalysisEmpty: (({ rankCount, rankBest, rankType }) => {
    //   return isEmpty(rankCount) && isEmpty(rankBest) && isEmpty(rankType)
    // })(rankAnalysis),

    // 单曲：上榜数量分布
    rankAnnularData: isEmpty(platformList)
      ? null
      : { data: platformList },

    rankAnnularEmpty: isEmpty(platformList),

    // 口碑评论
    praiseData: {
      favorable: info.favorable || '',
      publicPraise,
    },

    // 用户分析
    userAnalysis,

    // 音乐人分析
    singerList,
  }

  return result
}

const albumBasic = async (id: number) => {
  const { data } = await albumGetDetail(id)
  const info = data.albumInfo || {}
  const releaseDate = info.albumReleaseDate || ''
  const platform = info.releasePlatform || ''
  const overview = data.albumOverView || {}

  const {
    publicPraise,
    userAnalysis,
    singerList,
  } = commonBasic(data)

  const isDigital = info.hasDigital || false

  const result = {
    // 是否为数字专辑
    isDigital,

    // 基础信息
    basic: {
      cover: imgFixed(info.coverUrl, 210, 210, 4),
      name: info.albumName || '',
      singer: info.albumSinger || '',
      release: compact(['专辑', releaseDate, platform]).join(' / '),
      rankingNum: info.rankingNum || '',
      rankingName: info.rankingName || '',
      rankingId: info.rankingId || 0,
      // 比单曲多出的字段
      price: info.albumPrice || '',
    },

    // 基础信息弹出窗
    popupData: data.basisDataList || [],

    // 气泡
    bubbleData: [
      {
        type: 1,
        title: isDigital ? '累计销售量' : '歌曲播放量',
        value: (isDigital ? overview.playCount : overview.saleCount) || '-',
        trend: (isDigital ? overview.playTrend : overview.saleTrend) || 0,
      },
      {
        type: 2,
        title: isDigital ? '累计互动数' : '累计互动量',
        value: overview.interactCount || '-',
        trend: overview.interactTrend || 0,
      },
      {
        type: 3,
        title: isDigital ? '昨日销量排名' : '最高单曲播放',
        value: (isDigital ? overview.yesterdaySaleRank : overview.singlePlayCount) || '-',
        trend: (isDigital ? overview.yesterdaySaleTrend : overview.singlePlayTrend)  || 0,
      },
      {
        type: 4,
        title: '好感度',
        value: info.favorable || '-',
      },
    ],

    // 专辑：歌曲热度
    songList: (data.musicList as any[] || []).map((it, i) => ({
      id: it.musicId,
      name: (i < 3 ? `<em>NO.${i + 1}</em>` : `${i + 1}.`) + ' ' + it.musicName,
      heatCount: it.heatCount,
      commentCount: it.commentCount,
    })),

    // 口碑评论
    praiseData: {
      favorable: info.favorable || '',
      publicPraise,
    },

    // 用户分析
    userAnalysis,

    // 音乐人分析
    singerList,
  }

  return result
}

export function basicEmpty() {
  return {
    cover: '',
    name: '',
    singer: '',
    release: '',
    rankingNum: '',
    rankingName: '',
    rankingId: 0,
    price: '',
    hasDigital: false,
  }
}

export async function getBasic(id: number, isAlbum: boolean) {
  const result = isAlbum
    ? await albumBasic(id)
    : await songBasic(id)
  return result
}

// 单曲：热度分析
export async function getHeatAnalysis(query: SongIdTime) {
  const { data } = await songGetHeatAnalysis(query)
  return data
}

interface PlayForm {
  date: number
  playCount?: string  // 单曲才存在，播放量
  saleCount?: string  // 专辑才存在，销售量
  markName?: string
  platformList: Array<{
    name: string
    value: number
  }>
}

interface PlayDailyPlatform {
  platformName: string
  dataList: Array<{
    date: number
    value: number
  }>
}

interface PlayDailyEvent {
  eventId: number
  eventName: string
  date: number
}

// 从所有 formList 的 platformList 字段中，聚合出所有的平台名称
const platformNames = (formList: PlayForm[]) => {
  const result = flatMap(formList, 'platformList').map(({ name }) => name as string)
  return uniq(result)
}

const weekDays = [ '日', '一', '二', '三', '四', '五', '六' ]

const dealPlayView = (view: any, isAlbum = false) => {
  const formList: PlayForm[] = view.dailyFormList || []
  const fixedColumns: TableColumn[] = [
    { name: 'date', title: '日期', align: 'left', width: 9, html: true, fixed: 'left' },
    { name: 'count', title: `当日${isAlbum ? '销量' : '播放量'}`, align: 'right', width: 8 },
  ]
  const names = platformNames(formList)
  const dynamicColumns: TableColumn[] = names.map(name => {
    return { name, title: name, align: 'right', width: 8 }
  })
  const columns = fixedColumns.concat(dynamicColumns)
  // 产品需求：只取前三条
  const tableData = formList.slice(0, 3).map(item => {
    const m = toMoment(item.date)
    const ymd = m.format('YYYY-MM-DD')
    const wi = m.day()
    const day = weekDays[wi]
    const mark = item.markName ? `<em>${item.markName}</em>` : ''
    const platformMap = arrayMap(item.platformList, 'name', it => it.value || '-')
    const row = {
      date: `<i>${ymd}</i><br>周${day}${mark}`,
      count: (isAlbum ? item.saleCount : item.playCount) || '-',
      ...platformMap,
    }
    return row
  })

  const result: PlayView = {
    // 确保字段是空数组，从而显示出相应的模块
    platformList: view.platformList || [],
    dataGroup: [{
      name: '',
      chart: (view.dailyPlatformList as PlayDailyPlatform[] || [])
        .map(({ platformName: name, dataList }) => ({ name, dataList })),
      table: {
        data: tableData,
        columns
      }
    }],
    eventList: (view.dailyEventList as PlayDailyEvent[] || [])
      .map(({ eventId: id, eventName: name, date }) => ({ id, name, date })),
  }

  return result
}

const songPlay = async (query: SongIdTime) => {
  const { data: { songMusicView, videoView } } = await songPlayAnalysis(query)
  const result = []
  songMusicView && result.push({ label: '单曲', view: dealPlayView(songMusicView) })
  videoView && result.push({ label: '视频', view: dealPlayView(videoView) })
  return result
}

const albumPlay = async (query: AlbumIdTime) => {
  const { data } = await albumSaleAnalysis(query)
  return dealPlayView(data, true)
}

export async function getPlayAnalysis(
  id: number,
  { startTime, endTime }: PlayQuery,
  isAlbum: boolean
) {
  const result = isAlbum
    ? await albumPlay({ albumId: id, startTime, endTime })
    : await songPlay({ songId: id, startTime, endTime })
  return result
}

export async function getEventList(id: number, isAlbum: boolean) {
  const { data } = isAlbum
    ? await albumGetEventList(id)
    : await songGetEventList(id)
  return data
}

const dealRival = (
  list: any[],
  routeName: string,
  statsConfig: Array<{ type: string, name: string }>
) => {
  const result = list.map(it => ({
    link: { name: routeName, params: { id: it.rivalId } },
    id: it.rivalId,
    name: it.rivalName || '',
    author: it.rivalDesc || '',
    cover: imgFixed(it.rivalCover, 200, 200, 4),
    statsList: statsConfig.map(({ type, name }) => {
      const trend = it[name + 'Trend']
      return {
        type,
        count: it[name + 'Count'],
        trend,
        trendText: readableNumber(Math.abs(trend))
      }
    }),
    eventName: it.eventName,
    eventDate: formatValidDate(it.eventCreatTime)
  }))
  return result
}

const songRival = async (id: number) => {
  const { data } = await songGetRivalList(id)
  const result = dealRival(data, 'sentiment-song', [
    { type: '累计播放量', name: 'playing' },
    { type: '累计互动量', name: 'interact' },
  ])
  return result
}

const albumRival = async (id: number) => {
  const { data } = await albumGetRivalList(id)
  const result = dealRival(data, 'sentiment-album', [
    { type: '累计销量', name: 'sales' },
    { type: '昨日销量', name: 'yesterdaySales' },
  ])
  return result
}

export async function getRivalList(id: number, isAlbum: boolean) {
  const result = isAlbum
    ? await albumRival(id)
    : await songRival(id)
  return result
}
