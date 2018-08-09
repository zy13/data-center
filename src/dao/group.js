/*
* @Author: zyuan
* @Date:   2017-07-25 16:25:50
* @Last Modified by:   zyuan
* @Last Modified time: 2017-07-28 10:33:39
*/

import ajax from 'utils/ajax'
import qs from 'qs'

export default {
  addGroup (data) {
    return ajax.post(`/dashboard/widgetCategory/add`, data)
  },
  getGroupList (data) {
    return ajax.get(`/dashboard/widgetCategory/list?${qs.stringify(data)}`)
  },
  delGroup (id) {
    return ajax.delete(`/dashboard/widgetCategory/delete/${id}`)
  },
  editGroup (data) {
    return ajax.put(`/dashboard/widgetCategory/update`, data)
  }
}
