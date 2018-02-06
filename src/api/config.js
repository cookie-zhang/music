// jsonp抓取数据的url中的data有很多相同之处，data在url中就是query string parameters
export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  fromat: 'jsonp'
}

export const options = {
  param: 'jsonpCallback'
}

export const ERR_OK = 0