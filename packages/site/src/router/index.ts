
import { lazy } from 'react'

export default [
  {
    title: "开发指南",
    children: [
      {
        title: "介绍",
        path: "/dev/guide",
        component: lazy(() => import('@docs/dev/guide.md'))
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
        path: "/dev/sourceCode",
        // component: lazy(() => import('@docs/install.md'))
      },
      {
        title: "hooks",
        path: "/dev/hooks",
        component: lazy(() => import('@docs/dev/hooks.md'))
      }
    ]
  },
  {
    title: "基本",
    children: [
      {
        title: "Button 按钮",
        path: "/button",
        component: lazy(() => import('@docs/button.md'))
      }
    ]
  },
  {
    title: "表单",
    children: [
      {
        title: "input 输入框",
        path: "/form/input",
        // component: lazy(() => import('@docs/form/input.md'))
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
        path: "/form/data-picker",
        // component: lazy(() => import('@docs/form/data-picker.md'))
      },
      {
        title: "form 表单",
        path: "form/form",
        // component: lazy(() => import('@docs/form/form.md'))
      }
    ]
  }
]
