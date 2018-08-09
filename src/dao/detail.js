/*
* @Author: zyuan
* @Date:   2017-06-07 17:43:36
* @Last Modified by:   zyuan
* @Last Modified time: 2017-06-20 13:52:08
*/
import ajax from '../../utils/ajax'

export default {
  getDataDetail (id) {
    return ajax.get(`/datasource/${id}/metaInfo`)
  },
  searchData (id, data) {
    return ajax.post(`/datasource/${id}/tableInfo`, data)
  },
  download (id) {
    return ajax.get(`/datasource/${id}/tableInfo/download`)
  }
}
