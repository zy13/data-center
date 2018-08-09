<template>
  <div class='dc-report-list'>
    <div class='dc-list-sider'>
      <div class='sider-header'>
        <span>报告</span>
        <div class='dc-inline dc-fr'>
          <span @click='toAddTip("create")'>+</span>
          <div class='add-tip' v-show='isAdd'>
            <div @click='openModal(1)'>新建文件夹</div>
            <div @click='openModal(2)'>新建报告</div>
          </div>
        </div>
      </div>
      <div class='report-list-contaienr'>
        <div class='list' v-for='item in list'>
          <div class='dc-p' @click='shrinkOrSpread' @contextmenu='toShowMenu'>
            <span>{{item.name}}</span>
            <div class='add-tip dis'>
              <div @click='openModal(1)'>新建文件夹</div>
              <div @click='openModal(2)'>新建报告</div>
              <div @click='openModal(3, item)'>重命名</div>
              <div @click='openModal(4, item)'>删除</div>
            </div>
          </div>
          <ul class='sub-list'>
            <li v-for='val in item.widgetCategoryList'>
              <span>icon</span>
              <span @click='viewSubReport(val)'>{{val.name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class='dc-list-main dc-inline'>
      <div class='dc-main-header'>
        <div class='dc-inline'>
          <router-link to='/report/edit/1'>编辑报告</router-link>
        </div>
        <div class='dc-inline'>
          <span>刷新数据</span>
        </div>
        <div class='dc-inline dc-export-report'>
          <span @click='toAddTip("export")'>导出报告</span>
          <div class='add-tip' v-show='isExport'>
            <div>导出图片</div>
            <div>导出Excel</div>
            <div>导出长图</div>
          </div>
        </div>
      </div>
      <div class='dc-main-body'>
        <div class='dc-canvas'>canvas</div>
      </div>
    </div>
    <modal :modalData='modalData' @confirm='confirm'>
      <div class='modal-content-container' v-if='!isDel'>
        <span>
          <span class='dc-red'>*</span>
          <span>{{this.modalData.title=='新建报告'?'报告名称':'文件夹名称'}}</span>
        </span>
        <input type="text" class='dc-default' v-model='name'>
      </div>
      <div class='modal-content-container' v-else>
        <div>{{actDelName.length?"文件夹下存在报告":""}}<br/>您确定要删除"{{actDelName}}"吗？</div>
      </div>
    </modal>
  </div>
</template>

<script>
  import 'assets/css/pages/report-list.less'
  import mx from './mx.js'
  import modal from 'components/modal'

  export default{
    mixins: [mx],
    components: {
      modal
    }
  }
</script>


