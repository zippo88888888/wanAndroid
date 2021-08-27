<template>
  <div id="PayDialog">
    <van-popup v-model="dialogShow" position="bottom" closeable @click-close-icon="cancel" @click-overlay="cancel">
      <div class="pay-dialog">
        <div class="pd-hi"></div>
        <div class="pd-price">￥ {{shopPrice}}</div>
        <div class="flex-row ct pd-row" v-on:click="payStateClick(1)">
          <img class="m-l m-r" src="../assets/ic_confirm_alipay.png" alt="">
          <span class="flex m-l">支付宝支付</span>
          <div class="m-r pd-radio" v-bind:class="[payState === 1 ? 'pd-radio2' : '']"></div>
        </div>
        <div class="flex-row ct pd-row" v-on:click="payStateClick(2)">
          <img class="m-l m-r" src="../assets/ic_confirm_wechat.png" alt="">
          <span class="flex m-l">微信支付</span>
          <div class="m-r pd-radio" v-bind:class="[payState === 2 ? 'pd-radio2' : '']"></div>
        </div>
        <button class="pd-btn" v-on:click="toPay" v-bind:class="[payState !== -1 ? 'pd-btn2' : '']">立即支付</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import {Popup, Checkbox, Toast} from 'vant'
Vue.use(Popup)
Vue.use(Checkbox)
Vue.use(Toast)
export default {
  name: 'PayDialog',
  props: {
    orderNo: {
      type: String,
      default: ''
    },
    shopPrice: {
      type: Number,
      default: 0
    },
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogShow: false,
      payState: -1
    }
  },
  methods: {
    payStateClick: function (state) {
      this.payState = state
    },
    toPay: function () {
      if (this.payState === -1) {
        console.log('请选择支付方式')
      } else {
        Toast('toPay ---> ' + this.payState)
      }
    },
    cancel: function () {
      this.payState = -1
      this.$emit('closePayDialog')
    }
  },
  watch: {
    showDialog: function (newVal) {
      this.dialogShow = newVal
    }
  }
}
</script>

<style scoped>
  .pay-dialog {
    position: relative;
    height: 240px;
    background: white;
  }
  .pd-hi {
    position: relative;
  }
  .pd-price {
    position: relative;
    color: red;
    width: 100%;
    margin-top: 65px;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  .pd-row {
    height: 50px;
    border-bottom: #f2f2f2 solid 1px;
    position: relative;
    padding-left: 7px;
    padding-right: 7px;
  }
  .pd-row img {
    width: 20px;
    height: 20px;
  }
  .pad-row span {
    font-size: 14px;
    color: black;
  }
  .pd-radio {
    width: 20px;
    height: 20px;
    background-image: url("../assets/radio_n.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .pd-radio2 {
    background-image: url("../assets/radio_y.png");
  }
  .pd-btn {
    width: calc(100% - 14px * 2);
    position: relative;
    height: 40px;
    margin-left: 14px;
    margin-right: 14px;
    font-size: 14px;
    color: white;
    margin-top: 20px;
    background: #BED4FD;
    border-radius: 5px;
    border-style: none;
  }
  .pd-btn2 {
    background: #3379FD;
  }
</style>
