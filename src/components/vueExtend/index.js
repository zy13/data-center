/*
* @Author: zyuan
* @Date:   2017-08-09 14:30:23
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-09 16:11:51
*/

'use strict'

import Vue from 'vue'
import Main from './main.vue'
import $ from 'jquery'

const Constr = Vue.extend(Main)

const demo1 = (opt) => {
  const ins = new Constr().$mount(document.createElement('div'))
  ins.msg = opt.msg
  $(opt.$el).append(ins.$el)

  console.log(opt)
}

export default {
  Main,
  demo1
}
