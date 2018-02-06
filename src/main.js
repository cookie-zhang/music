// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from '../store/'
import 'common/stylus/index.styl'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 0.5,
  error: 'dist/error.png',
  loading: require('common/image/default.png'),
  attempt: 3
})

Vue.config.productionTip = false
fastclick.attach(document.body) // 解决300毫秒延迟
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
