<template>
  <div id="confirm_order">
    <ToolBar :title="title" />
    <div class="co-address" v-on:click="selectAddress" v-show="hasAddress">
      <span class="co-address-d m-l m-r" v-show="addressBean.isDefault === 1">默认</span>
      <div class="co-address-a m-l">{{addressBean.address}}</div>
      <div class="co-address-info m-l m-r txt-2">{{addressBean.addressInfo}}</div>
      <div class="co-address-people m-t m-l m-r">{{addressBean.name}} {{addressBean.phone}}</div>
      <img src="../../assets/ic_jt_y.png" alt="address">
    </div>
    <div class="co-address2 m-t flex-row ct" v-on:click="selectAddress" v-show="!hasAddress">
      <img src="../../assets/add.png" alt="">
      <span>请先添加收货地址信息</span>
    </div>
    <div class="co-order m-t">
      <span class="co-order-t1 m-l">商品信息</span>
      <div class="co-order-list m-t" v-for="i in 10" :key="i">
        <img src="../../assets/load.png" alt="">
        <div class="co-order-shop m-r">
          <div class="co-order-title txt-2">联想-拯救者-Y9000K-i911900k-32G-1TB-RTX308012G 新一代光追</div>
          <div class="co-order-sku txt-1">白色-RTX3080</div>
          <div class="co-order-price"><span>￥ 15999</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x1</div>
        </div>
      </div>
    </div>
    <div class="co-order-money m-t">
      <div class="co-order-ps m-l">配送方式<span class="m-r">普通快递</span></div>
      <div class="co-order-ps m-l m-t">运费<span class="m-r">￥0</span></div>
      <div class="co-order-ps m-l m-t">数量<span class="m-r">x10</span></div>
      <div class="co-order-ps m-l m-t">价格<span class="m-r">￥10920</span></div>
      <div class="co-order-ps m-l m-t">优惠<span class="m-r">￥100</span></div>
      <div class="co-order-ps m-l m-t">总计<span class="m-r co-order-price-txt">￥9920</span></div>
    </div>
    <div class="co-order-buy">
      <van-checkbox class="co-order-box" icon-size="15px" v-model="agreenXY"></van-checkbox>
      <div class="co-order-xy">同意<span v-on:click="xyClick"> 猿家店服务协议</span></div>
      <div class="co-order-pay" v-on:click="pay">支付</div>
    </div>
    <PayDialog :show-dialog="showPayDialog" :order-no="orderNo" :shop-price="shopPrice" @closePayDialog="closePayDialog"/>
  </div>
</template>

<script>
import eventBus from '../../util/eventbus.js'
import Vue from 'vue'
import ToolBar from '../../components/ToolBar'
import {Checkbox, CheckboxGroup, Dialog, Toast} from 'vant'
import PayDialog from '../../components/PayDialog'
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Dialog)
Vue.use(Toast)
export default {
  name: 'confirm_order',
  components: {PayDialog, ToolBar},
  data () {
    return {
      title: '确认订单',
      showPayDialog: false,
      shopPrice: 1000, // 商品总价格
      orderNo: '', // 订单编号
      hasAddress: false, // 是否有地址信息
      addressBean: {id: '', code: '', name: '', phone: '', address: '', addressInfo: '', isDefault: 1},
      agreenXY: false
    }
  },
  methods: {
    selectAddress: function () {
      this.$router.push({
        path: '/address_list',
        query: {
          type: 1
        }
      })
    },
    xyClick: function () {
      Toast('协议')
    },
    pay: function () {
      if (this.hasAddress) {
        if (this.agreenXY) {
          this.showPayDialog = true
        } else {
          Toast('请同意服务协议')
        }
      } else {
        Toast('请选择收货信息')
      }
    },
    closePayDialog: function () {
      this.showPayDialog = false
    }
  },
  created () {
    // TODO 因为 跳转到地址管理页面，然后什么都不进行操作的话直接返回到确认订单页面，那么这个确认订单页面会重新加载、地址信息还是原来的
    // TODO 没有任何改变，所以页面也会保持最开始的那样！不会有地址信息显示在界面上，害我在这里搞了半天
    var that = this
    eventBus.$on('selectedAddress', (data) => {
      if (data.id !== undefined) {
        that.hasAddress = true
        that.addressBean.id = data.id
        that.addressBean.code = data.code
        that.addressBean.name = data.name
        that.addressBean.phone = data.phone
        that.addressBean.address = data.address
        that.addressBean.addressInfo = data.addressInfo
        that.addressBean.isDefault = data.isDefault
        console.log('收到 EventBus事件：selectedAddress --->' + data.addressInfo)
      }
    })
  },
  beforeDestroy () {
    eventBus.$off('selectedAddress')
    console.log('销毁 EventBus事件：selectedAddress')
  }
}
</script>

<style scoped>
  .co-address {
    position: relative;
    margin-top: 57px;
    background: white;
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .co-address-d {
    background: #3379FD;
    border-radius: 3px;
    color: white;
    font-size: 12px;
    position: relative;
    width: 30px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    float: left;
  }
  .co-address-a {
    font-size: 13px;
    color: black;
    height: 20px;
    line-height: 20px;
    position: relative;
  }
  .co-address-info {
    position: relative;
    color: black;
    margin-top: 7px;
    font-size: 14px;
  }
  .co-address-people {
    position: relative;
    font-size: 13px;
    color: black;
  }
  .co-address img {
    position: absolute;
    right: 7px;
    width: 20px;
    height: 20px;
    top: 50%;
    transform: translate(0,-50%);
  }
  .co-address2 {
    position: relative;
    height: 80px;
    background: white;
    margin-top: 57px;
  }
  .co-address2 img {
    width: 15px;
    height: 15px;
  }
  .co-address2 span {
    color: black;
    font-size: 16px;
    margin-left: 10px;
  }
  .co-order {
    position: relative;
    background: white;
  }
  .co-order-t1 {
    position: relative;
    font-size: 15px;
    font-weight: bold;
    color: black;
    top: 7px;
  }
  .co-order-list {
    position: relative;
    height: 90px;
    border-bottom: #f2f2f2 solid 1px;
  }
  .co-order-list img {
    width: 90px;
    height: 70px;
    position: absolute;
    left: 7px;
    top: 10px;
  }
  .co-order-shop {
    position: relative;
    margin-left: 104px;
    height: 100%;
  }
  .co-order-title {
    color: black;
    font-size: 12px;
    position: relative;
    top: 7px;
  }
  .co-order-sku {
    background: #f2f2f2;
    position: relative;
    font-size: 12px;
    margin-top: 10px;
  }
  .co-order-price {
    position: absolute;
    bottom: 10px;
    left: 0;
    font-size: 12px;
    color: black;
  }
  .co-order-price-txt {
    color: red;
    font-weight: bold;
  }
  .co-order-money {
    position: relative;
    background: white;
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .co-order-ps {
    position: relative;
    color: black;
    font-size: 13px;
  }
  .co-order-ps span {
    position: absolute;
    right: 0;
  }
  .co-order-buy {
    position: relative;
    background: white;
    margin-top: 14px;
    height: 40px;
  }
  .co-order-box {
    position: absolute;
    left: 7px;
    top: 50%;
    transform: translate(0,-50%);
  }
  .co-order-xy {
    position: relative;
    height: 40px;
    line-height: 40px;
    color: black;
    font-size: 13px;
    margin-left: 30px;
  }
  .co-order-xy span {
    color: #3379FD;
  }
  .co-order-pay {
    position: absolute;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: chocolate;
    color: white;
    font-size: 14px;
    right: 0;
    bottom: 0;
  }
</style>
