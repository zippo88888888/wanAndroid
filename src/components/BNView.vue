<template>
  <div id="BNView" class="flex-row ct">
    <div class="bnv-item flex-column ct flex" v-on:click="itemClick(index)"
         v-for="(item,index) in bnvList" :key="index">
      <img v-bind:src="[index === selectedIndex ? item.pic2 : item.pic]" alt="">
      <span v-bind:class="[index === selectedIndex ? 'bnv-selected' : '']">{{item.title}}</span>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {Dialog, Toast, Switch} from 'vant'
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(Switch)
export default {
  name: 'BNView',
  props: {
    currentIndex: {
      type: Number,
      default: 0
    },
    currentClick: {
      type: Function,
      default: function (index) {
        console.log('index ---> ' + index)
      }
    },
    currentClickAgain: {
      type: Function,
      default: function (index) {
        console.log('重复的点击 ---> ' + index)
      }
    }
  },
  data () {
    return {
      selectedIndex: 0,
      bnvList: [
        {title: '首页', pic: require('../assets/home_sel.png'), pic2: require('../assets/home_sel2.png'), path: '/home'},
        {title: '推荐', pic: require('../assets/other_sel.png'), pic2: require('../assets/other_sel2.png'), path: '/sd'},
        {title: '购物车', pic: require('../assets/car_sel.png'), pic2: require('../assets/car_sel2.png'), path: '/car'},
        {title: '我的', pic: require('../assets/my_sel.png'), pic2: require('../assets/my_sel2.png'), path: '/my'}
      ]
    }
  },
  methods: {
    itemClick: function (index) {
      if (this.selectedIndex === index) {
        this.currentClickAgain(index)
      } else {
        this.selectedIndex = index
        this.currentClick(index)
      }
      var item = this.bnvList[index]
      this.$router.replace({
        path: item.path
      }).catch(err => { return err }) // vue-router在3.1后将push改成了promise,所以需要一个回调
    }
  },
  watch: {
    currentIndex: function (newVal) {
      this.selectedIndex = newVal
      this.itemClick(newVal)
    }
  }
}
</script>

<style scoped>
  #BNView {
    height: 55px;
    border-top: #f2f2f2 solid 1px;
    background: white;
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 999;
  }
  .bnv-item {
    color: #91919C;
    font-size: 14px;
  }
  .bnv-item img {
    width: 20px;
    height: 20px;
    margin-bottom: 3px;
  }
  .bnv-selected {
    color: #3379FD;
  }
</style>
