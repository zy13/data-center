/*
* @Author: zyuan
* @Date:   2017-07-12 10:17:11
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-29 09:53:01
*/

import ajax from 'utils/ajax'
import qs from 'qs'

export default {
  getSrcList () {
    return ajax.get(`/datasource/list2`)
  },
  getDimensionMeasure (data) {
    return ajax.get(`/datasource/${data.id}/dimension?isDim=${data.isDim}`)
  },
  getAnalyseData (opt) {
    return ajax.post(`/dashboard/getAggregateData?datasourceId=${opt.cfg.datasourceId}`, opt.cfg)
  },
  getDimensionValue (opt) {
    return ajax.get(`/dashboard/getDimensionValues?${qs.stringify(opt)}`)
  }
}
