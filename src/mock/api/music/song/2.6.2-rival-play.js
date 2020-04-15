import { mockGet, mockPost, mockPut, mockDel } from '../../../util'
import rivalPlayData from '../rivalPlayData'

/**
 * 2.6.2竞品分析报告详情-获取播放量对比
 * https://yapi.aiads-dev.com/project/404/interface/api/11623
 */
mockGet('/yuqing/music/song/rival/play/analysis', () => {
  return {
    rivalPlay: rivalPlayData(),
    videoView: rivalPlayData(true),
  }
})
