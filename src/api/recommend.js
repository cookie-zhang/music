import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config.js'
// 推荐页面的数据抓取
// slider
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
// // 热门推荐
// export function getDiscList() {
//   const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
//   const data = Object.assign({}, commonParams, {
//     platform: 'yqq',
//     needNewCode: 0,
//     hostUin: 0,
//     sin: 0,
//     ein: 29,
//     sortId: 5,
//     categoryId: 1000000,
//     rnd: Math.random()
//   })
//   return jsonp(url, data, options)
// }