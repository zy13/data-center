<template>
  <div class='modal-fixed' :class='modalData.rule?modalData.rule:""' v-if="modalData.isOpenModal">
    <div class='modal-wrap'>
      <div class='modal-main'>
        <div class='modal-header'>
          <p>{{modalData.title}}</p>
          <span class='modale-close' @click="handleClose">&times;</span>
        </div>
        <div class='modal-content'>
          <slot></slot>
        </div>
        <div v-if='!modalData.filter || modalData.filter==undefined' class='modal-footer'>
          <div class='btn mgr20' @click='confirm'>确定</div>
          <div class='btn' @click="handleClose">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      modalData: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      handleClose () {
        this.modalData.isOpenModal = false
      },
      confirm (data) {
        this.$emit('confirm', data)
      }
    }
  }
</script>

<style lang='less'>
  @import './style.less';
</style>
