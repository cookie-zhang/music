<template>
  <div class="singer">
    <list-view @select="selectSinger" :data="getSingerList"></list-view> <!--父组件监听派发过来的事件-->
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import { ERR_OK } from 'api/config'
import axios from 'axios'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import {mapMutations} from 'vuex' // vue提供的语法糖
const HOST_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  data() {
    return {
      getSingerList: []
    }
  },
  components: {
    ListView
  },
  created() {
    this._getSingerList()
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList() {
      axios.get('../../../static/getSinger.json')
        .then((res) => {
          if (res.data.code === ERR_OK) {
            this.getSingerList = this._nomalizeSinger(res.data.data.list)
          }
        })
    },
    // 规范数据结构，规范成想要的数据结构
    _nomalizeSinger(list) {
      let map = {
        hot: {
          title: HOST_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 为了得到有序列表，处理一下map
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOST_NAME) {
          hot.push(val)
        }
      }
      // 用sort进行一个排序， 相减大于零就返回一个true
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret) // 合并两个数组
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>
<style scoped lang="stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>