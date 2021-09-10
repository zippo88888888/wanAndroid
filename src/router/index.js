import Vue from 'vue'
import Router from 'vue-router'

import mainIndex from '../view/main_index'
import register from '../view/login/register'
import home from '../view/home'
import question from '../view/question'
import setup from '../view/setup'
import my from '../view/my'
import Sd from '../view/car/SwiperDiy'
import Car from '../view/car/Car'
import CO from '../view/order/confirm_order'
import Address from '../view/order/address_list'
import AddressEdit from '../view/order/address_edit'
import OrderList from '../view/order/order_list'
import OrderInfo from '../view/order/order_info'

Vue.use(Router)

Router.prototype.onBack = function () {
  window.history.go(-1)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainIndex',
      component: mainIndex,
      children: [
        {
          path: '/home',
          name: '首页',
          component: home
        },
        {
          path: '/sd',
          name: '推荐',
          component: Sd
        },
        {
          path: '/car',
          name: '购物车',
          component: Car
        },
        {
          path: '/my',
          name: '个人中心',
          component: my
        }
      ]
    },
    {
      path: '/register',
      name: '注册',
      component: register
    },
    {
      path: '/question',
      name: '问答',
      component: question
    },
    {
      path: '/setup',
      name: '体系',
      component: setup
    },
    {
      path: '/order',
      name: '订单管理',
      component: OrderList
    },
    {
      path: '/order_info',
      name: '订单详情',
      component: OrderInfo
    },
    {
      path: '/corder',
      name: '确认订单',
      component: CO
    },
    {
      path: '/address_list',
      name: '地址管理',
      component: Address
    },
    {
      path: '/address_edit',
      name: '/address_edit',
      component: AddressEdit
    }
  ]
})
