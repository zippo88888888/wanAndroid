// axios
import Axios from 'axios'

import QS from 'qs'

// 引入
import {Toast} from 'vant'

let Log = {
  showLog: function (msg) {
    console.log(msg)
  }
}

let reqDialog = {
  showDialog: function () {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
      overlay: true,
      loadingType: 'spinner'
    })
  },
  dismissDialog: function () {
    Toast.clear()
  }
}

let Req = {
  POST: function (url, param, loading, success) {
    if (loading) {
      if (loading) {
        reqDialog.showDialog()
      }
    }
    let headers = {}
    headers['orgin'] = 'H5'
    headers['Content-Type'] = 'application/json'
    Axios({
      method: 'post',
      url: url,
      data: QS.stringify(param),
      headers: headers // 配置请求头
    }).then(response => {
      // {"data": ..., "errorCode": 0, "errorMsg": "" }
      let responseData = response.data
      Log.showLog(responseData)
      if (responseData === null || responseData === undefined) {
        return
      }
      if (responseData.errorCode === 0) {
        success(responseData.data)
      } else {
        Toast(responseData.errorMsg)
      }
    }).catch(error => {
      Log.showLog(error)
    }).finally(() => {
      if (loading) {
        reqDialog.dismissDialog()
      }
    })
  },
  GET: function (url, param, loading, success) {
    if (loading) {
      reqDialog.showDialog()
    }
    let headers = {}
    headers['orgin'] = 'H5'
    Axios({
      method: 'get',
      url: url,
      params: param,
      headers: headers
    }).then(response => {
      let responseData = response.data
      Log.showLog(responseData)
      if (responseData === null || responseData === undefined) {
        return
      }
      if (responseData.status === 100) {
        success(responseData.data)
      } else {
        Toast(responseData.errorMsg)
      }
    }).catch(error => {
      Log.showLog(error)
    }).finally(() => {
      if (loading) {
        reqDialog.dismissDialog()
      }
    })
  }
}

export {
  Req,
  Log
}
// export default Req
