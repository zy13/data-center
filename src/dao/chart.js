/*
* @Author: zyuan
* @Date:   2017-07-26 14:13:30
* @Last Modified by:   zyuan
* @Last Modified time: 2017-07-28 10:34:15
*/

import ajax from 'utils/ajax'
import qs from 'qs'

export default {
  addChart (data) {
    return ajax.post(`/dashboard/widget/add`, data)
  },
  getChartList (data) {
    return ajax.get(`/dashboard/widget/list?${qs.stringify(data)}`)
  },
  editChart (data) {
    return ajax.put(`/dashboard/widget/update`, data)
  },
  delChart (id) {
    return ajax.delete(`dashboard/widget/delete/${id}`)
  }
}
