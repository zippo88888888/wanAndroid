let PhoneType = {
  isAndroid: function () {
    let isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1
    Log.showLog('isAndroid ---> ' + isAndroid)
    return isAndroid
  },
  isiOS: function () {
    let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    Log.showLog('isiOS ---> ' + isiOS)
    return isiOS
  },
  isIphoneX: function () { // 判断iphone X
    if (this.isiOS() === true) {
      if ((screen.height === 812 && screen.width === 375) || (screen.height === 896 && screen.width === 414)) { // 是iphoneX
        return true
      } else {
        return false
      }
    }
    return false
  },
  isWX: function () { // 判断是 微信浏览器
    let ua = navigator.userAgent.toLowerCase()
    return !!(/micromessenger/.test(ua))
  },
  isMoblie: function () { // 判断是否是移动设备
    let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
    Log.showLog('isMoblie ---> ' + flag)
    return flag
  },
  isApp: function () {
    let isApp = this.getApp()
    Log.showLog('isApp ---> ' + isApp)
    return isApp === '1'
  },
  setApp: function (isApp) {
    localStorage.setItem('isApp', isApp)
  },
  getApp: function () {
    var isApp = localStorage.getItem('isApp')
    if (isApp === '' || isApp === undefined || isApp === null) {
      isApp = '0'
    }
    return isApp
  }
}
let Log = {
  showLog: function (msg) {
    console.log(msg)
  }
}

export default PhoneType
