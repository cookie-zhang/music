<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStlye" ref="bgImage">
      <div class="play-wrapper">
        <div class="play v-show='songs.length>0'" ref="playBtn">
          <i class="icon-play">
            <span class="text">随机播放</span>
          </i>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll"
            :probe-type="probeType"
            :listen-scroll="listenScroll"
            :data="songs"
            class="list"
            ref="list"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import {prefixStyle} from 'common/js/dom'
import Loading from 'base/loading/loading'
import {mapActions} from 'vuex'
const transform = prefixStyle('transform')
export default {
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    },
    data() {
      return {
        scrollY: 0
      }
    }
  },
  // watch: {
  //   // scrollY() {
  //   //   // console.log(this.$refs.list)
  //   //   console.log(this.scrollY) // 无值
  //   // }
  // },
  computed: {
    bgStlye() {
      return `background-image:url(${this.bgImage})`
    }
  },
  methods: {
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index: index
      })
      console.log(this.selectPlay)
    },
    ...mapActions([
      'selectPlay'
    ]),
    scroll(e) {
      this.scrollY = e.y
      if (this.scrollY > -195) {
        this.$refs.bgImage.style[transform] = `translate3d(0,${this.scrollY}px,0)`
      }
      if (this.scrollY < -195) {
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.playBtn.style.display = 'block'
      }
    },
    back() {
      this.$router.back()
    }
  },
  mounted() {
    this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  components: {
    Scroll,
    SongList,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      z-index: 30
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>