<template>
 <div class='dc-list-sider'>
    <div class='sider-header'>
      <span>报告</span>
      <div class='dc-inline dc-fr'>
        <span @click='toAddTip("create")'>+</span>
        <div class='add-tip' v-show='isAdd'>
          <div @click='openModal(1)'>新建报告</div>
          <div @click='openModal(2)'>新建文件夹</div>
        </div>
      </div>
    </div>
    <div class='report-list-contaienr'>
      <div class='list' v-for='item in 3'>
        <p @click='shrinkOrSpread' >
          文件夹{{item}}
        </p>
        <ul class='sub-list'>
          <li v-for='item in 2'>
            <span></span>
            <span @click='viewSubReport(item)'>子报告{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
