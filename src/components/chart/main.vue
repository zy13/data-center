<template>
  <div :id='id' :style='{width: "660px", height: "450px", margin: "20px auto"}' :data-value='chartType=$route.query.type'>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    props: {
      id: {
        type: String,
        default: 'my-echart'
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
      },
      query: {
        type: Object,
        default () {
          return {}
        }
      },
      chartTitle: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        myChart: {},
        option: {},
        chartType: this.$route.query.type,
        dataUrl: ''
      }
    },
    mounted () {
      this.myChart = echarts.init(document.getElementById(this.id))
    },
    watch: {
      chartType () {
        if (this.query.cfg !== undefined) {
          this.setChartOption()
        }
      },
      query () {
        if (this.query.cfg !== undefined) {
          this.chartType = this.query.cfg.chartType
          this.setChartOption()
        }
      },
      columnList () {
        if (this.query.cfg !== undefined) {
          this.setChartOption()
        }
      }
    },
    methods: {
      setChartOption () {
        const option = this.handleOptionData(this.chartType)
        this.myChart.setOption(Object.assign({
          // title: {
          //   text: this.chartTitle,
          //   x: 'left'
          // },
          animation: false,
          grid: {
            right: '15%',
            containLabel: true
          }
        }, option), true, true)
        setTimeout(() => {
          this.dataUrl = this.myChart.getDataURL({
            backgroundColor: '#fff'
          })
        }, 3000)
      },
      handleOptionData (type) {
        let option = {}
        switch (parseInt(type, 10)) {
          case 2:
            option = this.setStripBarOption()
            break
          case 3:
            option = this.setStackBarOption()
            break
          case 4:
            option = this.setBarOption()
            break
          case 5:
            option = this.setPieOption()
            break
          default:
            break
        }
        return option
      },
      // 条形图
      setStripBarOption () {
        const self = this
        const rowData = []
        const colData = []
        const seriesData = []
        const seriesArr = []
        const rowIdxArr = []
        const colIdxArr = []
        let colName = ''

        // get col-show data
        rowData.push(self.query.cfg.values[0].column)
        self.query.cfg.rows.forEach((v, i) => {
          rowData.push(v.columnName)
        })

        // get row-data index
        self.query.cfg.columns.forEach((v, i) => {
          if (i === self.query.cfg.columns.length - 1) {
            colName += v.columnName
          } else {
            colName += v.columnName + '-'
          }
          self.columnList.forEach((k, j) => {
            if (v.columnName === k.name) {
              colIdxArr.push(k.index)
            }
          })
        })

        // get xaris-name and series-data-array
        self.dataArr.forEach((v, i) => {
          const str = []
          seriesData.push(v[v.length - 1])
          v.forEach((k, j) => {
            colIdxArr.forEach(y => {
              if (j === y) {
                str.push(k)
              }
            })
          })
          colData.push(str.join('-'))
        })

        // get col-data index and series-array
        rowData.forEach((v, i) => {
          self.columnList.forEach((k, j) => {
            if (v === k.name) {
              rowIdxArr.push(k.index)
            }
          })
          seriesArr.push({
            name: v,
            type: 'bar',
            data: seriesData,
            barWidth: 15
          })
        })

        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: (arr) => {
              const idx = arr[0].dataIndex
              let str = colName + ': ' + arr[0].name + '<br/>'

              rowIdxArr.forEach((k, i) => {
                str += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + arr[i].color + '"></span>' + rowData[i] + ': ' + self.dataArr[idx][k] + '<br/>'
              })
              return str
            }
          },
          legend: {
            center: 'center',
            data: rowData
          },
          xAxis: [{
            type: 'value',
            name: rowData[0]
          }],
          yAxis: [{
            type: 'category',
            name: colName,
            data: colData
            // axisLabel: {
            //   interval: 0
            // }
          }],
          dataZoom: [{
            type: 'inside'
          }],
          series: seriesArr
        }
      },
      // 堆叠柱状图
      setStackBarOption () {
        const self = this
        const rowData = []
        const colData = []
        const seriesArr = []
        const seriesData = []
        const rowIdxArr = []
        const colIdxArr = []
        const dataTypeArr = []
        let rowName = ''

        // get col-show data
        dataTypeArr.push(1)
        colData.push(self.query.cfg.values[0].column)
        self.query.cfg.columns.forEach((v, i) => {
          const dataType = parseInt(v.dataType, 10)

          colData.push(v.columnName)
          dataTypeArr.push(dataType)

          if (dataType === 1) {
            seriesArr.push({
              name: v.columnName,
              type: 'bar',
              stack: '整型',
              data: [],
              barWidth: 15
            })
          } else if (dataType === 6) {
            seriesArr.push({
              name: v.columnName,
              type: 'bar',
              stack: '字符串型',
              data: [],
              barWidth: 15
            })
          } else {
            seriesArr.push({
              name: v.columnName,
              type: 'bar',
              stack: '日期型',
              data: [],
              barWidth: 15
            })
          }
        })

        // get row-data index
        self.query.cfg.rows.forEach((v, i) => {
          if (i === self.query.cfg.rows.length - 1) {
            rowName += v.columnName
          } else {
            rowName += v.columnName + '-'
          }
          self.columnList.forEach((k, j) => {
            if (v.columnName === k.name) {
              rowIdxArr.push(k.index)
            }
          })
        })

        // get xaris-name and series-data-array
        self.dataArr.forEach((v, i) => {
          const str = []

          seriesData.push(v[v.length - 1])
          v.forEach((k, j) => {
            rowIdxArr.forEach(y => {
              if (j === y) {
                str.push(k)
              }
            })
          })
          rowData.push(str.join('-'))
        })

        // get col-data index and series-array
        colData.forEach((v, i) => {
          self.columnList.forEach((k, j) => {
            if (v === k.name) {
              colIdxArr.push(k.index)
            }
          })
          if (dataTypeArr[i] === 1) {
            seriesArr.push({
              name: v,
              type: 'bar',
              stack: '整型',
              data: seriesData,
              barWidth: 15
            })
          } else if (dataTypeArr[i] === 6) {
            seriesArr.push({
              name: v,
              type: 'bar',
              stack: '字符串型',
              data: seriesData,
              barWidth: 15
            })
          } else {
            seriesArr.push({
              name: v,
              type: 'bar',
              stack: '日期型',
              data: seriesData,
              barWidth: 15
            })
          }
        })

        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: (arr) => {
              const idx = arr[0].dataIndex
              let str = rowName + ': ' + arr[0].name + '<br/>'

              colIdxArr.forEach((k, i) => {
                str += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + arr[i].color + '"></span>' + colData[i] + ': ' + self.dataArr[idx][k] + '<br/>'
              })
              return str
            }
          },
          legend: {
            center: 'center',
            data: colData
          },
          xAxis: [{
            type: 'category',
            name: rowName,
            data: rowData,
            axisLabel: {
              interval: 0,
              rotate: -30
            }
          }],
          yAxis: [{
            type: 'value',
            name: colData[0]
          }],
          series: seriesArr
        }
      },
      // 柱状图
      setBarOption () {
        const self = this
        const rowData = []
        const colData = []
        const seriesData = []
        const seriesArr = []
        const rowIdxArr = []
        const colIdxArr = []
        let rowName = ''

        // get col-show data and colIdxArr
        colData.push(self.query.cfg.values[0].column)
        self.query.cfg.columns.forEach((v, i) => {
          colData.push(v.columnName)
        })

        // get row-data index
        self.query.cfg.rows.forEach((v, i) => {
          if (i === self.query.cfg.rows.length - 1) {
            rowName += v.columnName
          } else {
            rowName += v.columnName + '-'
          }
          self.columnList.forEach((k, j) => {
            if (v.columnName === k.name) {
              rowIdxArr.push(k.index)
            }
          })
        })

        // get xaris-name and series-data-array
        self.dataArr.forEach((v, i) => {
          const str = []
          seriesData.push(v[v.length - 1])
          v.forEach((k, j) => {
            rowIdxArr.forEach(y => {
              if (j === y) {
                str.push(k)
              }
            })
          })
          rowData.push(str.join('-'))
        })

        // get col-data index and series-array
        colData.forEach((v, i) => {
          self.columnList.forEach((k, j) => {
            if (v === k.name) {
              colIdxArr.push(k.index)
            }
          })
          seriesArr.push({
            name: v,
            type: 'bar',
            data: seriesData,
            barWidth: 15
          })
        })

        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: (arr) => {
              const idx = arr[0].dataIndex
              let str = rowName + ': ' + arr[0].name + '<br/>'

              colIdxArr.forEach((k, i) => {
                str += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + arr[i].color + '"></span>' + colData[i] + ': ' + self.dataArr[idx][k] + '<br/>'
              })
              return str
            }
          },
          legend: {
            center: 'center',
            data: colData
          },
          xAxis: [{
            type: 'category',
            name: rowName,
            data: rowData,
            axisLabel: {
              interval: 0,
              rotate: -30
            }
          }],
          yAxis: [{
            type: 'value',
            name: colData[0]
          }],
          dataZoom: [{
            type: 'inside'
          }],
          series: seriesArr
        }
      },
      // 饼图
      setPieOption () {
        const self = this
        const legendData = []
        const seriesDataIdx = []
        const seriesData = []

        self.columnList.forEach((v, i) => {
          self.query.cfg.rows.forEach((k, j) => {
            if (v.name === k.columnName) {
              seriesDataIdx.push(v.index)
            }
          })
        })

        self.dataArr.forEach((v, i) => {
          seriesDataIdx.forEach(k => {
            legendData.push(v[k])
            seriesData.push({
              name: v[k],
              value: v[v.length - 1]
            })
          })
        })

        return {
          // title: {
          //   text: self.chartTitle,
          //   x: 'center'
          // },
          tooltip: {
            trigger: 'item',
            formatter: (arr) => {
              const idx = arr.dataIndex
              let str = ''

              self.columnList.forEach((v, i) => {
                str += v.name + ': ' + self.dataArr[idx][i] + '<br/>'
              })
              return str
            }
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: legendData
          },
          series: [{
            type: 'pie',
            radius: '50%',
            center: ['50%', '60%'],
            data: seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }
      }
    }
  }
</script>
