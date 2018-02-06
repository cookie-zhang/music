// 利用jsonp的原理,进行用promise对jsonp进行封装
import originJSONP from 'jsonp'
export default function jsonp(url, data, option) {
// 判断url上面是不是带？号，不是？号就给一个&
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
// 对data的处理,主要是将data与地址实现一个拼接
function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}