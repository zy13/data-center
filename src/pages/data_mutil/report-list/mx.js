/*
 * @Author: zyuan
 * @Date:   2017-08-25 16:45:47
 * @Last Modified by:   zyuan
 * @Last Modified time: 2017-08-30 18:00:02
 */

import $ from 'jquery'
import folderDao from 'dao/folder'
import loading from 'components/loading'

export default {
  data () {
    return {
      activeId: null,
      isAdd: false,
      isExport: false,
      modalData: {
        title: '',
        isOpenModal: false,
        rule: 'dc-min'
      },
      name: '',
      list: [],
      isDel: false,
      actDelName: '',
      modalType: null,
      actItem: {}
    }
  },
  mounted () {
    this.getFolderList()
  },
  methods: {
    getFolderList () {
      loading.open()
      folderDao.getFolderList().then(r => {
        if (r.code === 0) {
          this.list = r.response
        }
      }).then(() => {
        loading.close()
      })
    },
    addFolder () {
      loading.open()
      folderDao.addFolder(this.name).then(r => {
        if (r.code === 0) {
          this.getFolderList()
        }
      }).then(() => {
        loading.close()
      })
    },
    renameFolder () {
      loading.open()
      folderDao.renameFolder({
        id: this.actItem.id,
        name: this.actItem.name
      }).then(r => {
        if (r.code === 0) {
          this.getFolderList()
        }
      }).then(() => {
        loading.close()
      })
    },
    delFolder (bl) {
      const data = {
        id: this.actItem.id,
        forceDel: bl
      }
      loading.open()
      folderDao.delFolder(data).then(r => {
        if (r.code === 0) {
          this.getFolderList()
        }
      }).then(() => {
        this.isDel = false
        loading.close()
      })
    },
    viewSubReport (id) {
      this.activeId = id
    },
    openModal () {
      const type = arguments[0]

      this.disMemu()
      this.modalType = type
      this.modalData.isOpenModal = true

      switch (type) {
        case 1:
          this.isAdd = false
          this.name = ''
          this.modalData.title = '新建文件夹'
          break
        case 2:
          this.isAdd = false
          this.name = ''
          this.modalData.title = '新建报告'
          break
        case 3:
          this.name = arguments[1].name
          this.actItem = arguments[1]
          this.modalData.title = '重命名'
          break
        case 4:
          this.actDelName = arguments[1].name
          this.actItem = arguments[1]
          this.isDel = true
          this.modalData.title = '提示'
          break
      }
    },
    confirm () {
      const type = this.modalType

      switch (type) {
        case 1:
          this.addFolder()
          break
        case 2:
          break
        case 3:
          this.renameFolder()
          break
        case 4:
          this.delFolder(true)
          break
      }

      this.modalData.isOpenModal = false
    },
    toShowMenu (e) {
      const $el = e.target

      this.isAdd = false
      this.isExport = false

      $($el).find('.add-tip').toggleClass('dis').closest('.list').siblings('.list').find('.add-tip').addClass('dis')
      event.preventDefault()

      $(document).on('click', (event) => {
        if ($(event.target).closest('.add-tip').length) {
          $(event.target).closest('.add-tip').removeClass('dis')
        } else {
          this.disMemu()
        }
      })
    },
    toAddTip (type) {
      if (type === 'create') {
        this.isExport = false
        this.isAdd = true

        $(document).on('click', (event) => {
          if (this.isAdd && !$(event.target).closest('.sider-header').length) {
            if ($(event.target).closest('.add-tip').length) {
              this.isAdd = true
            } else {
              this.isAdd = false
            }
          }
        })
      }

      if (type === 'export') {
        this.isAdd = false
        this.isExport = true

        $(document).on('click', (event) => {
          if (this.isExport && !$(event.target).closest('.add-tip').length) {
            if ($(event.target).closest('.add-tip').length) {
              this.isExport = true
            } else {
              this.isExport = false
            }
          }
        })
      }
    },
    shrinkOrSpread (event) {
      const $el = event.target
      $($el).siblings('.sub-list').toggleClass('active')
    },
    disMemu () {
      $(document).find('.add-tip').addClass('dis')
    }
  }
}
