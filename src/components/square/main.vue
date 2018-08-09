<template>
  <div :id='id' class='dc-chart-square' v-if='yAxis.length && xAxis.length'>
    <div class='dc-table' id='dc-table' v-if='query.cfg' :style='"width:"+format*100+"px"'>
      <div class='dc-yArix-y-top'>
        <span class='span-blank-cont dc-ineline'>
          <span class='dc-arrow-top'></span>
        </span>
      </div>
      <div class='dc-table-item' v-for='(item,i) in yAxis'>
        <div class='dc-yaxis-item'>{{yAxis[yAxis.length-i-1].minValue}}-{{yAxis[yAxis.length-1-i].maxValue}}</div>
        <div v-for='(item2,j) in xAxis' class='item' :class='i==0?"dc-border-top":""'>
          <span v-for='k in dataArr' :data-ymin='yAxis[yAxis.length-1-i].minValue' :data-ymax='yAxis[yAxis.length-1-i].maxValue' :data-xmin='item2.minValue' :data-xmax='item2.maxValue' :data-col='k[0]' v-if='parseInt(k[0])>=yAxis[yAxis.length-i-1].minValue && parseInt(k[0])<yAxis[yAxis.length-1-i].maxValue && parseInt(k[1])>=item2.minValue && parseInt(k[1])<item2.maxValue'>
            <span>{{k[2]}}</span>
            <label>
              <span>{{columnList[0].name}}:{{k[0]}}</span>
              <span>{{columnList[columnList.length-2].name}}:{{k[1]}}</span>
            </label>
          </span>
          <span v-else>0</span>
          <div v-if='j==0' class='dc-yArix-y'>
            <span class="dc-inline"></span>
          </div>
        </div>
      </div>
      <div class='dc-table-item'>
        <div class='dc-axis-blank'></div>
        <div class='dc-xaxis-item' v-for='(item,i) in xAxis'>
          <span class='span-blank-cont dc-inline'></span>
          <span>{{item.minValue}}-{{item.maxValue}}</span>
        </div>
        <div class='dc-axis-blank'>
          <span class='span-blank-cont dc-inline'>
            <span class='arrow-rigth'></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import './style.less'

  export default {
    props: {
      id: {
        type: String,
        default: 'dc-chart-square'
      },
      query: {
        type: Object,
        default () {
          return {}
        }
      },
      columnList: {
        type: Array,
        default () {
          return []
        }
      },
      dataArr: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        format: null,
        yAxis: [],
        xAxis: [],
        dataUrl: ''
      }
    },
    watch: {
      query () {
        if (this.query.cfg) {
          this.format = this.query.cfg.colCfg.format + 1
          this.yAxis = this.query.cfg.colCfg.sections
          this.xAxis = this.query.cfg.rowCfg.sections
        }
      }
    }
  }
</script>
