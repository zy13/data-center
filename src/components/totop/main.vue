<template>
  <div>
    <div class='go-to-top'>
      <i class='cpf-icon cpf-icon-ic_totop'></i>
    </div>
    <div class='go-to-bottom'>
      <i class='cpf-icon cpf-icon-ic_totop'></i>
    </div>
  </div>
</template>

<script>
  import './style.less'
  import $ from 'jquery'

  $(() => {
    const hgs = $(window.parent.document).find('.dc-container').height()
    const winHgs = $(window).height()
    const toTop = $('.go-to-top')
    const toBottom = $('.go-to-bottom')

    if (hgs > winHgs) {
      $('.go-to-bottom').show()
    }

    // to-top
    toTop.on('click', () => {
      $('body, html').animate({
        scrollTop: '0px'
      }, 'fast')
    })

    // to-bottom
    toBottom.on('click', () => {
      $('body,html').animate({
        scrollTop: hgs + 'px'
      }, 'fast')
    })

    $(window).on('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const height = ($(window).height()) / 3
      if (height < scrollTop) {
        $('.go-to-top').show()
      } else {
        $('.go-to-top').fadeOut()
      }
    })
  })
</script>
