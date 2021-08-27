<template>
  <div>
    <ToolBar :title="title" style="position: relative" :right-txt="car" :right-click="carClick" :show-right-txt="true"/>
    <swiper class="banner" ref="banner" :options="bannerOption">
      <swiper-slide v-for="item in bannerList" :key="item.url">
        <img class="banner-item" alt="" v-bind:src="item.url"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="zsq flex-row ct">
      <div class="flex zsq-unselected" :key="index" v-bind:class="[index === pageIndex ? 'zsq-selected' : '']"
           v-for="(item,index) in pageTitleList" v-on:click="pageItemClick(index)">{{item}}
      </div>
    </div>
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <van-list v-model="isLoadMore" :finished="noLoadMore" finished-text="没有更多了" @load="onLoadMore">
        <swiper class="swiper" :options="swiperOption" ref="mySwiper" @slideChangeTransitionStart="pageChanged">
          <swiper-slide v-for="(item,index) in pageTitleList" :key="index">
            <div class="swiper-item" v-for="i in 10" :key="i">
              <img alt="img" src="../../assets/load.png"/>
              <div class="swiper-item-right">
                <div class="swiper-item-title txt-1">我是一个很长很长很长的标题</div>
                <div class="swiper-item-content txt-2">我是一个很长很长很长的标题我是一个很长很长很长的标题我是一个很长很长很长的标题我是一个很长很长很长的标题我是一个很长很长很长的标题</div>
                <div class="swiper-item-time">2021-8-24 :10:23:49</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Vue from 'vue'
import ToolBar from '../../components/ToolBar'
import {PullRefresh, List, Toast} from 'vant'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Toast)
export default {
  name: 'SwiperDiy',
  components: {ToolBar, swiper, swiperSlide},
  data () {
    const that = this
    return {
      title: '推荐',
      car: '购物车',
      bannerList: [{url: require('../../assets/banner1.png')}, {url: require('../../assets/banner2.jpg')},
        {url: require('../../assets/banner3.jpg')}, {url: require('../../assets/banner4.jpg')},
        {url: require('../../assets/banner5.jpg')}],
      bannerIndex: 0,
      bannerOption: {
        autoplay: { // 自动切换
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false // 用户操作后就停止自动播放
        },
        clickable: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        on: {
          slideChangeTransitionStart: function () {
            var index = this.activeIndex - 1
            if (index >= that.bannerList.length) {
              index = 0
            }
            that.bannerIndex = index
            console.log('swiper bannerIndex ----------->>> ' + that.bannerIndex)
          }
        }
      },
      pageTitleList: ['推荐', '新闻', '百科', 'AI'],
      pageIndex: 0,
      swiperOption: {
        autoplay: false,
        clickable: false,
        loop: false,
        freeMode: false // 一次只能滑动一格
      },
      isRefresh: false,
      isLoadMore: false,
      noLoadMore: false,
      count: 0
    }
  },
  methods: {
    carClick: function () {
      this.$router.push({
        path: '/car'
      })
    },
    pageItemClick: function (i) {
      if (i === this.pageIndex) {
        console.log('相同不做任何处理')
      } else {
        this.pageIndex = i
        this.swiper.slideTo(i, 300, false)
      }
    },
    pageChanged: function () {
      this.pageIndex = this.swiper.activeIndex
    },
    onRefresh: function () {
      var that = this
      this.count = 0
      setTimeout(() => {
        Toast('模拟刷新成功')
        that.isRefresh = false
        that.noLoadMore = false
      }, 1000)
    },
    onLoadMore: function () {
      var that = this
      setTimeout(() => {
        if (that.count >= 2) {
          that.noLoadMore = true
        } else {
          that.count++
        }
        that.isLoadMore = false
      }, 1000)
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
  }
}
</script>

<style scoped="scoped">
  .banner {
    position: relative;
    height: 150px;
  }
  .banner-item {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .zsq {
    height: 35px;
    background: white;
    position: sticky;
    position: -webkit-sticky; /* Safari */
    top: 0;
    border-bottom-color: #f2f2f2;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    z-index: 999;
  }
  .zsq-unselected {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    color: black;
  }
  .zsq-selected {
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #3379FD;
    color: #3379FD;
  }
  .swiper {
    position: relative;
    margin-top: 7px;
  }
  .swiper-item {
    height: 110px;
    border-radius: 7px;
    position: relative;
    margin-left: 7px;
    margin-right: 7px;
    margin-bottom: 7px;
    background: white;
  }
  .swiper-item img {
    width: 120px;
    height: 90px;
    position: absolute;
    top: 10px;
    left: 7px;
    object-fit: cover;
  }
  .swiper-item-right {
    position: relative;
    height: calc(100% - 7px * 2);
    margin-left: 134px;
    margin-right: 7px;
    top: 7px;
  }
  .swiper-item-title {
    color: black;
    font-size: 14px;
    text-align: left;
    position: relative;
  }
  .swiper-item-content {
    color: #222222;
    font-size: 12px;
    position: relative;
    margin-top: 7px;
    text-align: left;
  }
  .swiper-item-time {
    position: absolute;
    color: #91919C;
    font-size: 12px;
    bottom: 0;
    text-align: left;
  }
</style>
