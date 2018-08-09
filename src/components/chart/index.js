/*
* @Author: zyuan
* @Date:   2017-07-19 11:12:02
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-09 15:24:28
*/
import Vue from 'vue'
import ChartComponent from './main.vue'
import $ from 'jquery'

const ChartConstructor = Vue.extend(ChartComponent)
const InitChart = (opts) => {
  const chartInstance = new ChartConstructor().$mount(document.createElement('div'))
  chartInstance.id = opts.id || 'my-echart'
  chartInstance.columnList = opts.columnList || []
  chartInstance.dataArr = opts.dataArr || []
  chartInstance.query = opts.query || {}
  chartInstance.chartTitle = opts.chartTitle || ''

  $(opts.$el).append(chartInstance.$el)

  return chartInstance
}

export default {
  ChartComponent,
  InitChart
}
