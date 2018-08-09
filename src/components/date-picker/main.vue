<template>
  <div class='dc-date-picker'>
    <div class='dc-date-value'>
      <input type='text' class='dc-common dc-input-value' :value='date' readonly="ture" @click='handleCalendar'>
      <span class='dc-common dc-inline span' @click='handleCalendar'>
        <i class='cpf-icon cpf-icon-ic_calendar'></i>
      </span>
      <div class='dc-date-calendar dis box-show'>
        <!--选择日期-->
        <div v-show='type==1'>
          <div class='dc-date-header'>
            <span class='dc-pre' @click="changeMonth('prev')">&lt;&lt;</span>
            <div class='dc-a' @click='changeMonth("pick")'>
              <span>{{year}}年</span>
              <span>{{parseInt(month)<10 ?('0'+parseInt(month)):month}}月</span>
              <span>{{parseInt(day)<10 ?('0'+parseInt(day)):day}}日</span>
              </div>
            <span class='dc-next' @click="changeMonth('next')">&gt;&gt;</span>
          </div>
          <div class='dc-table'>
            <div class='dc-table-title'>
              <div v-for="i in ['日','一','二','三','四','五','六']">{{i}}</div>
            </div>
            <div class='dc-table-item' v-for='item in dayArray'>
              <div v-for="v in item" :class='v.status?(v.value==day?"active":""):"disabled"' @click='selectDay(v)'>{{v['value']}}</div>
            </div>
          </div>
          <!--设置时分秒-->
          <div class='dc-inline-group' v-show='dateType=="datetime"'>
            <div class='pr4'>
              <input type="number" v-model='hour' :min='0' :max='24' @keyup='handleChange("hour")'>
              <span>时</span>
            </div>
            <div class='pr4'>
              <input type="number" v-model='min' :min='0' :max='60' @keyup='handleChange("min")'>
              <span>分</span>
            </div>
            <div>
              <input type="number" v-model='second' :min='0' :max='60' @keyup='handleChange("second")'>
              <span>秒</span>
            </div>
          </div>
          <div class='dc-date-bottom'>
            <div class='dc-col-2'>
              <span class='dc-sp' @click='selToday'>今天</span>
            </div>
            <div class='dc-col-8'>
              <span class='dc-sp' @click='confirm'>确定</span>
            </div>
          </div>
        </div>
        <!--选择月份-->
        <div v-show='type==2' >
          <div class='dc-date-header'>
            <span @click='selectYear'>{{year}}年</span>
          </div>
          <div class='dc-table'>
            <div class='dc-table-item sel-month' v-for='(v1, i) in 4'>
              <div v-for='v2 in 3' @click='selectMonth(i*v2+v2)'>{{i*v2+v2}}</div>
            </div>
          </div>
        </div>
        <!-- <div v-show='type==3'>
          <div class='dc-date-header'>
            <span>{{year}}年</span>
          </div>
          <div class='dc-table'>
            <div class='dc-table-item' v-for='(v1, i) in 4'>
              <div v-for='v2 in 3' @click='selectMonth(i*v2+v2)'>{{i*v2+v2}}</div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import './style.less'
  import $ from 'jquery'

  export default {
    props: {
      dateType: {
        type: String,
        default: 'date'
      },
      refsi: {
        type: String,
        default: ''
      },
      isActive: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        current: null,
        year: null,
        month: null,
        day: null,
        week: null,
        weekArray: [],
        dayArray: [],
        type: 1,
        hour: null,
        min: null,
        second: null,
        date: null
      }
    },
    mounted () {
      this.current = new Date()
      this.year = this.current.getFullYear()
      this.month = this.current.getMonth() + 1
      this.week = this.current.getDay()
      this.day = this.current.getDate()
      this.hour = this.current.getHours()
      this.min = this.current.getMinutes()
      this.second = this.current.getSeconds()
    },
    watch: {
      'month': 'getDayArray'
    },
    methods: {
      handleCalendar (e) {
        const temp = $(e.target)
        const arr = Array.from($('.dc-date-picker'))

        arr.forEach((v, i) => {
          $(v).find('.dc-date-calendar').addClass('dis')
        })

        $(temp).parents('.dc-date-picker').find('.dc-date-calendar').toggleClass('dis')
      },
      // 构建一行一列二维日期数组
      getDayArray () {
        const preMonth = new Date(this.year, this.month - 1, 0)
        const current = new Date(this.year, this.month, 0)
        const curWeek = new Date(this.year, this.month - 1, 1).getDay()

        const curDayNum = current.getDate()
        let preDayCount = preMonth.getDate()

        let countDay = 1
        let countEnd = 1

        this.dayArray = Array.from({
          length: 6
        }, () => [])

        this.dayArray.forEach((v, i) => {
          this.dayArray[i] = Array.from({
            length: 7
          }, () => {})

          for (let j = 0; j < 7; j++) {
            if (i === 0) { // 第一个数据行
              if (j >= curWeek) {
                this.dayArray[i][j] = Object.assign({}, {
                  value: countDay,
                  status: true
                })
                countDay++
              } else {
                this.dayArray[i][j] = Object.assign({}, {
                  value: preDayCount - curWeek + 1,
                  status: false
                })
                preDayCount++
              }
            } else if (i === 5 || i === 4) { // 最后两个数据行
              if (countDay <= curDayNum) {
                this.dayArray[i][j] = Object.assign({}, {
                  value: countDay,
                  status: true
                })
                countDay++
              } else {
                this.dayArray[i][j] = Object.assign({}, {
                  value: countEnd,
                  status: false
                })
                countEnd++
              }
            } else { // 中间数据行
              if (countDay <= curDayNum) {
                this.dayArray[i][j] = Object.assign({}, {
                  value: countDay,
                  status: true
                })
                countDay++
              }
            }
          }
        })
      },
      selectDay (data) {
        if (data.status) {
          this.day = data.value
        }
      },
      // 选择月份
      changeMonth (type) {
        if (type === 'prev') {
          if (this.month === 1) {
            this.month = 13
          }
          --this.month
        }
        if (type === 'next') {
          if (this.month === 12) {
            this.month = 0
          }
          ++this.month
        }
        if (type === 'pick') {
          this.type = 2
        }
      },
      selectMonth (value) {
        this.month = value
        this.type = 1
      },
      selectYear () {
        // this.type = 3
        // const startYear = new Date(1900).getFullYear()

        // console.log(12, startYear)
        // console.log(13, this.year)
      },
      // 时间处理
      handleChange (type) {
        switch (type) {
          case 'hour':
            if (this.hour > 24) {
              this.hour = 24
            }
            if (this.hour < 1) {
              this.hour = 1
            }
            break
          case 'min':
            if (this.min > 60) {
              this.min = 60
            }
            break
          case 'second':
            if (this.second > 60) {
              this.second = 60
            }
            break
          default:
            break
        }
      },
      // 今天
      selToday () {
        $('body').off('click')

        this.current = new Date()
        this.current = new Date()
        this.year = this.current.getFullYear()
        this.month = this.current.getMonth() + 1
        this.week = this.current.getDay()
        this.day = this.current.getDate()
        this.hour = this.current.getHours()
        this.min = this.current.getMinutes()
        this.second = this.current.getSeconds()

        this.confirm()
      },
      // 数据提交
      confirm () {
        if (this.dateType === 'date') {
          this.month = this.month < 10 ? `0${parseInt(this.month)}` : this.month
          this.day = this.day < 10 ? `0${parseInt(this.day)}` : this.day
          this.date = `${this.year}-${this.month}-${this.day}`
        }
        if (this.dateType === 'datetime') {
          this.month = this.month < 10 ? `0${parseInt(this.month)}` : this.month
          this.day = this.day < 10 ? `0${parseInt(this.day)}` : this.day
          this.hour = this.hour > 10 ? this.hour : `0${parseInt(this.hour)}`
          this.min = this.min > 10 ? this.min : `0${parseInt(this.min)}`
          this.second = this.second > 10 ? this.second : `0${parseInt(this.second)}`
          this.date = `${this.year}-${this.month}-${this.day} ${this.hour}:${this.min}:${this.second}`
        }

        Array.from($('.dc-date-picker')).forEach((v, i) => {
          if (!$(v).find('.dc-date-calendar').is('dis')) {
            $(v).find('.dc-date-calendar').addClass('dis')
          }
        })

        this.$emit('click', this.date)
      }
    }
  }
</script>

