<template>
  <div id="register">
    <div class="r-logo">
      <div class="r-logo2 flex-row ct" v-bind:style="{marginTop: rLogoPaddingTop + 'px'}">
        <img class="r-logo-img" src="../../assets/logo_g.png" alt="">
        <span>猿家店 一家好店</span>
      </div>
      <img v-on:click="back" class="r-back" v-bind:style="{top: backTop + 'px'}" src="../../assets/svg/back_w.svg" alt="">
    </div>
    <div class="r-pic flex-row ct">
      <img v-bind:src="item" alt="" v-for="(item,index) in picList" :key="index">
    </div>
    <div class="r-hi">hi 欢迎来到猿家店！</div>
    <div class="r-row flex-row ct">
      <span>用户名</span>
      <input maxlength="15" placeholder="请输入用户名" v-model="uName"/>
    </div>
    <div class="r-row flex-row ct">
      <span>手机号</span>
      <input maxlength="11" placeholder="请输入手机号" v-model="uPhone"/>
      <button class="r-row-code-btn" v-on:click="getCode">获取</button>
    </div>
    <div class="r-row flex-row ct">
      <span>验证码</span>
      <input maxlength="6" placeholder="请输入验证码" v-model="uCode"/>
    </div>
    <div class="r-row flex-row ct">
      <span>密码</span>
      <input type="password" maxlength="20" placeholder="请输入密码" v-model="uPwd"/>
    </div>
    <div class="r-row-r">
      <button class="ld-btn1 ld-btn2" v-on:click="reigster">注册</button>
    </div>
    <div class="r-xy flex-row ct">
      注册即同意&nbsp;
      <span class="r-xyx" v-on:click="xyClick"><u>服务协议</u></span>
      &nbsp;和&nbsp;
      <span class="r-xyx" v-on:click="zcClick"><u>隐私政策</u></span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)
export default {
  name: 'register',
  data () {
    return {
      rLogoPaddingTop: 0,
      backTop: 20,
      uName: '',
      uPhone: '',
      uCode: '',
      uPwd: '',
      picList: [
        require('../../assets/r_1.png'),
        require('../../assets/r_2.png'),
        require('../../assets/r_3.png'),
        require('../../assets/r_4.png'),
        require('../../assets/r_5.png')
      ]
    }
  },
  methods: {
    back: function () {
      this.$router.onBack()
    },
    getCode: function () {
      if (this.utils.isNull(this.uPhone)) {
        Toast('请输入手机号')
        return
      }
      if (!this.utils.checkMobile(this.uPhone)) {
        Toast('手机号输入不正确')
        return
      }
      Toast('发送验证码成功')
    },
    reigster: function () {
      if (this.checkData()) {
        Toast('恭喜，注册成功，正在自动为您跳转页面！')
        this.userUtil.changeLoginData('1')
        this.userUtil.changeTokenData('token')
        this.userUtil.changeUserInfoData('{sex:0}')
        this.back()
      }
    },
    checkData: function () {
      var isOK = true
      if (this.utils.isNull(this.uName)) {
        Toast('请输入用户名')
        return false
      }
      if (this.utils.isNull(this.uPhone)) {
        Toast('请输入手机号')
        return false
      }
      if (!this.utils.checkMobile(this.uPhone)) {
        Toast('手机号输入不正确')
        return false
      }
      if (this.utils.isNull(this.uCode)) {
        Toast('请输入验证码')
        return false
      }
      if (this.utils.isNull(this.uPwd)) {
        Toast('请输入密码')
        return false
      }
      return isOK
    },
    xyClick: function () {
      Toast('协议')
    },
    zcClick: function () {
      Toast('政策')
    }
  },
  mounted () {
    if (this.phoneType.isApp()) {
      if (this.phoneType.isAndroid()) {
        const statusBarHeight = window.ops.getSBarHeight()
        this.rLogoPaddingTop = statusBarHeight / 2
        this.backTop = 10 + statusBarHeight
      }
    }
  }
}
</script>

<style scoped>
  #register{
    text-align: center;
    background: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .r-logo {
    height: 150px;
    position: relative;
  }
  .r-logo::before {
    content: '';
    position: absolute;
    left: -5px;
    right: -5px;
    height: 150px;
    background-image: url("../../assets/ya.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(2px); /* 背景透明 */
    -webkit-filter: blur(2px);
  }
  .r-logo2 {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 150px;
    color: #3379FD;
    font-weight: bold;
    font-size: 18px;
  }
  .r-logo-img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .r-back {
    width: 22px;
    height: 22px;
    position: absolute;
    left: 14px;
    top: 20px;
  }
  .r-pic {
    position: relative;
    height: 60px;
  }
  .r-pic img {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }
  .r-hi {
    position: relative;
    font-size: 15px;
    color: black;
    margin-bottom: 40px;
  }
  .r-row {
    position: relative;
    height: 45px;
  }
  .r-row span {
    position: relative;
    height: 45px;
    text-align: right;
    line-height: 45px;
    font-size: 14px;
    width: 30%;
    margin-right: 30px;
    color: #91919C;
  }
  .r-row input {
    border-style: none;
    position: relative;
    height: 40px;
    width: 50%;
    font-size: 14px;
  }
  .r-row-code-btn {
    position: absolute;
    border-style: none;
    background: #3379FD;
    right: 10%;
    color: white;
    height: 26px;
    width: 50px;
    border-radius: 5px;
    font-size: 14px;
  }
  .r-row-r {
    position: relative;
    height: 36px;
    margin-top: 15px;
    text-align: center;
  }
  .r-row-r button {
    width: 80px;
    height: 36px;
    border-style: none;
    color: white;
    background: #42b983;
    border-radius: 5px;
    font-size: 14px;
  }
  .r-xy {
    position: relative;
    color: #bebebe;
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 13px;
  }
  .r-xyx {
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
