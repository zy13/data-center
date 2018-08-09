/*
* @Author: zyuan
* @Date:   2017-08-03 11:51:23
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-28 16:05:21
*/

import ajax from '../../utils/ajax'
import qs from 'qs'

export default {
  getReportList (data) {
    return ajax.get(`/report/list?${qs.stringify(data)}`)
  },
  getSubReportList (id) {
    return ajax.get(`/report/${id}/subReportList`)
  },
  getSubReportData (rId, data) {
    return ajax.get(`/report/${rId}/subReport/data?${qs.stringify(data)}`)
  },
  saveSubReportData (rId, data) {
    return ajax.post(`/report/${rId}/subReport/data`, data)
  },
  addReport (data) {
    return ajax.post(`/report/upload`, data)
  },
  downloadReport (data) {
    return ajax.get(`/report/download?ids=${data.ids}&subIds=${data.subIds}`)
  },
  delReport (id) {
    return ajax.delete(`/report/${id}`)
  },
  addSingleSubReport (data) {
    return ajax.get(`/report/${data.reportId}/subReport/${data.subReportId}/data?dimension=${data.dimension}`)
  }
}
