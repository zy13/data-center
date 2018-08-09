<template>
  <div class='v-drag-txt'>
    可拖拽文本
  </div>
</template>

<script>
  export default{
    methods: {}
  }
</script>

<style lang='less'>
  .v-drag-txt{
    width: 100px;
    height: 100px;
    border: 1px solid #288add;
    &:focus, &:hover{
      // background-color: #fff;
    }
  }
</style>
