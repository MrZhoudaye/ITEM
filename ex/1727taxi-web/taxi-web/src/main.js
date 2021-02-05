import Vue from 'vue'
import App from './App'
import router from './router'
import xhr from './plugin/xhr'
import ElementUI from 'element-ui'
import echarts from 'echarts'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'

Vue.config.productionTip = false

Vue.prototype.$XHR = xhr
Vue.prototype.$echarts = echarts

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
