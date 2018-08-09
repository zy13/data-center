<template>
  <div class='dc-loading' :class="{ full: isFull === 'true' || isFull === true ? true : false }">
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>
</template>

<script>
  import './style.less'

  export default {
    props: {
      isFull: {
        type: Boolean,
        default: true
      },
      top: {
        type: Number,
        default: 120
      }
    }
  }
</script>
