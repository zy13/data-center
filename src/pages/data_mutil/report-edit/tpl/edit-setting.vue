<template>
  <div class='dc-edit-setting'>
    <div class='dc-p'>
      <p>设置</p>
      <ul @dragover='allowDrop' @dragenter='allowDrop'>
        <li class='dc-setting-color' data-type='color'>
          <div class="dc-inline dc-vt">颜色</div>
          <div class="dc-inline" >
            <span @drop='drop'>拖入字段</span>
            <ul>
              <li v-for='item in settingColor' @drop='drop'>{{item.column}}</li>
            </ul>
          </div>
        </li>
        <li class='dc-setting-color'>
          <span>排序</span>
          <span class='dc-fr'>拖入字段</span>
        </li>
        <!-- <li>
          <span>明细</span>
          <span class='dc-fr'>拖入字段</span>
        </li>
        <li>
          <span>大小</span>
          <span class='dc-fr'>拖入字段</span>
        </li> -->
      </ul>
    </div>
    <div class='dc-p'>
      <p>数据筛选</p>
      <ul data-type='filter' @dragover='allowDrop' @dragenter='allowDrop'>
        <li class='dc-li' @drop='drop'>拖入变量</li>
        <li v-for='item in settingFilter' @drop='drop'>
          <span>icon</span>
          <span>{{item.column}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default{
    data () {
      return {
        settingColor: [],
        settingFilter: []
      }
    },
    methods: {
      allowDrop (event) {
        event.preventDefault()
      },
      drop (event) {
        const type = $(event.target).closest('ul').data('type')
        const dataTransfer = JSON.parse(event.dataTransfer.getData('text'))

        event.stopPropagation()
        switch (type) {
          case 'color':
            this.settingColor.push(dataTransfer)
            break
          case 'filter':
            this.settingFilter.push(dataTransfer)
            break
        }
        // let validate = true

        // Array.from(this.settingColor, (v, i) => {
        //   if (v.columns === dataTransfer.columns && v.id === dataTransfer.id) {
        //     validate = false
        //   }
        // })
        // if (validate) {
        //   this.settingColor.push(dataTransfer)
        // }
      }
    }
  }
</script>
