<template>
  <div class="bar" v-bind:style="{background: bgColor}">
    <div class="status-bar" v-bind:style="{height: statusBar}"></div>
    <div class="real-bar">
      <div class="left" v-on:click="back">
        <img v-bind:src="leftPic" alt="back" v-show="showLeftPic">
        <span v-show="showLeftTxt">{{leftTxt}}</span>
      </div>
      <div class="title">{{title}}</div>
      <div class="right" v-on:click="rightClick">
        <img v-bind:src="rightPic" alt="back" v-show="showRightPic">
        <span v-show="showRightTxt">{{rightTxt}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  props: {
    title: {
      type: String,
      default: '我是标题'
    },
    bgColor: {
      type: String,
      default: '#3379FD'
    },
    leftTxt: {
      type: String,
      default: '返回'
    },
    leftPic: {
      type: String,
      default: require('../assets/back.png')
    },
    showLeftTxt: {
      type: Boolean,
      default: false
    },
    showLeftPic: {
      type: Boolean,
      default: true
    },
    rightTxt: {
      type: String,
      default: '确定'
    },
    rightPic: {
      type: String,
      default: require('../assets/sx.png')
    },
    showRightTxt: {
      type: Boolean,
      default: false
    },
    showRightPic: {
      type: Boolean,
      default: false
    },
    rightClick: {
      type: Function,
      default: function () {

      }
    }
  },
  data () {
    return {
      statusBar: '0'
    }
  },
  methods: {
    back: function () {
      this.$router.onBack()
      console.log('back')
    }
  },
  mounted () {
    if (this.phoneType.isApp()) {
      if (this.phoneType.isAndroid()) {
        var statusBarHeight = window.ops.getSBarHeight()
        this.statusBar = statusBarHeight + 'px'
      }
    }
  }
}
</script>

<style scoped>
  .bar {
    width: 100%;
    /*height: 50px;*/
    background: #3379FD;
    position: fixed;
    top: 0;
    z-index: 999;
  }
  .status-bar {
    position: relative;
  }
  .real-bar {
    position: relative;
    width: 100%;
    height: 50px;
  }
  .left {
    position: absolute;
    left: 0;
    height: 100%;
  }
  .left img {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 7px;
    top: 10px;
  }
  .left span {
    color: white;
    position: absolute;
    top: 50%;
    font-size: 12px;
    font-weight: bold;
    transform: translate(7px, -50%);
  }
  .title {
    color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 15px;
    font-weight: bold;
  }
  .right {
    position: absolute;
    right: 0;
    height: 100%;
    width: 100px;
  }
  .right img {
    width: 18px;
    height: 18px;
    position: absolute;
    right: 12px;
    top: 16px;
  }
  .right span {
    color: white;
    position: absolute;
    top: 50%;
    font-size: 12px;
    right: 12px;
    font-weight: bold;
    transform: translate(0, -50%);
  }
</style>
