/**
 * Created by jun.liu on 2017/5/15.
 */
/* global appConfig */
import axios from 'axios'
import mock from './mock'
import cookie from 'js-cookie'
import uri from 'urijs'
import cui from 'c-ui'
const DEFAULT_CONFIGS = {
  baseURL: '/dcapi'
}

function successHandler (resp, resolve, reject) {
  if (appConfig.api.mock && typeof resp.data === 'string') {
    resp = mock(resp.data)
  } else {
    resp = resp.data
  }
  resolve(resp)
}

function failHandler (err, resolve, reject) {
  reject(err)
}

function handler (axios, resolve, reject) {
  axios.then(res => {
    if ([401].includes(res.status)) {
      cui.popTips.warn('登录超时，请重新登录！', 2000)
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } else {
      successHandler(res, resolve, reject)
    }
  }).catch(err => {
    if ([401].includes(err.response.status)) {
      cui.popTips.warn('登录超时，请重新登录！', 2000)
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    }
    failHandler(err, resolve, reject)
  })
}

function addToken (url) {
  if (!uri(url).hasQuery('accessToken') && cookie.get('accessToken')) {
    url = uri(url).addQuery('accessToken', cookie.get('accessToken')).toString()
  }
  return url
}

export default {
  get (url, config = {}) {
    url = addToken(url)
    return new Promise((resolve, reject) => {
      handler(axios.create(DEFAULT_CONFIGS).get(url, config), resolve, reject)
    }).catch(() => {
      return cui.popTips.warn('服务器繁忙！')
    })
  },
  post (url, data = {}, config = {}) {
    url = addToken(url)
    return new Promise((resolve, reject) => {
      handler(axios.create(DEFAULT_CONFIGS).post(url, data, config), resolve, reject)
    }).catch(() => {
      return cui.popTips.warn('服务器繁忙！')
    })
  },
  put (url, data = {}, config = {}) {
    url = addToken(url)
    return new Promise((resolve, reject) => {
      handler(axios.create(DEFAULT_CONFIGS).put(url, data, config), resolve, reject)
    }).catch(() => {
      return cui.popTips.warn('服务器繁忙！')
    })
  },
  delete (url, config = {}) {
    url = addToken(url)
    return new Promise((resolve, reject) => {
      handler(axios.create(DEFAULT_CONFIGS).delete(url, config), resolve, reject)
    }).catch(() => {
      return cui.popTips.warn('服务器繁忙！')
    })
  }
}
