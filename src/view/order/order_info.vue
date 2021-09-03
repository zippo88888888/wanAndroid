<template>
  <div id="order_info">
    <ToolBar :title="title"/>
    <div class="oi-s" v-bind:style="{marginTop: oisMarginTop + 'px'}">
      <div class="oi-s-1">
        <div>待付款</div>
        <span>还剩10天自动取消订单</span>
      </div>
      <img src="../../assets/ic_order_info_bg.png" alt="">
    </div>
    <div class="oi-address" v-bind:style="{top: oiaddressTop + 'px'}">
      <img src="../../assets/order_info_address.png" alt="">
      <div class="oi-address-r flex-column ct">
        <div class="oi-address-r-1">上官浩淇<span>17712346321</span></div>
        <div class="oi-address-r-2 txt-2">上海市闵行区浦江镇汇臻路999弄999号909</div>
      </div>
    </div>
    <div class="oi-list">
      <div class="ol-item-shop b-l" v-for="(item,index) in 5" :key="index">
        <img src="../../assets/load.png" alt="">
        <div class="ol-item-shop-r">
          <div class="ol-item-shop-name txt-1">标题标题标题标题标题标题标题</div>
          <span class="ol-item-shop-sku txt-1">红色-M</span>
          <div class="ol-item-shop-price">￥109 <span>x{{index + 1}}</span></div>
        </div>
      </div>
    </div>
    <div class="oi-money">
      <div class="co-order-ps m-l">配送方式<span class="m-r">普通快递</span></div>
      <div class="co-order-ps m-l m-t">运费<span class="m-r">￥0</span></div>
      <div class="co-order-ps m-l m-t">数量<span class="m-r">x10</span></div>
      <div class="co-order-ps m-l m-t">价格<span class="m-r">￥10920</span></div>
      <div class="co-order-ps m-l m-t">优惠<span class="m-r">￥100</span></div>
      <div class="co-order-ps m-l m-t">总计<span class="m-r co-order-price-txt">￥9920</span></div>
    </div>
    <div class="oi-order">
      <span class="oi-order-t">订单信息</span>
      <div class="m-t"><span class="oi-order-l">订单号</span><span class="oi-order-r txt-1">1486415156451515</span></div>
      <div class="m-t"><span class="oi-order-l">订单时间</span><span class="oi-order-r txt-1">2021-09-01 23:00</span></div>
      <div class="m-t"><span class="oi-order-l">下单时间</span><span class="oi-order-r txt-1">2021-09-01 23:02</span></div>
      <div class="m-t"><span class="oi-order-l">支付时间</span><span class="oi-order-r txt-1">2021-09-01 23:02</span></div>
    </div>
    <div class="oi-btn">
      <button class="ol-item-btn1">查看物流</button>
      <button class="ol-item-btn1 ol-item-btn2">提醒发货</button>
      <button class="ol-item-btn1 m-r">取消订单</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ToolBar from '../../components/ToolBar'
import {Dialog, Toast} from 'vant'
Vue.use(Dialog)
Vue.use(Toast)
export default {
  name: 'order_info',
  components: {ToolBar},
  data () {
    return {
      title: '订单详情',
      oisMarginTop: 50,
      oiaddressTop: 135
    }
  },
  mounted () {
    if (this.phoneType.isApp()) {
      if (this.phoneType.isAndroid()) {
        var statusBarHeight = window.ops.getSBarHeight()
        this.oisMarginTop = 50 + statusBarHeight
        this.oiaddressTop = 135 + statusBarHeight
      }
    }
  }
}
</script>

<style scoped>
  #order_info{}
  .oi-s {
    position: relative;
    margin-top: 50px;
    height: 120px;
    background: #91919C;
  }
  .oi-s img {
    width: 80px;
    height: 80px;
    position: absolute;
    right: 0;
    bottom: 0;
    object-fit: cover;
  }
  .oi-s-1 {
    position: relative;
    color: white;
    padding-top: 18px;
  }
  .oi-s-1 div {
    position: relative;
    font-size: 24px;
    font-weight: bold;
    margin-left: 13px;
  }
  .oi-s-1 span {
    display: inline-block;
    position: relative;
    font-size: 14px;
    margin-left: 13px;
    margin-top: 3px;
  }
  .oi-address {
    position: absolute;
    background: white;
    border-radius: 5px;
    height: 80px;
    width: calc(100% - 10px * 2);
    top: 135px;
    margin-left: 10px;
  }
  .oi-address img {
    width: 36px;
    height: 36px;
    position: absolute;
    left: 10px;
    top: 22px;
  }
  .oi-address-r {
    position: relative;
    margin-left: 58px;
    margin-right: 10px;
    height: 100%;
    text-align: left;
    overflow: hidden;
  }
  .oi-address-r-1 {
    position: relative;
    width: 100%;
    color: black;
    font-size: 15px;
    text-align: left;
  }
  .oi-address-r-1 span {
    color: #91919C;
    margin-left: 5px;
    font-size: 13px;
  }
  .oi-address-r-2 {
    position: relative;
    color: black;
    font-size: 15px;
    width: 100%;
    margin-top: 3px;
  }
  .oi-list {
    position: relative;
    margin-top: 55px;
  }
  .ol-item-shop {
    position: relative;
    height: 80px;
    background: white;
    border-bottom: #f2f2f2 solid 1px;
  }
  .ol-item-shop img {
    width: 90px;
    height: 60px;
    object-fit: cover;
    position: absolute;
    top: 10px;
    left: 7px;
  }
  .ol-item-shop-r {
    position: relative;
    margin-left: 103px;
    height: 100%;
    font-size: 13px;
  }
  .ol-item-shop-name {
    position: relative;
    font-size: 14px;
    top: 5px;
  }
  .ol-item-shop-sku {
    position: relative;
    display: inline-block;
    margin-top: 10px;
    padding-left: 7px;
    padding-right: 7px;
    color: #91919C;
    background: #f2f2f2;
  }
  .ol-item-shop-price {
    position: absolute;
    left: 0;
    bottom: 5px;
    width: 100%;
    color: #91919C;
  }
  .ol-item-shop-price span {
    position: absolute;
    right: 7px;
    bottom: 0;
  }
  .oi-money {
    position: relative;
    background: white;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 3px;
    margin-right: 3px;
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
  .co-order-price-txt {
    color: red;
    font-weight: bold;
  }
  .oi-order {
    position: relative;
    margin-top: 15px;
    padding: 10px;
    background: white;
    margin-bottom: 60px;
  }
  .oi-order-t {
    color: black;
    font-size: 15px;
  }
  .oi-order-l {
    display: inline-block;
    position: relative;
    width: 90px;
    color: black;
    font-size: 13px;
  }
  .oi-order-r {
    position: relative;
    color: #91919C;
    font-size: 13px;
  }
  .oi-btn {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: right;
    font-size: 12px;
    color: #91919C;
    background: white;
    border-top: #f2f2f2 solid 1px;
  }
  .ol-item-btn1 {
    position: relative;
    height: 28px;
    margin-top: 11px;
    margin-left: 10px;
    background: white;
    border-radius: 5px;
    border-style: solid;
    border-color: #f2f2f2;
    border-width: 1px;
  }
  .ol-item-btn2 {
    background: #3379FD;
    color: white;
    border-style: none;
  }
</style>
