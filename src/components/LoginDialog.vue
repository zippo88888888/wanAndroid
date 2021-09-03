<template>
  <div id="loginDialog">
    <van-dialog v-model="show" :show-cancel-button="false" :show-confirm-button="false">
      <div class="ld-logo-d flex-row ct">
        <img class="ld-logo" src="../assets/logo_g.png" />
        <span class="ld-txt">猿家店 一家好店</span>
      </div>
      <div class="ld-row flex-row ct">
        <span>用户名</span>
        <input maxlength="15" placeholder="请输入用户名" v-model="uName"/>
      </div>
      <div class="ld-row flex-row ct">
        <span>密码</span>
        <input type="password" maxlength="20" placeholder="请输入密码" v-model="uPwd"/>
      </div>
      <div class="ld-btn">
        <button class="ld-btn1" v-on:click="login">登录</button>
        <button class="ld-btn1 ld-btn2" v-on:click="reigster">注册</button>
      </div>
      <div class="ld-xy flex-column ct">
        <div>
          登录即同意
          <span class="ld-xyx" v-on:click="xyClick"><u>服务协议</u></span>
          和
          <span class="ld-xyx" v-on:click="zcClick"><u>隐私政策</u></span>
        </div>
      </div>
      <img class="ld-close" src="../assets/close2.png" alt="" v-on:click="closeDialog"/>
    </van-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import {Dialog, Toast} from 'vant'
Vue.use(Dialog)
Vue.use(Toast)
export default {
  name: 'LoginDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      uName: '',
      uPwd: ''
    }
  },
  methods: {
    login: function () {
      if (this.checkData()) {
        Toast('登录成功')
        this.userUtil.changeLoginData('1')
        this.userUtil.changeTokenData('token')
        this.userUtil.changeUserInfoData('{sex:0}')
        this.$emit('closeLoginDialog')
      }
    },
    reigster: function () {
      this.$emit('closeLoginDialog')
    },
    checkData: function () {
      if (this.uName === '' || this.uName.length <= 0) {
        Toast('请输入用户名')
        return false
      }
      if (this.uPwd === '' || this.uPwd.length <= 0) {
        Toast('请输入密码')
        return false
      }
      return true
    },
    xyClick: function () {
      Toast('协议')
    },
    zcClick: function () {
      Toast('政策')
    },
    closeDialog: function () {
      this.$emit('closeLoginDialog')
    }
  }
}
</script>

<style scoped>
  #loginDialog{}
  >>>.van-dialog {
    border-radius: 5px;
    width: 300px;
  }
  .ld-close {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 16px;
    height: 16px;
    object-fit: cover;
  }
  .ld-logo-d {
    position: relative;
    height: 80px;
  }
  .ld-logo {
    width: 40px;
    height: 40px;
    position: relative;
    margin-right: 15px;
  }
  .ld-txt {
    display: block;
    text-align: center;
    position: relative;
    color: #3379FD;
    font-size: 18px;
    font-weight: bold;
  }
  .ld-row {
    position: relative;
    height: 45px;
  }
  .ld-row span {
    position: relative;
    height: 45px;
    text-align: right;
    line-height: 45px;
    font-size: 14px;
    width: 30%;
    margin-right: 30px;
    color: #91919C;
  }
  .ld-row input {
    border-style: none;
    position: relative;
    height: 40px;
    width: 50%;
    font-size: 14px;
  }
  .ld-btn {
    position: relative;
    height: 36px;
    margin-top: 15px;
    text-align: center;
  }
  .ld-btn1 {
    width: 80px;
    height: 36px;
    border-style: none;
    color: white;
    background: #3379FD;
    border-radius: 5px;
    font-size: 14px;
  }
  .ld-btn2 {
    background: #42b983;
    margin-left: 15px;
  }
  .ld-xy {
    position: relative;
    color: #bebebe;
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 13px;
  }
  .ld-xyx {
    font-weight: bold;
  }
  ::-webkit-input-placeholder {
    /* 修改input placeholder文字颜色 */
    color: #bebebe;
  }
  :-moz-placeholder {
    /* 修改input placeholder文字颜色 */
    color: #bebebe;
  }
  :-ms-input-placeholder {
    /* 修改input placeholder文字颜色 */
    color: #bebebe;
  }
</style>
