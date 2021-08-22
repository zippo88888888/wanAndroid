// axios
import Axios from 'axios'

import QS from 'qs'

// 引入
import { Toast, Indicator } from 'mint-ui'

let Log = {
  showLog: function (msg) {
    console.log(msg)
  }
}

let Req = {
  POST: function (url, param, loading, success) {
    if (loading) {
      Indicator.open({
        text: '加载中',
        spinnerType: 'fading-circle'
      })
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
        Indicator.close()
      }
    })
  },
  GET: function (url, param, loading, success) {
    if (loading) {
      Indicator.open({
        text: '加载中',
        spinnerType: 'fading-circle'
      })
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
        Indicator.close()
      }
    })
  }
}

export default Req
