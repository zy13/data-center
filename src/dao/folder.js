/*
* @Author: zyuan
* @Date:   2017-08-28 16:05:34
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-28 16:11:44
*/

import ajax from 'utils/ajax.js'

export default {
  getFolderList () {
    return ajax.get(`/folder/list`)
  },
  addFolder (name) {
    return ajax.post(`/folder/add`, name)
  },
  renameFolder (data) {
    return ajax.put(`/folder/update`, data)
  },
  delFolder (data) {
    return ajax.delete(`/folder/delete/${data.id}`, data.forceDel)
  }
}
