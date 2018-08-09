<template>
  <div class='dc-circles-inline' :data-type='corType'>
    <div class='circle-group' :class='corMap[corType]'>
      <span class='dc-circle1'>
        <span class='dc-inline'></span>
      </span>
      <span class='dc-circle2'>
        <span class='dc-inline'></span>
      </span>
    </div>
  </div>
</template>

<script>
  const COR_TYPE = {
    1: 'inline', // 内连
    2: 'left', // 左 连
    3: 'right', // 右连
    4: 'out' // 外连
  }
  export default {
    props: {
      corType: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        corMap: COR_TYPE
      }
    },
    methods: {
      handleCor () {
        this.$emit('correlate')
      }
    }
  }
</script>

<style lang='less'>
  @import './style.less';
</style>
