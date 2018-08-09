/*
* @Author: zyuan
* @Date:   2017-08-07 14:33:54
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-07 15:47:58
*/

import html2canvas from 'html2Canvas'
import canvas2image from 'utils/canvas2image'

export default {
  init (data) {
    let dataUrl = ''
    let opts = {
      $el: '',
      width: 660,
      height: 450,
      type: 'png'
    }

    opts = Object.assign({}, opts, data)
    console.log(document.getElementById(opts.$el))
    if (document.getElementById(opts.$el)) {
      html2canvas(document.getElementById(opts.$el)).then(canvas => {
        dataUrl = canvas2image.getDataURL(canvas, opts.type, opts.width, opts.height)
        return dataUrl
      })
    }
  }
}
