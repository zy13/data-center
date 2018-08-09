<template>
  <div class='dc-edit-filter'>
    <div class='dc-p'>数据</div>
    <div class='dc-filter-sel'>
      <select v-model='actItem'>
        <option v-for='item in srclist' :value='item'>{{item.lable}}</option>
      </select>
    </div>
    <div class='dc-p-active'>
      <p @click='shrinkOrSpread'>
        <span>分类变量</span>
        <span class='dc-fr dc-arrow-top'></span>
      </p>
      <ul>
        <li v-for='item in dmObj.dimensions'>
          <div v-if='[4, 5].includes(item.type)' class='dc-date-time dc-p-active'>
            <div @click='shrinkOrSpread'>
              <span class='dc-inline str'>类</span>
              <span class='dc-switch-span' :title='item.column'>{{item.column}}</span>
              <span class='dc-jl-span'>
                <span class='cpf-icon cpf-icon-extend'></span>
              </span>
            </div>
            <ul class='dis'>
              <li v-for='v in ["年","季度","月","周","日"]' draggable='true' :data-item='JSON.stringify(item)' @dragstart='dragstart'>{{v}}</li>
            </ul>
          </div>
          <div v-else draggable='true' :data-item='JSON.stringify(item)' @dragstart='dragstart'>
            <span class='dc-inline str'>类</span>
            <span>{{item.column}}</span>
          </div>
        </li>
        <li>
          <div class='dc-date-time dc-p-active'>
            <div @click='shrinkOrSpread'>
              <span class='dc-switch-span'>自定义</span>
              <span class='dc-jl-span'>
                <span class='cpf-icon cpf-icon-extend'></span>
              </span>
            </div>
            <ul class='dis'>
              <li v-for='item in dmObj.customDimensions' draggable='true' :data-item='JSON.stringify(item)' @dragstart='dragstart'>{{item.name}}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class='dc-p-active'>
      <p @click='shrinkOrSpread'>
        <span>数值变量</span>
        <span class='dc-fr dc-arrow-top'></span>
      </p>
      <ul>
        <li v-for='item in dmObj.measures' class='dc-li1 dc-li' draggable='true' :data-item='JSON.stringify(item)' @dragstart='dragstart'>
          <span class='dc-inline val'>数</span>
          <span>{{item.column}}</span>
          <span class='dc-fr dc-arrow-bottom' @click='handleMemu'></span>
          <ul class='dc-ul-menu dc-dis'>
            <li v-for='(item,idx) in ["计数","总和","平均","中位数","最大值","最小值"]' @click='actAgg=item'>
              <span :class='actAgg==item?"cpf-icon cpf-icon-ic_tick":""'></span>
              <span class='dc-inline' draggable='true' :data-item='item' @dragstart='dragstart'>{{item}}</span>
            </li>
          </ul>
        </li>
        <li :draggable='false'>
          <div class='dc-date-time dc-p-active' :draggable='false'>
            <div @click='shrinkOrSpread'>
              <span class='dc-switch-span'>自定义</span>
              <span class='dc-jl-span'>
                <span class='cpf-icon cpf-icon-extend'></span>
              </span>
            </div>
            <ul class='dis'>
              <li v-for='item in dmObj.customMeasures' class='dc-li2 dc-li' draggable='true' :data-item='JSON.stringify(item)' @dragstart='dragstart'>
                <span></span>
                <span>{{item.name}}</span>
                <span class='dc-fr dc-arrow-bottom' @click='handleMemu'></span>
                <ul class='dc-ul-menu dc-dis'>
                  <li v-for='(item,idx) in ["计数","总和","平均","中位数","最大值","最小值"]' @click='actAgg[idx]=item'>
                    <span :class='actAgg[idx]==item?"cpf-icon cpf-icon-ic_tick":""'></span>
                    <span class='dc-inline'>{{item}}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import filterMx from '../mx/filter'
  import dragMx from '../mx/drag'

  export default {
    mixins: [filterMx, dragMx]
  }
</script>
