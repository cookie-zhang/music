// 定义修改操作
import * as types from './mutations-types'
// mutation直接就可以把state里面的数据拿来
const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer // 将数据传到state对应的singer对象里面
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullscreen = flag
  },
  [types.SET_PLAYLIST](state, flag) {
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST](state, flag) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, flag) {
    state.playMode = mode
  },
  [types.SET_CRRENTINDEX](state, flag) {
    state.crrentIndex = index
  }
}
export default mutations