<template>
  <div class='dc-page-list' :class='limits.length>1?"show":""'>
    <div class='dc-ul'>
      <div class='dc-li' v-for='(v, i) in limits' :class='i==0?"active":""' @click='handleClick(i)'>{{v}}</div>
    </div>
  </div>
</template>

<script>
  import './style.less'
  import $ from 'jquery'

  export default {
    props: {
      totalNum: {
        type: Number,
        default: 12
      },
      limit: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        limits: [] // 1, 2, 3, 4, 5, '...', '末页', '下一页'
      }
    },
    mounted () {
      const pageSum = Math.ceil(this.totalNum / this.limit)

      console.log(pageSum)

      if (pageSum > 1 && pageSum < 6) {
        for (let i = 0; i < pageSum; i++) {
          this.limits.push(i + 1)
        }
      }

      if (pageSum >= 6) {
        this.limits = [1, 2, 3, 4, 5, '...', '末页', '下一页']
      }
    },
    methods: {
      handleClick (index) {
        const $el = $('.dc-li')[index]

        $($el).addClass('active').siblings('.dc-li').removeClass('active')
        this.$emit('change', {
          limit: this.limit,
          pageIndex: index + 1
        })
      }
    }
  }
</script>
