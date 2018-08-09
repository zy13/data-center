<template>
  <div class='dc-footer'>
    <div>©2003-{{thisYear}} TaleBase. All Rights Reserved. 倍智版权所有</div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        thisYear: new Date().getFullYear()
      }
    }
  }
</script>
