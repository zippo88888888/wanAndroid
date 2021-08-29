<template>
  <div id="AreaDialog">
    <van-popup v-model="dialogShow" position="bottom"  @click-overlay="cancel">
      <van-area title="地区" :area-list="areaList" :visible-item-count="5" @confirm="down" @cancel="cancel" @change="change"/>
    </van-popup>
  </div>
</template>

<script>
import areaList from '../components/city/area'
import Vue from 'vue'
import {Popup, Area} from 'vant'
Vue.use(Popup)
Vue.use(Area)
export default {
  name: 'AreaDialog',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogShow: false,
      areaList: areaList,
      province: '北京市', // 省
      city: '北京市', // 市
      area: '东城区', // 县
      code: '110101' // 县级代码
    }
  },
  methods: {
    cancel: function () {
      this.$emit('closeAreaDialog')
    },
    down: function () {
      console.log('选中的省市区--->' + this.province + this.city + this.area + this.code)
      this.$emit('selectedAreaResult', this.province, this.city, this.area, this.code)
    },
    change: function (picker, value, index) {
      this.province = value[0]['name']
      this.city = value[1]['name']
      this.area = value[2]['name']
      this.code = value[2]['code']
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
</style>
