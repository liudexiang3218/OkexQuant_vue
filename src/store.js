import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    xauthtoken: sessionStorage.getItem('xauthtoken') ? sessionStorage.getItem('xauthtoken') : Cookies.get('xauthtoken')
  },
  mutations: {
    login(state, xauthtoken) {
      state.xauthtoken = xauthtoken
      sessionStorage.setItem('xauthtoken', xauthtoken)
      Cookies.set('xauthtoken', state.xauthtoken)
    },
    logout(state) {
      state.xauthtoken = ''
      sessionStorage.removeItem('xauthtoken')
      Cookies.set('xauthtoken', state.xauthtoken)
    }
  },
  actions: {

  }
})
