/*
* @Author: zyuan
* @Date:   2017-08-30 11:13:12
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-30 11:21:04
*/
import Vue from 'vue'
import txtVue from './main.vue'
import $ from 'jquery'
import Draggable from 'draggable'

const TxtConstuctor = Vue.extend(txtVue)

const txtComponent = (opts) => {
  const txtInstance = new TxtConstuctor().$mount(document.createElement('div'))
  // const container = document.getElementById('v-container')
  const element = txtInstance.$el

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

export default txtComponent
