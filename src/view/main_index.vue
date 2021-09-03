<template>
  <div id="main_index">
    <router-view></router-view>
    <keep-alive>
      <BNView :current-index="bnvIndex"/>
    </keep-alive>
  </div>
</template>

<script>
import BNView from '../components/BNView'
export default {
  name: 'main_index',
  components: {BNView},
  data () {
    return {
      bnvIndex: 0,
      isApp: 0 // 1:表示在App WebView中
    }
  },
  methods: {
    autoBnvPosition: function () { // 自动选中
      let path = this.$route.path
      switch (path) {
        case '/home':
          this.bnvIndex = 0
          break
        case '/sd':
          this.bnvIndex = 1
          break
        case '/car':
          this.bnvIndex = 2
          break
        case '/my':
          this.bnvIndex = 3
          break
      }
    }
  },
  created () {
    var isApp = this.$route.query.isApp
    if (isApp === '' || isApp === undefined) { // 先从url获取
      isApp = '0'
    }
    if (isApp === '1') {
      this.phoneType.setApp('1')
    } else { // 再次确定
      isApp = this.phoneType.getApp()
      if (isApp === '' || isApp === undefined) {
        isApp = '0'
      }
    }
    this.log.showLog('计算后的 isApp ---> ' + isApp)
    this.isApp = isApp
  },
  mounted () {
    this.autoBnvPosition()
  }
}
</script>

<style scoped>
  #main_index {
  }
</style>
