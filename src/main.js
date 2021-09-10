// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入自己常用 css 样式
import './util/common.css'

// 引入 mint-ui TODO 可以不用了
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// vant 组件
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入  Swiper
import VueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './assets/css/rest.css'

// axios
import Aaxios from 'axios'
import VueAxios from 'vue-axios'

import {Req, Log} from './util/http.js'
import phoneType from './util/phoneType.js'
import userUtil from './util/userUtil'
import utils from './util/utils'

Vue.prototype.ROOT_URL = 'https://gank.io/api/v2/'
Vue.prototype.http = Req
Vue.prototype.axios = Aaxios
Vue.prototype.phoneType = phoneType
Vue.prototype.userUtil = userUtil
Vue.prototype.utils = utils
Vue.prototype.log = Log

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.use(MintUI)
Vue.use(Vant)
Vue.use(VueSwiper)
Vue.use(VueAxios)

// 清除所有cookie
Vue.prototype.delAllCookie = function () {
  var keys = document.cookie.match(/[^ =;]+(?==)/g)
  this.log.showLog(keys)
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的,例如：m.ratingdog.cn
      document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() // 清除当前域名下的，例如 .m.ratingdog.cn
      document.cookie = keys[i] + '=0;path=/;domain=ratingdog.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .ratingdog.cn
    }
  }
}
// 清除所有保存至本地的数据
Vue.prototype.clearAllLocaData = function () {
  // isApp 标志不能清除
  var appData = this.phoneType.getApp()
  localStorage.clear()
  phoneType.setApp(appData)
}
