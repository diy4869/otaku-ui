module.exports = [
  {
    type: 'list',
    name: 'componentType',
    choices: [
      {
        name: '通用'
      },
      {
        name: '导航'
      },
      {
        name: '通知'
      },
      {
        name: '表单'
      },
      {
        name: '展示'
      },
      {
        name: '其他'
      }
    ],
    message: '选择需要创建的组件类型'
  },
  {
    type: 'input',
    name: 'routerPath',
    message: '请输入组件路由路径',
    validate (val) {
      const  done  =  this.async()

      if (val) done(null, true)
      done('组件路由路径不能为空', false)
    }
  },
  {
    type: 'input',
    name: 'title',
    message: '请输入组件标题，将用于展示在左侧菜单栏',
    validate (val) {
      const  done  =  this.async()

      if (val) done(null, true)
      done('组件标题不能为空', false)
    }
  },
]