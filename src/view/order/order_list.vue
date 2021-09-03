<template>
  <div id="order_list">
    <ToolBar :title="title"/>
    <div class="ol-page b-l flex-row ct" v-bind:style="{marginTop: androidStatusBarHeight + 'px'}">
      <div class="ol-page-i flex" v-bind:class="[index === pageIndex ? 'ol-page-i2' : '']" v-on:click="pageItemClick(index)"
           v-for="(item,index) in pageList" :key="index">{{item}}</div>
    </div>
    <div class="ol-list" v-bind:style="{marginTop: olListMarginTop + 'px'}">
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
        <div class="ol-list-item" v-for="(fatherItem,fatherIndex) in 10" :key="fatherIndex">
          <div class="ol-item-1 b-l" v-on:click="itemClick(fatherItem,fatherIndex)">
            <span class="ol-item-no">订单编号：1000001</span>
            <span class="ol-item-state">待付款</span>
          </div>
          <div class="ol-item-shop b-l" v-on:click="itemClick(fatherItem,fatherIndex)" v-for="(item,index) in (fatherIndex + 1)" :key="index">
            <img src="../../assets/load.png" alt="">
            <div class="ol-item-shop-r">
              <div class="ol-item-shop-name txt-1">标题标题标题标题标题标题标题</div>
              <span class="ol-item-shop-sku txt-1">红色-M</span>
              <div class="ol-item-shop-price">￥109 <span>x{{index + 1}}</span></div>
            </div>
          </div>
          <div class="ol-item-xj b-l" v-on:click="itemClick(fatherItem,fatherIndex)">
            <span>数量：x10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价格：￥1000</span>
          </div>
          <div class="ol-item-btn">
            <button class="ol-item-btn1">查看物流</button>
            <button class="ol-item-btn1 ol-item-btn2">提醒发货</button>
            <button class="ol-item-btn1">取消订单</button>
          </div>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ToolBar from '../../components/ToolBar'
import {PullRefresh, Dialog, Toast} from 'vant'
Vue.use(PullRefresh)
Vue.use(Dialog)
Vue.use(Toast)
export default {
  name: 'order_list',
  components: {ToolBar},
  data () {
    return {
      title: '订单列表',
      androidStatusBarHeight: 0,
      olListMarginTop: 97,
      pageIndex: 0,
      pageList: ['全部', '待付款', '待收货', '已完成'],
      orderList: [],
      isRefresh: false,
      isLoadMore: false,
      noLoadMoreData: false,
      state: 0
    }
  },
  methods: {
    itemClick: function (item, index) {
      this.$router.push({
        path: '/order_info',
        params: {
          id: item.id
        }
      })
    },
    onRefresh: function () {
      var that = this
      setTimeout(() => {
        that.isRefresh = false
      }, 500)
    },
    pageItemClick: function (index) {
      this.pageIndex = index
    }
  },
  mounted () {
    var type = this.$route.query.type
    if (type !== undefined) {
      this.pageIndex = parseInt(type)
    }
    if (this.phoneType.isApp()) {
      if (this.phoneType.isAndroid()) {
        var statusBarHeight = window.ops.getSBarHeight()
        this.androidStatusBarHeight = statusBarHeight
        this.olListMarginTop = 97 + statusBarHeight
      }
    }
  }
}
</script>

<style scoped>
  #order_list{}
  .b-l {
    border-bottom: #f2f2f2 solid 1px;
  }
  .ol-page {
    height: 40px;
    width: 100%;
    background: white;
    position: fixed;
    top: 50px;
    color: #91919C;
    font-size: 14px;
    z-index: 1;
  }
  .ol-page-i {
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .ol-page-i2 {
    color: #3379FD;
    border-bottom: #3379FD solid 1px;
  }
  .ol-list {
    position: relative;
    margin-top: 97px;
  }
  .ol-list-item {
    position: relative;
    background: white;
    border-radius: 7px;
    margin-left: 13px;
    margin-right: 13px;
    margin-bottom: 7px;
  }
  .ol-item-1 {
    position: relative;
    height: 40px;
    line-height: 40px;
    width: 100%;
    font-size: 14px;
  }
  .ol-item-no {
    position: absolute;
    left: 7px;
    bottom: 0;
    color: #222222;
  }
  .ol-item-state {
    position: absolute;
    right: 7px;
    bottom: 0;
    color: red;
  }
  .ol-item-shop {
    position: relative;
    height: 80px;
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
  .ol-item-xj {
    position: relative;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #91919C;
    text-align: right;
    padding-right: 7px;
  }
  .ol-item-btn {
    position: relative;
    height: 50px;
    text-align: right;
    margin-right: 7px;
    margin-left: 7px;
    font-size: 12px;
    color: #91919C;
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
