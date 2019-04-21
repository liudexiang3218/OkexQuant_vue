import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.baseURL = process.env.VUE_APP_baseURL
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.xauthtoken) {
      config.headers['xauthtoken'] = store.state.xauthtoken
    }
    return config
  },
  error => {
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000,
      showClose: true
    })
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    const responseBody = response.data
    if (response.headers.xauthtoken) {
      store.commit('login', response.headers.xauthtoken)
    } else {
      if (responseBody.data && responseBody.data.token) {
        store.commit('login', responseBody.data.token)
      }
    }
    if (responseBody.errorCode !== 0) {
      if (responseBody.errorCode === 3) {
        router.push({
          path: '/login',
          querry: { redirect: '/' }
        })
      } else {
        Message({
          message: responseBody.message,
          type: 'error',
          duration: 5 * 1000,
          showClose: true
        })
      }
      return Promise.reject(responseBody)
    }
    return Promise.resolve(responseBody)
  },
  error => {
    debugger
    if (error.response && error.response.status === 401) {
      router.push({
        path: '/login',
        querry: { redirect: '/' }
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000,
        showClose: true
      })
    }

    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}
