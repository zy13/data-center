/*
* @Author: zyuan
* @Date:   2017-07-31 09:48:59
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-15 18:52:40
*/

import Vue from 'vue'
import SquareComponent from './main.vue'
import $ from 'jquery'
import html2canvas from 'html2canvas'
import canvas2image from 'tools/canvas2image'

const sqDemo = SquareComponent
const SquareConstructor = Vue.extend(sqDemo)
const InitSquare = (opts) => {
  const squareIns = new SquareConstructor().$mount(document.createElement('div'))
  let dataUrl = ''

  squareIns.id = opts.id || 'dc-chart-square'
  squareIns.columnList = opts.columnList || []
  squareIns.dataArr = opts.dataArr || []
  squareIns.query = opts.query || {}
  squareIns.chartTitle = opts.chartTitle || ''
  squareIns.format = opts.query.cfg.colCfg.format + 1 || null
  squareIns.yAxis = opts.query.cfg.colCfg.sections || []
  squareIns.xAxis = opts.query.cfg.rowCfg.sections || []

  $('#dc-img-area').append(squareIns.$el)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      html2canvas($(`#${opts.id}`)).then(canvas => {
        dataUrl = canvas2image.getDataURL(canvas, 'png', $(`#${squareIns.id}`).width(), $(`#${squareIns.id}`).height())
      }).then(() => {
        if (dataUrl.length) {
          resolve(dataUrl)
        } else {
          reject('can not create image')
        }
      })
    }, 0)
  })
}

export default {
  SquareComponent,
  InitSquare
}

