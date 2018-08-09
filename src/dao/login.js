/*
* @Author: zyuan
* @Date:   2017-06-01 16:32:11
* @Last Modified by:   zyuan
* @Last Modified time: 2017-07-11 17:33:51
*/

import ajax from '../../utils/ajax'

export default {
  login (data) {
    return ajax.post(`/login`, data)
  }
}
