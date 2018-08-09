/*
* @Author: zyuan
* @Date:   2017-08-21 15:39:48
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-30 11:21:38
*/

import Vue from 'vue'
import imgVue from './main.vue'
import $ from 'jquery'
import Draggable from 'draggable'

const ImgConstuctor = Vue.extend(imgVue)

const imgComponent = (opts) => {
  const imgInstance = new ImgConstuctor().$mount(document.createElement('div'))
  // const container = document.getElementById('v-container')
  const element = imgInstance.$el

  $(opts.$el).append(element)

  new Draggable(element, {
    grid: 10,
    limit: {
      x: [4, 720],
      y: [50, 700]
    },
    setCursor: true,
    smoothDrag: false,
    onDrag: function (element, x, y) {
      // console.log(x)
      // console.log(y)
    }
  }).setOption('smoothDrag', true)
}

export default imgComponent

