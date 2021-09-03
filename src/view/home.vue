<template>
  <div>
    <ToolBar :title='title' :show-left-pic="false" />
    <div class="banner" v-bind:style="{marginTop: bannerMarginTop + 'px'}">
      <swiper :options="swiperOption">
        <swiperSlide class="swiper-slide" v-for="item in bannerList" :key="item.image" >
          <img :src="item.image" alt="" class="banner-item">
        </swiperSlide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="pop" v-bind:style="{top: bannerMarginTop + 'px'}">
      <div class="pop-1">
        <div v-bind:class="[category_type_index === index ? 'pop-item-selected' : 'pop-item']"
             v-for="(item,index) in category_types" :key="index" v-on:click="oneClick(item,index)">{{item.key}}</div>
      </div>
      <div class="line"/>
      <div class="pop-1">
        <div v-bind:class="[classify_index === index ? 'pop-item-selected' : 'pop-item']"
             v-for="(item,index) in classifyList" :key="index" v-on:click="classifyClick(item,index)">{{item.title}}</div>
      </div>
      <div class="line"/>
    </div>
    <van-pull-refresh class="list-pr" v-model="isRefresh" @refresh="onRefresh">
      <van-list v-model="isLoadMore" :finished="noLoadMoreData" finished-text="没有更多了" @load="onLoadmore">
        <div class="list m-t">
          <div class="list-item m-r m-l m-b" v-for="item in infoList" :key="item._id">
            <img :src="item.images[0]" alt="" class="m-l">
            <div class="item-right">
              <div class="item-title txt-1">{{item.title}}</div>
              <div class="item-content txt-2">{{item.desc}}</div>
              <div class="item-bottom">{{item.createdAt}}</div>
            </div>
          </div>
          <div v-show="infoList.length <=0" class="list-empty">暂时没有数据</div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Vue from 'vue'
import { PullRefresh, List } from 'vant'
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import ToolBar from '../components/ToolBar'
import LoadDialog from '../components/LoadDialog'
Vue.use(PullRefresh)
Vue.use(List)
export default {
  name: 'home',
  components: {LoadDialog, ToolBar, swiper, swiperSlide},
  data () {
    return {
      title: '首页',
      bannerMarginTop: 50,
      swiperOption: {
        autoplay: { // 自动切换
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false // 用户操作后就停止自动播放
        },
        pagination: { // 显示分页
          el: '.swiper-pagination',
          clickable: true // 允许分页点击跳转
        }
      },
      // bannerList: [{image: '', title: '', url: ''}],
      bannerList: [],
      category_types: [{key: 'Article'}, {key: 'GanHuo'}, {key: 'Girl'}],
      category_type_index: 0,
      // classifyList: [{_id: '', coverImageUrl: '', desc: '', title: '', type: ''}],
      classifyList: [],
      classify_index: 0,
      // infoList: [{
      //   _id: '',
      //   author: '',
      //   category: '',
      //   createdAt: '',
      //   desc: '',
      //   likeCounts: '',
      //   publishedAt: '',
      //   // stars: 0,
      //   title: '',
      //   type: '',
      //   url: '',
      //   // views: 0,
      //   images: []
      // }],
      infoList: [],
      isRefresh: false,
      isLoadMore: false,
      noLoadMoreData: false,
      pageNo: 1,
      pageSize: 10,
      state: 0,
      isFrist: true
    }
  },
  methods: {
    oneClick: function (item, index) {
      if (this.category_type_index === index) {
        console.log('相同状态，不做任何出来')
      } else {
        this.category_type_index = index
        this.classify_index = 0
        this.getClassify(true)
      }
    },
    classifyClick: function (item, index) {
      if (this.classify_index === index) {
        console.log('相同二级状态，不做任何出来')
      } else {
        this.classify_index = index
        this.setRefreshState()
        this.getList(true)
      }
    },
    setRefreshState: function () {
      this.state = 0
      this.pageNo = 1
      this.noLoadMoreData = false
    },
    onRefresh: function () {
      this.setRefreshState()
      // this.getBanner()
      // this.getClassify(true)
      this.getList(false)
    },
    onLoadmore: function () {
      if (this.isFrist) {
        console.log('第一次加载，手动干预不执行加载更多')
        this.isLoadMore = false
      } else {
        this.state = 1
        this.pageNo++
        this.getList(false)
      }
    },
    getBanner: function () {
      this.http.GET(this.ROOT_URL + 'banners', '', true, response => {
        this.bannerList = response
      })
    },
    getClassify: function (getListDataNow) { // 根据一级分类获取二级分类
      const that = this
      const key = this.category_types[this.category_type_index].key
      this.http.GET(this.ROOT_URL + 'categories/' + key, '', true, response => {
        that.classifyList = response
        that.classifyList.splice(0, 0, {
          title: '全部',
          type: 'All'
        })
        if (getListDataNow) {
          that.setRefreshState()
          that.getList(true)
        }
      })
    },
    getList: function (loading) { // 获取列表数据
      const that = this
      var category = this.category_types[this.category_type_index].key
      if (category === undefined || category === '' || category.length <= 0) {
        category = 'GanHuo'
      }
      var type = this.classifyList[this.classify_index].type
      if (type === undefined || type === '' || type.length <= 0) {
        type = 'All'
      }
      const url = 'data/category/' + category + '/type/' + type + '/page/' + this.pageNo + '/count/' + this.pageSize
      this.http.GET(this.ROOT_URL + url, '', loading, response => {
        that.isFrist = false
        if (loading) {
          that.loadingShow = false
        }
        if (that.state === 0) { // 刷新
          that.isRefresh = false
          that.infoList = response
        } else { // 加载更多
          that.isLoadMore = false
          if (response.length === null || response.length <= 0) {
            that.noLoadMoreData = true
          } else {
            that.infoList = that.infoList.concat(response)
          }
        }
      })
    }
  },
  mounted () {
    this.getBanner()
    this.getClassify(true)
    if (this.phoneType.isApp()) {
      if (this.phoneType.isAndroid()) {
        var statusBarHeight = window.ops.getSBarHeight()
        this.bannerMarginTop = 50 + statusBarHeight
      }
    }
  }
}
</script>

<style scoped>
  .banner {
    position: relative;
    width: 100%;
    height: 150px;
    margin-top: 50px;
  }
  .banner-item {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  .pop {
    position: sticky;
    position: -webkit-sticky; /* Safari */
    top: 50px;
    z-index: 1;
  }
  .pop-1 {
    position: relative;
    height: 34px;
    background: white;
    display: flex;
    /* 横向滚动 */
    flex-wrap: nowrap;
    overflow-x: auto;
    white-space: nowrap; /* 横向滚动禁止文字自动换行 */
  }
  ::-webkit-scrollbar {  /*去除滚动条*/
    display: none;
  }
  .pop-item {
    color: white;
    height: 24px;
    margin-top: 5px;
    margin-left: 7px;
    padding-left: 10px;
    padding-right: 10px;
    position: relative;
    background: #91919C;
    line-height: 24px;
    float: left;
    font-size: 13px;
    text-align: center;
    border-radius: 12px;
  }
  .pop-item-selected {
    color: black;
    height: 24px;
    margin-top: 5px;
    margin-left: 7px;
    padding-left: 10px;
    padding-right: 10px;
    position: relative;
    background: wheat;
    line-height: 24px;
    float: left;
    font-size: 13px;
    text-align: center;
    border-radius: 12px;
  }
  .list {
    position: relative;
  }
  .list-empty {
    position: relative;
    height: 200px;
    color: black;
    font-size: 13px;
    text-align: center;
    padding-top: 20px;
  }
  .list-item {
    height: 100px;
    background: white;
    border-radius: 5px;
    position: relative;
  }
  .list-item img {
    width: 100px;
    height: 80px;
    position: absolute;
    top: 10px;
    object-fit: cover;
  }
  .item-right {
    position: relative;
    margin-left: 115px;
    height: 100%;
  }
  .item-title {
    position: relative;
    text-align: left;
    color: black;
    top: 10px;
    font-size: 14px;
    margin-right: 3px;
  }
  .item-content {
    position: relative;
    font-size: 13px;
    margin-top: 12px;
    text-align: left;
    margin-right: 3px;
    color: #222222;
  }
  .item-bottom {
    position: absolute;
    width: 100%;
    bottom: 10px;
    font-size: 12px;
    color: #91919C;
    text-align: left;
  }
</style>
