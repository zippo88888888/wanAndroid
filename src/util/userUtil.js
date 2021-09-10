
let UserUtil = {
  isLogin: function () {
    var isLogin = localStorage.getItem('isLogin')
    if (isLogin === '' || isLogin === undefined || isLogin === null) {
      isLogin = '0'
    }
    return isLogin === '1'
  },
  changeLoginData: function (data) { // 1：代表已登录
    localStorage.setItem('isLogin', data)
  },
  getToken: function () {
    var token = localStorage.getItem('userToken')
    if (token === '' || token === undefined || token === null) {
      token = 'nothing'
    }
    return token
  },
  changeTokenData: function (token) {
    localStorage.setItem('userToken', token)
  },
  getUserInfo: function () {
    var data = localStorage.getItem('userData')
    if (data === '' || data === undefined || data === null) {
      data = '{}'
    }
    return data
  },
  changeUserInfoData: function (userData) {
    localStorage.setItem('userData', userData)
  }
}

export default UserUtil
