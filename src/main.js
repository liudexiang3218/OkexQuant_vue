import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import { post, fetch } from './utils/http'
import router from './router'
import store from './store'
import './assets/icon/iconfont.css'
Vue.config.productionTip = false
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.filter('dataFormat', function(value, fmt) {
  const getDate = new Date(value)
  const o = { 'M+': getDate.getMonth() + 1, 'd+': getDate.getDate(), 'h+': getDate.getHours(), 'm+': getDate.getMinutes(), 's+': getDate.getSeconds(), 'q+': Math.floor((getDate.getMonth() + 3) / 3), 'S': getDate.getMilliseconds() }; if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  } return fmt
})
Vue.filter('numFormat', function(value, fmt) {
  const realVal = Number(value).toFixed(fmt)
  return Number(realVal)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
