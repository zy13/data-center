/*
* @Author: zyuan
* @Date:   2017-08-29 14:17:48
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-30 10:09:59
*/

export default {
  data () {
    return {
      curData: {}
    }
  },
  methods: {
    dragstart (event) {
      const data = event.target.dataset.item
      event.dataTransfer.setData('text', data)
    }
  }
}
