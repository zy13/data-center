/*
* @Author: zyuan
* @Date:   2017-06-26 10:15:49
* @Last Modified by:   zyuan
* @Last Modified time: 2017-06-26 10:19:31
*/

import $ from 'jquery'

$(document).ready(function () {
  const bodyH = document.body.clientHeight
  const winH = window.innerHeight

  if (bodyH < winH) {
    $('.dc-footer').addClass('abs')
  } else {
    $('.dc-footer').removeClass('abs')
  }
})
