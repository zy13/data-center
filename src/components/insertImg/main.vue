<template>
  <div class='v-drag-img' @click='click' @focus='focus'>
    <div>插入图片</div>
  </div>
</template>

<script>
  export default{
    mounted () {
      // this.focus()
    },
    methods: {
      click (event) {
        // console.log(event)
      },
      focus (event) {
        console.log(11)
        event.target.style.backgroundColor = ''
        console.log(event)
      }
    }
  }
</script>

<style lang='less'>
  .v-drag-img{
    width: 300px;
    height: 300px;
    border: 1px solid #288add;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -150px;
  }
</style>
