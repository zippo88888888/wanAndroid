<template>
  <div id="my">
    <div class="my-l flex-column ct"> <!-- v-bind:style="{marginTop: mlMarginTop + 'px'}" -->
      <div class="my-l-icon"></div>
      <div class="my-l-name m-t">用户昵称</div>
      <div class="my-l-b flex-row ct">
        <div class="my-l-item flex-row ct flex" v-on:click="orderItemClick(0)">全部<span>9</span></div><div class="my-l-r"></div>
        <div class="my-l-item flex-row ct flex" v-on:click="orderItemClick(1)">待付款<span>1</span></div><div class="my-l-r"></div>
        <div class="my-l-item flex-row ct flex" v-on:click="orderItemClick(2)">待收货<span>1</span></div><div class="my-l-r"></div>
        <div class="my-l-item flex-row ct flex" v-on:click="orderItemClick(3)">已完成<span>7</span></div>
      </div>
    </div>
    <div class="my-set">
      <div class="my-item-1 flex-column ct" v-for="(item,index) in myList" :key="index" v-on:click="itemClick(item)">
        <img v-bind:src="item.icon" alt="">
        <span>{{item.title}}</span>
      </div>
    </div>
    <LoginDialog :show="loginDialogShow" :show-toast="noLoginShowToast" @closeLoginDialog="closeLoginDialog"/>
  </div>
</template>

<script>
import Vue from 'vue'
import ToolBar from '../components/ToolBar'
import {Dialog, Toast} from 'vant'
import LoginDialog from '../components/LoginDialog'
Vue.use(Dialog)
Vue.use(Toast)
export default {
  name: 'my',
  components: {LoginDialog, ToolBar},
  data () {
    return {
      mlMarginTop: 50,
      loginDialogShow: false,
      noLoginShowToast: true,
      myList: [
        {title: '地址管理', icon: require('../assets/ic_address.png'), type: 0},
        {title: '发票管理', icon: require('../assets/ic_fpgl.png'), type: 1},
        {title: '开票记录', icon: require('../assets/ic_kp.png'), type: 2},
        {title: '客服', icon: require('../assets/ic_kf.png'), type: 3},
        {title: '关于', icon: require('../assets/ic_gy.png'), type: 4},
        {title: '退出登录', icon: require('../assets/ic_exit.png'), type: 5}
      ]
    }
  },
  methods: {
    closeLoginDialog: function () {
      this.loginDialogShow = false
    },
    orderItemClick: function (type) {
      if (!this.userUtil.isLogin()) {
        Toast('请先去登录')
        this.loginDialogShow = true
        return
      }
      this.$router.push({
        path: '/order',
        query: {
          type: type
        }
      })
    },
    itemClick: function (item) {
      if (item.type === 3 || item.type === 4) {
        this.log.showLog('nothing')
      } else {
        if (!this.userUtil.isLogin()) {
          this.loginDialogShow = true
          return
        }
      }
      switch (item.type) {
        case 0:
          this.$router.push({
            path: '/address_list',
            query: {
              type: 0
            }
          })
          break
        case 1:
          Toast(item.title)
          // if (this.phoneType.isApp()) {
          //   if (this.phoneType.isAndroid()) {
          //     Toast(window.ops.getA())
          //   }
          // }
          break
        case 2:
          Toast(item.title)
          break
        case 3:
          if (this.phoneType.isApp()) {
            if (this.phoneType.isAndroid()) {
              window.ops.call('4008823823')
            }
          } else {
            window.location.href = 'tel:4008823823'
          }
          break
        case 4:
          Toast(item.title)
          break
        case 5:
          Dialog.confirm({
            title: '温馨提示',
            message: '您确认要退出吗？',
            confirmButtonText: '退出'
          }).then(() => {
            this.delAllCookie()
            this.clearAllLocaData()
            Toast('已退出')
          }).catch(() => {
            console.log('')
          })
          break
      }
    }
  },
  mounted () {
    window.getInfo = function (data) {
      Toast('Vue' + data)
    }
    if (this.phoneType.isApp()) {
      if (this.phoneType.isAndroid()) {
        var statusBarHeight = window.ops.getSBarHeight()
        this.mlMarginTop = 50 + statusBarHeight
      }
    }
  }
}
</script>

<style scoped>
  .my-l {
    position: relative;
    height: 240px;
  }
  .my-l::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 240px;
    bottom: 10px;
    left: 0;
    background-image: url("../assets/nav_header.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(2px); /* 背景透明 */
    -webkit-filter: blur(2px);
  }
  .my-l-icon {
    width: 56px;
    height: 56px;
    position: relative;
    border-radius: 30px;
    margin-top: 30px;
    background-image: url("../assets/ic_user_icon.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .my-l-name {
    position: relative;
    color: white;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 50px;
    font-weight: bold;
  }
  .my-l-b {
    position: absolute;
    height: 50px;
    width: 100%;
    background: white;
    margin-top: 10px;
    bottom: 0;
  }
  .my-l-item {
    position: relative;
    color: #91919C;
    font-size: 12px;
  }
  .my-l-item span {
    position: relative;
    width: 20px;
    height: 14px;
    margin-left: 3px;
    margin-bottom: 10px;
    line-height: 14px;
    text-align: center;
    background: red;
    color: white;
    font-size: 12px;
    border-radius: 10px;
  }
  .my-l-r {
    height: 30px;
    width: 1px;
    background: #f2f2f2;
  }
  .my-set, .my-exit {
    position: relative;
    background: white;
    width: 100%;
    margin-top: 10px;
  }
  .my-item-1 {
    position: relative;
    width: calc(100% / 3 - 1px);
    height: 80px;
    float: left;
    background: white;
    border-right: #f2f2f2 solid 1px;
    border-top: #f2f2f2 solid 1px;
  }
  .my-item-1 img {
    position: relative;
    width: 25px;
    height: 25px;
  }
  .my-item-1 span {
    position: relative;
    color: #91919C;
    font-size: 12px;
    margin-top: 7px;
  }
</style>
