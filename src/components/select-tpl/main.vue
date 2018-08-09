<template>
  <div class='dc-select-box' :id='idDefault'>
    <div class='dc-select-container'>
      <div class='dc-sel-val' @click='openOrClose'>
        <span class='dc-inline val'>{{actVal}}</span>
        <span class='dc-inline arrow'></span>
      </div>
      <ul class='dc-sel-box box-show dis'>
        <li v-for='item in dataOption' :class='actVal==item?"active":""' @click='changeVal'>{{typeof item=='object'?item.value:item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import './style.less'
  import $ from 'jquery'

  export default {
    props: {
      id: {
        type: String,
        default: ''
      },
      dataOptions: {
        type: Array,
        default () {
          return []
        }
      },
      mapValue: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        idDefault: Math.random(),
        actVal: '',
        dataOption: this.dataOptions
      }
    },
    mounted () {
      if (this.dataOptions.length) {
        if (['string', 'number', 'boolean'].includes(typeof this.dataOptions[0])) {
          this.actVal = this.dataOptions[0]
        }
        if (typeof this.dataOptions[0] === 'object') {
          this.ObjToArr(this.dataOptions[0])
          this.normalizeArr()
        }
      }
    },
    methods: {
      openOrClose (e) {
        const $el = $(e.target)
        const $el1 = '.dc-select-box'
        const $el2 = '.dc-sel-box'

        Array.from($($el1)).forEach((v, i) => {
          if ($(v).attr('id').toString() !== this.idDefault.toString()) {
            $(v).find($el2).addClass('dis')
          }
        })

        $($el).parents($el1).find($el2).toggleClass('dis')

        $(document).on('click', (event) => {
          if (!$($el).parents($el1).find($el2).is('.dis')) {
            if (!$(event.target).closest($el1).length) {
              $($el).parents($el1).find($el2).toggleClass('dis')
            }
          }
        })
      },
      changeVal (e) {
        const val = $(e.target).text()
        this.actVal = val
        $(e.target).parents('.dc-sel-box').addClass('dis')
      },
      ObjToArr (obj) {
        const objTemp = obj

        Object.keys(objTemp).map((k, i) => {
          if (typeof k === 'string') {
            this.actVal = objTemp[k]
          }
        })
      },
      normalizeArr () {
        if (this.mapValue.length) {
          this.dataOptions.forEach((v, i) => {
            this.dataOption.push(Object.assign({}, v, {
              value: this.dataOptions[i].mapValue
            }))
          })
        } else {
          this.dataOptions.forEach((v, i) => {
            let value = ''
            Object.keys(v).map((k, j) => {
              if (j === 0) {
                value = k
              }
            })
            this.dataOption.push(Object.assign({}, v, {
              value: value
            }))
          })
        }
        console.log(this.dataOption)
      }
    }
  }
</script>
