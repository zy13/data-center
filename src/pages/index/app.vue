<template>
  <div>
    <dcHeader></dcHeader>
    <div class='dc-wrapper'>
      <div class='dc-container'>
        <div class='dc-main'>
          <router-view></router-view>
        </div>
        <!-- <dcFooter></dcFooter> -->
      </div>
    </div>
  </div>
</template>

<script>
  import 'assets/css/common/common.less'
  import dcHeader from 'components/header'
  import dcFooter from 'components/footer'

  export default{
    components: {
      dcHeader,
      dcFooter
    }
  }
</script>
