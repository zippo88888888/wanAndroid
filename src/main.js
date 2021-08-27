// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入自己常用 css 样式
import './util/common.css'

// 引入 mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// vant 组件
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入  Swiper
import VueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './assets/css/rest.css'
// import 'lib-flexible/flexible'

// axios
import Aaxios from 'axios'
import VueAxios from 'vue-axios'

import Req from './util/http.js'

// EventBus 总线
// Vue.prototype.eventBus = new Vue()

Vue.prototype.ROOT_URL = 'https://gank.io/api/v2/'
Vue.prototype.http = Req
Vue.prototype.axios = Aaxios

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
