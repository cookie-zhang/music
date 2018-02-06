<template>
  <transition name="slider">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.headImg
    },
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) { // 边界处理，如没有这个id，让用户回到列表歌手页重新点击
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id)
        .then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
    },
    _normalizeSongs(list) { // 序列化一下所有歌曲
      let ret = []
      list.forEach((item) => {
        let {musicData} = item // 解构赋值
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background
  .slider-enter-active, .slider-leave-active
    transition: all .5s
  .slider-enter, .slider-leave-to
    transform: translate3d(100%, 0, 0)
</style>