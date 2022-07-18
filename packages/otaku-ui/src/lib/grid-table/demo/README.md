---
import:
  import { GridTable } from 'otaku-ui';
api:
  {
    module: []
  }
---

## GridTable

::: demo

```tsx
function  Demo() {
  const tableColumn = [
    {
      label: '属性',
      prop: 'name'
    },
    {
      label: '是否必填',
      prop: 'required',
      render(data) {
        const { row } = data

        return (
          <span>{ row.require ? '是' : '否'}</span>
        )
      },
    },
    {
      label: '类型',
      prop: 'type'
    },
    {
      label: '默认值',
      prop: 'defaultValue',
      defaultValue: '这是没有数据的情况'
    },
    {
      label: '描述',
      prop: 'desc'
    }
  ]
  const tableData = [
    {
      name: 'disabled',
      required: false,
      type: 'number',
      defaultValue: '',
      desc: '禁用'
    },
    {
      name: 'loading',
      required: false,
      type: 'number',
      defaultValue: '',
      desc: '禁用'
    },
    {
      name: 'size',
      required: false,
      type: 'small | middle | large',
      // defaultValue: '',
      desc: '禁用'
    }
  ]

  return (
    <GridTable data={tableData} tableColumn={tableColumn}></GridTable>
  )
}

ReactDOM.createRoot(container).render(<Demo/>)
```
:::

## api

::: api
:::