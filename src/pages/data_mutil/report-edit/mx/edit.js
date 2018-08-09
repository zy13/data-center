/*
* @Author: zyuan
* @Date:   2017-08-28 10:01:42
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-30 18:08:12
*/

export default {
  data () {
    return {
      cfg: {
        chartType: 1, // 图表类型
        columns: [], // 列数据
        rows: [], // 行配置数据
        datasourceId: null, // 数据源id
        filters: [], // 筛选器
        gridChartCfg: {} // 九宫格配置数据
      }
    }
  },
  mounted () {
    window.cfg = Object.assign({}, this.cfg)
  }
}
