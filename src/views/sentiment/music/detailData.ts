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
import { dot } from '@jydata/fe-util'
import { readableThousands, formatValidDate } from '@/util/dealData'

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
      avatar: dot(it, 'singerCover.url') || ''
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
      cover: dot(info, 'songCover.url') || '',
      name: info.songName || '',
      singer: info.songSinger || '',
      release: `单曲 / ${releaseDate} / ${platform}`,
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
        value: overview.playCount || 0,
        trend: overview.playTrend || 0,
      },
      {
        type: 2,
        title: '累计互动量',
        value: overview.interactCount || 0,
        trend: overview.interactTrend || 0,
      },
      {
        type: 3,
        title: '综合热度',
        value: overview.heatCount || 0,
        trend: overview.heatTrend || 0,
      },
      {
        type: 4,
        title: '好感度',
        value: info.favorable || '',
      },
    ],

    // 单曲：榜单表现
    rankAnalysis: {
      rankCount: rankAnalysis.rankCount || '',
      rankBest: rankAnalysis.rankBest || '',
      rankType: rankAnalysis.rankType || '',
    },

    // 单曲：上榜数量分布
    annularData: {
      data: platformList
    },

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

  const result = {
    // 是否为数字专辑
    isDigital: info.hasDigital || false,

    // 基础信息
    basic: {
      cover: dot(info, 'coverUrl.url') || '',
      name: info.albumName || '',
      singer: info.albumSinger || '',
      release: `专辑 / ${releaseDate} / ${platform}`,
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
        title: '累计销售量',
        value: overview.saleCount || 0,
        trend: overview.saleTrend || 0,
      },
      {
        type: 2,
        title: '累计互动量',
        value: overview.interactCount || 0,
        trend: overview.interactTrend || 0,
      },
      {
        type: 3,
        title: '昨日销量排名',
        value: overview.yesterdaySaleRank || 0,
        trend: overview.yesterdaySaleTrend || 0,
      },
      {
        type: 4,
        title: '好感度',
        value: info.favorable || '',
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

// 单曲：热度分析 TODO:
export async function getHeatAnalysis(query: SongIdTime) {
  const { data } = await songGetHeatAnalysis(query)
  return data
}

const songPlay = async (query: SongIdTime) => {
  const { data: { songMusicView, videoView } } = await songPlayAnalysis(query)
  const result = []
  songMusicView && result.push({ label: '单曲', view: songMusicView })
  videoView && result.push({ label: '视频', view: videoView })
  return result
}

const albumPlay = async (query: AlbumIdTime) => {
  const { data } = await albumSaleAnalysis(query)
  return data
}

export async function getPlayAnalysis(id: number, query: any, isAlbum: boolean) {
  const result = isAlbum
    ? await albumPlay({ albumId: id, ...query })
    : await songPlay({ songId: id, ...query })
  return result
}

export async function getEventList(query: any, isAlbum: boolean) {
  const { data } = isAlbum
    ? await albumGetEventList(query)
    : await songGetEventList(query)
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
    cover: dot(it, 'rivalCover.url') || '',
    statsList: statsConfig.map(({ type, name }) => {
      const trend = it[name + 'Trend']
      return {
        type,
        count: it[name + 'Count'],
        trend,
        trendText: readableThousands(trend)
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
