
let Utils = {
  checkMobile: function (phone) {
    var regPhone = /^1[3456789]\d{9}$/
    if (regPhone.test(phone)) {
      return true
    }
    return false
  },
  isNumber: function (number) { // 判断是数字
    let regTest = /(^[0-9]*[1-9][0-9]*$)/
    if (!regTest.test(number)) {
      return false
    }
    return true
  },
  keepPoint: function (x) { // 强制保留2位小数，不足补 0
    var f = parseFloat(x)
    if (isNaN(f)) {
      return ''
    }
    f = Math.round(x * 100) / 100
    var s = f.toString()
    var rs = s.indexOf('.')
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + 2) {
      s += '0'
    }
    return s
  },
  isNull: function (obj) {
    if (obj == null) { return true }
    if (obj === null) { return true }
    if (obj === undefined) return true
    if (typeof obj === 'undefined') return true
    if (obj === '') return true
    if (obj.length === 0) return true
    if (obj.replace(/(^s*)|(s*$)/g, '').length === 0) return true
    if (obj.replace(' ', '').length === 0) return true
    return false
  }
}

export default Utils
