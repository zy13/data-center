/*
* @Author: zyuan
* @Date:   2017-06-16 16:04:29
* @Last Modified by:   zyuan
* @Last Modified time: 2017-06-21 16:15:13
*/

import ajax from '../../utils/ajax'

export default {
  joinSheets (data) {
    return ajax.put(`/datasource/tables/join`, data)
  },
  saveJoin (data) {
    return ajax.post(`/datasource/tables/join/save`, data)
  }
}
