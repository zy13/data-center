/*
* @Author: zyuan
* @Date:   2017-07-10 10:49:14
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-14 17:13:24
*/

import tpl from './main.vue'
import Vue from 'vue'
import $ from 'jquery'

const loading = {
  open () {
    const LoadingConstructor = Vue.extend(tpl)
    const instance = new LoadingConstructor().$mount(document.createElement('div'))
    $('body').append(instance.$el)
    // document.body.appenChild(instance.$el)
  },
  close () {
    $('body>.dc-loading').remove()
  }
}

export default loading
