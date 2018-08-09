/*
* @Author: zyuan
* @Date:   2017-08-30 18:08:53
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-30 18:15:14
*/
import $ from 'jquery'
import dao from 'dao/arithAnalyse'
import loading from 'components/loading'

export default {
  data () {
    return {
      srclist: [],
      actItem: {},
      dmArr: [],
      dmObj: {},
      actAgg: []
    }
  },
  mounted () {
    this.getSrcList()
  },
  watch: {
    actItem () {
      this.getDMList()
      window.cfg = Object.assign({}, {
        datasourceId: this.actItem.id
      })
    }
  },
  methods: {
    shrinkOrSpread (event) {
      const $el = event.target

      $($el).closest('.dc-p-active').find('ul').toggleClass('dis')
      $($el).closest('.dc-date-time').find('.cpf-icon').toggleClass('cpf-icon-extend cpf-icon-shrink')
      $($el).find('.dc-fr').toggleClass('dc-arrow-top dc-arrow-bottom')
    },
    getSrcList () {
      loading.open()
      dao.getSrcList().then(r => {
        if (r.code === 0) {
          this.srclist = r.response
          this.actItem = this.srclist[0]
        }
      })
    },
    getDMList () {
      dao.getDimensionMeasure({
        id: this.actItem.id,
        isDim: false
      }).then(r => {
        if (r.code === 0) {
          this.dmObj = Object.assign({}, r.response)
        }
      }).then(() => {
        loading.close()
      })
    },
    handleMemu (event) {
      const $el = event.target

      $(document).find('.dc-ul-menu').addClass('dc-dis')
      $($el).closest('.dc-li').find('.dc-ul-menu').removeClass('dc-dis')

      event.stopPropagation()

      $(document).on('click', (e) => {
        if (!$(e.target).closest('.dc-ul-menu').length) {
          $($el).closest('.dc-li').find('.dc-ul-menu').addClass('dc-dis')
        }
      })
    }
  }
}
