
import { lazy } from 'react'

export default [
  {
    title: "开发指南",
    children: [
      {
        title: "介绍",
        path: "/dev/introduce",
        component: lazy(() => import('@docs/dev/introduce.md'))
      },
      {
        title: "安装",
        path: "/dev/install",
        // component: lazy(() => import('@docs/install.md'))
      },
      {
        title: "更新日志",
        path: "/dev/logs",
        // component: lazy(() => import('@docs/install.md'))
      },
      {
        title: "贡献源码？",
        path: "/dev/contributeCode",
        component: lazy(() => import('@docs/dev/contributeCode.md'))
      },
      {
        title: "挖坑ing",
        path: "/dev/roadmap",
        component: lazy(() => import('@docs/dev/roadmap.md'))
      },
      {
        title: "hooks",
        path: "/dev/hooks",
        component: lazy(() => import('@docs/dev/hooks.md'))
      }
    ]
  },
  {
    title: "通用",
    children: [
      {
        title: "Grid 网格",
        path: "/grid",
        component: lazy(() => import('bangumi-ui/src/lib/grid/demo/README.md'))
      },
      {
        title: "Button 按钮",
        path: "/button",
        component: lazy(() => import('bangumi-ui/src/lib/button/demo/README.md'))
      }
    ]
  },
  {
    title: "表单",
    children: [
      {
        title: "input 输入框",
        path: "/form/input",
        component: lazy(() => import('bangumi-ui/src/lib/input/demo/README.md'))
      },
      {
        title: "select 选择框",
        path: "/form/select",
        // component: lazy(() => import('@docs/form/select.md'))
      },
      {
        title: "switch 开关",
        path: "/form/switch",
        // component: lazy(() => import('@docs/form/switch.md'))
      },
      {
        title: "radio 单选框",
        path: "/form/radio",
        // component: lazy(() => import('@docs/form/radio.md'))
      },
      {
        title: "checkbox 多选框",
        path: "/form/checkbox",
        // component: lazy(() => import('@docs/form/checkbox.md'))
      },
      {
        title: "date-picker 日期选择器",
        path: "/form/date-picker",
        component: lazy(() => import('bangumi-ui/src/lib/datePicker/demo/README.md'))
      },
      {
        title: "form 表单",
        path: "form/form",
        component: lazy(() => import('bangumi-ui/src/lib/form/demo/README.md'))
      }
    ]
  },
  {
    title: '展示',
    children: [
      {
        title: 'pagination 分页',
        path: '/display/pagination',
        component: lazy(() => import('bangumi-ui/src/lib/pagination/demo/README.md'))
      },
      {
        title: 'rate 评分',
        path: '/display/rate',
        component: lazy(() => import('bangumi-ui/src/lib/rate/demo/README.md'))
      },
      {
        title: 'tooltip 提示',
        path: '/display/tooltip',
        component: lazy(() => import('bangumi-ui/src/lib/tooltip/demo/README.md'))
      }
    ]
  }
]
