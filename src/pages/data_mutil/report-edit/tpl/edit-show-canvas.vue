<template>
  <div class='dc-show-canvas'>
    <div class='dc-show-header'>
      <ul>
        <li class='dc-inline'>
          <span @click='insertImg'>图表</span>
          <span @click='insertTxt'>文本</span>
        </li>
        <li>画布</li>
        <li>操作</li>
        <li>展示图</li>
        <li>
          <span v-for='item in chartTypeArr'>{{item.name}}</span>
        </li>
      </ul>
      <div class='dc-setting-cr' @dragover='allowDrop' @dragenter='allowDrop'>
        <div class='dc-p'>
          <span class='dc-inline'>
            <span class='dc-red'>*</span>
            <span>行：</span>
          </span>
          <div class='dc-inline dc-area' data-type='row' @drop='drop'>
            <span v-for='item in rowArr'>{{item.column}}</span>
          </div>
        </div>
        <div class='dc-p'>
          <span class='dc-inline'>
            <span class='dc-red'>*</span>
            <span>列：</span>
          </span>
          <div class='dc-inline dc-area' data-type='col' @drop='drop'>
            <span v-for='item in colArr'>{{item.column}}</span>
          </div>
        </div>
        <div class='dc-p'>
          <span class='dc-inline'>
            <span>图表展示：</span>
          </span>
          <div class='dc-input-radio dc-inline'>
            <input type="radio" name="" id='dc-id'>
            <label for='dc-id'></label>
            <span>显示数字标签</span>
          </div>
        </div>
        <div class='dc-p'>
          <span class='dc-inline'>
            <span class='dc-red'>*</span>
            <span>图表标题：</span>
          </span>
          <div class='dc-inline'>
            <input class='dc-default' type="text" name="">
          </div>
        </div>
      </div>
    </div>
    <div class='dc-show-chart' id='dc-show-chart'>
      <div @dragover='allowDrop' @drop='drop'>canvas-图表显示区域</div>
    </div>
  </div>
</template>

<script>
  import colRowMx from '../mx/colRow.js'

  window.ad = {
    a: 1,
    b: 'pp'
  }

  export default{
    mixins: [colRowMx]
  }
</script>
