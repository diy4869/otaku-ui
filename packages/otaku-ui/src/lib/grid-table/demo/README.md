---
import:
  import { GridTable } from 'otaku-ui';
api:
  {
    module: ['GridTable']
  }
---

## GridTable

::: demo

```tsx
function  Demo() {
  const tableColumn = [
    {
      label: '属性',
      prop: 'name',
      merge (data) {
        const { row, rowIndex, columnIndex } = data

        if (rowIndex === 0 && columnIndex === 0) {
          return {
            colspan: 2
          }
        } else {
          return {
            rowspan: rowIndex === 3 && columnIndex === 0 ?  2 : 1,
            colspan: rowIndex === 3 && columnIndex === 0 ? 5 : 1
          }
        }
      }
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
      merge (data) {
        const { row, rowIndex, columnIndex } = data

        return {
          colspan: rowIndex === 1 && columnIndex === 1 ? 2 : 1,
          rowspan: rowIndex === 1 && columnIndex === 1 ? 2 : 1
        }
      }
    },
    {
      label: '类型',
      prop: 'type',
      
    },
    {
      label: '默认值',
      prop: 'defaultValue',
      defaultValue: '这是没有数据的情况',
      merge (data) {
        const { row, rowIndex, columnIndex } = data

        return {
          colspan: rowIndex === 0 && columnIndex === 3 ? 2 : 1,
          rowspan: rowIndex === 0 ? 3 : 1
        }
      }
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
    },
    {
      name: 'size',
      required: false,
      type: 'small | middle | large',
      // defaultValue: '',
      desc: '禁用'
    },
    {
      name: 'size',
      required: false,
      type: 'small | middle | large',
      // defaultValue: '',
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