<template>
  <div class='dc-pagination'>
    <div class='pagination'>
      <span class='span'>共{{totalNum}}条记录</span>
      <span class='span'>{{pageIndex}}/{{Math.floor(this.totalNum / this.limit)+1}}</span>
      <span class='span common' :class='[0,1].includes(parseInt(pageIndex))?"disabled":"box-show"' @click='toTargetPage(0)'>首页</span>
      <span class='span arrow box-show' :class='[0,1].includes(parseInt(pageIndex))?"disabled":"box-show"' @click='toTargetPage(1)'>
        <span class='arrow-right'></span>
        <span class='span1'></span>
      </span>
      <span class='span arrow box-show' :class='parseInt(pageIndex)==(Math.floor(this.totalNum / this.limit)+1)?"disabled":"box-show"' @click='toTargetPage(2)' >
        <span class='arrow-left'></span>
        <span class='span2'></span>
      </span>
      <span class='span common box-show' :class='parseInt(pageIndex)==(Math.floor(this.totalNum / this.limit)+1)?"disabled":"box-show"' @click='toTargetPage(3)'>末页</span>
      <span class='span'></span>
      <span>每页显示</span>
      <select class='box-show' v-model="limit">
        <option v-for='i in limits'>{{i}}</option>
      </select>
      <span>条</span>
      <span>跳转到第</span>
      <input type="number" min='1' v-model='inputVal' :max='Math.floor(this.totalNum / this.limit)+1' @change='handlePageIndex'>
      <span>页</span>
      <span class='span common box-show confirm' :class='actClass' @click='confirm'>确定</span>
    </div>
  </div>
</template>

<script>
  import './style.less'

  export default {
    props: {
      totalNum: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        limit: 10,
        pageIndex: 1,
        limits: [5, 10, 20, 50, 100], // 每页显示条数
        inputVal: null,
        actClass: 'disabled'
      }
    },
    methods: {
      toTargetPage (type) {
        const totalP = Math.floor(this.totalNum / this.limit) + 1

        this.pageIndex = parseInt(this.pageIndex)
        this.inputVal = null

        switch (type) {
          case 0: // 首页
            if (this.pageIndex !== 1) {
              this.pageIndex = 1
              this.handleChange()
            }
            break
          case 1: // 前一页
            if (this.pageIndex > 1) {
              this.pageIndex = this.pageIndex - 1
              this.handleChange()
            }
            break
          case 2: // 下一页
            if (this.pageIndex < totalP) {
              this.pageIndex = this.pageIndex + 1
              this.handleChange()
            }
            break
          case 3: // 末页
            if (this.pageIndex !== totalP) {
              this.pageIndex = totalP
              this.handleChange()
            }
            break
          default:
            break
        }
      },
      handleChange () {
        this.inputVal = null
        this.$emit('change', {
          limit: parseInt(this.limit),
          pageIndex: parseInt(this.pageIndex)
        })
      },
      handlePageIndex () {
        const inputVal = parseInt(event.target.value, 10)

        if (inputVal > this.totalP || inputVal < 1 || isNaN(inputVal)) {
          this.actClass = 'disabled'
        } else {
          this.actClass = ''
        }
      },
      confirm () {
        this.inputVal = parseInt(this.inputVal, 10)
        if (this.inputVal >= 1 && this.inputVal <= this.totalP) {
          this.pageIndex = this.inputVal
          this.$emit('change', {
            limit: parseInt(this.limit),
            pageIndex: this.pageIndex
          })
        }
      }
    }
  }
</script>
