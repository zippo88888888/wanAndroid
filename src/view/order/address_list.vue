<template>
  <div id="address_list">
    <ToolBar :title="title"/>
    <div class="al-empty" v-bind:style="{marginTop : emptyMarginTop + 'px'}"></div>
    <div class="al-list">
      <div class="al-list-d m-b" v-for="(item,index) in addressList" :key="index">
        <div class="al-item-1" v-on:click="itemClick(item)">
          <span class="al-item1-name m-t">{{item.name}}</span>
          <span class="al-item1-mobile m-t">{{item.phone}}</span>
        </div>
        <div class="al-item-address m-t txt-2" v-on:click="itemClick(item)">{{item.address}}{{item.addressInfo}}</div>
        <div class="line"></div>
        <div class="al-item-call">
          <span class="al-item-default" v-show="item.isDefault === 1">默认地址</span>
          <div class="al-item-call-1 al-item-edit flex-row ct" v-on:click="editAddress(item)">
            <img src="../../assets/ic_address_edit.png" alt="">编辑
          </div>
          <div class="al-item-call-1 al-item-del flex-row ct" v-on:click="deleteAddress(item,index)">
            <img src="../../assets/ic_address_del.png" alt="">删除
          </div>
        </div>
      </div>
    </div>
    <div class="ae-bottom" v-on:click="addAddress"><button>新增</button></div>
  </div>
</template>

<script>
import eventBus from '../../util/eventbus.js'
import Vue from 'vue'
import ToolBar from '../../components/ToolBar'
import {Dialog, Toast} from 'vant'
Vue.use(Dialog)
Vue.use(Toast)
export default {
  name: 'address_list',
  components: {ToolBar},
  data () {
    return {
      title: '地址管理',
      emptyMarginTop: 57,
      type: 0, // 0表示从个人中心跳转；1表示 确认订单
      waitSelectedAddressBean: {},
      addressList: [
        {id: '1', code: '', name: '张三0', phone: '17809892234', address: '上海市上海市黄浦区', addressInfo: '青黄岛路上海市黄浦区青黄岛路', isDefault: 1},
        {id: '2', code: '', name: '张三1', phone: '17809892234', address: '上海市上海市黄浦区', addressInfo: '杨树浦路上海市黄浦区杨树浦路', isDefault: 0},
        {id: '3', code: '', name: '张三2', phone: '17809892234', address: '上海市上海市黄浦区', addressInfo: '天张璐上海市黄浦区天张璐', isDefault: 0},
        {id: '4', code: '', name: '张三3', phone: '17809892234', address: '上海市上海市黄浦区', addressInfo: '外码头上海市黄浦区外码头', isDefault: 0}
      ]
    }
  },
  methods: {
    itemClick: function (item) {
      console.log('itemClick this.type ---> ' + this.type)
      if (this.type.toString() === '1') {
        this.waitSelectedAddressBean = item
        this.$router.onBack()
      } else {
        console.log('不是从确认订单跳转的，itemClick 点击无效')
      }
    },
    addAddress: function () {
      this.$router.push({
        name: '/address_edit',
        params: {
          type: '0'
        }
      })
    },
    deleteAddress: function (item, index) {
      var that = this
      Dialog.confirm({
        title: '温馨提示',
        message: '您确认要删除吗？',
        confirmButtonText: '删除'
      }).then(() => {
        that.addressList.splice(index, 1)
      }).catch(() => {
        console.log('nothing')
      })
    },
    editAddress: function (item) {
      this.$router.push({
        name: '/address_edit',
        params: {
          type: '1',
          id: item.id,
          name: item.name,
          phone: item.phone,
          address: item.address,
          addressInfo: item.addressInfo,
          code: item.code,
          isDefault: item.isDefault
        }
      })
    }
  },
  created () {
    var type = this.$route.query.type
    console.log('跳转到地址管理 type ---> ' + type)
    this.type = type
    console.log('跳转到地址管理 this.type ---> ' + this.type)
  },
  mounted () {
    if (this.phoneType.isApp()) {
      if (this.phoneType.isAndroid()) {
        var statusBarHeight = window.ops.getSBarHeight()
        this.emptyMarginTop = 57 + statusBarHeight
      }
    }
  },
  beforeDestroy () {
    var that = this
    if (this.type.toString() === '1' && this.waitSelectedAddressBean.id !== undefined) {
      console.log('从确认订单跳转的，需要将值传到确认订单 --->' + this.waitSelectedAddressBean.id)
      eventBus.$emit('selectedAddress', {
        id: that.waitSelectedAddressBean.id,
        code: that.waitSelectedAddressBean.code,
        name: that.waitSelectedAddressBean.name,
        phone: that.waitSelectedAddressBean.phone,
        address: that.waitSelectedAddressBean.address,
        addressInfo: that.waitSelectedAddressBean.addressInfo,
        isDefault: that.waitSelectedAddressBean.isDefault
      })
    }
  }
}
</script>

<style scoped>
  #address_list{
    position: relative;
  }
  .al-empty {
    position: relative;
    margin-top: 57px;
  }
  .al-list {
    position: relative;
    margin-bottom: 67px;
  }
  .al-list-d {
    background: white;
    position: relative;
  }
  .al-item-1 {
    position: relative;
    color: black;
    font-size: 14px;
    height: 30px;
    padding-top: 3px;
  }
  .al-item1-name {
    position: absolute;
    margin-left: 14px;
  }
  .al-item1-mobile {
    position: absolute;
    right: 14px;
  }
  .al-item-address {
    position: relative;
    padding-left: 14px;
    padding-right: 14px;
    margin-bottom: 14px;
    color: #91919C;
    font-size: 12px;
  }
  .al-item-call {
    position: relative;
    height: 35px;
  }
  .al-item-default {
    color: red;
    font-size: 12px;
    line-height: 35px;
    position: relative;
    margin-left: 14px;
  }
  .al-item-call-1 {
    position: absolute;
    width: 80px;
    height: 35px;
    bottom: 0;
    font-size: 12px;
    color: #91919C;
    border-left: #f2f2f2 solid 1px;
  }
  .al-item-call-1 img {
    width: 13px;
    height: 13px;
    margin-right: 4px;
  }
  .al-item-edit {
    position: absolute;
    right: 80px;
  }
  .al-item-del {
    right: 0;
  }
</style>
