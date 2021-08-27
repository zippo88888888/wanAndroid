<template>
  <div id="Car">
    <ToolBar :title="title" :show-right-txt="true" :right-txt="rightTitle" :right-click="editClick"/>
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <div class="cell-layout">
        <!-- :before-close="beforeClose" -->
        <van-swipe-cell class="cell" ref="cell" v-for="(item,index) in carList" :key="index">
          <div class="cell-item">
            <van-checkbox @click="itemBoxClick(item,index)" class="cell-check" icon-size="20px" v-model="item.checked"></van-checkbox>
            <img src="../../assets/load.png" alt="">
            <div class="cell-shop">
              <div class="shop-title txt-1">{{item.shopName}}</div>
              <div class="shop-sku txt-1">{{item.shopSku}}</div>
              <div class="shop-price">
                <span>￥{{item.price}}</span>
                <van-stepper integer @plus="itemPlus" @minus="itemMinus" @blur="itemStepperBlur" class="shop-price-count" v-model.number="item.count"/>
              </div>
            </div>
          </div>
          <template #right>
            <div class="cell-delete" v-on:click="itemDelete(item,index)">删除</div>
          </template>
        </van-swipe-cell>
      </div>
    </van-pull-refresh>
    <div class="bottom-edit">
      <van-checkbox @click="allBoxClick" class="check-all" icon-size="20px" v-model="allChecked">全选</van-checkbox>
      <div class="shop-all-edit" v-show="!isEdit">
        <div class="shop-all-price">共计：<span>￥{{allPrice}}</span></div>
        <div class="shop-all-btn" v-on:click="toBuy">去结算</div>
      </div>
      <div class="shop-all-edit" v-show="isEdit">
        <div class="shop-all-btn shop-all-del" v-on:click="deleteAll">删除选中</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ToolBar from '../../components/ToolBar'
import {SwipeCell, Stepper, Checkbox, CheckboxGroup, PullRefresh, Dialog, Toast} from 'vant'
Vue.use(SwipeCell)
Vue.use(Stepper)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(PullRefresh)
Vue.use(Dialog)
Vue.use(Toast)
export default {
  name: 'Car',
  components: {ToolBar},
  data () {
    return {
      title: '购物车',
      rightTitle: '编辑',
      isRefresh: false,
      isEdit: false,
      allChecked: false,
      allPrice: 0,
      carList: [
        {shopName: '机械键盘-红轴-二次元', shopSku: '红轴-红色撞色', price: 1000, count: 1, checked: false},
        {shopName: '机械键盘-青轴-両西', shopSku: '青轴-灰色黄色撞色', price: 1999, count: 1, checked: false},
        {shopName: '罗技电竞鼠标-G920', shopSku: 'G920', price: 899, count: 1, checked: false},
        {shopName: 'ROG Z490、Inter 酷睿 i9-11900K', shopSku: '板U套装', price: 7999, count: 1, checked: false},
        {shopName: '联想-拯救者-Y9000K-32G-1TB-RTX3080', shopSku: '白色-RTX3080', price: 15999, count: 1, checked: false}
      ]
    }
  },
  methods: {
    // beforeClose ({position, instance}) {
    //   if (position === 'right') {
    //     Dialog.confirm({
    //       title: '温馨提示',
    //       message: '您确认要删除吗？',
    //       confirmButtonText: '删除'
    //     }).then(() => {
    //       instance.close()
    //     }).catch(() => {
    //       console.log('nothing')
    //       instance.close()
    //     })
    //   } else {
    //     instance.close()
    //   }
    // },
    onRefresh: function () {
      var that = this
      setTimeout(() => {
        that.isRefresh = false
        that.isEdit = false
        that.rightTitle = '编辑'
        that.allChecked = false
        that.allPrice = 0
        that.carList.forEach(item => {
          item.checked = false
        })
      }, 300)
    },
    editClick: function () {
      this.isEdit = !this.isEdit
      this.rightTitle = this.isEdit ? '完成' : '编辑'
      this.allChecked = false
      this.allPrice = 0
      this.carList.forEach(item => {
        item.checked = false
      })
    },
    itemBoxClick: function (item, index) {
      if (item.checked) {
        this.allChecked = this.isAllBoxChecked()
      } else {
        this.allChecked = false
      }
      this.getSelectedPrice()
    },
    itemStepperBlur: function () {
      this.itemPlus()
    },
    itemPlus: function () { // 加
      this.itemMinus()
    },
    itemMinus: function () { // 减
      setTimeout(() => {
        this.getSelectedPrice()
      }, 150)
    },
    itemDelete: function (item, index) { // 单个删除
      var that = this
      Dialog.confirm({
        title: '温馨提示',
        message: '您确认要删除吗？',
        confirmButtonText: '删除'
      }).then(() => {
        that.carList.splice(index, 1)
        that.allChecked = that.isAllBoxChecked()
        that.getSelectedPrice()
      }).catch(() => {
        console.log('nothing')
      })
    },
    isAllBoxChecked: function () { // 检查是否已经全部选中
      var isAllChecked = true
      this.carList.every((item, index) => {
        if (!item.checked) {
          isAllChecked = false
          return false
        } else {
          return true
        }
      })
      return isAllChecked
    },
    getSelectedPrice: function () { // 获取已选中商品的总价格
      var price = 0
      this.carList.forEach(item => {
        if (item.checked) {
          price = price + item.price * item.count
        }
      })
      this.allPrice = price
    },
    getSelectedList: function () { // 获取已选中的商品
      var selectedList = []
      this.carList.forEach(item => {
        if (item.checked) {
          selectedList.push(item)
        }
      })
      return selectedList
    },
    allBoxClick: function () {
      this.carList.forEach(item => {
        item.checked = this.allChecked
      })
      this.getSelectedPrice()
    },
    toBuy: function () {
      var selectedList = this.getSelectedList()
      if (selectedList.length > 0) {
        selectedList.forEach(item => {
          console.log('选中的商品 ' + item.shopName)
        })
        this.$router.push({
          path: '/corder'
        })
      } else {
        Toast('请至少选中一个商品')
      }
    },
    deleteAll: function () {
      var that = this
      var selectedList = this.getSelectedList()
      if (selectedList.length > 0) {
        Dialog.confirm({
          title: '温馨提示',
          message: '您确认要删除选中的商品吗？',
          confirmButtonText: '删除'
        }).then(() => {
          var newList = []
          that.carList.forEach(item => {
            var i = selectedList.indexOf(item)
            if (i === -1) {
              newList.push(item)
            }
          })
          that.carList = []
          that.carList = newList
          that.isEdit = !that.isEdit
          that.rightTitle = '编辑'
          that.allPrice = 0
        }).catch(() => {
          console.log('nothing')
        })
      } else {
        Toast('请至少选中一个商品')
      }
    }
  }
}
</script>

<style scoped>
  .cell-layout {
    position: relative;
    margin-top: 57px;
    margin-bottom: 57px;
  }
  .cell {
    position: relative;
    background: white;
    margin-bottom: 7px;
  }
  .cell-item {
    height: 120px;
  }
  .cell-check {
    position: absolute;
    top: 50px;
    left: 7px;
  }
  .cell-item img {
    width: 120px;
    height: 100px;
    position: absolute;
    left: 34px;
    top: 10px;
    object-fit: cover;
  }
  .cell-shop {
    position: relative;
    margin-left: 162px;
    height: calc(100% - 7px * 2);
    top: 7px;
    margin-right: 7px;
  }
  .shop-title {
    text-align: left;
    font-size: 14px;
    color: black;
    position: relative;
  }
  .shop-sku {
    position: relative;
    margin-top: 7px;
    padding-left: 10px;
    padding-right: 10px;
    background: #f2f2f2;
    color: #222222;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: left;
  }
  .shop-price {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #3379FD;
  }
  .shop-price span {
    position: absolute;
    color: red;
    bottom: 5px;
    left: 0;
    font-size: 14px;
    font-weight: bold;
  }
  .shop-price-count {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .cell-delete {
    width: 50px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    color: white;
    font-size: 14px;
    background: red;
  }
  .bottom-edit {
    position: fixed;/* fixed */
    width: 100%;
    bottom: 0;
    height: 50px;
    left: 0;
    z-index: 1;
    background: white;
    border-top: solid #f2f2f2 1px;
  }
  .check-all {
    position: absolute;
    top: 15px;
    left: 7px;
  }
  .shop-all-edit {
    position: relative;
    margin-left: 100px;
    height: 100%;
    color: black;
    font-size: 14px;
  }
  .shop-all-price {
    position: relative;
    text-align: left;
  }
  .shop-all-price span {
    font-weight: bold;
    color: red;
    line-height: 50px;
  }
  .shop-all-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 100%;
    line-height: 50px;
    text-align: center;
    color: white;
    width: 100px;
    background: chocolate;
  }
  .shop-all-del {
    background: red;
  }
</style>
