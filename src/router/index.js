import Vue from 'vue'
import Router from 'vue-router'

import home from '../view/home'
import question from '../view/question'
import setup from '../view/setup'
import my from '../view/my'

Vue.use(Router)

Router.prototype.onBack = function () {
  window.history.go(-1)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: home
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
      path: '/my',
      name: '个人中心',
      component: my
    }
  ]
})
