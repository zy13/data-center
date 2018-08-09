/*
* @Author: zyuan
* @Date:   2017-08-24 14:01:00
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-24 17:20:57
*/

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import routes from './router-map'

import 'es6-promise/auto'
import 'babel-polyfill'

Vue.use(VueRouter)

// routes.push({
//   path: '*',
//   redirect: '/error/404'
// })

const router = new VueRouter({
  base: '/dc',
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   next()
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

