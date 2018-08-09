/*
* @Author: zyuan
* @Date:   2017-08-24 14:02:40
* @Last Modified by:   zyuan
* @Last Modified time: 2017-08-28 10:16:49
*/

import Login from '../login/router-map'
import ReportList from '../data_mutil/report-list/router-map'
import ReportEdit from '../data_mutil/report-edit/router-map'

const maps = [Login, ReportList, ReportEdit]

let map = []

maps.forEach(item => {
  map = map.concat(item)
})

export default map

