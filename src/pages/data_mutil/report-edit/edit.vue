<template>
  <div class='dc-report-edit'>
    <div class='dc-edit-left'>
      <editFilter></editFilter>
      <editSetting></editSetting>
    </div>
    <div class='dc-edit-rigth'>
      <editShowCanvas></editShowCanvas>
    </div>
  </div>
</template>

<script>
  import 'assets/css/pages/report-edit.less'
  import editMx from './mx/edit.js'
  import editFilter from './tpl/edit-filter'
  import editSetting from './tpl/edit-setting'
  import editShowCanvas from './tpl/edit-show-canvas'

  export default{
    mixins: [editMx],
    components: {
      editFilter,
      editSetting,
      editShowCanvas
    }
  }
</script>
