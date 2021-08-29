<template>
  <div id="address_edit">
   <ToolBar :title="title"/>
     <div class="ae-l ae-l-height flex-row ct m-bar">
      <span>收货人</span>
      <input class="flex" type="text" placeholder="请输入收货人姓名" maxlength="20" v-model="name"/>
    </div>
    <div class="ae-l ae-l-height flex-row ct">
      <span>收货人手机号</span>
      <input class="flex" type="text" placeholder="请输入收货人手机号" maxlength="11" v-model="phone"/>
    </div>
    <div class="ae-l ae-l-height flex-row ct" v-on:click="selectedArea">
      <span>地址信息</span>
      <input class="flex txt-1" type="text" readonly placeholder="请选择" maxlength="50" v-model="address"/>
      <img src="../../assets/ic_jt_y.png">
    </div>
    <div class="ae-l flex-row">
      <span class="m-tt">详细地址</span>
      <textarea class="flex m-tt m-bb" placeholder="如道路、门牌号、小区、楼栋号等" maxlength="80" v-model="addressInfo">
      </textarea>
    </div>
    <div class="ae-l ae-l-height flex-row ct">
      <span>邮编</span>
      <input class="flex" type="text" placeholder="(非必填)请输入邮编" maxlength="6" v-model="code"/>
    </div>
    <div class="ae-l ae-l-height flex-row ct">
      <span>设为默认</span>
      <div class="flex"></div>
      <van-switch v-model="isDefault" size="20px" />
    </div>
    <div class="ae-bottom"><button>确认</button></div>
    <AreaDialog :show-dialog="areaDialogShow" @closeAreaDialog="closeAreaDialog" @selectedAreaResult="selectedAreaResult"/>
  </div>
</template>

<script>
import Vue from 'vue'
import ToolBar from '../../components/ToolBar'
import {Dialog, Toast, Switch} from 'vant'
import AreaDialog from '../../components/AreaDialog'
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(Switch)
export default {
  name: 'address_edit',
  components: {AreaDialog, ToolBar},
  data () {
    return {
      areaDialogShow: false,
      title: '',
      id: '',
      name: '',
      phone: '',
      address: '',
      addressInfo: '',
      code: '',
      isDefault: false
    }
  },
  methods: {
    selectedArea: function () {
      this.areaDialogShow = true
    },
    selectedAreaResult: function (province, city, area, code) {
      this.address = province + city + area
      this.areaDialogShow = false
    },
    closeAreaDialog: function () {
      this.areaDialogShow = false
    }
  },
  mounted () {
    const params = this.$route.params
    this.title = params.type === '0' ? '新增地址' : '编辑地址'
    this.id = params.id
    this.name = params.name
    this.phone = params.phone
    this.address = params.address
    this.addressInfo = params.addressInfo
    this.code = params.code
    this.isDefault = params.isDefault === 1
  }
}
</script>

<style scoped>
  .m-tt {
    margin-top: 12px;
  }
  .m-bb {
    margin-bottom: 12px;
  }
  .ae-l {
    position: relative;
    background: white;
    padding-left: 14px;
    padding-right: 14px;
    margin-bottom: 1px;
    font-size: 13px;
    color: black;
  }
  .ae-l-height {
    height: 45px;
  }
  .ae-l span {
    width: 100px;
  }
  .ae-l input {
    color: #333333;
    border-style: none;
  }
  .ae-l textarea {
    box-sizing: border-box;
    border-style: none;
    height: 50px;
    color: black;
    font-size: 13px;
    resize: none;
    overflow: hidden;
  }
  .ae-l img {
    width: 10px;
    height: 10px;
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
  .ae-bottom {
    position: fixed;
    bottom: 0;
    height: 60px;
    width: 100%;
    border-top: #f2f2f2 solid 1px;
    background: white;
  }
  .ae-bottom button {
    position: relative;
    margin-top: 10px;
    margin-left: 14px;
    margin-right: 14px;
    width: calc(100% - 14px * 2);
    height: 40px;
    background: #3379FD;
    border-radius: 5px;
    border-style: none;
    color: white;
    font-size: 14px;
  }
</style>
