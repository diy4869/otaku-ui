
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
        component: lazy(() => import('@docs/dev/install.md'))
      },
      {
        title: "更新日志",
        path: "/dev/logs",
        component: lazy(() => import('@docs/dev/install.md'))
      },
      {
        title: "贡献源码？",
        path: "/dev/contributeCode",
        component: lazy(() => import('@docs/dev/contributeCode.md'))
      },
      {
        title: "Code Review",
        path: "/dev/CodeReivew",
        component: lazy(() => import('@docs/dev/CodeReview.md'))
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
        component: lazy(() => import('otaku-ui/src/lib/grid/demo/README.md'))
      },
      {
        title: "Button 按钮",
        path: "/button",
        component: lazy(() => import('otaku-ui/src/lib/button/demo/README.md'))
      }
    ]
  },
  {
    title: "导航",
    children: [
      {
        title: "Bread Crumbs 面包屑",
        path: "/nav/breadCrumbs",
        component: lazy(() => import('otaku-ui/src/lib/breadCrumbs/demo/README.md'))
      },
      {
        title: "Timeline 时间线",
        path: "/nav/timeline",
        component: lazy(() => import('otaku-ui/src/lib/timeline/demo/README.md'))
      },
      {
        title: 'Pagination 分页',
        path: '/nav/pagination',
        component: lazy(() => import('otaku-ui/src/lib/pagination/demo/README.md'))
      }
    ]
  },
  {
    title: "通知",
    children: [
      {
        title: "Alert 警告",
        path: "/alert",
        component: lazy(() => import('otaku-ui/src/lib/alert/demo/README.md'))
      },
      {
        title: "Message 信息",
        path: "/message",
        component: lazy(() => import('otaku-ui/src/lib/message/demo/README.md'))
      }
    ]
  },
  {
    title: "表单",
    children: [
      {
        title: "input 输入框",
        path: "/form/input",
        component: lazy(() => import('otaku-ui/src/lib/input/demo/README.md'))
      },
      {
        title: "input-number 计数器",
        path: "/form/input-number",
        component: lazy(() => import('otaku-ui/src/lib/inputNumber/demo/README.md'))
        // component: lazy(() => import('@docs/form/select.md'))
      },
      {
        title: "select 选择框",
        path: "/form/select",
        component: lazy(() => import('otaku-ui/src/lib/select/demo/README.md'))
      },

      {
        title: "switch 开关",
        path: "/form/switch",
        component: lazy(() => import('otaku-ui/src/lib/switch/demo/README.md'))
        // component: lazy(() => import('@docs/form/switch.md'))
      },
      // {
      //   title: "radio 单选框",
      //   path: "/form/radio",
      //   component: lazy(() => import('otaku-ui/src/lib/radio/demo/README.md'))
      //   // component: lazy(() => import('@docs/form/radio.md'))
      // },
      {
        title: "checkbox 多选框",
        path: "/form/checkbox",
        component: lazy(() => import('otaku-ui/src/lib/checkbox/demo/README.md'))
      },
      {
        title: "date-picker 日期选择器",
        path: "/form/date-picker",
        component: lazy(() => import('otaku-ui/src/lib/datePicker/demo/README.md'))
      },
      {
        title: "form 表单",
        path: "/form/form",
        component: lazy(() => import('otaku-ui/src/lib/form/demo/README.md'))
      }
    ]
  },
  {
    title: '展示',
    children: [
      {
        title: "table 表格",
        path: "/display/table",
        component: lazy(() => import('otaku-ui/src/lib/table/demo/README.md'))
      },
      {
        title: "progress 进度条",
        path: "/display/progress",
        component: lazy(() => import('otaku-ui/src/lib/progress/demo/README.md'))
      },
      {
        title: "cropper 图片裁剪",
        path: "/display/cropper",
        component: lazy(() => import('otaku-ui/src/lib/cropper/demo/README.md'))
      },
      {
        title: "search 搜索框",
        path: "/display/search",
        component: lazy(() => import('otaku-ui/src/lib/search/demo/README.md'))
      },
      {
        title: 'rate 评分',
        path: '/display/rate',
        component: lazy(() => import('otaku-ui/src/lib/rate/demo/README.md'))
      },
      {
        title: 'tooltip 提示',
        path: '/display/tooltip',
        component: lazy(() => import('otaku-ui/src/lib/tooltip/demo/README.md'))
      }
    ]
  }
]
