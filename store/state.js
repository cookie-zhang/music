import {playMode} from 'common/js/config'
const state = {
  singer: {},
  playing: false, // 正在播放
  fullScreen: false, // 全屏播放
  playList: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1 // 当前播放的索引
}

export default state
