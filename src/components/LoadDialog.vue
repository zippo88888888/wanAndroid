<template>
  <div id="LoadDialog">
    <van-overlay :show="dialogShow">
      <div class="ld-ld">
        <div class="ld-ld-d flex-column ct">
          <van-loading type="spinner" color="#3379FD"/>
          <span>加载中</span>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Vue from 'vue'
import {Overlay, Loading} from 'vant'
Vue.use(Overlay)
Vue.use(Loading)
export default {
  name: 'LoadDialog',
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  >>>.van-overlay { /* 覆盖BNView */
    z-index: 1000;
  }
  .ld-ld {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .ld-ld-d {
    width: 80px;
    height: 80px;
    background: white;
    border-radius: 5px;
    color: #91919C;
    font-size: 14px;
  }
  .ld-ld-d span {
    margin-top: 5px;
  }
</style>
