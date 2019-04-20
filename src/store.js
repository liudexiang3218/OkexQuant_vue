import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: true,
    xauthtoken: ""
  },
  mutations: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
      state.xauthtoken = "";
      sessionStorage.removeItem("xauthtoken");
    },
    setAuthorization(state, xauthtoken) {
      state.xauthtoken = xauthtoken;
      sessionStorage.setItem("xauthtoken", xauthtoken);
    }
  },
  actions: {

  }
})
