/* eslint-disable no-empty */
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import { urls } from '@/utils/url.js'
Vue.prototype.urls = urls

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
import axios from 'axios'
import VueAxios from 'vue-axios'

// 返回数据拦截处理
axios.interceptors.response.use(response => {
  if (response.data) {
    if (response.data.code === 500) {
      v.$message.error(response.data.msg);
      return {
        code: 0,
        msg: response.data.msg
      }
    } else {
      return {
        code: 1,
        data: response.data.data
      }
    }
  } else {
  }
}, error => Promise.reject(error.response))
axios.defaults.withCredentials = true;

axios.defaults.timeout = 10000; //暂时禁用避免uc浏览器出错

axios.defaults.headers["token"] = Cookies.get('Real-Token');

Vue.use(VueAxios, axios)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

const v = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
