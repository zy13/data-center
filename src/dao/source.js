/*
* @Author: zyuan
* @Date:   2017-06-02 16:17:26
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-10 15:02:40
*/

import ajax from '../../utils/ajax'
import qs from 'qs'

export default {
  upload (formdata) {
    return ajax.post(`/datasource/upload`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  getSheets () {
    return ajax.get(`/datasource/sheets`)
  },
  getMetaInfo () {
    return ajax.get(`/datasource/tables/metaInfo`)
  },
  configueration (data) {
    return ajax.post(`/datasource/configueration`, data)
  },
  importData (operateType) {
    return ajax.post(`/datasource/import?${qs.stringify(operateType)}`)
  },
  dataList (data) {
    return ajax.get(`/datasource/lists?${qs.stringify(data)}`)
  },
  submitMetaInfo (data) {
    return ajax.post(`/datasource/tables/metaInfo`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  deleteData (id) {
    return ajax.delete(`/datasource/${id}`)
  },
  importSql (data) {
    return ajax.post(`/datasource/database/import`, data)
  },
  submitRefFileds (data) {
    return ajax.post(`/datasource/referenceFileds`, data)
  },
  updateSource (data) {
    return ajax.post(`/datasource/configueration/update`, data)
  },
  sqlSync (datasourceId) {
    return ajax.put(`/datasource/database/table/sychronize?${qs.stringify(datasourceId)}`)
  },
  sqlCheck (data) {
    return ajax.post(`/datasource/database/sqlCheck`, data)
  }
}
