/*
* @Author: zyuan
* @Date:   2017-08-30 09:52:34
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-30 17:55:26
*/
import $ from 'jquery'
import imgUtil from 'components/insertImg'
import txtUtil from 'components/insertTxt'
import daoAna from 'dao/arithAnalyse'
import chartTypeArr from 'assets/json/chartType.json'

export default {
  props: {
    chartTypeArr: {
      type: Array,
      default () {
        return chartTypeArr
      }
    }
  },
  data () {
    return {
      colArr: [],
      rowArr: []
    }
  },
  mounted () {
    console.log(90, window.ad)
  },
  methods: {
    allowDrop (event) {
      event.preventDefault()
    },
    drop (event) {
      event.preventDefault()

      const dataTransfer = JSON.parse(event.dataTransfer.getData('text'))
      const $el = event.target
      const type = $($el).data('type')

      switch (type) {
        case 'col':
          this.colArr.push(dataTransfer)
          break
        case 'row':
          this.rowArr.push(dataTransfer)
          break
      }
    },
    insertImg () {
      imgUtil({
        $el: '.dc-show-chart'
      })
    },
    insertTxt () {
      txtUtil({
        $el: '.dc-show-chart'
      })
    },
    // 获取图表数据
    getAnalyseData () {
      daoAna.getAnalyseData().then(r => {
      })
    }
  }
}
