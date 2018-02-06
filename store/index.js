// store的入口文件
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 调试插件
import createdLogger from 'vuex/dist/logger'

// 注册插件
Vue.use(Vuex)
// 调试工具
const debug = process.env.NODE_ENV !== 'production'
// 相当与一个单例子模式
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createdLogger()] : [] 
})